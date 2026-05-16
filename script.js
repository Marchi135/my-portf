/* =============================================
   MCQueencodex Portfolio – Enhanced script.js
   ============================================= */

/* ── 1. TYPING EFFECT ── */
const typingTarget = document.getElementById('typing-text');
const phrases = [
  'Frontend Software Developer',
  'Cricut Crafting Creator',
  'Web Application Builder',
  'UI/UX Enthusiast',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingTarget.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTarget.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

if (typingTarget) setTimeout(type, 600);


/* ── 2. SMOOTH SCROLL for nav links ── */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    // Only intercept same-page hash links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── 3. ACTIVE NAV HIGHLIGHT on scroll ── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `${entry.target.id}.html` ||
              link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => observer.observe(s));


/* ── 4. SCROLL REVEAL ── */
const revealElements = document.querySelectorAll(
  '.textbox, .intro, footer, .profile-image, #name'
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => {
  el.classList.add('reveal-hidden');
  revealObserver.observe(el);
});


/* ── 5. RIPPLE EFFECT on buttons ── */
document.querySelectorAll('.page-link button').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});


/* ── 6. STICKY NAV shadow on scroll ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});


/* ── 7. MOBILE HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks2 = document.getElementById('nav-links');

if (hamburger && navLinks2) {
  hamburger.addEventListener('click', () => {
    navLinks2.classList.toggle('nav-open');
    hamburger.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks2.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks2.classList.remove('nav-open');
      hamburger.classList.remove('open');
    });
  });
}


/* ── 8. GREETING based on time of day ── */
const greetingEl = document.getElementById('greeting');
if (greetingEl) {
  const hour = new Date().getHours();
  let greeting = 'Hello';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  greetingEl.textContent = greeting + ', I\'m';
}
