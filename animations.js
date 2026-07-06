/**
 * animations.js
 * -------------
 * All interactive and scroll-driven animations for the portfolio.
 *
 * Modules
 * -------
 *  1. Typewriter    — cycles role titles in the hero section
 *  2. Counters      — animate stat numbers on page load
 *  3. ScrollReveal  — fade + lift elements as they enter viewport
 *                     (also triggers skill bar fills)
 *  4. CardGlow      — radial mouse-glow effect on project cards
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     1. TYPEWRITER
     Cycles through an array of role phrases, typing and
     deleting each one with a realistic variable speed.
  ══════════════════════════════════════════════════════════ */
  (function initTypewriter () {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
      'Embedded Systems Engineer',
      'AI + Computer Vision Developer',
      'Railway Infrastructure Analyst',
      'Data Analytics Practitioner',
      'IoT Innovator',
    ];

    let phraseIndex  = 0;   // current phrase
    let charIndex    = 0;   // current character position
    let isDeleting   = false;
    let pauseFrames  = 0;   // countdown before starting to delete

    const TYPE_SPEED   = 65;   // ms per char when typing
    const DELETE_SPEED = 28;   // ms per char when deleting
    const PAUSE_FRAMES = 60;   // frames to pause at full phrase

    function tick () {
      const phrase = phrases[phraseIndex];

      if (!isDeleting) {
        /* Type one more character */
        el.textContent = phrase.slice(0, ++charIndex);

        if (charIndex === phrase.length) {
          /* Reached end — pause before deleting */
          isDeleting  = true;
          pauseFrames = PAUSE_FRAMES;
        }
      } else {
        /* Honour pause before deleting */
        if (pauseFrames > 0) {
          pauseFrames--;
          setTimeout(tick, DELETE_SPEED);
          return;
        }

        /* Delete one character */
        el.textContent = phrase.slice(0, --charIndex);

        if (charIndex === 0) {
          /* Move to next phrase */
          isDeleting   = false;
          phraseIndex  = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    }

    tick();
  }());


  /* ══════════════════════════════════════════════════════════
     2. COUNTERS
     Animates .stat-num elements from 0 to their data-target
     value.  Appends data-suffix if present (e.g. "Cr+", "/5").
  ══════════════════════════════════════════════════════════ */
  (function initCounters () {
    const DURATION_FRAMES = 60;   // ~1.5 s at 60 fps
    const INTERVAL_MS     = 25;

    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseFloat(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || '';
      const step   = target / DURATION_FRAMES;
      let current  = 0;

      const ticker = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + suffix;

        if (current >= target) {
          clearInterval(ticker);
          el.textContent = target + suffix;   // ensure exact final value
        }
      }, INTERVAL_MS);
    });
  }());


  /* ══════════════════════════════════════════════════════════
     3. SCROLL REVEAL
     Observes every element with class .reveal.
     On intersection: adds .visible (triggers CSS transition)
     and, if the element contains skill bars, animates them.

     Stagger: each batch of entries is delayed by 80 ms per
     element index so cards cascade in rather than popping
     all at once.
  ══════════════════════════════════════════════════════════ */
  (function initScrollReveal () {
    /**
     * Animate skill bar fills inside a revealed element.
     * Width is read from data-w (e.g. data-w="88" → 88%).
     */
    function animateSkillBars (container) {
      container.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = (bar.dataset.w || 0) + '%';
      });
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;

        /* Staggered delay so multiple cards cascade */
        setTimeout(() => {
          entry.target.classList.add('visible');
          animateSkillBars(entry.target);
        }, index * 80);

        /* Stop observing once revealed */
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,   // trigger when 12% of element is visible
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }());


  /* ══════════════════════════════════════════════════════════
     4. PROJECT CARD RADIAL GLOW
     Tracks mouse position relative to each .project-card and
     updates CSS custom properties --mx and --my so the
     ::after pseudo-element's radial-gradient follows the cursor.
  ══════════════════════════════════════════════════════════ */
  (function initCardGlow () {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x    = ((e.clientX - rect.left) / rect.width)  * 100;
        const y    = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  }());

}());
