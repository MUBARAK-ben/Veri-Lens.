export function getLensExplanation(scenario, lensKey) {
  if (!scenario || !scenario.forensics) return "No forensic notes available.";
  return scenario.forensics[lensKey] || "Inspect the highlighted segments for clues.";
}

export function renderHeaderXray(scenario, isVisible) {
  if (!isVisible) return "";
  return `<strong>Header Trace:</strong> ${scenario.senderMetadata}`;
}