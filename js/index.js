document.getElementById('testimonial-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el envío del formulario

    const authorName = document.getElementById('authorName').value;
    const authorTitle = document.getElementById('authorTitle').value;
    const testimonialText = document.getElementById('testimonialText').value;
    const imageUpload = document.getElementById('imageUpload').files[0];

    // Crear nuevo testimonio
    const newTestimonial = document.createElement('div');
    newTestimonial.className = 'carousel-item';
    newTestimonial.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-8 testimonial-container">
                <i class="fas fa-quote-left"></i>
                <p class="testimonial-text">${testimonialText}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="author-info">
                        ${authorName}<br>
                        <span class="author-title">${authorTitle}</span>
                    </div>
                    ${imageUpload ? `<img src="${e.target.result}" class="rounded-circle" alt="Imagen del Autor" style="width: 80px; height: 80px;">` : ''}
                </div>
            </div>
        </div>
    `;

    // Si se ha subido una imagen, se procesará
    if (imageUpload) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Agregar el nuevo testimonio al carrusel
            testimonialCarousel.appendChild(newTestimonial);

            // Reiniciar el formulario
            document.getElementById('testimonial-form').reset();

            // Reiniciar el carrusel
            const carousel = new bootstrap.Carousel(testimonialCarousel, {
                interval: false
            });
            carousel.to(testimonialCarousel.childElementCount - 1); // Mover a la última imagen
        };
        reader.readAsDataURL(imageUpload); // Leer la imagen como una URL de datos
    } else {
        // Agregar el nuevo testimonio directamente si no hay imagen
        testimonialCarousel.appendChild(newTestimonial);

        // Reiniciar el formulario
        document.getElementById('testimonial-form').reset();

        // Reiniciar el carrusel
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: false
        });
        carousel.to(testimonialCarousel.childElementCount - 1); // Mover a la última imagen
    }
});
