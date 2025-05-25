document.addEventListener('DOMContentLoaded', function() {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 700, // Duración de la animación
    easing: 'ease-out-cubic', // Curva de aceleración
    once: true, // Animar solo una vez
    delay: 50, 
    offset: 100, 
  });

  // Navbar scroll effect (Consistent with other pages)
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Smooth scrolling para el botón del hero (si se usa)
  document.querySelectorAll('a[href^="#nuestros-servicios"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70; // Ajustar si la altura de la navbar es diferente
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Current year para el footer (Consistent with other pages)
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Active link highlighting for navbar (Consistent with other pages)
  // Este script asume que los nombres de archivo coinciden con los href. Ej: servicios.html para el enlace de Servicios.
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  // Si la página actual es index.html y currentPath está vacío (raíz del sitio), activa el enlace de Inicio.
  if (currentPath === "" || currentPath === "index.html") {
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === "index.html" || linkPath === "") {
            link.classList.add("active");
        }
    });
  }

});
