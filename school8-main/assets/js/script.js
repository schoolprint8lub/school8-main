/* --- assets/js/script.js --- */

document.addEventListener('DOMContentLoaded', () => {
    // --- ЗАВАНТАЖЕННЯ НОВИН ---
    // (Логіку замінено на Facebook Plugin у index.html)
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        // Залишкова логіка, якщо елемент раптом повернеться або для інших сторінок
        newsContainer.innerHTML = '';
    }

    // --- HERO SLIDESHOW ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // Change slide every 5 seconds

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }
});