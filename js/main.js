// ===== MAIN.JS — All UI interactions =====

// ---- LOADER ----
(function () {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loader-fill');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        triggerHeroReveal();
      }, 400);
    }
    fill.style.width = progress + '%';
  }, 80);
  document.body.style.overflow = 'hidden';
})();

// ---- HERO REVEAL ----
function triggerHeroReveal() {
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
  });
}

// ---- CUSTOM CURSOR ----
(function () {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  if (!cursor || !dot) return;

  let cx = 0, cy = 0, dx = 0, dy = 0;

  document.addEventListener('mousemove', (e) => {
    dx = e.clientX; dy = e.clientY;
    dot.style.left = dx + 'px';
    dot.style.top  = dy + 'px';
  });

  function moveCursor() {
    cx += (dx - cx) * 0.12;
    cy += (dy - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(moveCursor);
  }
  moveCursor();

  const hoverEls = document.querySelectorAll('a, button, .project-card, .about-card, .skill-category');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
})();

// ---- NAVBAR SCROLL ----
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

// ---- HAMBURGER MENU ----
(function () {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ---- INTERSECTION OBSERVER (reveal on scroll) ----
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger skill bars
        if (entry.target.classList.contains('skills-grid')) {
          document.querySelectorAll('.skill-fill').forEach(bar => {
            const w = bar.getAttribute('data-width');
            bar.style.width = w + '%';
          });
        }

        // Trigger stat counters
        if (entry.target.classList.contains('hero-stats')) {
          document.querySelectorAll('.stat-num').forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            animateCount(el, target);
          });
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.closest('.hero')) observer.observe(el);
  });

  // Stagger project cards
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = (i % 3) * 0.1 + 's';
  });
})();

// ---- COUNT ANIMATION ----
function animateCount(el, target) {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 40);
}

// ---- CONTACT FORM ----
(function () {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      success.classList.add('show');
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      form.reset();
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1200);
  });
})();

// ---- SMOOTH SCROLL for nav links ----
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// ---- ACTIVE NAV LINK on scroll ----
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
  });
})();
