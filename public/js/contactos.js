document.addEventListener('DOMContentLoaded', function() {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
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
  
  // Current year para el footer (Consistent with other pages)
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Active link highlighting for navbar (Consistent with other pages)
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
  if (currentPath === "" || currentPath === "index.html") {
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === "index.html" || linkPath === "") {
            link.classList.add("active");
        }
    });
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formMessageContainer = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevenir el envío real del formulario

      // Bootstrap 5 validation
      if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add('was-validated');
        displayFormMessage('Por favor, completa todos los campos requeridos.', 'danger');
        return;
      }
      contactForm.classList.add('was-validated');


      // Simulación de envío de formulario
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
      
      // Recopilar datos del formulario (opcional, para mostrar o enviar a un futuro backend)
      // const formData = new FormData(contactForm);
      // const data = {};
      // formData.forEach((value, key) => data[key] = value);
      // console.log("Datos del formulario:", data);


      // Simular un retraso de red
      setTimeout(() => {
        // Aquí es donde integrarías el envío a un backend (ej. usando fetch API)
        // Por ahora, solo mostramos un mensaje de éxito.

        displayFormMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', 'success');
        contactForm.reset(); // Limpiar el formulario
        contactForm.classList.remove('was-validated'); // Resetear validación visual
        
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;

      }, 1500); // Simular 1.5 segundos de espera
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
      // Hacer scroll hacia el mensaje si está fuera de la vista
      // formMessageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Opcional: Limpiar mensajes de validación al escribir en los campos
  const formControls = contactForm.querySelectorAll('.form-control, .form-select');
  formControls.forEach(control => {
    control.addEventListener('input', () => {
      if (contactForm.classList.contains('was-validated')) {
        // Si el campo es válido ahora, quitar el error específico (más complejo de implementar sin IDs únicos para feedback)
        // Una forma simple es resetear la validación general al empezar a escribir de nuevo
        // contactForm.classList.remove('was-validated');
        // O, si el campo es válido, forzar su estado visual
        if (control.checkValidity()) {
            control.classList.remove('is-invalid');
            control.classList.add('is-valid');
        } else {
            control.classList.remove('is-valid');
            // No añadir is-invalid aquí para no ser demasiado agresivo hasta el submit
        }
      }
    });
  });

});
