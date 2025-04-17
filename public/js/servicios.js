// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // If it's the experience section, start counters
      if (entry.target.classList.contains('experience-section')) {
        animateCounters();
      }
    }
  });
}, { threshold: 0.1 });

// Observe elements
document.querySelectorAll('.service-card, .experience-section, .contact-card').forEach(el => {
  observer.observe(el);
});

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Modal video handling
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
  button.addEventListener('click', function() {
    const videoSrc = this.getAttribute('data-video');
    if (videoSrc) {
      const iframe = document.querySelector('#videoModal iframe');
      iframe.setAttribute('src', videoSrc);
    }
  });
});

// Close modal handler
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('hidden.bs.modal', function () {
    const iframe = this.querySelector('iframe');
    if (iframe) {
      iframe.setAttribute('src', '');
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1);

  // Selecciona todos los enlaces del navbar
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    // Obtén el nombre del archivo del atributo href del enlace
    const hrefPage = link.getAttribute("href").substring(link.getAttribute("href").lastIndexOf('/') + 1);
    if (hrefPage === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});