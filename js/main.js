/**
 * CUCHIPU CLOUD - Main JavaScript
 * Inicialización y funcionalidades principales
 */

const App = (() => {
    'use strict';

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupApp);
        } else {
            setupApp();
        }
    }

    function setupApp() {
        hidePreloader();
        
        if (typeof Navigation !== 'undefined') Navigation.init();
        if (typeof Animations !== 'undefined') Animations.init();
        if (typeof Gallery !== 'undefined') Gallery.init();
        if (typeof ContactForm !== 'undefined') ContactForm.init();

        setupTestimonialsSlider();
        setupFAQAccordion();
    }

    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.style.display = 'none', 500);
            }, 300);
        }
    }

    function setupTestimonialsSlider() {
        const slider = document.getElementById('testimonialsSlider');
        if (!slider) return;

        const track = slider.querySelector('.testimonials-track');
        const slides = slider.querySelectorAll('.testimonial-slide');
        const dots = slider.querySelectorAll('.testimonial-dot');
        
        if (!track || slides.length === 0) return;

        let currentSlide = 0;
        let autoplayInterval = null;

        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                startAutoplay();
            });
        });

        // Touch support
        let touchStartX = 0;
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : goToSlide(currentSlide - 1);
            }
            startAutoplay();
        }, { passive: true });

        startAutoplay();
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
    }

    function setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length === 0) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(other => other.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }

    return { init };
})();

App.init();
