/**
 * NEW MOON V1 - Image Handler System
 * 
 * نظام موحد لإدارة الصور في الموقع
 * يضمن:
 * - Lazy Loading
 * - Error Handling
 * - Placeholder Support
 */

(function() {
    'use strict';

    const IMAGES_PATH = 'assets/images/';
    const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ELoading...%3C/text%3E%3C/svg%3E';

    /**
     * Initialize image lazy loading
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                img.src = PLACEHOLDER_IMAGE;
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    /**
     * Handle image load errors
     */
    function initErrorHandling() {
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                e.target.src = PLACEHOLDER_IMAGE;
                e.target.classList.add('error');
            }
        }, true);
    }

    /**
     * Get image path
     * @param {string} imageName 
     * @returns {string}
     */
    function getImagePath(imageName) {
        return `${IMAGES_PATH}${imageName}`;
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initLazyLoading();
            initErrorHandling();
        });
    } else {
        initLazyLoading();
        initErrorHandling();
    }

    // Export
    window.ImageHandler = {
        getPath: getImagePath
    };

    console.log('[ImageHandler] ✅ Initialized');
})();

