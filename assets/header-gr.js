/**
 * Header GR - Script principal para el header
 * Este script maneja todas las funcionalidades del header, incluyendo:
 * - Menú móvil
 * - Cambios de opacidad al hacer scroll
 * - Navegación activa
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Header GR inicializado")

  // ===== ELEMENTOS DEL MENÚ MÓVIL =====
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  const mobileSocialLinks = document.querySelectorAll(".mobile-social-link")

  // Establecer variables CSS personalizadas para la opacidad del menú móvil
  if (mobileMenu) {
    // Obtener el valor de opacidad del atributo data
    const mobileOpacity = mobileMenu.getAttribute("data-opacity") || 0.95
    // Establecer la variable CSS personalizada
    document.documentElement.style.setProperty("--mobile-bg-opacity", mobileOpacity)
  }

  /**
   * Abre el menú móvil
   */
  function openMobileMenu() {
    console.log("Abriendo menú móvil")
    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.add("active")
      mobileMenuOverlay.classList.add("active")
      if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "true")
      }
      document.body.style.overflow = "hidden" // Evitar scroll del body

      // Forzar la aplicación de la opacidad correcta
      const opacity = mobileMenu.getAttribute("data-opacity") || 0.95
      const bgColor = getComputedStyle(mobileMenu).getPropertyValue("--mobile-bg-color") || "#D4AF37"

      // Aplicar directamente el color con la opacidad correcta
      mobileMenu.style.backgroundColor = `rgba(212, 175, 55, ${opacity})`
      console.log(`Aplicando color de fondo: rgba(212, 175, 55, ${opacity})`)
    }
  }

  /**
   * Cierra el menú móvil
   */
  function closeMobileMenu() {
    console.log("Cerrando menú móvil")
    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.remove("active")
      mobileMenuOverlay.classList.remove("active")
      if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "false")
      }
      document.body.style.overflow = "" // Restaurar scroll del body
    }
  }

  // ===== EVENTOS DEL MENÚ MÓVIL =====

  // Evento para abrir el menú
  if (mobileMenuButton) {
    console.log("Botón de menú móvil encontrado, añadiendo evento de clic")
    mobileMenuButton.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      openMobileMenu()
    })
  } else {
    console.error("Botón de menú móvil no encontrado")
  }

  // Evento para cerrar el menú
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", (e) => {
      e.preventDefault()
      closeMobileMenu()
    })
  }

  // Evento para cerrar el menú al hacer clic en el overlay
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", (e) => {
      e.preventDefault()
      closeMobileMenu()
    })
  }

  // Cerrar el menú al hacer clic en cualquier parte fuera del menú
  document.addEventListener("click", (e) => {
    if (
      mobileMenu &&
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      e.target !== mobileMenuButton
    ) {
      closeMobileMenu()
    }
  })

  // Evitar que los clics dentro del menú cierren el menú
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  }

  // Cerrar el menú al hacer clic en un enlace
  mobileNavLinks.forEach((link) => {
    if (link) {
      link.addEventListener("click", (e) => {
        // No prevenir el comportamiento por defecto para permitir la navegación
        closeMobileMenu()
      })
    }
  })

  // ===== EFECTOS PARA REDES SOCIALES =====
  mobileSocialLinks.forEach((link) => {
    if (link) {
      // Efecto de escala al pasar el ratón
      link.addEventListener("mouseenter", () => {
        link.style.transform = "scale(1.2)"
      })
      link.addEventListener("mouseleave", () => {
        link.style.transform = ""
      })

      // Añadir efecto de clic
      link.addEventListener("click", (e) => {
        // Verificar si el enlace tiene un href válido
        const href = link.getAttribute("href")
        if (href === "#" || !href) {
          e.preventDefault()
          console.log("Enlace de red social clickeado:", link.getAttribute("aria-label"))
        }
        // Cerrar el menú después de hacer clic en un enlace de red social
        closeMobileMenu()
      })
    }
  })

  // ===== EVENTOS ADICIONALES =====

  // Cerrar el menú al cambiar la orientación del dispositivo
  window.addEventListener("resize", () => {
    if (window.innerWidth > 990 && mobileMenu && mobileMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  })

  // Soporte para navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  })

  // ===== CAMBIO DE OPACIDAD AL HACER SCROLL =====
  const navbar = document.querySelector(".transparent-navbar")
  if (navbar) {
    // Obtener los valores de opacidad del data-attribute o usar valores predeterminados
    const initialOpacity = getComputedStyle(navbar).getPropertyValue("--initial-opacity") || 0
    const scrolledOpacity = getComputedStyle(navbar).getPropertyValue("--scrolled-opacity") || 0.8
    const initialBlur = getComputedStyle(navbar).getPropertyValue("--initial-blur") || "0px"
    const scrolledBlur = getComputedStyle(navbar).getPropertyValue("--scrolled-blur") || "10px"
    const navbarColor = getComputedStyle(navbar).getPropertyValue("--navbar-color") || "#000000"

    /**
     * Actualiza la opacidad del navbar según la posición del scroll
     */
    function updateNavbarOpacity() {
      if (window.scrollY > 50) {
        // Aplicar opacidad mayor al hacer scroll
        const rgbaColor = navbarColor.startsWith("rgba")
          ? navbarColor.replace(/[\d.]+\)$/, scrolledOpacity + ")")
          : navbarColor.startsWith("rgb")
            ? navbarColor.replace(")", `, ${scrolledOpacity})`)
            : `rgba(${Number.parseInt(navbarColor.slice(1, 3), 16)}, ${Number.parseInt(navbarColor.slice(3, 5), 16)}, ${Number.parseInt(navbarColor.slice(5, 7), 16)}, ${scrolledOpacity})`

        navbar.style.backgroundColor = rgbaColor
        navbar.style.backdropFilter = `blur(${scrolledBlur})`
        navbar.style.webkitBackdropFilter = `blur(${scrolledBlur})`
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
        navbar.classList.add("scrolled")
      } else {
        // Restaurar opacidad inicial al volver arriba
        const rgbaColor = navbarColor.startsWith("rgba")
          ? navbarColor.replace(/[\d.]+\)$/, initialOpacity + ")")
          : navbarColor.startsWith("rgb")
            ? navbarColor.replace(")", `, ${initialOpacity})`)
            : `rgba(${Number.parseInt(navbarColor.slice(1, 3), 16)}, ${Number.parseInt(navbarColor.slice(3, 5), 16)}, ${Number.parseInt(navbarColor.slice(5, 7), 16)}, ${initialOpacity})`

        navbar.style.backgroundColor = rgbaColor
        navbar.style.backdropFilter = `blur(${initialBlur})`
        navbar.style.webkitBackdropFilter = `blur(${initialBlur})`
        navbar.style.boxShadow = "none"
        navbar.classList.remove("scrolled")
      }
    }

    // Ejecutar al cargar para establecer el estado inicial
    updateNavbarOpacity()

    // Añadir el evento de scroll
    window.addEventListener("scroll", updateNavbarOpacity)
  }

  // ===== NAVEGACIÓN ACTIVA =====
  const navLinks = document.querySelectorAll(".nav-link")
  const currentPath = window.location.pathname

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (linkPath === currentPath || (currentPath === "/" && linkPath === "/")) {
      link.classList.add("active")
    }
  })

  // Verificar que todo esté funcionando correctamente
  console.log("Header GR inicializado correctamente")
})
