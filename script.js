

JavaScript
// Arreglo interactivo con los comentarios de los clientes
const testimonials = [
    {
        name: "- María Fernández",
        comment: '"¡El Rose Mousse fue el éxito total en mi cumpleaños! No solo lucía espectacular, el sabor era sutil y nada empalagoso. 10/10 recomendado."',
        stars: 5
    },
    {
        name: "- Carlos Mendoza",
        comment: '"Las gelatinas artísticas (Jelly Fruit Cake) son de otro planeta. A mi familia le encantó el diseño de flores tridimensionales."',
        stars: 5
    },
    {
        name: "- Laura Restrepo",
        comment: '"Excelente servicio al cliente y los bollitos de crema son deliciosos y súper esponjosos. Mi cafetería favorita desde ahora."',
        stars: 5
    }
];

let currentTestimonialIndex = 0;

// Función para rotar los testimonios automáticamente cada 6 segundos
function rotateTestimonials() {
    const container = document.querySelector('.testimonials-container');
    
    // Verificación de seguridad en caso de que el contenedor no exista en la vista actual
    if (!container) return; 

    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    const current = testimonials[currentTestimonialIndex];
    
    // Generación de estrellas dinámicas
    let starsHtml = '';
    for(let i = 0; i < current.stars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }

    // Cambiar el HTML con una pequeña animación de transición rápida
    container.style.opacity = 0;
    setTimeout(() => {
        container.innerHTML = `
            <div class="testimonial-card">
                <div class="stars">${starsHtml}</div>
                <p class="comment">${current.comment}</p>
                <h4 class="client-name">${current.name}</h4>
            </div>
        `;
        container.style.opacity = 1;
    }, 300);
}

// Iniciar rotación automatizada
setInterval(rotateTestimonials, 6000);


// SISTEMA DE NAVEGACIÓN "SINGLE PAGE APPLICATION" (SPA)
function switchView(targetViewId) {
    // Desactivar todas las vistas
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => view.classList.remove('active'));

    // Activar la vista seleccionada
    const targetView = document.getElementById(`${targetViewId}-view`);
    if (targetView) {
        targetView.classList.add('active');
    }

    // Actualizar el estado activo en los links de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === targetViewId) {
            link.classList.add('active');
        }
    });

    // Desplazar suavemente hacia arriba al cambiar de sección
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// INICIALIZACIÓN DE EVENTOS (Asegúrate de que vaya al final de tu script.js)
document.addEventListener('DOMContentLoaded', () => {
    
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // 1. Asignar los eventos de clic a la barra de navegación para SPA
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchView(target);
        });
    });



    // 2. CONTROL DEL MENÚ HAMBURGUESA
    if (menuToggle && navMenu) {
        // Abre y cierra el menú al hacer clic en el botón
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague
            navMenu.classList.toggle('mobile-active');
            
            // Cambia el icono de barras (☰) a una equis (✕)
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('mobile-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Cierra el menú automáticamente si el usuario hace clic en cualquier enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        // Cierra el menú si hacen clic en cualquier parte fuera de él
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('mobile-active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
});