(function() {
    // Crear el modal en el DOM si no existe
    if (!document.getElementById('imageModal')) {
        const modalHTML = `
            <div id="imageModal" style="display:none; position:fixed; z-index:2147483647; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); justify-content:center; align-items:center; backdrop-filter:blur(4px); overflow:hidden;">
                <button type="button" class="close-modal" style="position:absolute; top:25px; right:35px; font-size:45px; color:#fff; background:none; border:none; cursor:pointer; z-index:2147483648; line-height:1;">&times;</button>
                <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; overflow:hidden;">
                    <img id="imgExpanded" src="" alt="Expanded view" style="max-width:90%; max-height:85vh; border-radius:8px; object-fit:contain; box-shadow:0 10px 30px rgba(0,0,0,0.5); transition: transform 0.1s ease; cursor: grab; transform: scale(1);">
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imgExpanded');
    const closeModalBtn = modal.querySelector('.close-modal');

    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let startX = 0;
    let startY = 0;

    function setTransform() {
        modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    }

    function initLightbox() {
        const images = document.querySelectorAll('#menu-view img, .menu-card img');
        
        if (images.length === 0) {
            setTimeout(initLightbox, 200);
            return;
        }

        images.forEach(img => {
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.src) {
                    scale = 1;
                    pointX = 0;
                    pointY = 0;
                    setTransform();
                    modal.style.display = 'flex';
                    modalImg.src = this.src;
                    modalImg.alt = this.alt || 'Pastel ampliado';
                    document.body.style.overflow = 'hidden';
                }
            }, true);
        });
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        scale = 1;
        pointX = 0;
        pointY = 0;
    }

    // Zoom con el scroll del mouse
    modalImg.addEventListener('wheel', function(e) {
        e.preventDefault();
        const xs = e.clientX;
        const ys = e.clientY;
        const delta = e.deltaY < 0 ? 1.15 : 0.85;

        let newScale = scale * delta;
        if (newScale < 1) newScale = 1; // No reducir más del tamaño original
        if (newScale > 5) newScale = 5; // Límite de zoom máximo

        scale = newScale;
        if (scale === 1) {
            pointX = 0;
            pointY = 0;
        }
        setTransform();
    });

    // Funcionalidad de arrastrar (Pan) al hacer zoom
    modalImg.addEventListener('mousedown', function(e) {
        if (scale > 1) {
            panning = true;
            startX = e.clientX - pointX;
            startY = e.clientY - pointY;
            modalImg.style.cursor = 'grabbing';
        }
    });

    window.addEventListener('mousemove', function(e) {
        if (!panning) return;
        pointX = e.clientX - startX;
        pointY = e.clientY - startY;
        setTransform();
    });

    window.addEventListener('mouseup', function() {
        panning = false;
        modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.style.display === 'flex') {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();