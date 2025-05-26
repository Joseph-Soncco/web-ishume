// public/js/nosotros.js

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 700, // Duración de la animación
    easing: 'ease-out-cubic', // Curva de aceleración
    once: true, // Animar solo una vez
    delay: 50, 
    offset: 100, 
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
  
  // Current year para el footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Active link highlighting for navbar
  // Este script asume que los nombres de archivo coinciden con los href. Ej: nosotros.html para el enlace de Nosotros.
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
        } else { // Asegurar que otros no estén activos si estamos en la raíz
            link.classList.remove("active");
        }
    });
     // Específicamente activar el de "Inicio" si estamos en la raíz
    const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
    if(homeLink && (currentPath === "" || currentPath === "index.html")) { // Doble chequeo por si acaso
        homeLink.classList.add("active");
    }
  }


  // Efectos hover para cards (manejados principalmente por CSS, pero puedes añadir JS aquí si es necesario)
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    // Ejemplo: podrías añadir una clase con JS al hacer hover si necesitas algo que CSS no pueda hacer fácilmente
    card.addEventListener('mouseenter', function() {
      // this.classList.add('js-hover-effect');
    });    
    card.addEventListener('mouseleave', function() {
      // this.classList.remove('js-hover-effect');
    });
  });

  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Similar a teamCards
    });
    card.addEventListener('mouseleave', function() {
      // Similar a teamCards
    });
  });
});
