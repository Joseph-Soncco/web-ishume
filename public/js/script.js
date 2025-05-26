// AOS Initialization
AOS.init({
  duration: 700, 
  easing: 'ease-out-cubic', 
  once: true, 
  delay: 50, 
  offset: 100, 
});

// Navbar scroll effect
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

// Contador animado para estadísticas
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
  const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const el = entry.target;
              const countTo = parseInt(el.getAttribute('data-count'), 10);
              let currentNum = 0;
              const duration = 1500; 
              const frameDuration = 1000 / 60; 
              const totalFrames = Math.round(duration / frameDuration);
              const increment = countTo / totalFrames;
              
              const animateCount = () => {
                  currentNum += increment;
                  if (currentNum < countTo) {
                      el.textContent = Math.ceil(currentNum);
                      requestAnimationFrame(animateCount);
                  } else {
                      el.textContent = countTo;
                  }
              };
              requestAnimationFrame(animateCount);
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
  alpha: true, 
  powerPreference: "high-performance"
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0); 
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.9, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const directionalLight = new THREE.DirectionalLight(0xffc0cb, 0.5); 
directionalLight.position.set(-5, -3, 2);
scene.add(directionalLight);

let textMesh, particlesMesh;

const createText = () => {
  const loader = new THREE.FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('ISHUME', {
      font: font, size: 0.7, height: 0.15, curveSegments: 12,
      bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelOffset: 0, bevelSegments: 4
    });
    textGeometry.center();
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0xf7931e, metalness: 0.6, roughness: 0.4, emissive: 0x110500
    });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500; 
    const posArray = new Float32Array(particleCount * 3);
    const colorsArray = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color(0xffffff); 
    const color2 = new THREE.Color(0xf7931e); 
    for (let i = 0; i < particleCount; i++) {
      posArray[i*3+0] = (Math.random()-0.5)*12; posArray[i*3+1] = (Math.random()-0.5)*12; posArray[i*3+2] = (Math.random()-0.5)*12;
      const randomColor = Math.random() > 0.7 ? color2 : color1; 
      colorsArray[i*3+0] = randomColor.r; colorsArray[i*3+1] = randomColor.g; colorsArray[i*3+2] = randomColor.b;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025, vertexColors: true, transparent: true, opacity: 0.7, sizeAttenuation: true
    });
    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 4.5;
    animate(); 
  },
  undefined, 
  function (error) { 
      console.error('Error al cargar la fuente para Three.js:', error);
      fallbackAnimation(); 
  });
};

const fallbackAnimation = () => {
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const material = new THREE.MeshPhongMaterial({ color: 0xf7931e });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  const animateFallback = () => {
      requestAnimationFrame(animateFallback);
      cube.rotation.x += 0.005; cube.rotation.y += 0.005;
      renderer.render(scene, camera);
  };
  animateFallback();
};

let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 2000; 
  mouseY = (event.clientY - windowHalfY) / 2000;
}
document.addEventListener('mousemove', onDocumentMouseMove, false);
const clock = new THREE.Clock(); 

const animate = () => {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();
  if (textMesh) {
    textMesh.rotation.y += 0.003;
    textMesh.rotation.x += (mouseY - textMesh.rotation.x) * 0.02;
    textMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.1; 
  }
  if (particlesMesh) {
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0003;
  }
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.02; 
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
};
createText(); 
window.addEventListener('resize', () => {
  if (container.clientWidth > 0 && container.clientHeight > 0) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
  }
});
})();

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
if (currentPath === "" || currentPath === "index.html") {
  navLinks.forEach(link => {
      const linkPath = link.getAttribute("href").split("/").pop();
      if (linkPath === "index.html" || linkPath === "") {
          link.classList.add("active");
      } else { 
          link.classList.remove("active");
      }
  });
  const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
  if(homeLink) homeLink.classList.add("active");
}