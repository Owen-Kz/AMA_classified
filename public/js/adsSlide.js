document.addEventListener('DOMContentLoaded', function() {
    
    const slides = document.querySelectorAll('.ads-slide .slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Initialize the first slide
    slides[currentIndex].style.opacity = 1;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = 0;
        });

        // Show the selected slide
        slides[index].style.opacity = 1;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // Auto-slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Arrow button event listeners
    document.querySelector('.left-arrow').addEventListener('click', function() {
        clearInterval(slideInterval); // Stop the auto-slide
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000); // Restart the auto-slide
    });

    document.querySelector('.right-arrow').addEventListener('click', function() {
        clearInterval(slideInterval); // Stop the auto-slide
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000); // Restart the auto-slide
    });
});



