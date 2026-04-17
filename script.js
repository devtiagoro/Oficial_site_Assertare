const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__menu a');
const year = document.getElementById('year');

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
