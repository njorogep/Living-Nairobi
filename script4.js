/* ==========================================================
   NAMNA — LAYOUT OPTION 5: CURRENT + TRENDING BAR
   Runs alongside scripts.js on index4.html only.
   Duplicates the ticker items once so the CSS loop is seamless.
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  Array.from(track.children).forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.tabIndex = -1;
    track.appendChild(clone);
  });
});
