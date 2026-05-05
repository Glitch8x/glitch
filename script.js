document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // NAVBAR SCROLL EFFECT
  // ===================================================
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===================================================
  // ACTIVE NAV LINKS ON SCROLL
  // ===================================================
  const navItems = document.querySelectorAll('.nav__item');
  const sections = document.querySelectorAll('section[id]');
  
  if (navItems.length && sections.length) {
    const navIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navItems.forEach(a => a.classList.remove('active'));
          const activeLink = document.querySelector(`.nav__item[href="#${e.target.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, { threshold: 0.3 });
    
    sections.forEach(s => navIO.observe(s));
  }

  // ===================================================
  // SCROLL REVEAL ANIMATIONS
  // ===================================================
  const revealItems = document.querySelectorAll('.project-featured, .stack-pill');
  const heroReveal = document.querySelectorAll('.hero__content, .hero__img-wrap');
  
  revealItems.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  heroReveal.forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 1.2s ease-out';
  });

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  [...revealItems, ...heroReveal].forEach(el => revealIO.observe(el));

});
