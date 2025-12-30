/**
 * NEW MOON V1 - Component Loader System
 * 
 * نظام موحد لتحميل المكونات في كل الصفحات
 * يضمن:
 * - عدم التكرار
 * - سهولة الصيانة
 * - Error Handling
 */

(function() {
    'use strict';

    // ===== Configuration =====
    // Calculate relative path based on current page location
    function getComponentsPath() {
        const pathname = window.location.pathname;
        const pathParts = pathname.split('/').filter(p => p && !p.endsWith('.html'));
        
        // If we're in root (no subdirectory), use 'components/'
        if (pathParts.length <= 1) {
            return 'components/';
        }
        
        // If we're in a subdirectory (like solutions/), use '../components/'
        const depth = pathParts.length - 1;
        return '../'.repeat(depth) + 'components/';
    }
    
    const COMPONENTS_PATH = getComponentsPath();
    const COMPONENTS_CACHE = {}; // Cache للتقليل من الطلبات المتكررة

    /**
     * Load Component into target element
     * @param {string} componentName - اسم المكون (مثلاً: 'header', 'footer')
     * @param {string} targetId - ID العنصر المستهدف
     * @returns {Promise<void>}
     */
    async function loadComponent(componentName, targetId) {
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) {
            console.error(`[ComponentLoader] Target element #${targetId} not found`);
            return;
        }

        // Check cache first
        if (COMPONENTS_CACHE[componentName]) {
            targetElement.innerHTML = COMPONENTS_CACHE[componentName];
            // Fix paths even for cached components
            fixComponentPaths(targetElement, componentName);
            initializeComponent(componentName, targetId);
            return;
        }

        // Try multiple paths until one works
        const possiblePaths = [
            COMPONENTS_PATH,                    // Calculated path
            'components/',                      // Root relative
            '../components/',                   // One level up
            '../../components/',                // Two levels up
            '/components/'                       // Absolute from root
        ];
        
        let loaded = false;
        for (const path of possiblePaths) {
            try {
                const response = await fetch(`${path}${componentName}.html`);
                
                if (response.ok) {
                    const html = await response.text();
                    
                    // Cache the component with the working path
                    COMPONENTS_CACHE[componentName] = html;
                    
                    // Insert into target
                    targetElement.innerHTML = html;
                    
                    // Fix relative paths in component for subdirectories
                    fixComponentPaths(targetElement, componentName);
                    
                    // Initialize component-specific JavaScript
                    initializeComponent(componentName, targetId);
                    
                    console.log(`[ComponentLoader] ✅ ${componentName} loaded successfully from: ${path}`);
                    loaded = true;
                    break;
                }
            } catch (error) {
                // Try next path
                continue;
            }
        }
        
        if (!loaded) {
            console.error(`[ComponentLoader] ❌ Failed to load ${componentName} from all paths`);
            targetElement.innerHTML = `<div style="padding: 1rem; background: #fee; color: #c33; border-radius: 8px;">
                <strong>خطأ في تحميل المكون:</strong> ${componentName}<br>
                <small>تأكد من أن Server Root = NewMoon_V1_ProductReady/</small>
            </div>`;
        }
    }

    /**
     * Fix relative paths in component for subdirectories
     * @param {HTMLElement} element 
     * @param {string} componentName 
     */
    function fixComponentPaths(element, componentName) {
        const pathname = window.location.pathname;
        // Get directory path (remove filename)
        const dirPath = pathname.substring(0, pathname.lastIndexOf('/'));
        const pathParts = dirPath.split('/').filter(p => p && p !== '');
        
        // If we're in root, no fix needed
        if (pathParts.length === 0) {
            console.log('[ComponentLoader] In root, no path fixing needed');
            return;
        }
        
        // Calculate depth: number of directories from root
        const depth = pathParts.length;
        const prefix = '../'.repeat(depth);
        
        console.log(`[ComponentLoader] Fixing paths: depth=${depth}, prefix="${prefix}", pathname="${pathname}"`);
        
        // Fix all href attributes in links
        const links = element.querySelectorAll('a[href]');
        let fixedCount = 0;
        links.forEach(link => {
            const originalHref = link.getAttribute('href');
            const href = originalHref;
            
            // Only fix relative paths (not absolute URLs or # anchors)
            if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('/') && !href.startsWith('../')) {
                // Simple relative path (e.g., "solutions.html", "index.html")
                const newHref = prefix + href;
                link.setAttribute('href', newHref);
                console.log(`[ComponentLoader] Fixed: "${originalHref}" → "${newHref}"`);
                fixedCount++;
            } else if (href && href.includes('/') && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('../') && !href.startsWith('/')) {
                // Subdirectory path (e.g., "solutions/premium-gifts.html")
                // Check if we need to add prefix
                const currentDir = pathParts[pathParts.length - 1];
                const hrefDir = href.split('/')[0];
                if (currentDir !== hrefDir) {
                    // Different directory, add prefix
                    const newHref = prefix + href;
                    link.setAttribute('href', newHref);
                    console.log(`[ComponentLoader] Fixed subdir: "${originalHref}" → "${newHref}"`);
                    fixedCount++;
                }
                // If same directory, keep as is
            }
        });
        
        console.log(`[ComponentLoader] Fixed ${fixedCount} links in ${componentName}`);
    }

    /**
     * Initialize component-specific functionality
     * @param {string} componentName 
     * @param {string} targetId 
     */
    function initializeComponent(componentName, targetId) {
        switch(componentName) {
            case 'header':
                // Navigation will be initialized by navigation.js
                // Use setTimeout to ensure navigation.js is loaded and header is rendered
                setTimeout(function() {
                    if (window.initNavigation) {
                        window.initNavigation();
                    } else {
                        // If navigation.js not loaded yet, retry
                        setTimeout(function() {
                            if (window.initNavigation) {
                                window.initNavigation();
                            }
                        }, 200);
                    }
                }, 200);
                break;
                
            case 'footer':
                // Footer-specific initialization if needed
                break;
                
            case 'loading':
                // Loading screen will be controlled by loading.js
                if (window.initLoading) {
                    window.initLoading();
                }
                break;
        }
    }

    /**
     * Load multiple components
     * @param {Array<{name: string, target: string}>} components 
     */
    async function loadComponents(components) {
        const promises = components.map(comp => loadComponent(comp.name, comp.target));
        await Promise.all(promises);
    }

    // ===== Public API =====
    window.ComponentLoader = {
        load: loadComponent,
        loadMultiple: loadComponents
    };

    // Auto-load components marked with data-component attribute
    document.addEventListener('DOMContentLoaded', function() {
        const autoLoadElements = document.querySelectorAll('[data-component]');
        autoLoadElements.forEach(element => {
            const componentName = element.getAttribute('data-component');
            const targetId = element.id || `component-${componentName}`;
            if (!element.id) element.id = targetId;
            loadComponent(componentName, targetId);
        });
    });

    console.log('[ComponentLoader] ✅ Initialized');
})();

