// public/js/script.js

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const sel = document.querySelector(anchor.getAttribute('href'));
    if (!sel) return;
    window.scrollTo({ top: sel.offsetTop - 70, behavior: 'smooth' });
  });
});

// Animación cards servicios
const cards = document.querySelectorAll('.service-card');
const obs   = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach(c => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(20px)';
  c.style.transition = 'all 0.5s ease';
  obs.observe(c);
});

// Tooltips Bootstrap
[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  .forEach(el => new bootstrap.Tooltip(el));

// —————————————————————
// Inicialización Three.js
// —————————————————————
(function(){
  const container = document.getElementById('threejs-container');
  if (!container) return;

  // escena, cámara y renderer
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(50, container.clientWidth/container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // luces
  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(5,5,5);
  scene.add(dir, new THREE.AmbientLight(0x404040));

  // carga textura y mesh
  new THREE.TextureLoader().load(
    '/public/images/logo.png',
    tex => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(4,4),
        new THREE.MeshStandardMaterial({ map:tex, transparent:true })
      );
      scene.add(mesh);
      camera.position.z = 7;
      (function anim(){
        requestAnimationFrame(anim);
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.005;
        renderer.render(scene, camera);
      })();
    }
  );

  // resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();
