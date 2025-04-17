document.addEventListener("DOMContentLoaded", function() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1);

  // Selecciona todos los enlaces del navbar
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    // Obtén el nombre del archivo del atributo href del enlace
    const hrefPage = link.getAttribute("href").substring(link.getAttribute("href").lastIndexOf('/') + 1);
    if (hrefPage === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});