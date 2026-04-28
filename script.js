document.addEventListener('DOMContentLoaded', () => {

  /* ---- Skills Tab Logic ---- */
  const tabs = document.querySelectorAll('.skills__tab');
  const panels = document.querySelectorAll('.skills__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      if (!target) return;

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === target) {
          p.classList.add('active');
          // Ensure cards inside are visible (fallback for reveal logic)
          p.querySelectorAll('.skill-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }
      });
    });
  });

  /* ---- Cycling role text ---- */
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

  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ---- Active nav link tracking ---- */
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

  /* ---- Scroll reveals ---- */
  const scrollTargets = [
    ...document.querySelectorAll('.project'),
    ...document.querySelectorAll('.skill-card'),
    ...document.querySelectorAll('.about__img-wrap'),
    ...document.querySelectorAll('.about__text'),
    ...document.querySelectorAll('.contact-links'),
    ...document.querySelectorAll('.heading'),
  ];

  scrollTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)';
  });

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealIO.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  scrollTargets.forEach(el => revealIO.observe(el));

  /* ---- Project Modal Logic ---- */
  const modal = document.getElementById('project-modal');
  if (modal) {
    const modalImg = document.getElementById('modal-img');
    const modalLink = document.getElementById('modal-link');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');

    document.querySelectorAll('.project').forEach(proj => {
      proj.addEventListener('click', () => {
        const imgSrc = proj.getAttribute('data-image');
        const linkHref = proj.getAttribute('data-link');
        const h3 = proj.querySelector('h3');
        const title = h3 ? h3.textContent : 'Project Preview';

        if (imgSrc && modalImg) {
          modalImg.src = imgSrc;
          modalImg.alt = title;
        }
        if (linkHref && modalLink) modalLink.href = linkHref;
        if (modalTitle) modalTitle.textContent = title;

        modal.classList.add('active');
      });
    });

    const closeModal = () => modal.classList.remove('active');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  }
});
