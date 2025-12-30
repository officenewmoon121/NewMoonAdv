# 🎨 CSS Architecture - New Moon V1

## 📋 نظرة عامة

هذا المستند يوضح البنية المعمارية لـ CSS في مشروع New Moon V1.

---

## 🏗️ البنية الحالية

```
css/
├── variables.css          # Design System Variables
├── reset.css              # CSS Reset
├── base.css               # Base Styles & Utilities
├── components/            # Component Styles
│   ├── loading.css
│   ├── header.css
│   ├── footer.css
│   ├── hero.css
│   ├── trust-bar.css
│   ├── whatsapp-float.css
│   ├── about-hero.css
│   ├── contact-form.css
│   └── studio-hero.css
└── pages/                 # Page-specific Styles
    ├── home.css
    ├── about.css
    ├── contact.css
    └── studio.css
```

---

## 📐 Load Order (Critical)

ترتيب تحميل CSS مهم جداً:

```html
1. variables.css      # Design System أولاً
2. reset.css          # Reset ثانياً
3. base.css           # Base Styles
4. components/*.css   # Component Styles
5. pages/*.css        # Page-specific Styles (آخراً)
```

---

## 🎯 Design System

### **Variables Structure**

```css
:root {
  /* Colors */
  --primary-gold: #D4AF37;
  --dark-blue: #081226;
  
  /* Typography */
  --font-main: 'Cairo', sans-serif;
  --text-base: 1rem;
  
  /* Spacing */
  --spacing-md: 1rem;
  
  /* Shadows */
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-normal: 0.3s ease;
}
```

**القاعدة**: دائماً استخدم CSS Variables، لا تكتب قيم مباشرة.

---

## 📦 Component Styles

### **Naming Convention**

```css
/* Component Name */
.component-name {
  /* Base Styles */
}

.component-name__element {
  /* Element Styles */
}

.component-name--modifier {
  /* Modifier Styles */
}
```

**مثال:**
```css
.trust-bar { }
.trust-bar__item { }
.trust-bar__item--highlighted { }
```

---

## 🎨 Utility Classes

### **في base.css**

```css
/* Text Utilities */
.text-gold { color: var(--primary-gold); }
.text-center { text-align: center; }

/* Spacing Utilities */
.mt-lg { margin-top: var(--spacing-lg); }
.p-xl { padding: var(--spacing-xl); }
```

**القاعدة**: استخدم Utility Classes للقيم الشائعة.

---

## 📱 Responsive Design

### **Breakpoints**

```css
/* Mobile First Approach */
@media (max-width: 768px) { }
@media (max-width: 1024px) { }
@media (min-width: 1400px) { }
```

**القاعدة**: ابدأ بـ Mobile ثم أضف Desktop enhancements.

---

## ✅ Best Practices

### **1. Use Variables**
```css
/* ✅ Good */
color: var(--primary-gold);

/* ❌ Bad */
color: #D4AF37;
```

### **2. Component Isolation**
```css
/* ✅ Good - كل component في ملف منفصل */
/* components/hero.css */
.hero-section { }

/* ❌ Bad - كل شيء في ملف واحد */
```

### **3. Consistent Spacing**
```css
/* ✅ Good */
margin-bottom: var(--spacing-lg);

/* ❌ Bad */
margin-bottom: 24px;
```

### **4. Semantic Class Names**
```css
/* ✅ Good */
.contact-card { }

/* ❌ Bad */
.box-1 { }
```

---

## 🔧 Maintenance Guidelines

### **عند إضافة Component جديد:**

1. أنشئ ملف في `css/components/component-name.css`
2. استخدم Design System Variables
3. أضف Responsive Styles
4. اربطه في الصفحة المطلوبة

### **عند تعديل Design System:**

1. عدّل `variables.css` فقط
2. التغييرات ستطبق تلقائياً على كل الموقع

---

## 📚 Resources

- [CSS Architecture](https://css-tricks.com/css-architecture/)
- [BEM Methodology](http://getbem.com/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

**تم إنشاء هذا المستند بواسطة فريق Product & Engineering** 🚀

