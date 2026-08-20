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

function rotateTestimonials() {
    const container = document.querySelector('.testimonials-container');
    if (!container) return; 

    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    const current = testimonials[currentTestimonialIndex];
    
    let starsHtml = '';
    for(let i = 0; i < current.stars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }

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

setInterval(rotateTestimonials, 6000);

// NAVEGACIÓN SPA
function switchView(targetViewId) {
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => view.classList.remove('active'));

    const targetView = document.getElementById(`${targetViewId}-view`);
    if (targetView) {
        targetView.classList.add('active');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === targetViewId) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// INICIALIZACIÓN DEL DOM
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Asignar eventos SPA a los enlaces de la barra
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (target) switchView(target);
        });
    });

    // CONTROL DEL MENÚ HAMBURGUESA
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('mobile-active');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Cierra el menú al presionar cualquier enlace móvil
        const allMobileLinks = navMenu.querySelectorAll('a');
        allMobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        // Cierra el menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                if (navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        });
    }
});