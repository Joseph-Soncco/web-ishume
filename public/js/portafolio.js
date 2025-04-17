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
  