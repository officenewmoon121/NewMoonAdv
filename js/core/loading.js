/**
 * NEW MOON V1 - Loading Screen Controller
 * 
 * يتحكم في عرض وإخفاء شاشة التحميل
 */

(function() {
    'use strict';

    function initLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        // Detect device type for optimized timing
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        // Minimum display time: shorter on mobile/tablet
        const minDisplayTime = isMobile ? 300 : isTablet ? 400 : 500;
        const fadeOutDuration = 600;

        // Hide loading when page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(function() {
                    loadingScreen.remove();
                }, fadeOutDuration);
            }, minDisplayTime);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoading);
    } else {
        initLoading();
    }
})();

