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
});

const slider = document.querySelector('.filter-nav');

// — Drag to scroll (ya lo tienes) —
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
  const walk = (x - startX) * 2; // ajusta la velocidad si quieres
  slider.scrollLeft = scrollLeft - walk;
});

// — Scroll wheel convierte desplazamiento vertical en horizontal —
slider.addEventListener('wheel', e => {
  // solo cuando el ratón esté sobre .filter-nav
  e.preventDefault();                 
  slider.scrollLeft += e.deltaY;      // mueve horizontal según la rueda
}, { passive: false });