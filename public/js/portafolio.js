document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 700, // Duración de la animación
    easing: 'ease-out-cubic', // Curva de aceleración
    once: true, // Animar solo una vez
    delay: 50, // Retraso ligero
    offset: 100, // Activar animación un poco antes de que el elemento esté completamente visible
  });

  // Navbar scroll effect (Consistent with other pages)
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Filtros del Portafolio
  const filterItems = document.querySelectorAll('.filter-item');
  const portfolioGridItems = document.querySelectorAll('.portfolio-item');

  if (filterItems.length > 0 && portfolioGridItems.length > 0) {
    filterItems.forEach(filter => {
      filter.addEventListener('click', function() {
        // Manejar clase activa para el filtro
        filterItems.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        const selectedFilter = this.getAttribute('data-filter').toLowerCase();

        portfolioGridItems.forEach(item => {
          const itemCategories = item.getAttribute('data-category').toLowerCase();
          // Mostrar u ocultar item
          if (selectedFilter === 'all' || itemCategories.includes(selectedFilter)) {
            item.style.display = 'block';
            // Re-inicializar AOS para items que se muestran si es necesario (opcional)
            // setTimeout(() => { AOS.refreshHard(); }, 50); // Puede ser costoso
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Drag to scroll para la barra de filtros
  const filterSlider = document.querySelector('.filter-nav-list');
  if (filterSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    filterSlider.addEventListener('mousedown', (e) => {
      isDown = true;
      filterSlider.classList.add('dragging');
      startX = e.pageX - filterSlider.offsetLeft;
      scrollLeft = filterSlider.scrollLeft;
    });
    filterSlider.addEventListener('mouseleave', () => {
      isDown = false;
      filterSlider.classList.remove('dragging');
    });
    filterSlider.addEventListener('mouseup', () => {
      isDown = false;
      filterSlider.classList.remove('dragging');
    });
    filterSlider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - filterSlider.offsetLeft;
      const walk = (x - startX) * 2; // El multiplicador controla la velocidad del scroll
      filterSlider.scrollLeft = scrollLeft - walk;
    });

  }
  
  // Current year para el footer (Consistent with other pages)
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }


});
