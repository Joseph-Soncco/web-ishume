// public/js/contactos.js

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
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
  // Asegurarse de que "Inicio" esté activo en la página raíz
  if (currentPath === "" || currentPath === "index.html") {
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === "index.html" || linkPath === "") {
            link.classList.add("active");
        } else {
             // Asegurar que otros no estén activos si estamos en la raíz y no son index.html
            if(currentPath === "" && linkPath !== "index.html") {
                 link.classList.remove("active");
            }
        }
    });
    // Específicamente activar el de "Inicio" si estamos en la raíz
    const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
    if(homeLink && (currentPath === "" || currentPath === "index.html")) { 
        // Quitar 'active' de otros enlaces antes de añadirlo al de inicio si es necesario
        navLinks.forEach(lk => { if(lk !== homeLink) lk.classList.remove("active"); });
        homeLink.classList.add("active");
    }
  }


  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formMessageContainer = document.getElementById('formMessage');
  const ishumeWhatsAppNumber = '51991157028'; // Número de WhatsApp de ISHUME

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); 

      // Bootstrap 5 validation
      if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add('was-validated');
        displayFormMessage('Por favor, completa todos los campos obligatorios (*).', 'danger');
        return;
      }
      // No es necesario añadir 'was-validated' aquí si ya se maneja arriba, 
      // pero si quieres que los campos válidos también muestren su estilo verde, déjalo.
      // contactForm.classList.add('was-validated'); 

      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value; 
      const telefono = document.getElementById('telefono').value;
      const servicio = document.getElementById('servicio').value;
      const mensaje = document.getElementById('mensaje').value;

      let whatsappMessage = `¡Hola ISHUME! 👋\n\nMe gustaría hacer una consulta:\n\n`;
      whatsappMessage += `*Nombre:* ${nombre}\n`;
      if (email && email.trim() !== '') { // Solo incluir email si se proporcionó y no está vacío
        whatsappMessage += `*Correo:* ${email}\n`;
      }
      whatsappMessage += `*Teléfono:* ${telefono}\n`;
      if (servicio && servicio.trim() !== '') { // Solo incluir servicio si se seleccionó uno
        whatsappMessage += `*Servicio de Interés:* ${servicio}\n`;
      }
      whatsappMessage += `*Mensaje:*\n${mensaje}\n\n`;
      whatsappMessage += `¡Espero su pronta respuesta!`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${ishumeWhatsAppNumber}?text=${encodedMessage}`;

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Preparando mensaje...';
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        displayFormMessage('¡Mensaje listo para enviar por WhatsApp! Nos comunicaremos contigo pronto.', 'success');
        contactForm.reset(); 
        contactForm.classList.remove('was-validated'); // Resetear estilos de validación visual
        
        // Resetear estilos de validación de los campos individuales
        const formControls = contactForm.querySelectorAll('.form-control, .form-select');
        formControls.forEach(control => {
            control.classList.remove('is-valid');
            control.classList.remove('is-invalid');
        });
        
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }, 1000); 
    });
  }

  function displayFormMessage(message, type) {
    if (formMessageContainer) {
      formMessageContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    }
  }

  if (contactForm) { 
    const formControls = contactForm.querySelectorAll('.form-control, .form-select');
    formControls.forEach(control => {
      control.addEventListener('input', () => {
        // No es necesario remover 'was-validated' de todo el form aquí,
        // Bootstrap lo maneja bien campo por campo si se usa 'checkValidity'
        if (control.checkValidity()) {
            control.classList.remove('is-invalid');
            // Opcionalmente, puedes añadir 'is-valid' si quieres feedback inmediato
            // control.classList.add('is-valid'); 
        } else {
            // Si quieres que el error aparezca al escribir y no solo al enviar,
            // podrías añadir 'is-invalid' aquí, pero puede ser molesto para el usuario.
            // Por ahora, dejamos que la validación principal ocurra en el 'submit'.
        }
      });
       // Para el select, el evento es 'change' en lugar de 'input'
      if (control.tagName === 'SELECT') {
        control.addEventListener('change', () => {
          if (control.checkValidity()) {
              control.classList.remove('is-invalid');
          }
        });
      }
    });
  }
});
