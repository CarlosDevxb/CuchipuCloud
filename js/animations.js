/**
 * CUCHIPU CLOUD - Animations Module
 * Animaciones scroll y efectos visuales
 */

const Animations = (() => {
    'use strict';

    // Configuration
    const config = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer instance
    let observer = null;

    /**
     * Initialize animations
     */
    function init() {
        setupIntersectionObserver();
        setupCounterAnimations();
        setupParallaxEffects();
        setupHoverEffects();
    }

    /**
     * Setup Intersection Observer for scroll animations
     */
    function setupIntersectionObserver() {
        // Check for browser support
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements
            showAllElements();
            return;
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    handleElementInView(entry.target);
                    
                    // Unobserve after animation (for one-time animations)
                    if (!entry.target.dataset.repeat) {
                        observer.unobserve(entry.target);
                    }
                } else if (entry.target.dataset.repeat) {
                    handleElementOutOfView(entry.target);
                }
            });
        }, config);

        // Observe all animated elements
        observeElements();
    }

    /**
     * Observe all elements with data-animate attribute
     */
    function observeElements() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => observer.observe(el));

        // Observe stagger containers
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        staggerContainers.forEach(el => observer.observe(el));
    }

    /**
     * Handle element coming into view
     */
    function handleElementInView(element) {
        // Add delay if specified
        const delay = element.dataset.delay;
        if (delay) {
            setTimeout(() => {
                element.classList.add('animated');
            }, parseInt(delay));
        } else {
            element.classList.add('animated');
        }

        // Trigger stagger animation for children
        if (element.hasAttribute('data-stagger')) {
            element.classList.add('animated');
        }
    }

    /**
     * Handle element going out of view (for repeat animations)
     */
    function handleElementOutOfView(element) {
        element.classList.remove('animated');
    }

    /**
     * Show all elements (fallback)
     */
    function showAllElements() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => el.classList.add('animated'));

        const staggerContainers = document.querySelectorAll('[data-stagger]');
        staggerContainers.forEach(el => el.classList.add('animated'));
    }

    /**
     * Setup counter animations
     */
    function setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    /**
     * Animate a single counter
     */
    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutQuart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
                // Add plus sign if specified
                if (element.dataset.suffix) {
                    element.textContent += element.dataset.suffix;
                }
            }
        }

        requestAnimationFrame(updateCounter);
    }

    /**
     * Setup parallax effects
     */
    function setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;

        let rafId = null;

        function updateParallax() {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.speed) || 0.5;
                const rect = el.getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const viewportCenter = window.innerHeight / 2;
                const distance = centerY - viewportCenter;
                const translateY = distance * speed * -1;
                
                el.style.transform = `translateY(${translateY}px)`;
            });

            rafId = null;
        }

        window.addEventListener('scroll', () => {
            if (rafId === null) {
                rafId = requestAnimationFrame(updateParallax);
            }
        });
    }

    /**
     * Setup hover effects
     */
    function setupHoverEffects() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });

        // Tilt effect for cards
        const tiltElements = document.querySelectorAll('.tilt');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const tiltX = (y - 0.5) * 10;
                const tiltY = (x - 0.5) * -10;
                
                el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    /**
     * Create particles effect
     */
    function createParticles(container, options = {}) {
        const defaults = {
            count: 50,
            color: 'var(--accent)',
            size: 4,
            speed: 1,
            opacity: 0.6
        };

        const settings = { ...defaults, ...options };
        
        for (let i = 0; i < settings.count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${settings.size}px;
                height: ${settings.size}px;
                background: ${settings.color};
                border-radius: 50%;
                opacity: ${settings.opacity};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${10 + Math.random() * 20}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
            `;
            container.appendChild(particle);
        }
    }

    /**
     * Typewriter effect
     */
    function typewriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    /**
     * Smooth reveal animation
     */
    function smoothReveal(elements, stagger = 100) {
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${index * stagger}ms, transform 0.5s ease ${index * stagger}ms`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50);
        });
    }

    /**
     * Refresh observers (useful after dynamic content changes)
     */
    function refresh() {
        if (observer) {
            observeElements();
        }
    }

    // Public API
    return {
        init,
        refresh,
        createParticles,
        typewriter,
        smoothReveal
    };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animations;
}
