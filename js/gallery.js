/**
 * CUCHIPU CLOUD - Gallery Module
 * Galería filtrable y lightbox
 */

const Gallery = (() => {
    'use strict';

    // DOM Elements
    let portfolioGrid = null;
    let filterButtons = null;
    let portfolioItems = null;

    // State
    let activeFilter = 'all';
    let isAnimating = false;

    /**
     * Initialize gallery
     */
    function init() {
        portfolioGrid = document.getElementById('portfolioGrid');
        filterButtons = document.querySelectorAll('.filter-btn');
        portfolioItems = document.querySelectorAll('.portfolio-card');

        if (!portfolioGrid || filterButtons.length === 0) return;

        setupEventListeners();
        setupLightbox();
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                filterItems(filter);
                updateActiveButton(btn);
            });
        });
    }

    /**
     * Filter portfolio items
     */
    function filterItems(filter) {
        if (isAnimating) return;
        isAnimating = true;
        activeFilter = filter;

        portfolioItems.forEach(item => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
                showItem(item);
            } else {
                hideItem(item);
            }
        });

        // Reset animation state after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    /**
     * Show a portfolio item
     */
    function showItem(item) {
        item.style.display = '';
        item.classList.remove('hidden');
        
        // Trigger reflow
        void item.offsetWidth;
        
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    }

    /**
     * Hide a portfolio item
     */
    function hideItem(item) {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.display = 'none';
            item.classList.add('hidden');
        }, 300);
    }

    /**
     * Update active filter button
     */
    function updateActiveButton(activeBtn) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    /**
     * Setup lightbox functionality
     */
    function setupLightbox() {
        // Create lightbox element
        const lightbox = createLightboxElement();
        document.body.appendChild(lightbox);

        // Add click listeners to portfolio items
        portfolioItems.forEach(item => {
            const overlay = item.querySelector('.portfolio-card-overlay');
            if (overlay) {
                const link = overlay.querySelector('a');
                if (link) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        openLightbox(item);
                    });
                }
            }
        });
    }

    /**
     * Create lightbox DOM element
     */
    function createLightboxElement() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'modal';
        lightbox.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3 class="modal-title" id="lightboxTitle"></h3>
                    <button class="modal-close" id="lightboxClose">✕</button>
                </div>
                <div id="lightboxBody">
                    <img id="lightboxImage" src="" alt="" style="width: 100%; border-radius: var(--radius-lg); margin-bottom: var(--space-4);">
                    <p id="lightboxDescription" style="color: var(--gray-400);"></p>
                    <div id="lightboxDetails" style="margin-top: var(--space-4);"></div>
                </div>
            </div>
        `;

        // Close button listener
        lightbox.querySelector('#lightboxClose').addEventListener('click', closeLightbox);
        
        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });

        return lightbox;
    }

    /**
     * Open lightbox with item data
     */
    function openLightbox(item) {
        const lightbox = document.getElementById('lightbox');
        const image = item.querySelector('.portfolio-card-image img');
        const title = item.querySelector('.portfolio-card-title');
        const description = item.querySelector('.portfolio-card-description');
        const category = item.querySelector('.portfolio-card-category');

        // Update lightbox content
        document.getElementById('lightboxImage').src = image ? image.src : '';
        document.getElementById('lightboxImage').alt = title ? title.textContent : '';
        document.getElementById('lightboxTitle').textContent = title ? title.textContent : '';
        document.getElementById('lightboxDescription').textContent = description ? description.textContent : '';

        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close lightbox
     */
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Add new items to gallery (for dynamic loading)
     */
    function addItems(items) {
        items.forEach(item => {
            portfolioGrid.appendChild(item);
        });

        // Refresh references
        portfolioItems = document.querySelectorAll('.portfolio-card');
        
        // Re-apply current filter
        if (activeFilter !== 'all') {
            filterItems(activeFilter);
        }

        // Setup lightbox for new items
        setupLightbox();
    }

    /**
     * Get current filter
     */
    function getActiveFilter() {
        return activeFilter;
    }

    // Public API
    return {
        init,
        filterItems,
        addItems,
        getActiveFilter,
        closeLightbox
    };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
}
