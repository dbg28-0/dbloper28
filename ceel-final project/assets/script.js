// ===== LIGHTBOX + PAGINATION =====
const lightbox = document.getElementById('lightbox');
const lightboxVisual = document.getElementById('lightboxVisual');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxText = document.getElementById('lightboxText');
const lightboxClose = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('prevDesign');
const nextBtn = document.getElementById('nextDesign');
const counterSpan = document.getElementById('lightboxCounter');

const designItems = Array.from(document.querySelectorAll('.design-item'));
let currentIndex = 0;

function openLightbox(index) {
  const item = designItems[index];
  if (!item) return;

  const img = item.querySelector('img');
  const title = item.querySelector('.design-title');
  const caption = item.querySelector('.design-caption');

  const fullSrc = img.dataset.full || img.src;

  lightboxVisual.innerHTML = `<img src="${fullSrc}" alt="${img.alt}">`;
  lightboxTitle.textContent = title ? title.textContent : '';
  lightboxText.textContent = caption ? caption.textContent : '';

  currentIndex = index;
  counterSpan.textContent = `${currentIndex + 1} / ${designItems.length}`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === designItems.length - 1;

  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

// Open via button
document.querySelectorAll('.btn-enlarge').forEach((btn, index) => {
  btn.addEventListener('click', () => openLightbox(index));
});

// Open via image click
designItems.forEach((item, index) => {
  const img = item.querySelector('img');
  if (!img) return;
  img.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);

// Close when clicking backdrop
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Pagination
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    openLightbox(currentIndex - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < designItems.length - 1) {
    openLightbox(currentIndex + 1);
  }
});

// Escape key closes lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// ===== NAV + SMOOTH SCROLL + ACTIVE LINK =====
const header = document.querySelector('header');
const nav = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-item');

// Hamburger toggle
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Smooth scroll on click
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    const headerHeight = header.offsetHeight;
    const sectionTop = targetSection.offsetTop;

    window.scrollTo({
      top: sectionTop - headerHeight,
      behavior: 'smooth'
    });

    // Close mobile nav
    nav.classList.remove('open');
    navToggle.classList.remove('active');

    // Active state on click
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Highlight nav on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  const headerHeight = header.offsetHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - headerHeight - 40;
    const offsetBottom = offsetTop + section.offsetHeight;

    if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
      const id = section.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
});

// ===== FOOTER YEAR =====
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
