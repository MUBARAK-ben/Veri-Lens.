import { scenarios, uiTranslations } from "./data/scenarios.js";
import { loadProgress, saveProgress, getRank, computeVerdictPoints } from "./modules/scorer.js";
import { getLensExplanation, renderHeaderXray } from "./modules/inspector.js";
import { renderTriageModal } from "./modules/checklist.js";

const state = {
  selectedCategory: "All",
  currentIndex: 0,
  flaggedIds: new Set(),
  activeLens: null,
  headerXrayVisible: false,
  submitted: false,
  progress: loadProgress(),
  lang: "en"
};

const els = {
  langSelect: document.getElementById("langSelect"),
deviceFrame: document.getElementById("deviceFrame"),
  scoreValue: document.getElementById("scoreValue"),
  streakValue: document.getElementById("streakValue"),
  rankValue: document.getElementById("rankValue"),
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  categoryFilters: document.getElementById("categoryFilters"),
  caseIndexText: document.getElementById("caseIndexText"),
  caseTotalText: document.getElementById("caseTotalText"),
  caseCategoryTag: document.getElementById("caseCategoryTag"),
  caseDifficultyTag: document.getElementById("caseDifficultyTag"),
  caseChannelTag: document.getElementById("caseChannelTag"),
  caseTitle: document.getElementById("caseTitle"),
  senderDisplay: document.getElementById("senderDisplay"),
  caseTimestamp: document.getElementById("caseTimestamp"),
  senderHeaderBar: document.getElementById("senderHeaderBar"),
  messageBody: document.getElementById("messageBody"),
  flaggedCount: document.getElementById("flaggedCount"),
  totalFlagsCount: document.getElementById("totalFlagsCount"),
  pinnedEvidenceList: document.getElementById("pinnedEvidenceList"),
  clearFlagsBtn: document.getElementById("clearFlagsBtn"),
  lensOutput: document.getElementById("lensOutput"),
  debriefPanel: document.getElementById("debriefPanel"),
  debriefBadge: document.getElementById("debriefBadge"),
  debriefTitle: document.getElementById("debriefTitle"),
  debriefSummary: document.getElementById("debriefSummary"),
  debriefClues: document.getElementById("debriefClues"),
  defenseTipText: document.getElementById("defenseTipText"),
  nextCaseBtn: document.getElementById("nextCaseBtn"),
  triageModal: document.getElementById("triageModal"),
  openTriageBtn: document.getElementById("openTriageBtn"),
  closeTriageBtn: document.getElementById("closeTriageBtn"),
  closeTriageBackdrop: document.getElementById("closeTriageBackdrop"),
  triageQuestions: document.getElementById("triageQuestions"),
  triageResult: document.getElementById("triageResult")
};

function getFilteredScenarios() {
  if (state.selectedCategory === "All") return scenarios;
  return scenarios.filter((item) => item.category === state.selectedCategory);
}

function getCurrentScenario() {
  const list = getFilteredScenarios();
  return list[state.currentIndex % list.length];
}

function updateHud() {
  els.scoreValue.textContent = state.progress.score;
  els.streakValue.textContent = state.progress.streak;
  els.rankValue.textContent = getRank(state.progress.score);
}

function renderCategoryFilters() {
  const categories = ["All", ...new Set(scenarios.map((s) => s.category))];
  els.categoryFilters.innerHTML = "";

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `filter-pill ${state.selectedCategory === cat ? "is-active" : ""}`;
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      state.selectedCategory = cat;
      state.currentIndex = 0;
      resetCaseWorkspace();
      renderCategoryFilters();
      renderCase();
    });
    els.categoryFilters.appendChild(btn);
  });
}

function resetCaseWorkspace() {
  state.flaggedIds.clear();
  state.activeLens = null;
  state.headerXrayVisible = false;
  state.submitted = false;
  els.debriefPanel.classList.add("hidden");
  els.senderHeaderBar.classList.add("hidden");
  els.lensOutput.textContent = "Select a forensic lens above to inspect technical and contextual clues.";
  document.querySelectorAll(".lens-btn").forEach((b) => b.classList.remove("is-active"));
}

function renderCase() {
  const list = getFilteredScenarios();
  const scenario = getCurrentScenario();
  const localized = scenario.locales[state.lang] || scenario.locales.en;
applyLanguage();
  const totalFlags = localized.segments.filter((seg) => seg.isRedFlag).length;

  els.caseIndexText.textContent = (state.currentIndex % list.length) + 1;
  els.caseTotalText.textContent = list.length;
  els.caseCategoryTag.textContent = scenario.category;
  els.caseDifficultyTag.textContent = scenario.difficulty;
  els.caseChannelTag.textContent = scenario.channel;
  els.caseTitle.textContent = `${scenario.id.toUpperCase()} — ${scenario.channel} Inspection`;
  els.senderDisplay.textContent = scenario.senderDisplay;
  els.caseTimestamp.textContent = scenario.timestamp;
  els.totalFlagsCount.textContent = totalFlags;

  els.messageBody.innerHTML = "";
  localized.segments.forEach((seg) => {
    const span = document.createElement("span");
    const isFlagged = state.flaggedIds.has(seg.id);
    span.className = [
      "segment",
      "segment--inspectable",
      seg.isLink ? "segment--link" : "",
      isFlagged ? "segment--flagged" : ""
    ]
      .filter(Boolean)
      .join(" ");

    span.textContent = seg.text;
    span.title = "Click to toggle red-flag pin";
    span.addEventListener("click", () => {
      if (state.submitted) return;
      if (state.flaggedIds.has(seg.id)) state.flaggedIds.delete(seg.id);
      else state.flaggedIds.add(seg.id);
      renderCase();
    });
    els.messageBody.appendChild(span);
  });

  renderPinnedChips(scenario);
}

function renderPinnedChips(scenario) {
  els.flaggedCount.textContent = state.flaggedIds.size;
  els.pinnedEvidenceList.innerHTML = "";

  if (state.flaggedIds.size === 0) {
    els.pinnedEvidenceList.innerHTML = `<span class="muted">No red flags pinned yet.</span>`;
    return;
  }

  state.flaggedIds.forEach((id) => {
    const seg = scenario.segments.find((s) => s.id === id);
    if (!seg) return;
    const chip = document.createElement("span");
    chip.className = "evidence-chip";
    chip.textContent = seg.isRedFlag ? `Flagged: ${seg.tactic}` : "Pinned (Not a Red Flag)";
    els.pinnedEvidenceList.appendChild(chip);
  });
}

function handleVerdict(chosenVerdict) {
  if (state.submitted) return;
  state.submitted = true;

  const scenario = getCurrentScenario();
  const localized = scenario.locales[state.lang] || scenario.locales.en;
  const isVerdictCorrect = chosenVerdict === scenario.verdict;
  const redFlagSegments = localized.segments.filter((s) => s.isRedFlag);
  const caughtFlags = redFlagSegments.filter((s) => state.flaggedIds.has(s.id)).length;
  const alreadySolved = state.progress.solvedIds.includes(scenario.id);

  const reward = computeVerdictPoints({
    isVerdictCorrect,
    caughtFlags,
    totalFlags: redFlagSegments.length,
    alreadySolved
  });

  if (!alreadySolved) {
    if (isVerdictCorrect) {
      state.progress.score += reward.pointsEarned;
      state.progress.streak += reward.nextStreakIncrement;
      state.progress.solvedIds.push(scenario.id);
    } else {
      state.progress.streak = 0;
    }
    saveProgress(state.progress);
    updateHud();
  }

  els.debriefPanel.classList.remove("hidden");
  els.debriefBadge.className = `pill ${isVerdictCorrect ? "pill--pass" : "pill--fail"}`;
  els.debriefBadge.textContent = isVerdictCorrect ? "Accurate Verdict" : "Review Needed";
  els.debriefTitle.textContent = `Actual Classification: ${scenario.verdict.toUpperCase()}`;
  els.debriefSummary.textContent = alreadySolved
    ? `You already scored this case earlier. Red flags spotted: ${caughtFlags}/${redFlagSegments.length}.`
    : `Points earned: +${reward.pointsEarned} • Red flags spotted: ${caughtFlags}/${redFlagSegments.length}.`;

  els.debriefClues.innerHTML = "";
  if (redFlagSegments.length === 0) {
    els.debriefClues.innerHTML = `<div class="clue-item">No manipulation red flags were planted in this baseline case.</div>`;
  } else {
    redFlagSegments.forEach((seg) => {
      const wasCaught = state.flaggedIds.has(seg.id);
      const item = document.createElement("div");
      item.className = "clue-item";
      item.innerHTML = `<strong>${wasCaught ? "✓ Caught" : "✕ Missed"} — ${seg.tactic}:</strong> ${seg.explanation}`;
      els.debriefClues.appendChild(item);
    });
  }

  els.defenseTipText.textContent = localized.defenseTip;
  els.debriefPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.querySelectorAll(".lens-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lensKey = btn.dataset.lens;
    const scenario = getCurrentScenario();
    document.querySelectorAll(".lens-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    state.activeLens = lensKey;
    els.lensOutput.textContent = getLensExplanation(scenario, lensKey);

    if (lensKey === "sender") {
      state.headerXrayVisible = true;
      els.senderHeaderBar.innerHTML = renderHeaderXray(scenario, true);
      els.senderHeaderBar.classList.remove("hidden");
    }
  });
});

document.querySelectorAll("[data-verdict]").forEach((btn) => {
  btn.addEventListener("click", () => handleVerdict(btn.dataset.verdict));
});
els.langSelect.addEventListener("change", (e) => {
  state.lang = e.target.value;
  applyLanguage();
  renderCase();
});

els.clearFlagsBtn.addEventListener("click", () => {
  if (state.submitted) return;
  state.flaggedIds.clear();
  renderCase();
});

els.nextCaseBtn.addEventListener("click", () => {
  state.currentIndex += 1;
  resetCaseWorkspace();
  renderCase();
});

els.themeToggleBtn.addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  els.themeToggleBtn.textContent = next === "dark" ? "Light Mode" : "Dark Mode";
});

els.openTriageBtn.addEventListener("click", () => {
  renderTriageModal(els.triageQuestions, els.triageResult);
  els.triageModal.classList.remove("hidden");
});
function applyLanguage() {
  const dict = uiTranslations[state.lang] || uiTranslations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  const isArabic = state.lang === "ar";
  els.deviceFrame.setAttribute("dir", isArabic ? "rtl" : "ltr");
}
const closeModal = () => els.triageModal.classList.add("hidden");
els.closeTriageBtn.addEventListener("click", closeModal);
els.closeTriageBackdrop.addEventListener("click", closeModal);

updateHud();
renderCategoryFilters();
renderCase();