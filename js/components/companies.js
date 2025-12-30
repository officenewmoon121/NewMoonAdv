/**
 * NEW MOON V1 - COMPANIES PAGE LOGIC
 * Dynamic loading of company logos with "View More" functionality
 */

class CompaniesManager {
    constructor() {
        this.companies = [];
        this.displayedCount = 12; // عدد الشركات المعروضة في البداية
        this.init();
    }

    async init() {
        await this.loadCompanies();
        this.renderCompanies();
        this.setupViewMore();
    }

    async loadCompanies() {
        try {
            const response = await fetch('data/companies.json');
            if (response.ok) {
                this.companies = await response.json();
            } else {
                // Fallback: Generate from images if JSON not found
                this.companies = this.generateCompaniesFromImages();
            }
        } catch (error) {
            console.warn('[CompaniesManager] JSON not found, using fallback');
            this.companies = this.generateCompaniesFromImages();
        }
    }

    generateCompaniesFromImages() {
        // Generate 37 companies from client_1.webp to client_37.webp
        const companies = [];
        for (let i = 1; i <= 37; i++) {
            companies.push({
                id: i,
                name: `شركة ${i}`,
                image: `client_${i}.webp`,
                category: this.getCategoryByIndex(i)
            });
        }
        return companies;
    }

    getCategoryByIndex(index) {
        // تقسيم عشوائي للفئات
        const categories = ['medical', 'educational', 'commercial', 'services'];
        return categories[index % 4];
    }

    renderCompanies() {
        const grid = document.querySelector('.companies-grid');
        if (!grid) return;

        // Clear existing placeholders
        grid.innerHTML = '';

        // Display first batch
        const toDisplay = this.companies.slice(0, this.displayedCount);
        
        toDisplay.forEach(company => {
            const logoElement = this.createCompanyLogo(company);
            grid.appendChild(logoElement);
        });

        // Add "View More" card if there are more companies
        if (this.companies.length > this.displayedCount) {
            const viewMoreCard = this.createViewMoreCard();
            grid.appendChild(viewMoreCard);
        }
    }

    createCompanyLogo(company) {
        const div = document.createElement('div');
        div.className = 'company-logo';
        div.setAttribute('data-category', company.category);
        
        const img = document.createElement('img');
        img.src = `assets/images/companies/${company.image}`;
        img.alt = company.name;
        img.loading = 'lazy';
        img.onerror = function() {
            this.style.display = 'none';
            if (this.nextElementSibling) {
                this.nextElementSibling.style.display = 'flex';
            }
        };

        const placeholder = document.createElement('div');
        placeholder.className = 'company-logo-placeholder';
        placeholder.style.display = 'none';
        placeholder.innerHTML = `<span>${company.name}</span>`;

        div.appendChild(img);
        div.appendChild(placeholder);

        return div;
    }

    createViewMoreCard() {
        const div = document.createElement('div');
        div.className = 'company-logo company-logo-view-more';
        div.id = 'viewMoreCard';
        
        div.innerHTML = `
            <div class="view-more-content">
                <div class="view-more-icon">
                    <i class="fas fa-arrow-left"></i>
                </div>
                <h3>مشاهدة المزيد</h3>
                <p>+${this.companies.length - this.displayedCount} شركة أخرى</p>
                <button class="view-more-btn" id="viewMoreBtn">
                    <span>عرض الكل</span>
                    <i class="fas fa-arrow-left"></i>
                </button>
            </div>
        `;

        return div;
    }

    setupViewMore() {
        const viewMoreBtn = document.getElementById('viewMoreBtn');
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', () => {
                this.showAllCompanies();
            });
        }
    }

    showAllCompanies() {
        const grid = document.querySelector('.companies-grid');
        const viewMoreCard = document.getElementById('viewMoreCard');
        
        if (!grid) return;

        // Remove "View More" card
        if (viewMoreCard) {
            viewMoreCard.remove();
        }

        // Add remaining companies
        const remaining = this.companies.slice(this.displayedCount);
        remaining.forEach(company => {
            const logoElement = this.createCompanyLogo(company);
            grid.appendChild(logoElement);
            
            // Animate in
            setTimeout(() => {
                logoElement.style.opacity = '0';
                logoElement.style.transform = 'scale(0.8)';
                logoElement.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    logoElement.style.opacity = '1';
                    logoElement.style.transform = 'scale(1)';
                }, 10);
            }, remaining.indexOf(company) * 50);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('companies.html')) {
            window.companiesManager = new CompaniesManager();
        }
    });
} else {
    if (window.location.pathname.includes('companies.html')) {
        window.companiesManager = new CompaniesManager();
    }
}

