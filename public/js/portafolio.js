document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.filter-item');
  const items   = document.querySelectorAll('.portfolio-item');

  filters.forEach(f => {
    f.addEventListener('click', () => {
      // desactivar anterior
      document.querySelector('.filter-item.active').classList.remove('active');
      // activar este
      f.classList.add('active');

      const filtro = f.dataset.filter.toLowerCase();

      items.forEach(it => {
        const cats = it.dataset.category.toLowerCase();
        if (filtro === 'all' || cats.includes(filtro)) {
          it.style.display = 'block';
        } else {
          it.style.display = 'none';
        }
      });
    });
  });

  // Animaciones para el proceso de trabajo
  const processSteps = document.querySelectorAll('.process-step');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  processSteps.forEach(step => {
    observer.observe(step);
  });
  
  // Galería interactiva
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const img = item.querySelector('img');
      img.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
      const img = item.querySelector('img');
      img.style.transform = 'scale(1)';
    });
  });

  // Drag to scroll para filtros
  const slider = document.querySelector('.filter-nav');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });
  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // Scroll wheel convierte desplazamiento vertical en horizontal
  slider.addEventListener('wheel', e => {
    e.preventDefault();                 
    slider.scrollLeft += e.deltaY;      
  }, { passive: false });

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.querySelector('.navbar').classList.add('scrolled');
    } else {
      document.querySelector('.navbar').classList.remove('scrolled');
    }
  });
});