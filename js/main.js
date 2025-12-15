document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const menuToggle = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav-menu ul');

    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if(menuToggle) menuToggle.classList.remove('is-active');
            if(navMenu) navMenu.classList.remove('active');
        });
    });
});
// Mobile Menu Toggle
function initNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle menu
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Animate toggle button
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                menuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initNav);

// Re-initialize after nav is loaded via fetch
window.addEventListener('load', initNav);