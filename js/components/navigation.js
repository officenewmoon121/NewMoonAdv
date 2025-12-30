/**
 * NEW MOON V1 - Navigation Component Logic
 * 
 * يعمل على Header Component المحمل ديناميكياً
 */

(function() {
    'use strict';

    let initAttempts = 0;
    const MAX_ATTEMPTS = 10;
    const RETRY_DELAY = 500;

    function initNavigation() {
        const menuBtn = document.getElementById('menuBtn');
        const navMenu = document.getElementById('navMenu');
        const backdrop = document.getElementById('backdrop');
        const body = document.body;

        if (!menuBtn || !navMenu || !backdrop) {
            initAttempts++;
            if (initAttempts < MAX_ATTEMPTS) {
                // Retry after delay - header component may still be loading
                setTimeout(initNavigation, RETRY_DELAY);
                return;
            } else {
                console.warn('[Navigation] Elements not found after multiple attempts, component may not be available');
                return;
            }
        }

        // Reset attempts counter on success
        initAttempts = 0;

        // ===== Mobile Menu Toggle =====
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = navMenu.classList.contains('open');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // ===== Backdrop Click =====
        backdrop.addEventListener('click', closeMenu);

        // ===== Menu Links Click =====
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // ===== ESC Key =====
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closeMenu();
            }
        });

        // ===== Active Page Detection =====
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });

        // ===== Functions =====
        function openMenu() {
            navMenu.classList.add('open');
            menuBtn.classList.add('open');
            backdrop.classList.add('show');
            body.classList.add('menu-locked');
        }

        function closeMenu() {
            navMenu.classList.remove('open');
            menuBtn.classList.remove('open');
            backdrop.classList.remove('show');
            body.classList.remove('menu-locked');
        }

        console.log('[Navigation] ✅ Initialized');
    }

    // ===== Export =====
    window.initNavigation = initNavigation;

    // Navigation will be initialized by component-loader.js after header is loaded
    // No auto-init needed - component-loader.js calls initNavigation() after loading header

})();

