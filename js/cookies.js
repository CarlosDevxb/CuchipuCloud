/**
 * CUCHIPU CLOUD - Cookie Consent Manager
 * Banner de consentimiento de cookies (GDPR/LFPDPPP)
 */

const CookieConsent = (() => {
    'use strict';

    const STORAGE_KEY = 'cuchipu_cookie_consent';

    function getConsent() {
        return localStorage.getItem(STORAGE_KEY);
    }

    function setConsent(value) {
        localStorage.setItem(STORAGE_KEY, value);
    }

    function createBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div class="cookie-banner-inner">
                <div class="cookie-banner-icon">🍪</div>
                <div class="cookie-banner-content">
                    <div class="cookie-banner-title">Usamos cookies</div>
                    <p class="cookie-banner-text">
                        Utilizamos cookies esenciales para el funcionamiento del sitio. Puedes aceptar o rechazar su uso. 
                        <a href="privacidad.html">Más información en nuestra Política de Privacidad</a>.
                    </p>
                </div>
                <div class="cookie-banner-actions">
                    <button class="btn-reject" id="cookieReject">Rechazar</button>
                    <button class="btn-accept" id="cookieAccept">Aceptar</button>
                </div>
            </div>
        `;
        return banner;
    }

    function showBanner() {
        const banner = createBanner();
        document.body.appendChild(banner);

        requestAnimationFrame(() => {
            banner.classList.add('visible');
        });

        document.getElementById('cookieAccept').addEventListener('click', () => {
            setConsent('accepted');
            hideBanner(banner);
        });

        document.getElementById('cookieReject').addEventListener('click', () => {
            setConsent('rejected');
            hideBanner(banner);
        });
    }

    function hideBanner(banner) {
        banner.classList.remove('visible');
        setTimeout(() => {
            banner.remove();
        }, 350);
    }

    function init() {
        if (!getConsent()) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', showBanner);
            } else {
                showBanner();
            }
        }
    }

    return { init, getConsent };
})();

CookieConsent.init();
