export function recordEvent(event: any) {
  fetch("https://ai-bingo-stats.lipsumar.io/event", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(event),
  });
}
