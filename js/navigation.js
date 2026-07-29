/**
 * CUCHIPU CLOUD - Navigation Module
 * Menú responsive y navegación
 */

const Navigation = (() => {
    'use strict';

    let header, menuToggle, mobileMenu, backToTop;
    let isMenuOpen = false;

    function init() {
        header = document.getElementById('header');
        menuToggle = document.getElementById('menuToggle');
        mobileMenu = document.getElementById('mobileMenu');
        backToTop = document.getElementById('backToTop');

        setupEventListeners();
        handleScroll();
        setActiveLink();
    }

    function setupEventListeners() {
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }

        // Close menu on link click
        if (mobileMenu) {
            mobileMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        }

        // Scroll events
        window.addEventListener('scroll', () => {
            requestAnimationFrame(handleScroll);
        });

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Close menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (isMenuOpen && mobileMenu && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('active', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    function closeMenu() {
        isMenuOpen = false;
        if (menuToggle) menuToggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (header) {
            header.classList.toggle('scrolled', scrollY > 50);
        }
        
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 500);
        }
    }

    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    return { init, closeMenu };
})();
