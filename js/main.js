// Animación de salto para la imagen de Cloth y animación flotante para shadow
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de fade in para la imagen shadow
    const shadowImage = document.querySelector('.story-image img[src*="shadow"]');
    
    if (shadowImage) {
        // Esperar a que la página esté completamente cargada
        window.addEventListener('load', function() {
            // Pequeño retraso para asegurar que todo esté listo
            setTimeout(function() {
                // Hacer visible la imagen con transición
                shadowImage.style.opacity = '1';
            }, 4000);
        });
        
        // Efecto al pasar el ratón
        shadowImage.style.cursor = 'pointer';
        shadowImage.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))';
        });
        
        shadowImage.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 2px 5px rgba(255, 255, 255, 0.2))';
        });
    }
    
    const clothImage = document.getElementById('cloth-image');
    
    if (clothImage) {
        clothImage.addEventListener('click', function() {
            // Añade la clase de animación
            this.classList.add('jump-animation');
            
            // Elimina la clase después de que termine la animación
            this.addEventListener('animationend', function() {
                this.classList.remove('jump-animation');
            }, { once: true });
        });
    }

    // Código existente
    // Actualizar el año en el footer automáticamente
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Elementos del menú móvil
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Efecto de desplazamiento suave para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo si el enlace es un enlace de ancla
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar el menú móvil si está abierto
                    if (navMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                    
                    // Desplazamiento suave al elemento objetivo
                    window.scrollTo({
                        top: targetElement.offsetTop + 40, // Ajuste aumentado para dejar más espacio arriba
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Evento de clic para el botón del menú móvil
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
    
    // Cerrar el menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Efecto de desplazamiento para el header
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Mostrar/ocultar header al hacer scroll
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll hacia abajo
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll hacia arriba
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        // Añadir sombra al header cuando se hace scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            header.style.background = 'rgba(10, 10, 20, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            header.style.background = 'rgba(10, 10, 20, 0.9)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animación de aparición de elementos al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.character-card, .story-content > *');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configuración inicial para la animación de aparición
    document.querySelectorAll('.character-card, .story-content > *').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Ejecutar la animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
    
    // Botón de volver arriba
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/ocultar botón de volver arriba
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Desplazamiento suave al hacer clic en el botón de volver arriba
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efecto hover en las tarjetas de personajes
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// Añadir estilos dinámicos para el botón de volver arriba
const backToTopStyles = document.createElement('style');
backToTopStyles.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #5d3fd3, #9f5f80);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }
    
    /* Estilos para el preloader */
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a14;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .preloader.fade-out {
        opacity: 0;
    }
    
    .preloader-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(93, 63, 211, 0.3);
        border-radius: 50%;
        border-top-color: #5d3fd3;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(backToTopStyles);

// Añadir preloader al inicio del body
const preloaderHTML = `
    <div class="preloader">
        <div class="preloader-spinner"></div>
    </div>
`;
document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
