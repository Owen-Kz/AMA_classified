function initializeSlideshow() {
    const slides = document.querySelectorAll('.ads-slide .slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    if (totalSlides === 0) {
        console.error('No slides found.');
        return;
    }

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

    // Arrow button event listeners
    document.querySelector('.left-arrow').addEventListener('click', function() {
        prevSlide();
    });

    document.querySelector('.right-arrow').addEventListener('click', function() {
        nextSlide();
    });
}
