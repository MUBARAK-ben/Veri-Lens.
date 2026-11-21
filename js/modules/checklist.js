const TRIAGE_CHECKS = [
  { id: "otp", label: "Does it ask for your PIN, password, BVN/ID secret, or OTP?", weight: 3 },
  { id: "urgency", label: "Does it force panic, threats, or 'act in minutes' pressure?", weight: 2 },
  { id: "reward", label: "Does it promise 'guaranteed' fast money, prizes, or miracle cures?", weight: 3 },
  { id: "link", label: "Does it contain an unfamiliar link, shortened URL, or lookalike domain?", weight: 2 },
  { id: "unverified", label: "Did it arrive via an unverified account or repeated forward with no proof?", weight: 2 }
];

export function renderTriageModal(containerEl, resultEl) {
  const checkedIds = new Set();

  const evaluate = () => {
    let risk = 0;
    for (const item of TRIAGE_CHECKS) {
      if (checkedIds.has(item.id)) risk += item.weight;
    }

    if (risk >= 5) {
      resultEl.innerHTML = `<strong style="color: var(--danger)">High Risk — Pause &amp; Do Not Engage:</strong> Avoid clicking links, paying fees, or sharing personal codes. Verify through an official channel you look up yourself.`;
    } else if (risk >= 2) {
      resultEl.innerHTML = `<strong style="color: var(--warning)">Moderate Risk — Verify First:</strong> Treat with caution. Check the sender's real history, cross-check claims with trusted sources, and avoid rushing.`;
    } else {
      resultEl.innerHTML = `<strong style="color: var(--success)">Low Immediate Red Flags:</strong> No major scam triggers checked here, though you should still stay alert if money or sensitive data is involved.`;
    }
  };

  containerEl.innerHTML = "";
  TRIAGE_CHECKS.forEach((item) => {
    const row = document.createElement("label");
    row.className = "triage-item";

    const text = document.createElement("span");
    text.textContent = item.label;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) checkedIds.add(item.id);
      else checkedIds.delete(item.id);
      evaluate();
    });

    row.append(text, checkbox);
    containerEl.appendChild(row);
  });

  evaluate();
}