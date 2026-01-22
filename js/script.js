// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Hamburger menu toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (hamburger && navLinks && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Close mobile menu when clicking a link
const navLinkElements = document.querySelectorAll('.nav-link');
navLinkElements.forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger && navLinks) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});

// Form submission for contact page
function sendMessage() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  if (!name || !email || !message) {
    return;
  }

  if (!name.value || !email.value || !message.value) {
    alert('Please fill in all fields');
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    alert('Please enter a valid email address');
    return;
  }

  // Show sending indicator
  const submitButton = event.target;
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  // Send email using EmailJS
  emailjs.send('service_xhc4ort', 'template_5gx0m0p', {
    from_name: name.value,
    from_email: email.value,
    message: message.value
  })
  .then(function(response) {
    alert('Thank you for your message! I will get back to you soon.');
    // Clear form only on success
    name.value = '';
    email.value = '';
    message.value = '';
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, function(error) {
    alert('Failed to send message. Please try again.');
    console.error('EmailJS Error:', error);
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  });
}

// Smooth scroll to top when navigating
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.project-card, .about-content, .resume-container, .contact-container');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});