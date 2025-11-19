// Inicialización del carousel de partners/socios
(function($) {
  function initPartnersCarousel() {
    if ($("#customers-slider").length && $.fn.owlCarousel) {
      // Destruir instancia anterior si existe
      var $carousel = $("#customers-slider");
      if ($carousel.data('owl.carousel')) {
        $carousel.data('owl.carousel').destroy();
      }

      // Inicializar Owl Carousel
      $carousel.owlCarousel({
        items: 5,
        loop: true,
        margin: 15,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2500,
        responsive: {
          0: { items: 2 },
          650: { items: 2 },
          768: { items: 3 },
          1000: { items: 4 },
          1200: { items: 5 }
        }
      });
    }
  }

  // Inicializar cuando el DOM esté listo
  $(document).ready(function() {
    initPartnersCarousel();
  });

  // Re-inicializar si se carga contenido dinámicamente
  if (typeof window.initPartnersCarousel === 'undefined') {
    window.initPartnersCarousel = initPartnersCarousel;
  }
})(window.jQuery);
