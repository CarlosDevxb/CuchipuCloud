/**
 * CUCHIPU CLOUD - Components Loader
 * Carga dinámica de header, footer y mobile-menu
 */

(function() {
    'use strict';

    function getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length;
        return depth > 1 ? '../'.repeat(depth - 1) : '';
    }

    const BASE_PATH = getBasePath();

    function getActivePage() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        return page.replace('.html', '');
    }

    function getHeaderHTML() {
        const activePage = getActivePage();
        const isActive = (page) => activePage === page ? ' active' : '';

        return `
        <header class="header" id="header">
            <div class="header-container">
                <a href="index.html" class="logo">
                    <img src="images/CuchipuCloud.png" alt="Cuchipu Cloud" class="logo-image">
                    <span class="logo-text">Cuchipu<span>Cloud</span></span>
                </a>
                <nav class="nav" id="nav">
                    <ul class="nav-list">
                        <li><a href="index.html" class="nav-link${isActive('index')}">Inicio</a></li>
                        <li><a href="servicios.html" class="nav-link${isActive('servicios')}">Servicios</a></li>
                        <li><a href="portafolio.html" class="nav-link${isActive('portafolio')}">Portafolio</a></li>
                        <li><a href="nosotros.html" class="nav-link${isActive('nosotros')}">Nosotros</a></li>
                        <li><a href="contacto.html" class="nav-link${isActive('contacto')}">Contacto</a></li>
                    </ul>
                </nav>
                <div class="header-actions">
                    <a href="contacto.html" class="btn btn-primary">Contáctanos</a>
                </div>
                <button class="menu-toggle" id="menuToggle" aria-label="Menú">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>

        <div class="mobile-menu" id="mobileMenu">
            <a href="index.html" class="nav-link">Inicio</a>
            <a href="servicios.html" class="nav-link">Servicios</a>
            <a href="portafolio.html" class="nav-link">Portafolio</a>
            <a href="nosotros.html" class="nav-link">Nosotros</a>
            <a href="contacto.html" class="nav-link">Contacto</a>
            <a href="contacto.html" class="btn btn-primary">Contáctanos</a>
        </div>`;
    }

    function getFooterHTML() {
        return `
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="index.html" class="footer-logo">
                        <img src="images/CuchipuCloud.png" alt="Cuchipu Cloud" class="footer-logo-image">
                        <span class="footer-logo-text">Cuchipu<span>Cloud</span></span>
                    </a>
                    <p class="footer-description">Transformamos ideas en soluciones digitales innovadoras.</p>
                    <div class="footer-social">
                        <a href="https://facebook.com/cuchipucloud" class="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="https://github.com/carlosdevxb" class="footer-social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                    </div>
                </div>
                <div class="footer-column">
                    <h4 class="footer-title">Servicios</h4>
                    <div class="footer-links">
                        <a href="servicios.html" class="footer-link">Desarrollo Web</a>
                        <a href="servicios.html" class="footer-link">Software</a>
                        <a href="servicios.html" class="footer-link">Cloud</a>
                        <a href="servicios.html" class="footer-link">Redes</a>
                    </div>
                </div>
                <div class="footer-column">
                    <h4 class="footer-title">Empresa</h4>
                    <div class="footer-links">
                        <a href="nosotros.html" class="footer-link">Nosotros</a>
                        <a href="portafolio.html" class="footer-link">Portafolio</a>
                        <a href="contacto.html" class="footer-link">Contacto</a>
                    </div>
                </div>
                <div class="footer-column">
                    <h4 class="footer-title">Soporte</h4>
                    <div class="footer-links">
                        <a href="faq.html" class="footer-link">FAQ</a>
                        <a href="terminos.html" class="footer-link">Términos</a>
                        <a href="privacidad.html" class="footer-link">Privacidad</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="footer-copyright">© 2026 Cuchipu Cloud. Todos los derechos reservados.</p>
                <div class="footer-legal">
                    <a href="terminos.html" class="footer-legal-link">Términos</a>
                    <a href="privacidad.html" class="footer-legal-link">Privacidad</a>
                </div>
            </div>
        </div>
    </footer>

    <button class="back-to-top" id="backToTop" aria-label="Volver arriba">↑</button>`;
    }

    function injectSEOScript() {
        if (!document.querySelector('script[src*="seo.js"]')) {
            const script = document.createElement('script');
            script.src = 'js/seo.js';
            document.head.appendChild(script);
        }
    }

    function injectComponents() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (headerPlaceholder) {
            headerPlaceholder.outerHTML = getHeaderHTML();
        }

        if (footerPlaceholder) {
            footerPlaceholder.outerHTML = getFooterHTML();
        }

        injectSEOScript();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectComponents);
    } else {
        injectComponents();
    }
})();