(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-navigation");

  if (!header || !toggle || !nav) {
    return;
  }

  const desktopQuery = window.matchMedia("(min-width: 769px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const showAllRevealContent = () => {
    if (!reducedMotionQuery.matches) {
      return;
    }

    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("is-visible");
    });
  };

  const closeMenu = () => {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  const handleDesktopChange = () => {
    if (desktopQuery.matches) {
      closeMenu();
    }
  };

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", handleDesktopChange);
  } else {
    desktopQuery.addListener(handleDesktopChange);
  }

  if (reducedMotionQuery.addEventListener) {
    reducedMotionQuery.addEventListener("change", showAllRevealContent);
  } else {
    reducedMotionQuery.addListener(showAllRevealContent);
  }

  showAllRevealContent();
})();
