// ===================================================
// GLOBAL HELPERS
// ===================================================
window.switchSkillTab = (clickedTab) => {
  const target = clickedTab.getAttribute('data-tab');
  const tabs = document.querySelectorAll('.skills__tab');
  const panels = document.querySelectorAll('.skills__panel');

  // Update tabs
  tabs.forEach(t => t.classList.remove('active'));
  clickedTab.classList.add('active');

  // Update panels
  panels.forEach(p => {
    p.classList.remove('active');
    if (p.id === target) {
      p.classList.add('active');
      // Reveal cards inside immediately
      p.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // ROLE CYCLING
  // ===================================================
  const roles = [
    'Software Developer',
    'Mobile Developer',
    'UI/UX Developer',
    'Blockchain Developer',
    'Motion Designer',
    'Product Designer',
  ];
  let roleIndex = 0;
  const roleEl = document.getElementById('role-text');

  if (roleEl) {
    function cycleRole() {
      roleEl.classList.add('fade-out');
      roleEl.classList.remove('fade-in');
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleEl.textContent = roles[roleIndex];
        roleEl.classList.remove('fade-out');
        roleEl.classList.add('fade-in');
      }, 420);
    }
    setInterval(cycleRole, 2500);
  }

  // ===================================================
  // NAVBAR
  // ===================================================
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  const navItems = document.querySelectorAll('.nav__item');
  const sections = document.querySelectorAll('section[id]');
  if (navItems.length && sections.length) {
    const navIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        navItems.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav__item[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      });
    }, { threshold: 0.3 });
    sections.forEach(s => navIO.observe(s));
  }

  // ===================================================
  // SCROLL REVEALS
  // ===================================================
  const scrollTargets = document.querySelectorAll('.project, .skill-card, .about__img-wrap, .about__text, .contact-links, .heading');
  
  scrollTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
  });

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 50);
      revealIO.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  scrollTargets.forEach(el => revealIO.observe(el));

  // ===================================================
  // MODAL
  // ===================================================
  const modal = document.getElementById('project-modal');
  if (modal) {
    const modalImg = document.getElementById('modal-img');
    const modalLink = document.getElementById('modal-link');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');

    document.querySelectorAll('.project').forEach(proj => {
      proj.onclick = () => {
        const imgSrc = proj.getAttribute('data-image');
        const linkHref = proj.getAttribute('data-link');
        const title = proj.querySelector('h3')?.textContent || 'Project Preview';

        if (imgSrc && modalImg) {
          modalImg.src = imgSrc;
          modalImg.alt = title;
        }
        if (linkHref && modalLink) modalLink.href = linkHref;
        if (modalTitle) modalTitle.textContent = title;

        modal.classList.add('active');
      };
    });

    const closeModal = () => modal.classList.remove('active');
    if (modalClose) modalClose.onclick = closeModal;
    if (modalOverlay) modalOverlay.onclick = closeModal;
  }

});
