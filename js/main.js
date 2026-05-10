'use strict';

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  const isOpen = nav.classList.contains('active');
  navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav on link click
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Stat counter animation
const animateCounters = () => {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-count'), 10);
    const duration = 1500;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(eased * target) + '+';
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
};

// Intersection observer for counter animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(statsSection);
}

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio-item, .blog-card, .cert-card, .about-content, .about-image'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// Contact form handling — opens mailto: with form data
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const subjectSelect = contactForm.querySelector('#subject');
    const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
    const message = contactForm.querySelector('#message').value;

    const body = `Name: ${name}\nE-Mail: ${email}\n\n${message}`;
    const mailto = `mailto:johannes.schmidt.vik@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    contactForm.reset();
  });
}

// Highlight underline animation on scroll
const highlights = document.querySelectorAll('h1 .highlight, h2 .highlight');
const highlightObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  },
  { threshold: 0.1 }
);
highlights.forEach((el) => highlightObserver.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
