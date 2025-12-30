/**
 * NEW MOON V1 - STUDIO FUNCTIONALITY (Enhanced)
 * استوديو التصميم - الوظائف الأساسية + تحسينات
 */

class StudioManager {
    constructor() {
        this.currentProduct = null;
        this.design = {
            text: '',
            textColor: '#D4AF37',
            backgroundColor: '#081226',
            fontFamily: 'Cairo',
            fontSize: 24,
            logo: null
        };
        this.designHistory = [];
        this.historyIndex = -1;
        this.init();
    }

    init() {
        this.loadSavedDesign();
        this.setupTabs();
        this.setupProductSelection();
        this.setupDesignTools();
        this.setupPreview();
        this.setupActions();
        this.setupAutoSave();
        this.setupKeyboardShortcuts();
        this.loadFromURL();
        // Update logo preview after loading
        setTimeout(() => this.updateLogoPreview(), 100);
    }

    // ===== Auto Save =====
    setupAutoSave() {
        setInterval(() => {
            if (this.currentProduct) {
                this.saveDesign();
            }
        }, 30000);

        window.addEventListener('beforeunload', () => {
            if (this.currentProduct) {
                this.saveDesign();
            }
        });
    }

    // ===== Save/Load Design =====
    saveDesign() {
        if (!this.currentProduct) return;
        
        const designData = {
            product: this.currentProduct,
            design: { ...this.design },
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('newmoon_studio_design', JSON.stringify(designData));
    }

    loadSavedDesign() {
        const saved = localStorage.getItem('newmoon_studio_design');
        if (!saved) return;

        try {
            const designData = JSON.parse(saved);
            this.currentProduct = designData.product;
            this.design = { ...designData.design };
            
            this.restoreUI();
            this.showCanvas();
            this.updatePreview();
            this.updateLogoPreview();
            
            this.showToast('تم تحميل التصميم المحفوظ', 'info');
        } catch (e) {
            console.error('Error loading saved design:', e);
        }
    }

    restoreUI() {
        if (this.currentProduct) {
            document.querySelector(`[data-product="${this.currentProduct}"]`)?.classList.add('selected');
        }

        const textInput = document.getElementById('textInput');
        const colorPicker = document.getElementById('colorPicker');
        const secondaryColor = document.getElementById('secondaryColor');
        const fontSelect = document.getElementById('fontSelect');
        const fontSize = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');

        if (textInput) textInput.value = this.design.text || '';
        if (colorPicker) colorPicker.value = this.design.textColor || '#D4AF37';
        if (secondaryColor) secondaryColor.value = this.design.backgroundColor || '#081226';
        if (fontSelect) fontSelect.value = this.design.fontFamily || 'Cairo';
        if (fontSize) fontSize.value = this.design.fontSize || 24;
        if (fontSizeValue) fontSizeValue.textContent = (this.design.fontSize || 24) + 'px';
    }

    // ===== Export Design =====
    exportAsImage() {
        const preview = document.getElementById('designPreview');
        if (!preview || !preview.querySelector('.design-preview-container')) {
            this.showToast('لا يوجد تصميم للتصدير', 'error');
            return;
        }

        const container = preview.querySelector('.design-preview-container');
        
        if (typeof html2canvas !== 'undefined') {
            html2canvas(container, {
                backgroundColor: this.design.backgroundColor,
                scale: 2
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `newmoon-design-${Date.now()}.png`;
                link.href = canvas.toDataURL();
                link.click();
                this.showToast('تم تصدير التصميم بنجاح', 'success');
            }).catch(() => {
                this.copyDesignToClipboard();
            });
        } else {
            this.copyDesignToClipboard();
        }
    }

    copyDesignToClipboard() {
        const designData = JSON.stringify(this.getDesignData(), null, 2);
        navigator.clipboard.writeText(designData).then(() => {
            this.showToast('تم نسخ بيانات التصميم', 'success');
        });
    }

    shareDesign() {
        const designData = this.getDesignData();
        const encoded = btoa(JSON.stringify(designData));
        const shareUrl = `${window.location.origin}${window.location.pathname}?design=${encoded}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'تصميم New Moon',
                text: 'شاهد تصميمي',
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                this.showToast('تم نسخ رابط المشاركة', 'success');
            });
        }
    }

    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        const designParam = params.get('design');
        if (!designParam) return;

        try {
            const designData = JSON.parse(atob(designParam));
            this.currentProduct = designData.product;
            this.design = { ...designData.design };
            this.restoreUI();
            this.showCanvas();
            this.updatePreview();
            this.showToast('تم تحميل التصميم من الرابط', 'info');
        } catch (e) {
            console.error('Error loading design from URL:', e);
        }
    }

    // ===== Toast Notifications =====
    showToast(message, type = 'info') {
        const existing = document.querySelector('.studio-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `studio-toast studio-toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ===== Keyboard Shortcuts =====
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveDesign();
                this.showToast('تم الحفظ', 'success');
            }

            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.undo();
            }

            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
                e.preventDefault();
                this.redo();
            }

            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.exportAsImage();
            }
        });
    }

    // ===== Undo/Redo =====
    saveToHistory() {
        this.designHistory = this.designHistory.slice(0, this.historyIndex + 1);
        this.designHistory.push(JSON.parse(JSON.stringify(this.design)));
        this.historyIndex = this.designHistory.length - 1;
        
        if (this.designHistory.length > 50) {
            this.designHistory.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.design = JSON.parse(JSON.stringify(this.designHistory[this.historyIndex]));
            this.restoreUI();
            this.updatePreview();
            this.showToast('تم التراجع', 'info');
        }
    }

    redo() {
        if (this.historyIndex < this.designHistory.length - 1) {
            this.historyIndex++;
            this.design = JSON.parse(JSON.stringify(this.designHistory[this.historyIndex]));
            this.restoreUI();
            this.updatePreview();
            this.showToast('تم الإعادة', 'info');
        }
    }

    // ===== Enhanced Preview Tab =====
    setupPreview() {
        const previewTab = document.getElementById('preview-tab');
        if (previewTab && !previewTab.querySelector('.preview-fullscreen-btn')) {
            const fullscreenBtn = document.createElement('button');
            fullscreenBtn.className = 'btn btn-primary preview-fullscreen-btn';
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> معاينة كاملة';
            fullscreenBtn.style.marginBottom = 'var(--spacing-lg)';
            fullscreenBtn.onclick = () => this.showFullscreenPreview();
            previewTab.insertBefore(fullscreenBtn, previewTab.firstChild);
        }
    }

    showFullscreenPreview() {
        const preview = document.getElementById('designPreview');
        if (!preview) return;

        const modal = document.createElement('div');
        modal.className = 'preview-modal';
        modal.innerHTML = `
            <div class="preview-modal-content">
                <button class="preview-modal-close">&times;</button>
                ${preview.innerHTML}
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.preview-modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    // ===== Tabs Management =====
    setupTabs() {
        const tabs = document.querySelectorAll('.studio-tab');
        const tabContents = document.querySelectorAll('.studio-tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(`${targetTab}-tab`).classList.add('active');
            });
        });
    }

    // ===== Product Selection =====
    setupProductSelection() {
        const categories = document.querySelectorAll('.product-category');
        
        categories.forEach(category => {
            category.addEventListener('click', () => {
                const productType = category.getAttribute('data-product');
                this.selectProduct(productType);
            });
        });
    }

    selectProduct(productType) {
        this.currentProduct = productType;
        this.saveToHistory();
        
        document.querySelectorAll('.product-category').forEach(cat => {
            cat.classList.remove('selected');
        });
        document.querySelector(`[data-product="${productType}"]`).classList.add('selected');
        
        document.querySelector('[data-tab="design"]').click();
        this.showCanvas();
    }

    // ===== Design Tools =====
    setupDesignTools() {
        const textInput = document.getElementById('textInput');
        if (textInput) {
            textInput.addEventListener('input', (e) => {
                this.design.text = e.target.value;
                this.saveToHistory();
                this.updatePreview();
            });
        }

        const colorPicker = document.getElementById('colorPicker');
        if (colorPicker) {
            colorPicker.addEventListener('input', (e) => {
                this.design.textColor = e.target.value;
                this.saveToHistory();
                this.updatePreview();
            });
        }

        const secondaryColor = document.getElementById('secondaryColor');
        if (secondaryColor) {
            secondaryColor.addEventListener('input', (e) => {
                this.design.backgroundColor = e.target.value;
                this.saveToHistory();
                this.updatePreview();
            });
        }

        const fontSelect = document.getElementById('fontSelect');
        if (fontSelect) {
            fontSelect.addEventListener('change', (e) => {
                this.design.fontFamily = e.target.value;
                this.saveToHistory();
                this.updatePreview();
            });
        }

        const fontSize = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSize && fontSizeValue) {
            fontSize.addEventListener('input', (e) => {
                this.design.fontSize = e.target.value;
                fontSizeValue.textContent = e.target.value + 'px';
                this.saveToHistory();
                this.updatePreview();
            });
        }

        const logoUpload = document.getElementById('logoUpload');
        const removeLogoBtn = document.getElementById('removeLogoBtn');
        const logoPreview = document.getElementById('logoPreview');
        const logoPreviewImg = document.getElementById('logoPreviewImg');
        
        if (logoUpload) {
            logoUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.design.logo = event.target.result;
                        this.saveToHistory();
                        this.saveDesign(); // Save immediately
                        this.updatePreview();
                        this.updateLogoPreview();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        if (removeLogoBtn) {
            removeLogoBtn.addEventListener('click', () => {
                this.design.logo = null;
                if (logoUpload) logoUpload.value = '';
                this.saveToHistory();
                this.saveDesign(); // Save immediately
                this.updatePreview();
                this.updateLogoPreview();
            });
        }
        
        // Show logo preview if exists
        this.updateLogoPreview();
    }

    // ===== Logo Preview =====
    updateLogoPreview() {
        const logoPreview = document.getElementById('logoPreview');
        const logoPreviewImg = document.getElementById('logoPreviewImg');
        const removeLogoBtn = document.getElementById('removeLogoBtn');
        
        if (this.design.logo) {
            if (logoPreview) logoPreview.style.display = 'block';
            if (logoPreviewImg) logoPreviewImg.src = this.design.logo;
            if (removeLogoBtn) removeLogoBtn.style.display = 'inline-flex';
        } else {
            if (logoPreview) logoPreview.style.display = 'none';
            if (logoPreviewImg) logoPreviewImg.src = '';
            if (removeLogoBtn) removeLogoBtn.style.display = 'none';
        }
    }

    // ===== Canvas & Preview =====
    showCanvas() {
        const placeholder = document.getElementById('canvasPlaceholder');
        const preview = document.getElementById('designPreview');
        
        if (placeholder) placeholder.style.display = 'none';
        if (preview) {
            preview.style.display = 'block';
            this.updatePreview();
        }
    }

    updatePreview() {
        const preview = document.getElementById('designPreview');
        if (!preview || !this.currentProduct) return;

        const container = document.createElement('div');
        container.className = 'design-preview-container';
        container.style.backgroundColor = this.design.backgroundColor;

        if (this.design.logo) {
            const logoImg = document.createElement('img');
            logoImg.src = this.design.logo;
            logoImg.alt = 'Logo';
            logoImg.className = 'design-preview-logo';
            container.appendChild(logoImg);
        }

        if (this.design.text) {
            const textP = document.createElement('p');
            textP.className = 'design-preview-text';
            textP.style.fontFamily = `'${this.design.fontFamily}', sans-serif`;
            textP.style.fontSize = `${this.design.fontSize}px`;
            textP.style.color = this.design.textColor;
            textP.textContent = this.design.text;
            container.appendChild(textP);
        }

        if (!this.design.logo && !this.design.text) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'design-preview-empty';
            const icon = document.createElement('i');
            icon.className = 'fas fa-image design-preview-empty-icon';
            emptyDiv.appendChild(icon);
            const emptyText = document.createElement('p');
            emptyText.textContent = 'ابدأ بإضافة نص أو شعار';
            emptyDiv.appendChild(emptyText);
            container.appendChild(emptyDiv);
        }

        preview.innerHTML = '';
        preview.appendChild(container);
        preview.classList.remove('design-preview-hidden');
    }

    // ===== Actions =====
    setupActions() {
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('هل أنت متأكد من إعادة تعيين التصميم؟')) {
                    this.resetDesign();
                }
            });
        }

        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveDesign();
                this.showToast('تم الحفظ بنجاح', 'success');
            });
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportAsImage();
            });
        }
    }

    resetDesign() {
        // Preserve logo if exists
        const currentLogo = this.design.logo;
        
        this.design = {
            text: '',
            textColor: '#D4AF37',
            backgroundColor: '#081226',
            fontFamily: 'Cairo',
            fontSize: 24,
            logo: currentLogo // Keep existing logo
        };

        const textInput = document.getElementById('textInput');
        const colorPicker = document.getElementById('colorPicker');
        const secondaryColor = document.getElementById('secondaryColor');
        const fontSelect = document.getElementById('fontSelect');
        const fontSize = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        const logoUpload = document.getElementById('logoUpload');

        if (textInput) textInput.value = '';
        if (colorPicker) colorPicker.value = '#D4AF37';
        if (secondaryColor) secondaryColor.value = '#081226';
        if (fontSelect) fontSelect.value = 'Cairo';
        if (fontSize) fontSize.value = 24;
        if (fontSizeValue) fontSizeValue.textContent = '24px';
        // Don't clear logoUpload - keep the logo

        this.saveToHistory();
        this.updatePreview();
    }

    getDesignData() {
        return {
            product: this.currentProduct,
            design: { ...this.design }
        };
    }
}

// Initialize Studio when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.studioManager = new StudioManager();
    console.log('✅ Studio Manager initialized');
});

