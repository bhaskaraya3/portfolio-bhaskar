// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

document.addEventListener('click', (e) => {
  if (hamburger && navLinks && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger && navLinks) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});

// EMAILJS (ONLY REQUIRED ADDITION)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitButton = this.querySelector('button');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    emailjs.sendForm(
      'service_xhc4ort',
      'template_5gx0m0p',
      this
    )
    .then(() => {
      alert('Message sent successfully 🚀');
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    })
    .catch((error) => {
      alert('Failed to send message ❌');
      console.error(error);
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
  });
}

// Smooth scroll
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card, .about-content, .resume-container, .contact-container')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = '0.6s';
      observer.observe(el);
    });
});
