window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      window.scrollTo({
        top: targetElement.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Animación cards servicios (Intersection Observer)
const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card-custom');
if (cards.length > 0) {
    const observerOptions = {
        threshold: 0.1, // Activar cuando el 10% del elemento sea visible
        rootMargin: "0px 0px -50px 0px" // Empieza un poco antes de que entre completamente en viewport
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)'; // Inicia un poco más abajo
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        cardObserver.observe(card);
    });
}

// Contador animado para estadísticas
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const countTo = parseInt(el.getAttribute('data-count'), 10);
                let currentNum = 0;
                const duration = 2000; // 2 segundos
                const stepTime = Math.abs(Math.floor(duration / countTo));
                
                const timer = setInterval(() => {
                    currentNum += 1;
                    el.textContent = currentNum;
                    if (currentNum === countTo) {
                        clearInterval(timer);
                    }
                }, stepTime > 0 ? stepTime : 1); // Evitar stepTime 0

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => {
        statObserver.observe(num);
    });
}

// Current year para el footer
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Animación Three.js
(function () {
  const container = document.getElementById('threejs-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true, // Fondo transparente para el renderer
    powerPreference: "high-performance"
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0); // El canvas de Three.js será transparente
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Aumentada intensidad
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.9, 100); // Luz puntual más brillante
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffc0cb, 0.5); // Luz rosada suave
  directionalLight.position.set(-5, -3, 2);
  scene.add(directionalLight);


  let textMesh, particlesMesh;

  const createText = () => {
    const loader = new THREE.FontLoader();
    // Usar una fuente disponible en Google Fonts o una local si se tiene el .typeface.json
    // Esta fuente es un ejemplo estándar de Three.js
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new THREE.TextGeometry('ISHUME', {
        font: font,
        size: 0.7, // Ligeramente más pequeño
        height: 0.15,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.015,
        bevelOffset: 0,
        bevelSegments: 4
      });

      textGeometry.center();

      const textMaterial = new THREE.MeshStandardMaterial({ // Usar MeshStandardMaterial para mejor respuesta a luces
        color: 0xf7931e, 
        metalness: 0.6, // Un toque metálico
        roughness: 0.4, // No demasiado brillante
        emissive: 0x110500 // Ligera emisión para resaltar
      });

      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(textMesh);

      // Partículas mejoradas
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1500; // Más partículas
      const posArray = new Float32Array(particleCount * 3);
      const colorsArray = new Float32Array(particleCount * 3); // Para colores de partículas

      const color1 = new THREE.Color(0xffffff); // Blanco
      const color2 = new THREE.Color(0xf7931e); // Naranja

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 0] = (Math.random() - 0.5) * 12; // Más dispersas
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 12;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 12;

        // Interpolar colores
        const randomColor = Math.random() > 0.7 ? color2 : color1; // Más blancas, algunas naranjas
        colorsArray[i * 3 + 0] = randomColor.r;
        colorsArray[i * 3 + 1] = randomColor.g;
        colorsArray[i * 3 + 2] = randomColor.b;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));


      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025, // Ligeramente más grandes
        vertexColors: true, // Usar colores definidos por vértice
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true // Las partículas se ven más pequeñas a lo lejos
      });

      particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      camera.position.z = 4.5; // Un poco más cerca

      animate(); // Iniciar animación solo después de cargar todo
    },
    undefined, // onProgress callback
    function (error) { // onError callback
        console.error('Error al cargar la fuente para Three.js:', error);
        fallbackAnimation(); // Usar fallback si la fuente no carga
    });
  };
  
  const fallbackAnimation = () => {
    // Un simple cubo rotando como fallback
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xf7931e });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    const animateFallback = () => {
        requestAnimationFrame(animateFallback);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        renderer.render(scene, camera);
    };
    animateFallback();
  };

  let mouseX = 0, mouseY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2000; // Reducir sensibilidad
    mouseY = (event.clientY - windowHalfY) / 2000;
  }
  document.addEventListener('mousemove', onDocumentMouseMove, false);


  const clock = new THREE.Clock(); // Para animación suave de partículas

  const animate = () => {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    if (textMesh) {
      textMesh.rotation.y += 0.003;
      // Movimiento sutil con el mouse
      textMesh.rotation.x += (mouseY - textMesh.rotation.x) * 0.02;
      textMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.1; // Sutil vaivén vertical
    }
    if (particlesMesh) {
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0003;
    }
    
    // Movimiento de cámara sutil con el mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);


    renderer.render(scene, camera);
  };

  createText(); // Intentar cargar la fuente y crear la animación principal

  window.addEventListener('resize', () => {
    if (container.clientWidth > 0 && container.clientHeight > 0) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });
})();