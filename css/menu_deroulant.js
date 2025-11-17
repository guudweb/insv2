<!-- Script -->
<script>
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;

    // Si on descend -> ouvrir tous les dropdowns
    if (delta > 0) {
      document.querySelectorAll(".nav-item.dropdown").forEach(item => {
        item.classList.add("show");
        const menu = item.querySelector(".dropdown-menu");
        if (menu) menu.classList.add("show");
      });
    }

    // Si on remonte -> fermer
    if (delta < 0) {
      document.querySelectorAll(".nav-item.dropdown").forEach(item => {
        item.classList.remove("show");
        const menu = item.querySelector(".dropdown-menu");
        if (menu) menu.classList.remove("show");
      });
    }

    lastScrollY = currentY;
  });
</script>