// Script para asegurar que el navbar toggle funcione en mobile
document.addEventListener('DOMContentLoaded', function() {
  // Obtener el botón toggler y el menú colapsable
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarResponsive');

  if (navbarToggler && navbarCollapse) {
    // Agregar event listener al botón
    navbarToggler.addEventListener('click', function(e) {
      e.preventDefault();

      // Toggle de la clase 'show' en el collapse
      navbarCollapse.classList.toggle('show');

      // Toggle del aria-expanded
      const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
      navbarToggler.setAttribute('aria-expanded', !isExpanded);

      // Toggle de la clase collapsed en el botón
      navbarToggler.classList.toggle('collapsed');
    });

    // NO cerrar el menú cuando se hace click en un link con dropdown
    // Solo cerrar cuando se hace click en links sin dropdown (ej: INICIO, CONTACTO)
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 992) { // Solo en mobile
          // Solo cerrar si el link NO es parte de un dropdown
          const parentItem = this.closest('.nav-item');
          if (!parentItem.classList.contains('dropdown')) {
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarToggler.classList.add('collapsed');
          }
        }
      });
    });
  }

  // Manejar dropdowns con click SOLO EN MOBILE
  const dropdownToggles = document.querySelectorAll('.navbar .dropdown > .nav-link');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Solo manejar click en mobile (< 992px)
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();

        const dropdown = this.parentElement;
        const menu = dropdown.querySelector('.dropdown-menu');

        if (menu) {
          // Cerrar otros dropdowns abiertos
          document.querySelectorAll('.navbar .dropdown-menu.show').forEach(otherMenu => {
            if (otherMenu !== menu) {
              otherMenu.classList.remove('show');
            }
          });

          // Toggle del dropdown actual
          menu.classList.toggle('show');
        }
      }
      // En desktop (>= 992px) dejar que el hover funcione normalmente
    });
  });

  // Cerrar dropdowns en mobile cuando se hace click fuera
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 992) {
      if (!e.target.closest('.navbar .dropdown')) {
        document.querySelectorAll('.navbar .dropdown-menu.show').forEach(menu => {
          menu.classList.remove('show');
        });
      }
    }
  });
});
