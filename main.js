// ═══════════════════════════════════════════════
//  VORTEX — MAIN JS
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Lucide Icons ──
  lucide.createIcons();

  // ── AOS Init ──
  AOS.init({ once: true, offset: 60, easing: 'ease-out-quart' });

  // ── Cursor customizado ──
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor cursor-dot';
  ring.className = 'cursor cursor-ring';
  document.body.append(dot, ring);

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  }, { passive: true });

  // Ring segue com lag suave
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover em elementos interativos
  const hoverTargets = 'a, button, [role="button"], .service-card, .process-step, .navbar-brand';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ── Navbar scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Fechar menu mobile ao clicar em link ──
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      if (collapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
    });
  });

  // ── Contact form ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML = '<i data-lucide="check" width="16" height="16"></i> Mensagem enviada!';
      btn.style.background = '#34C759';
      lucide.createIcons();

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        lucide.createIcons();
        form.reset();
      }, 3500);
    });
  }

  // ── Newsletter ──
  const newsletter = document.querySelector('.newsletter-form');
  if (newsletter) {
    newsletter.querySelector('button').addEventListener('click', () => {
      const input = newsletter.querySelector('input');
      if (!input.value) return;
      input.value = '';
      input.placeholder = 'Inscrito com sucesso! ✓';
      setTimeout(() => { input.placeholder = 'seu@email.com'; }, 3000);
    });
  }

});
