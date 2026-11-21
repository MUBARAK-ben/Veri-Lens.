const STORAGE_KEY = "verilens_state_v1";

const RANKS = [
  { minScore: 0, title: "Rookie Observer" },
  { minScore: 60, title: "Fact-Checker" },
  { minScore: 140, title: "Threat Analyst" },
  { minScore: 240, title: "Cyber Guardian" }
];

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { score: 0, streak: 0, solvedIds: [] };
    const parsed = JSON.parse(raw);
    return {
      score: Number(parsed.score) || 0,
      streak: Number(parsed.streak) || 0,
      solvedIds: Array.isArray(parsed.solvedIds) ? parsed.solvedIds : []
    };
  } catch {
    return { score: 0, streak: 0, solvedIds: [] };
  }
}

export function saveProgress(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getRank(score) {
  let current = RANKS[0].title;
  for (const rank of RANKS) {
    if (score >= rank.minScore) current = rank.title;
  }
  return current;
}

export function computeVerdictPoints({ isVerdictCorrect, caughtFlags, totalFlags, alreadySolved }) {
  if (alreadySolved) {
    return { pointsEarned: 0, nextStreak: null };
  }
  if (!isVerdictCorrect) {
    return { pointsEarned: 0, nextStreak: 0 };
  }
  const flagBonus = caughtFlags * 10;
  const fullClueBonus = totalFlags > 0 && caughtFlags === totalFlags ? 15 : 0;
  return {
    pointsEarned: 25 + flagBonus + fullClueBonus,
    nextStreakIncrement: 1
  };
}