# 🤖 AI Prompt - New Moon V1 Project

**استخدم هذا الـ Prompt في جلسة جديدة مع AI**

---

## 📋 Context Prompt

```
أنت تعمل على مشروع New Moon V1 - موقع شركة للحلول المؤسسية والبراندنج.

━━━━━━━━━━━━━━━━━━━
📂 فهم المشروع
━━━━━━━━━━━━━━━━━━━

المشروع النشط: NewMoon_V1_ProductReady
المجلد: Z:\NewMoon_V1_ProductReady

هذا مشروع HTML/CSS/JavaScript منظم:
- Component-based architecture
- Responsive design
- Feedback System كامل
- Companies & Portfolio مع "مشاهدة المزيد"

━━━━━━━━━━━━━━━━━━━
✅ ما تم إنجازه
━━━━━━━━━━━━━━━━━━━

1. نظام Feedback كامل:
   - Modal للنموذج (components/feedback-form.html)
   - Alert للمستخدمين (components/feedback-notification.html)
   - حفظ في LocalStorage
   - صفحة Admin (feedback-admin.html)
   - جاهز للربط مع API

2. صفحة الشركات:
   - عرض أول 12 شركة
   - كارت "مشاهدة المزيد"
   - دعم 37 شركة (data/companies.json)
   - JavaScript: js/components/companies.js

3. صفحة الأعمال:
   - عرض أول 6 أعمال
   - كارت "مشاهدة المزيد"
   - دعم الفلاتر
   - JavaScript: js/components/portfolio.js

4. Responsive Design:
   - Mobile, Tablet, Desktop
   - Mobile Menu مع Scroll
   - الأزرار العائمة متجاوبة

5. صفحات السياسات:
   - return-policy.html
   - رابط في Footer

━━━━━━━━━━━━━━━━━━━
📝 المهام المتبقية
━━━━━━━━━━━━━━━━━━━

أولوية عالية:
1. نقل صور الشركات (37 صورة)
   - من: z:\newmoon\NewMoon_V0.1_HTML\assets\clients_webp\
   - إلى: assets/images/companies/
   - راجع: docs/COPY_COMPANIES_IMAGES.md

2. اختبار شامل على جميع الأجهزة

أولوية متوسطة:
3. ربط Feedback System مع Backend
   - الملف: js/components/feedback.js (السطر 287)
   - API_ENDPOINT يحتاج تحديث

4. إضافة صفحات السياسات المتبقية:
   - privacy-policy.html
   - terms-conditions.html

━━━━━━━━━━━━━━━━━━━
📁 Structure المشروع
━━━━━━━━━━━━━━━━━━━

NewMoon_V1_ProductReady/
├── components/          # HTML Components
│   ├── feedback-form.html
│   ├── feedback-notification.html
│   ├── header.html
│   └── footer.html
├── css/
│   ├── components/      # Component Styles
│   ├── core/           # Core Utilities
│   └── pages/          # Page-specific Styles
├── js/
│   ├── components/      # Component Logic
│   │   ├── feedback.js
│   │   ├── companies.js
│   │   └── portfolio.js
│   └── core/          # Core Systems
├── data/               # JSON Data
│   ├── companies.json
│   └── portfolio.json
├── assets/
│   └── images/
│       └── companies/  # 37 صورة (يجب نقلها)
└── docs/              # Documentation

━━━━━━━━━━━━━━━━━━━
🔧 الملفات المهمة
━━━━━━━━━━━━━━━━━━━

Feedback System:
- js/components/feedback.js (السطر 287 - API_ENDPOINT)
- components/feedback-form.html
- components/feedback-notification.html
- feedback-admin.html

Companies:
- js/components/companies.js
- data/companies.json
- assets/images/companies/ (37 صورة)

Portfolio:
- js/components/portfolio.js
- data/portfolio.json

Documentation:
- docs/FINAL_SUMMARY.md - ملخص شامل
- docs/REMAINING_TASKS.md - المهام المتبقية
- docs/START_TOMORROW.md - دليل البدء
- docs/COPY_COMPANIES_IMAGES.md - دليل نقل الصور

━━━━━━━━━━━━━━━━━━━
📌 قواعد العمل
━━━━━━━━━━━━━━━━━━━

1. المشروع نظيف ومنظم - لا تضيف ملفات تجريبية
2. استخدم Component-based architecture
3. جميع التعديلات في NewMoon_V1_ProductReady فقط
4. المجلدات المرجعية للقراءة فقط:
   - z:\newmoon\NewMoon_V0.1_HTML\
   - z:\مجلد جديد\

5. عند إضافة ميزة:
   - اتبع نفس البنية الموجودة
   - أضف توثيق في docs/
   - اختبر على جميع الأجهزة

━━━━━━━━━━━━━━━━━━━
🎯 الهدف الحالي
━━━━━━━━━━━━━━━━━━━

الخطوة التالية: نقل صور الشركات (37 صورة)
الوقت المتوقع: 30-60 دقيقة

بعد النقل: اختبار شامل على جميع الأجهزة

━━━━━━━━━━━━━━━━━━━
📚 Documentation
━━━━━━━━━━━━━━━━━━━

اقرأ أولاً:
- docs/FINAL_SUMMARY.md - كل شيء موجود هنا
- docs/REMAINING_TASKS.md - المهام المتبقية
- docs/START_TOMORROW.md - دليل البدء

للتفاصيل:
- docs/FEEDBACK_SYSTEM_GUIDE.md - دليل Feedback
- docs/HOW_TO_VIEW_FEEDBACKS.md - عرض الاقتراحات
- docs/COPY_COMPANIES_IMAGES.md - نقل الصور
```

---

## 🚀 Quick Start Prompt

```
اعمل على مشروع New Moon V1 في Z:\NewMoon_V1_ProductReady

المشروع: HTML/CSS/JavaScript - Component-based
الحالة: جاهز للإنتاج - يحتاج نقل صور الشركات (37 صورة)

اقرأ أولاً:
- docs/FINAL_SUMMARY.md
- docs/REMAINING_TASKS.md
- docs/START_TOMORROW.md

الهدف: نقل صور الشركات من z:\newmoon\NewMoon_V0.1_HTML\assets\clients_webp\ إلى assets/images/companies/

راجع: docs/COPY_COMPANIES_IMAGES.md للتفاصيل
```

---

## 📝 Task-Specific Prompts

### لنقل صور الشركات:
```
ساعدني في نقل صور الشركات (37 صورة) من المجلد المرجعي إلى المشروع النشط.

المصدر: z:\newmoon\NewMoon_V0.1_HTML\assets\clients_webp\
الهدف: Z:\NewMoon_V1_ProductReady\assets\images\companies\

الملفات: client_1.webp إلى client_37.webp

راجع: docs/COPY_COMPANIES_IMAGES.md
```

### لاختبار المشروع:
```
ساعدني في اختبار مشروع New Moon V1 على جميع الأجهزة.

اختبر:
- Feedback System
- Companies "مشاهدة المزيد"
- Portfolio "مشاهدة المزيد"
- Mobile Menu Scroll
- Responsive Design

راجع: docs/FINAL_SUMMARY.md للميزات
```

### لإضافة ميزة جديدة:
```
أريد إضافة [الميزة] لمشروع New Moon V1.

المشروع: Component-based architecture
الموقع: Z:\NewMoon_V1_ProductReady

اتبع:
- نفس البنية الموجودة
- Component-based approach
- Responsive design
- أضف توثيق في docs/

راجع: docs/CSS_ARCHITECTURE.md للبنية
```

---

## 🔍 Search Prompts

### للبحث عن شيء معين:
```
في مشروع New Moon V1، أين يوجد [الشيء]؟

راجع:
- docs/FINAL_SUMMARY.md - ملخص شامل
- docs/START_TOMORROW.md - دليل البدء
- README.md - نظرة عامة
```

### لفهم ميزة معينة:
```
شرح لي كيف يعمل [الميزة] في مشروع New Moon V1.

راجع:
- docs/FEEDBACK_SYSTEM_GUIDE.md - للـ Feedback
- js/components/ - للـ JavaScript
- css/components/ - للـ CSS
```

---

## ✅ Checklist Prompt

```
اعطني checklist للمهام المتبقية في مشروع New Moon V1.

راجع:
- docs/REMAINING_TASKS.md
- docs/FINAL_SUMMARY.md
```

---

**استخدم هذا الـ Prompt في بداية كل جلسة جديدة!**

