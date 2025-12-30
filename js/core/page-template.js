/**
 * NEW MOON V1 - Page Template System
 * 
 * نظام موحد لتحميل CSS و JS المطلوبة لكل صفحة
 * يضمن:
 * - عدم التكرار
 * - سهولة الصيانة
 * - تحميل ديناميكي للملفات
 */

(function() {
    'use strict';

    const CSS_PATH = 'css/';
    const JS_PATH = 'js/';

    /**
     * Load CSS file dynamically
     * @param {string} href - Path to CSS file
     * @returns {Promise<void>}
     */
    function loadCSS(href) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            const existingLink = document.querySelector(`link[href="${href}"]`);
            if (existingLink) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
            document.head.appendChild(link);
        });
    }

    /**
     * Load JS file dynamically
     * @param {string} src - Path to JS file
     * @returns {Promise<void>}
     */
    function loadJS(src) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load JS: ${src}`));
            document.body.appendChild(script);
        });
    }

    /**
     * Initialize page with required assets
     * @param {Object} config - Page configuration
     * @param {string} config.pageName - Page name (e.g., 'home', 'about')
     * @param {Array<string>} config.additionalCSS - Additional CSS files to load
     * @param {Array<string>} config.additionalJS - Additional JS files to load
     */
    async function initPage(config) {
        const { pageName, additionalCSS = [], additionalJS = [] } = config;

        try {
            // Load page-specific CSS
            if (pageName) {
                await loadCSS(`${CSS_PATH}pages/${pageName}.css`);
            }

            // Load additional CSS files
            for (const css of additionalCSS) {
                await loadCSS(css);
            }

            // Load additional JS files
            for (const js of additionalJS) {
                await loadJS(js);
            }

            console.log(`[PageTemplate] ✅ Page "${pageName}" initialized`);
        } catch (error) {
            console.error(`[PageTemplate] ❌ Error initializing page:`, error);
        }
    }

    // ===== Public API =====
    window.PageTemplate = {
        init: initPage,
        loadCSS: loadCSS,
        loadJS: loadJS
    };

    console.log('[PageTemplate] ✅ Initialized');
})();

