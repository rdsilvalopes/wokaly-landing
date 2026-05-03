/* ════════════════════════════════════════════════════════
   Wokaly — WOW Effects JS Module
   Interactive micro-interactions. Plug-and-play.
   ════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  // ── Scroll Progress Trail ──
  const trail = document.createElement('div');
  trail.className = 'wow-scroll-trail';
  document.body.appendChild(trail);

  function updateTrail() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    trail.style.height = progress + '%';
    if (scrollTop > 100) {
      trail.classList.add('is-active');
    } else {
      trail.classList.remove('is-active');
    }
  }
  window.addEventListener('scroll', updateTrail, { passive: true });
  updateTrail();

  // ── Magnetic Card Tilt (Hero) ──
  const heroCard = document.getElementById('dynamic-card') || document.querySelector('.hero-card');
  if (heroCard && window.matchMedia('(hover: hover)').matches) {
    const heroSection = heroCard.closest('.hero');
    let isTilted = false;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      heroCard.classList.add('is-tilting');
      isTilted = true;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      heroCard.classList.remove('is-tilting');
      isTilted = false;
    });
  }

  // ── Magnetic Buttons ──
  if (window.matchMedia('(hover: hover)').matches) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        btn.classList.add('is-magnetic');
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.classList.remove('is-magnetic');
      });
    });
  }

  // ── Floating Particles ──
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'wow-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = (30 + Math.random() * 60) + '%';
      particle.style.setProperty('--delay', (Math.random() * 5) + 's');
      particle.style.setProperty('--duration', (4 + Math.random() * 4) + 's');
      particle.style.setProperty('--x', (Math.random() * 40 - 20) + 'px');
      hero.style.position = 'relative';
      hero.style.overflow = 'hidden';
      hero.appendChild(particle);
    }
  }

  // ── Reveal on Scroll ──
  const revealElements = document.querySelectorAll('.section__header, .cat-card, .pain-card, .step-card, .split-card, .final-cta');
  revealElements.forEach(el => {
    el.classList.add('wow-reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        setTimeout(() => {
          entry.target.classList.add('is-revealed');
        }, 900);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

})();
