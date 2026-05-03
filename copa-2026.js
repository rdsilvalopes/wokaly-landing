/* ════════════════════════════════════════════════════════
   Wokaly — Copa 2026 Campaign JS
   Plug-and-play: requires matching copa-float-panel HTML.
   ════════════════════════════════════════════════════════ */
(function() {
  const copaPanel = document.getElementById('copa-float-panel');
  if (!copaPanel) return;

  const copaClose = document.getElementById('copa-float-close');
  const copaPill = document.getElementById('copa-float-pill');
  const copaCountdown = document.getElementById('copa-countdown');
  let collapseTimer = null;

  // Entry animation
  setTimeout(() => {
    copaPanel.classList.add('is-visible');
  }, 1500);

  // Countdown
  const copaDate = new Date('2026-06-11T00:00:00');
  function updateCountdown() {
    const now = new Date();
    const diff = copaDate - now;
    if (copaCountdown) {
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        copaCountdown.innerHTML = `<span class="copa-float-countdown-label">Faltam</span> ${days}d ${hours}h <span class="copa-float-countdown-label">para a Copa</span>`;
      } else {
        copaCountdown.innerHTML = `<span style="color:#10b981">Ao vivo</span> <span class="copa-float-countdown-label">Copa do Mundo 2026</span>`;
      }
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);

  // Auto-collapse
  collapseTimer = setTimeout(() => {
    if (copaPanel.classList.contains('is-visible')) {
      copaPanel.classList.remove('is-visible');
      copaPanel.classList.add('is-collapsing');
      setTimeout(() => {
        copaPanel.classList.remove('is-collapsing');
        copaPanel.classList.add('is-collapsed');
      }, 500);
    }
  }, 25000);

  // Pill click — re-expand
  if (copaPill) {
    copaPill.addEventListener('click', () => {
      clearTimeout(collapseTimer);
      copaPanel.classList.remove('is-collapsed');
      copaPanel.classList.add('is-visible');
      collapseTimer = setTimeout(() => {
        if (copaPanel.classList.contains('is-visible')) {
          copaPanel.classList.remove('is-visible');
          copaPanel.classList.add('is-collapsing');
          setTimeout(() => {
            copaPanel.classList.remove('is-collapsing');
            copaPanel.classList.add('is-collapsed');
          }, 500);
        }
      }, 25000);
    });
  }

  // Close button — permanent
  if (copaClose) {
    copaClose.addEventListener('click', () => {
      clearTimeout(collapseTimer);
      copaPanel.classList.remove('is-visible', 'is-collapsed');
      copaPanel.classList.add('is-exiting');
      setTimeout(() => { copaPanel.remove(); }, 400);
    });
  }
})();
