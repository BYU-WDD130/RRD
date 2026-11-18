const testimonials = [
    {
        name: "- Morgan F.",
        comment: '"The Rose Mousse was an absolute hit at my birthday! Not only did it look spectacular, the taste was subtle and not overly sweet. 10/10 recommended."',
        stars: 5
    },
    {
        name: "- Carlos Mendoza",
        comment: '"The artistic gelatin cakes (Jelly Fruit Cake) are out of this world. My family loved the three-dimensional flower design."',
        stars: 5
    },
    {
        name: "- Jasmin Lourance",
        comment: '"Excellent customer service and the cream puffs are delicious and super fluffy. My favorite cafe from now on."',
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

// SPA NAVIGATION
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

// DOM INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Assign SPA events to navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (target) switchView(target);
        });
    });


    
    // MOBILE MENU CONTROL
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('mobile-active');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Close menu when any mobile link is clicked
        const allMobileLinks = navMenu.querySelectorAll('a');
        allMobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        // Close menu when clicking outside
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

document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const phone = '18628464408'; // Number taken from the page (country code + number)

    const inputs = this.querySelectorAll('input, textarea');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const userPhone = inputs[2].value.trim();
    const message = inputs[3].value.trim();

    const text = `*New contact message*\n\n` +
                 `*Name:* ${name}\n` +
                 `*Email:* ${email}\n` +
                 `*Phone:* ${userPhone || 'Not provided'}\n` +
                 `*Inquiry:* ${message}`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank');
});
