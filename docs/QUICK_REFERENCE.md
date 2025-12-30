# 📚 Quick Reference - مرجع سريع

**للاستخدام السريع أثناء العمل**

---

## 🔑 مفاتيح مهمة

### Feedback System:
```javascript
// الحصول على جميع Feedbacks
FeedbackSystem.getAllFeedbacks()

// مسح جميع Feedbacks
FeedbackSystem.clearAllFeedbacks()

// LocalStorage Key
localStorage.getItem('newmoon_feedback')
```

### Notification:
```javascript
// LocalStorage Key
localStorage.getItem('newmoon_feedback_notification_seen')
```

---

## 📁 مسارات الملفات المهمة

### Components:
- Feedback Form: `components/feedback-form.html`
- Notification: `components/feedback-notification.html`
- Header: `components/header.html`
- Footer: `components/footer.html`

### CSS:
- Responsive: `css/core/responsive.css`
- Feedback Form: `css/components/feedback-form.css`
- Notification: `css/components/feedback-notification.css`
- Header: `css/components/header.css`

### JavaScript:
- Feedback: `js/components/feedback.js`
- Navigation: `js/components/navigation.js`
- Component Loader: `js/core/component-loader.js`

---

## 🎨 Design System Variables

### الألوان:
```css
--primary-gold: #D4AF37
--dark-blue: #081226
--white: #FFFFFF
```

### Breakpoints:
```css
Mobile: < 768px
Tablet: 769px - 1024px
Desktop: > 1024px
```

---

## 🔧 تعديلات سريعة

### تغيير API Endpoint للـ Feedback:
```javascript
// في js/components/feedback.js
const API_ENDPOINT = '/api/feedback'; // السطر 177
```

### تغيير وقت ظهور Notification:
```javascript
// في js/components/feedback.js
setTimeout(() => {
    notification.classList.add('show');
}, 3000); // 3 ثوانٍ
```

---

## 📝 صفحات HTML الرئيسية

1. `index.html` - الصفحة الرئيسية
2. `about.html` - من نحن
3. `solutions.html` - حلولنا
4. `contact.html` - تواصل معنا
5. `portfolio.html` - أعمالنا
6. `companies.html` - عملاؤنا
7. `studio.html` - استوديو التصميم
8. `return-policy.html` - سياسات الاسترجاع

---

## 🚀 أوامر سريعة

### فتح المشروع:
```bash
cd NewMoon_V1_ProductReady
```

### البحث عن ملف:
```bash
# في VS Code: Ctrl+P ثم اكتب اسم الملف
```

---

**آخر تحديث:** 2025

