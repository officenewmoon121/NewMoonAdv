// Navigation functionality - Final Version
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const body = document.body;
    
    // التأكد من وجود العناصر
    if (!nav || !toggle || !menu) {
        console.log('Nav elements not found');
        return;
    }
    
    const links = menu.querySelectorAll('.nav-link');
    
    // Sticky Nav on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile Toggle
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('menu-open');
        console.log('Menu toggled:', menu.classList.contains('active'));
    });
    
    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    console.log('Navigation initialized successfully');
});