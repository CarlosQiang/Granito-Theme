/**
 * Carousel GR - Script principal para el carrusel
 * Este script maneja todas las funcionalidades del carrusel, incluyendo:
 * - Reproducción de video
 * - Navegación del carrusel
 * - Interacción con botones
 * - Indicador de scroll
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Carousel GR inicializado")

  // ===== MANEJO DE VIDEO =====
  const video = document.getElementById("header-video")
  if (video) {
    // Manejar errores de carga de video
    video.addEventListener("error", () => {
      console.log("Error al cargar el video, mostrando imagen de respaldo")
      const fallbackImage = document.querySelector(".fallback-image")
      if (fallbackImage) {
        fallbackImage.style.display = "block"
        video.style.display = "none"
      }
    })

    // Intentar reproducir el video automáticamente
    video.play().catch((error) => {
      console.log("Reproducción automática no permitida:", error)
      // Mostrar un botón de reproducción si es necesario
      const videoBackground = document.querySelector(".video-background")
      if (videoBackground) {
        const playButton = document.createElement("button")
        playButton.className = "video-play-button"
        playButton.innerHTML = '<i class="fas fa-play"></i>'
        playButton.setAttribute("aria-label", "Reproducir video")
        videoBackground.appendChild(playButton)

        playButton.addEventListener("click", () => {
          video.play()
          playButton.style.display = "none"
        })
      }
    })
  }

  // ===== INDICADOR DE SCROLL =====
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const carouselHeight = document.querySelector(".carousel-gr").offsetHeight
      window.scrollTo({
        top: carouselHeight,
        behavior: "smooth",
      })
    })
  }

  // ===== CONFIGURACIÓN DEL CARRUSEL =====
  const carouselContainer = document.querySelector(".carousel-container")
  if (carouselContainer) {
    console.log("Configurando carrusel")
    const slides = document.querySelectorAll(".carousel-slide")
    const indicators = document.querySelectorAll(".carousel-indicator")
    const prevButton = document.querySelector(".carousel-control-prev")
    const nextButton = document.querySelector(".carousel-control-next")

    // Obtener valores de configuración del carrusel
    const carouselElement = document.querySelector(".carousel-gr")
    const transitionType = carouselElement ? carouselElement.getAttribute("data-transition-type") || "fade" : "fade"
    const carouselSpeed = carouselElement
      ? Number.parseInt(carouselElement.getAttribute("data-carousel-speed")) * 1000 || 5000
      : 5000

    let currentSlide = 0
    let slideInterval
    let touchStartX = 0
    let touchEndX = 0

    // Aplicar el tipo de transición
    if (transitionType === "slide") {
      carouselContainer.classList.add("carousel-transition-slide")
    }

    /**
     * Muestra un slide específico
     * @param {number} index - Índice del slide a mostrar
     */
    function showSlide(index) {
      console.log("Mostrando slide:", index)
      // Ocultar todos los slides
      slides.forEach((slide, i) => {
        slide.classList.remove("active", "previous")
        if (i === currentSlide) {
          slide.classList.add("previous")
        }
      })

      // Desactivar todos los indicadores
      indicators.forEach((indicator) => {
        indicator.classList.remove("active")
      })

      // Mostrar el slide actual
      currentSlide = index
      if (currentSlide >= slides.length) currentSlide = 0
      if (currentSlide < 0) currentSlide = slides.length - 1

      slides[currentSlide].classList.add("active")

      // Activar el indicador correspondiente
      if (indicators.length > 0 && indicators[currentSlide]) {
        indicators[currentSlide].classList.add("active")
      }
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
      showSlide(currentSlide + 1)
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
      showSlide(currentSlide - 1)
    }

    // Iniciar el carrusel automático
    function startCarousel() {
      if (slides.length > 1) {
        slideInterval = setInterval(nextSlide, carouselSpeed)
      }
      if (slides.length > 1) {
        slideInterval = setInterval(nextSlide, carouselSpeed)
      }

    // Detener el carrusel automático
    function stopCarousel() {
      clearInterval(slideInterval)
    }

    // ===== EVENTOS PARA LOS CONTROLES DEL CARRUSEL =====
    
    // Eventos para los botones de navegación
    if (prevButton) {
      prevButton.addEventListener("click", (e) => {
        e.preventDefault()
        prevSlide()
        stopCarousel()
        startCarousel()
      })
    }

    if (nextButton) {
      nextButton.addEventListener("click", (e) => {
        e.preventDefault()
        nextSlide()
        stopCarousel()
        startCarousel()
      })
    }

    // Eventos para los indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", (e) => {
        e.preventDefault()
        showSlide(index)
        stopCarousel()
        startCarousel()
      })
    })

    // ===== SOPORTE PARA GESTOS TÁCTILES =====
    carouselContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
      stopCarousel()
    })

    carouselContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      const diff = touchStartX - touchEndX

      if (diff > 50) {
        // Deslizar a la izquierda (siguiente)
        nextSlide()
      } else if (diff < -50) {
        // Deslizar a la derecha (anterior)
        prevSlide()
      }

      startCarousel()
    })

    // Pausar el carrusel al pasar el ratón por encima
    carouselContainer.addEventListener("mouseenter", stopCarousel)
    carouselContainer.addEventListener("mouseleave", startCarousel)

    // Iniciar el carrusel
    if (slides.length > 0) {
      console.log("Iniciando carrusel con", slides.length, "slides")
      showSlide(0)
      startCarousel()
    }
  }

  // ===== CONFIGURACIÓN DE BOTONES =====
  const heroButtons = document.querySelectorAll(".hero-button")
  if (heroButtons.length > 0) {
    console.log("Configurando", heroButtons.length, "botones")
    heroButtons.forEach((button) => {
      const buttonStyle = button.getAttribute("data-style") || "solid"
      button.setAttribute("data-style", buttonStyle)

      // Asegurarse de que el botón tenga un href válido
      const href = button.getAttribute("href")
      if (href === "#" || !href) {
        button.addEventListener("click", (e) => {
          e.preventDefault()
          console.log("Botón clickeado:", button.textContent.trim())
          // Aquí puedes añadir una acción por defecto para botones sin URL
          alert("Acción del botón: " + button.textContent.trim())
        })
      }
    })
  }
})\
