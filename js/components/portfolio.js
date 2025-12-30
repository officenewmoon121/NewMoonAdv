/**
 * NEW MOON V1 - PORTFOLIO PAGE LOGIC
 * Dynamic loading of portfolio items with "View More" functionality
 */

class PortfolioManager {
    constructor() {
        this.portfolioItems = [];
        this.displayedCount = 6; // عدد الأعمال المعروضة في البداية
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        await this.loadPortfolio();
        this.setupFilters();
        this.renderPortfolio();
    }

    async loadPortfolio() {
        try {
            const response = await fetch('data/portfolio.json');
            if (response.ok) {
                this.portfolioItems = await response.json();
            } else {
                // Fallback: Use existing items from HTML
                this.portfolioItems = this.extractFromHTML();
            }
        } catch (error) {
            console.warn('[PortfolioManager] JSON not found, using HTML items');
            this.portfolioItems = this.extractFromHTML();
        }
    }

    extractFromHTML() {
        // Extract existing portfolio items from HTML
        const items = [];
        const existingItems = document.querySelectorAll('.portfolio-item');
        existingItems.forEach((item, index) => {
            items.push({
                id: index + 1,
                title: item.querySelector('h3')?.textContent || `عمل ${index + 1}`,
                description: item.querySelector('p')?.textContent || '',
                category: item.getAttribute('data-category') || 'all',
                image: item.querySelector('img')?.src || ''
            });
        });
        return items;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentFilter = button.getAttribute('data-filter');
                this.renderPortfolio();
            });
        });
    }

    renderPortfolio() {
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) return;

        // Filter items
        const filtered = this.currentFilter === 'all' 
            ? this.portfolioItems 
            : this.portfolioItems.filter(item => item.category === this.currentFilter);

        // Clear grid
        grid.innerHTML = '';

        // Display first batch
        const toDisplay = filtered.slice(0, this.displayedCount);
        
        toDisplay.forEach(item => {
            const element = this.createPortfolioItem(item);
            grid.appendChild(element);
        });

        // Add "View More" card if there are more items
        if (filtered.length > this.displayedCount) {
            const viewMoreCard = this.createViewMoreCard(filtered.length - this.displayedCount);
            grid.appendChild(viewMoreCard);
        }
    }

    createPortfolioItem(item) {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.setAttribute('data-category', item.category);
        
        div.innerHTML = `
            <div class="portfolio-image">
                <img src="assets/images/portfolio/${item.image}" alt="${item.title}" loading="lazy" class="portfolio-main-image" onerror="this.classList.add('portfolio-image-hidden'); this.nextElementSibling.classList.add('show');">
                <div class="portfolio-image-fallback portfolio-image-fallback-hidden">
                    <i class="fas fa-${this.getCategoryIcon(item.category)}"></i>
                </div>
                <div class="portfolio-overlay">
                    <i class="fas fa-eye"></i>
                </div>
            </div>
            <div class="portfolio-content">
                <span class="portfolio-category">${this.getCategoryName(item.category)}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;

        return div;
    }

    createViewMoreCard(remainingCount) {
        const div = document.createElement('div');
        div.className = 'portfolio-item portfolio-item-view-more';
        div.id = 'portfolioViewMoreCard';
        
        div.innerHTML = `
            <div class="portfolio-image portfolio-image-view-more">
                <div class="view-more-overlay">
                    <div class="view-more-icon-large">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <h3>مشاهدة المزيد</h3>
                    <p>+${remainingCount} عمل آخر</p>
                    <button class="view-more-btn-portfolio" id="portfolioViewMoreBtn">
                        <span>عرض الكل</span>
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
            </div>
            <div class="portfolio-content">
                <span class="portfolio-category">المزيد</span>
                <h3>مشاهدة جميع الأعمال</h3>
                <p>اكتشف المزيد من مشاريعنا الناجحة</p>
            </div>
        `;

        // Setup click handler
        setTimeout(() => {
            const btn = document.getElementById('portfolioViewMoreBtn');
            if (btn) {
                btn.addEventListener('click', () => {
                    this.showAllPortfolio();
                });
            }
        }, 100);

        return div;
    }

    getCategoryIcon(category) {
        const icons = {
            'gifts': 'gift',
            'uniforms': 'tshirt',
            'printing': 'print'
        };
        return icons[category] || 'image';
    }

    getCategoryName(category) {
        const names = {
            'gifts': 'هدايا دعائية',
            'uniforms': 'يونيفورم',
            'printing': 'طباعة'
        };
        return names[category] || category;
    }

    showAllPortfolio() {
        const grid = document.querySelector('.portfolio-grid');
        const viewMoreCard = document.getElementById('portfolioViewMoreCard');
        
        if (!grid) return;

        // Remove "View More" card
        if (viewMoreCard) {
            viewMoreCard.remove();
        }

        // Filter items
        const filtered = this.currentFilter === 'all' 
            ? this.portfolioItems 
            : this.portfolioItems.filter(item => item.category === this.currentFilter);

        // Add remaining items
        const remaining = filtered.slice(this.displayedCount);
        remaining.forEach((item, index) => {
            const element = this.createPortfolioItem(item);
            grid.appendChild(element);
            
            // Animate in
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                element.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                }, 10);
            }, index * 50);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('portfolio.html')) {
            window.portfolioManager = new PortfolioManager();
        }
    });
} else {
    if (window.location.pathname.includes('portfolio.html')) {
        window.portfolioManager = new PortfolioManager();
    }
}

