document.addEventListener('DOMContentLoaded', () => {

  /* ---- Cycling role text ---- */
  const roles = [
    'Software Developer',
    'Mobile Developer',
    'UI/UX Developer',
    'Blockchain Developer',
    'Motion Desgner',
    'product Designer',
  ];
  let roleIndex = 0;
  const roleEl = document.getElementById('role-text');

  function cycleRole() {
    // Fade out
    roleEl.classList.add('fade-out');
    roleEl.classList.remove('fade-in');

    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleEl.textContent = roles[roleIndex];
      // Fade in
      roleEl.classList.remove('fade-out');
      roleEl.classList.add('fade-in');
    }, 420);
  }

  // Start cycling every 2.5 seconds
  setInterval(cycleRole, 2500);


  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ---- Active nav link tracking ---- */
  const navItems = document.querySelectorAll('.nav__item');
  const sections = document.querySelectorAll('section[id]');

  const navIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navItems.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav__item[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    });
  }, { threshold: 0.3 });

  sections.forEach(s => navIO.observe(s));

  /* ---- Framer Motion-style scroll reveals ---- */
  // Only target individual LEAF elements — no parent/child conflicts
  const scrollTargets = [
    ...document.querySelectorAll('.project'),
    ...document.querySelectorAll('.skill-col'),
    ...document.querySelectorAll('.blog-card'),
    ...document.querySelectorAll('.about__img-wrap'),
    ...document.querySelectorAll('.about__text'),
  ];

  // Set initial hidden state via CSS inline styles (avoids class conflicts)
  scrollTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)';
  });

  // Reveal on scroll with stagger for siblings
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;

      // Small stagger per item
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
  const modalImg = document.getElementById('modal-img');
  const modalLink = document.getElementById('modal-link');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');

  if (modal) {
    document.querySelectorAll('.project').forEach(proj => {
      proj.addEventListener('click', () => {
        const imgSrc = proj.getAttribute('data-image');
        const linkHref = proj.getAttribute('data-link');
        const title = proj.querySelector('h3').textContent;

        if (imgSrc) {
          modalImg.src = imgSrc;
          modalImg.alt = title;
        }
        if (linkHref) modalLink.href = linkHref;
        
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) modalTitle.textContent = title;

        modal.classList.add('active');
      });
    });

    const closeModal = () => modal.classList.remove('active');
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
  }

  /* ---- Skills Tab Logic ---- */
  const tabs = document.querySelectorAll('.skills__tab');
  const panels = document.querySelectorAll('.skills__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === target) {
          p.classList.add('active');
        }
      });
    });
  });

});
