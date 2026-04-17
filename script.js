const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__menu a');
const year = document.getElementById('year');
const counters = document.querySelectorAll('[data-counter]');
const tickerTracks = document.querySelectorAll('.ticker-track');

// efeito de scroll no header
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  });
}

// abrir/fechar menu mobile
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// fechar menu ao clicar em um link
if (navLinks.length && navMenu && navToggle) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// atualizar ano automático no footer
if (year) {
  year.textContent = new Date().getFullYear();
}

function syncTickerLoop(track) {
  const firstGroup = track.querySelector('.ticker__group');

  if (!firstGroup) {
    return;
  }

  track.style.setProperty('--ticker-loop-width', `${firstGroup.getBoundingClientRect().width}px`);
}

if (tickerTracks.length) {
  tickerTracks.forEach((track) => {
    const groups = track.querySelectorAll('.ticker__group');

    if (groups.length === 1) {
      const clone = groups[0].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }

    syncTickerLoop(track);
  });

  window.addEventListener('resize', () => {
    tickerTracks.forEach((track) => {
      syncTickerLoop(track);
    });
  });
}

function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}

function animateCounter(el) {
  if (el.dataset.animated === 'true') {
    return;
  }

  const start = Number(el.dataset.start || 0);
  const target = Number(el.dataset.target || 0);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const startTime = performance.now();

  el.dataset.animated = 'true';

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const currentValue = Math.floor(start + (target - start) * easedProgress);

    el.innerText = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
      return;
    }

    el.innerText = `${target}${suffix}`;
  }

  requestAnimationFrame(update);
}

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// modal de imagem
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');
const images = document.querySelectorAll('.feature img');

if (modal && modalImg && closeModal && images.length) {
  images.forEach((img) => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalImg.src = '';
    modalImg.alt = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalImg.src = '';
      modalImg.alt = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      modalImg.src = '';
      modalImg.alt = '';
    }
  });
}
