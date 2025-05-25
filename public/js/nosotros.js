document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect (Consistent with index.html)
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Animaciones para las cards del equipo (manteniendo tu efecto original)
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // El efecto hover principal se maneja con CSS :hover para mejor rendimiento
      // Aquí podrías añadir JS específico si el CSS no es suficiente
    });
    card.addEventListener('mouseleave', function() {
      // Resetear si es necesario
    });
  });

  // Animación para los valores (manteniendo tu efecto original)
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // El efecto hover principal se maneja con CSS :hover
    });
    card.addEventListener('mouseleave', function() {
      // Resetear si es necesario
    });
  });

  // Intersection Observer para animar elementos al hacer scroll (similar a index.html)
  const animatedElements = document.querySelectorAll('.about-section .row > div, .team-card, .value-card');
  if (animatedElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      elementObserver.observe(el);
    });
  }

  // Current year para el footer (Consistent with index.html)
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
