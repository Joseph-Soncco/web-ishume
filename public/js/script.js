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
// Animación Three.js Mejorada
// —————————————————————
(function(){
  const container = document.getElementById('threejs-container');
  if (!container) return;

  // Escena, cámara y renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth/container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0); // Fondo transparente
  container.appendChild(renderer.domElement);

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Crear texto 3D
  const createText = () => {
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new THREE.TextGeometry('ISHUME', {
        font: font,
        size: 0.8,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });
      
      textGeometry.center();
      
      const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xf7931e, // Color naranja que coincide con tu diseño
        specular: 0x111111,
        shininess: 30
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(textMesh);
      
      // Añadir partículas alrededor del texto
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1000;
      
      const posArray = new Float32Array(particleCount * 3);
      for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      // Animación
      camera.position.z = 5;
      
      const animate = () => {
        requestAnimationFrame(animate);
        
        textMesh.rotation.y += 0.005;
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        
        renderer.render(scene, camera);
      };
      
      animate();
    });
  };

  // Si falla la carga de la fuente, mostrar un cubo con el logo
  const fallbackAnimation = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xf7931e }), // derecha
      new THREE.MeshBasicMaterial({ color: 0xf7931e }), // izquierda
      new THREE.MeshBasicMaterial({ color: 0x1a1a1a }), // arriba
      new THREE.MeshBasicMaterial({ color: 0x1a1a1a }), // abajo
      new THREE.MeshBasicMaterial({ color: 0xf7931e }), // frente
      new THREE.MeshBasicMaterial({ color: 0xf7931e })  // atrás
    ];
    
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    camera.position.z = 5;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
  };

  // Intentar cargar la fuente primero
  try {
    createText();
  } catch (e) {
    console.error("Error loading font, using fallback:", e);
    fallbackAnimation();
  }

  // Manejo de redimensionamiento
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();