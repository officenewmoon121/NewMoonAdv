/**
 * NEW MOON V1 - FEEDBACK SYSTEM
 * Professional Feedback & Suggestions Handler
 */

class FeedbackSystem {
    constructor() {
        this.modal = null;
        this.form = null;
        this.floatBtn = null;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready and components to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Wait a bit for ComponentLoader to finish
                setTimeout(() => this.setup(), 500);
            });
        } else {
            // Wait a bit for ComponentLoader to finish
            setTimeout(() => this.setup(), 500);
        }
    }

    setup() {
        // Get elements - try multiple times if not found
        this.modal = document.getElementById('feedbackModal');
        this.form = document.getElementById('feedbackForm');
        this.floatBtn = document.getElementById('feedbackFloatBtn');
        const overlay = document.getElementById('feedbackModalOverlay');
        const closeBtn = document.getElementById('feedbackModalClose');
        const cancelBtn = document.getElementById('feedbackCancelBtn');
        const messageTextarea = document.getElementById('feedbackMessage');
        const charCount = document.getElementById('feedbackCharCount');
        const pageInput = document.getElementById('feedbackPage');

        // If elements not found, try again after a delay (components might still be loading)
        if (!this.modal || !this.form || !this.floatBtn) {
            console.warn('[FeedbackSystem] Elements not found, retrying...');
            setTimeout(() => this.setup(), 1000);
            return;
        }

        // Setup notification
        this.setupNotification();

        // Set current page
        if (pageInput) {
            pageInput.value = window.location.pathname.split('/').pop() || 'index.html';
        }

        // Float button click
        if (this.floatBtn) {
            this.floatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('[FeedbackSystem] Float button clicked');
                this.openModal();
            });
        } else {
            console.warn('[FeedbackSystem] Float button not found');
        }

        // Close handlers
        if (overlay) {
            overlay.addEventListener('click', () => this.closeModal());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Character counter
        if (messageTextarea && charCount) {
            messageTextarea.addEventListener('input', () => {
                const length = messageTextarea.value.length;
                charCount.textContent = length;
                
                if (length > 1000) {
                    charCount.classList.add('warning');
                    messageTextarea.value = messageTextarea.value.substring(0, 1000);
                    charCount.textContent = 1000;
                } else {
                    charCount.classList.remove('warning');
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        console.log('[FeedbackSystem] ✅ Initialized');
    }

    setupNotification() {
        // Try to find notification element with retry mechanism
        let retries = 0;
        const maxRetries = 10;
        
        const trySetup = () => {
            const notification = document.getElementById('feedbackNotification');
            
            if (!notification) {
                retries++;
                if (retries < maxRetries) {
                    console.log(`[FeedbackSystem] Notification not found, retrying... (${retries}/${maxRetries})`);
                    setTimeout(trySetup, 500);
                } else {
                    console.warn('[FeedbackSystem] Notification element not found after retries');
                }
                return;
            }

            // Found notification, setup now
            const showBtn = document.getElementById('feedbackNotificationBtn');
            const closeBtn = document.getElementById('feedbackNotificationClose');
            const pageElement = document.getElementById('feedbackNotificationPage');

            // Set current page name
            if (pageElement) {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const pageNames = {
                    'index.html': 'الصفحة الرئيسية',
                    'about.html': 'من نحن',
                    'solutions.html': 'حلولنا',
                    'contact.html': 'تواصل معنا',
                    'portfolio.html': 'أعمالنا',
                    'companies.html': 'عملاؤنا',
                    'studio.html': 'استوديو التصميم',
                    'return-policy.html': 'سياسات الاسترجاع'
                };
                const pageName = pageNames[currentPage] || currentPage;
                pageElement.textContent = `📍 ${pageName}`;
            }

            // Check if user has seen notification before
            const hasSeenNotification = localStorage.getItem('newmoon_feedback_notification_seen');
            
            // Show notification after 3 seconds if not seen before
            if (!hasSeenNotification) {
                setTimeout(() => {
                    if (notification) {
                        // Force display first
                        notification.style.display = 'block';
                        // Then add show class for animation
                        setTimeout(() => {
                            notification.classList.add('show');
                            console.log('[FeedbackSystem] ✅ Notification shown');
                        }, 10);
                    }
                }, 3000);
            } else {
                console.log('[FeedbackSystem] Notification already seen by user');
            }

            // Handle show feedback button
            if (showBtn) {
                showBtn.addEventListener('click', () => {
                    this.openModal();
                    this.hideNotification();
                });
            }

            // Handle close button
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.hideNotification();
                });
            }
        };

        // Start trying
        trySetup();
    }

    hideNotification() {
        const notification = document.getElementById('feedbackNotification');
        if (notification) {
            notification.classList.remove('show');
            localStorage.setItem('newmoon_feedback_notification_seen', 'true');
        }
    }

    openModal() {
        if (!this.modal) {
            console.error('[FeedbackSystem] Modal not found');
            return;
        }
        
        console.log('[FeedbackSystem] Opening modal');
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = this.form?.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset form after animation
            setTimeout(() => {
                if (this.form) {
                    this.form.reset();
                    const successDiv = document.getElementById('feedbackSuccess');
                    if (successDiv) {
                        successDiv.style.display = 'none';
                    }
                    if (this.form) {
                        this.form.style.display = 'block';
                    }
                }
            }, 300);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;

        const formData = new FormData(this.form);
        const data = {
            type: formData.get('type'),
            name: formData.get('name') || 'غير محدد',
            email: formData.get('email') || 'غير محدد',
            page: formData.get('page'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Validate
        if (!data.type || !data.message) {
            this.showError('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }

        this.isSubmitting = true;
        const submitBtn = this.form.querySelector('.feedback-btn-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جاري الإرسال...</span>';
        }

        try {
            // Save to LocalStorage (temporary storage)
            this.saveToLocalStorage(data);

            // Try to send to API (if available)
            await this.sendToAPI(data);

            // Show success
            this.showSuccess();

        } catch (error) {
            console.error('[FeedbackSystem] Error:', error);
            // Even if API fails, data is saved locally
            this.showSuccess();
        } finally {
            this.isSubmitting = false;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>إرسال</span>';
            }
        }
    }

    saveToLocalStorage(data) {
        try {
            const stored = localStorage.getItem('newmoon_feedback') || '[]';
            const feedbacks = JSON.parse(stored);
            feedbacks.push(data);
            
            // Keep only last 100 feedbacks
            if (feedbacks.length > 100) {
                feedbacks.shift();
            }
            
            localStorage.setItem('newmoon_feedback', JSON.stringify(feedbacks));
            console.log('[FeedbackSystem] ✅ Saved to LocalStorage');
        } catch (error) {
            console.error('[FeedbackSystem] LocalStorage error:', error);
        }
    }

    async sendToAPI(data) {
        // API endpoint - يمكن تغييره لاحقاً
        // للحفظ في Backend: غيّر هذا الرابط لـ API الخاص بك
        // مثال: 'https://yourdomain.com/api/feedback'
        // أو: '/api/feedback.php'
        const API_ENDPOINT = '/api/feedback'; // أو أي endpoint آخر
        
        // ⚠️ ملاحظة: حالياً API غير مفعّل - الرسائل تُحفظ في LocalStorage فقط
        // لتفعيل API: أنشئ Backend endpoint وغيّر الرابط أعلاه
        
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('[FeedbackSystem] ✅ Sent to API');
                return await response.json();
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            // API not available - that's okay, data is saved locally
            console.log('[FeedbackSystem] API not available, using LocalStorage only');
            return null;
        }
    }

    showSuccess() {
        const form = this.form;
        const successDiv = document.getElementById('feedbackSuccess');
        
        if (form && successDiv) {
            form.style.display = 'none';
            successDiv.style.display = 'block';
            
            // Auto close after 3 seconds
            setTimeout(() => {
                this.closeModal();
            }, 3000);
        }
    }

    showError(message) {
        // Simple alert for now - can be enhanced with toast notification
        alert(message);
    }

    // Method to get all feedbacks (for admin/dashboard)
    static getAllFeedbacks() {
        try {
            const stored = localStorage.getItem('newmoon_feedback') || '[]';
            return JSON.parse(stored);
        } catch (error) {
            console.error('[FeedbackSystem] Error getting feedbacks:', error);
            return [];
        }
    }

    // Method to clear all feedbacks (for admin)
    static clearAllFeedbacks() {
        try {
            localStorage.removeItem('newmoon_feedback');
            console.log('[FeedbackSystem] ✅ Cleared all feedbacks');
        } catch (error) {
            console.error('[FeedbackSystem] Error clearing feedbacks:', error);
        }
    }
}

// Initialize after components are loaded
function initFeedbackSystem() {
    // Wait for ComponentLoader to finish
    if (typeof ComponentLoader !== 'undefined') {
        // Check if components are loaded
        const checkComponents = setInterval(() => {
            const modal = document.getElementById('feedbackModal');
            const floatBtn = document.getElementById('feedbackFloatBtn');
            
            if (modal && floatBtn) {
                clearInterval(checkComponents);
                console.log('[FeedbackSystem] Components loaded, initializing...');
                window.feedbackSystem = new FeedbackSystem();
            }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => {
            clearInterval(checkComponents);
            if (!window.feedbackSystem) {
                console.warn('[FeedbackSystem] Components not loaded, initializing anyway...');
                window.feedbackSystem = new FeedbackSystem();
            }
        }, 5000);
    } else {
        // ComponentLoader not available, initialize directly
        window.feedbackSystem = new FeedbackSystem();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initFeedbackSystem, 1000);
    });
} else {
    setTimeout(initFeedbackSystem, 1000);
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.FeedbackSystem = FeedbackSystem;
}

