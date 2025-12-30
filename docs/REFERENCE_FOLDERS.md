# 📁 دليل المجلدات المرجعية

هذا الملف يوثق المجلدات المرجعية التي يمكن الرجوع إليها عند الحاجة. **هذه المجلدات مرجعية فقط - لا يتم التعديل عليها أو نقل كود منها مباشرة.**

---

## 📂 المجلد 1: **مجلد جديد** (مجلد التطوير التجريبي)

**الموقع:** `z:\مجلد جديد\`

### 📋 الوصف:
مجلد يحتوي على نسخة تجريبية من الموقع مع CSS مدموج في ملف واحد وبنية HTML كاملة. يحتوي على محتوى غني ومجموعة كبيرة من الكتالوجات والصور.

### 🎯 متى تستخدمه:
- **استخراج المحتوى:** الكتالوجات، الصور، المنتجات
- **مرجع للتصميم:** CSS مدموج يمكن استخراج أنماط منه
- **محتوى Solutions:** صفحات Solutions كاملة مع تفاصيل
- **Studio React:** تطبيق React/TypeScript كامل للاستوديو

### 📦 المحتويات الرئيسية:

#### ملفات HTML:
- `index.html` (535 سطر) - الصفحة الرئيسية
- `index1.html` (1255 سطر) - نسخة بديلة
- `solutions.html` (742 سطر)
- `about.html`, `companies.html`, `portfolio.html`, `contact.html`

#### CSS:
- `css/debug.css` - **ملف CSS مدموج كامل** (جميع الأنماط في ملف واحد)
- `css/main.css`, `css/contact.css`

#### JavaScript:
- `js/nav.js` - التنقل
- `js/portfolio.js` - معرض الأعمال

#### Assets (مهم جداً):
- **كتالوجات المنتجات:**
  - `assets/Economic-Sets-Catalog-2026-v3/` (58 صورة)
  - `assets/Electronics-Catalog-2026-v3/`
  - `assets/General-Catalog-2026-v3/`
  - `assets/NoteBook-Catalog-2026-v3/`
  - `assets/Pen-Catalog-2026-v6/`
  - `assets/Usb-Flash Memory-Catalog-2026-v3/`
  - `assets/VIP-Sets-Catalog-2026-v3/`
  - `assets/NewMoon_Stylish_Inventory/`

- **Solutions Pages:**
  - `assets/solutions/corporate-gifts/` (مع products.json)
  - `assets/solutions/الزي الموحد – Corporate Uniforms/`
  - `assets/solutions/الشنط والتغليف – Packaging Solutions/`
  - `assets/solutions/الطباعة التجارية – Printing Solutions/`
  - `assets/solutions/المعارض والفعاليات – Exhibitions & Events/`
  - `assets/solutions/حلول مخصصة – Custom Solutions/`

- **صور أخرى:**
  - `assets/images/hero.webp`
  - `assets/images/hero-solutions1.jpg`
  - `assets/images/hero-solutions2.jpg`
  - `assets/our_work/` - معرض الأعمال

#### Studio React App:
- `new-moon-studio-glow-main/` - **تطبيق React/TypeScript كامل**
  - مبني بـ Vite + React + TypeScript
  - يستخدم Tailwind CSS + shadcn-ui
  - يحتوي على Supabase integration
  - يمكن استخراج Components منه

#### Components:
- `components/header.html`
- `components/footer.html`

### ⚠️ ملاحظات:
- CSS مدموج في ملف واحد (`debug.css`) - قد يكون مفيد للاستخراج
- يحتوي على محتوى غني جداً (كتالوجات، صور، صفحات)
- HTML طويل جداً (بعض الصفحات 900+ سطر)
- يحتوي على Studio React App كامل

---

## 📂 المجلد 2: **NewMoon_V0.1_HTML** (مجلد النسخة القديمة الكاملة)

**الموقع:** `z:\newmoon\NewMoon_V0.1_HTML\`

### 📋 الوصف:
نسخة قديمة كاملة من الموقع تحتوي على جميع الملفات والصفحات والوظائف. يحتوي على SEO كامل، Service Worker، Analytics، وملفات توثيق شاملة.

### 🎯 متى تستخدمه:
- **وظائف JavaScript:** Studio functions، Navigation، Forms
- **SEO & Analytics:** Google Analytics، Schema Markup، Sitemap
- **ملفات التوثيق:** Guides للنشر والإعداد
- **Studio Advanced:** نسخة متقدمة من الاستوديو
- **صور العملاء:** 37 صورة عملاء
- **Dark Mode:** CSS للوضع المظلم

### 📦 المحتويات الرئيسية:

#### ملفات HTML الأساسية:
- `index.html` (692 سطر) - الصفحة الرئيسية
- `about.html` (399 سطر)
- `companies.html` (209 سطر)
- `contact.html` (224 سطر)
- `portfolio.html` (402 سطر)
- `services.html` (358 سطر)
- `products.html` (480 سطر)
- `studio.html` (248 سطر)
- `testimonials.html` (461 سطر)
- `faq.html` (484 سطر)
- `blog.html` (525 سطر)
- `404.html`, `terms.html`, `privacy.html`

#### JavaScript Files (مهم جداً):
- `studio.js` (425 سطر) - **محرك Studio كامل** (Undo/Redo, Layers, Save, Export)
- `services.js` (93 سطر)
- `products.js` (73 سطر)
- `portfolio.js` (107 سطر)
- `companies.js` (28 سطر)
- `contact.js` (72 سطر)
- `include.js` (12 سطر) - Component loader
- `gallery-data.js` (7 سطر)

#### CSS (منظم):
- `css/variables.css` - متغيرات التصميم
- `css/animations.css` - الأنيميشن
- `css/base.css` - الأنماط الأساسية
- `css/style.css` - الأنماط الرئيسية
- `css/main.css`
- `css/about.css`, `css/companies.css`, `css/contact.css`
- `css/portfolio.css`, `css/products.css`, `css/services.css`
- `css/solutions.css`, `css/studio.css`
- `css/dark-mode.css` - وضع الظلام

#### Studio Advanced:
- `studio_advanced/studio_advanced.html`
- `studio_advanced/studio_advanced.css`
- `studio_advanced/studio_advanced.js`

#### SEO & Analytics:
- `sitemap.xml` - خريطة الموقع
- `robots.txt` - ملف الروبوتات
- `schema-markup.html` - Schema Markup
- `google-analytics.html` - Google Analytics code
- `manifest.json` - PWA Manifest
- `service-worker.js` - Service Worker

#### Components:
- `nav.html` (368 سطر) - Navigation component
- `footer.html` (274 سطر) - Footer component
- `nav.js` (4 سطر) - Navigation JS

#### Data Files:
- `products.json` (108 سطر) - بيانات المنتجات
- `products-data.html` (138 سطر)
- `product-details.html` (157 سطر)
- `gallery-data.js` - بيانات المعرض

#### Assets:
- `assets/clients_webp/` - **37 صورة للعملاء** (client_1.webp إلى client_37.webp)
- `assets/images/hero.webp`
- `assets/our_work/` - معرض الأعمال
- `assets/favicon/` - Favicons

#### Solutions:
- `solutions/promotional-gifts/` (مع products.json)
- `solutions/الزي الموحد – Corporate Uniforms/`
- `solutions/الشنط والتغليف – Packaging Solutions/`
- `solutions/الطباعة التجارية – Printing Solutions/`
- `solutions/المعارض والفعاليات – Exhibitions & Events/`
- `solutions/حلول مخصصة – Custom Solutions/`

#### Documentation (مهم جداً):
- `SIMPLE-GUIDE.md` (312 سطر) - **دليل شامل للنشر والإعداد**
- `DOMAIN-SETUP.md` (272 سطر) - إعداد الدومين
- `INSTALLATION-COMPLETE.md` (275 سطر) - دليل التثبيت
- `NEXT_STEPS.md` (203 سطر) - الخطوات التالية
- `CHECKLIST.md` (120 سطر) - قائمة التحقق
- `AI_INSTRUCTIONS.md` (34 سطر) - تعليمات AI

### ⚠️ ملاحظات:
- **نسخة قديمة لكن كاملة** - تحتوي على كل شيء
- **SEO كامل:** Sitemap، Robots، Schema Markup
- **PWA Ready:** Service Worker، Manifest
- **Studio.js كامل:** محرك Studio متقدم (425 سطر)
- **37 صورة عملاء** في `assets/clients_webp/`
- **ملفات توثيق شاملة** للنشر والإعداد

---

## 📊 مقارنة سريعة:

| الميزة | مجلد جديد | NewMoon_V0.1_HTML |
|--------|-----------|-------------------|
| **CSS Structure** | مدموج (debug.css) | منظم (ملفات متعددة) |
| **HTML Size** | كبير جداً (900+ سطر) | متوسط (200-700 سطر) |
| **JavaScript** | محدود | شامل (Studio.js كامل) |
| **SEO** | ❌ | ✅ كامل |
| **PWA** | ❌ | ✅ |
| **Documentation** | ❌ | ✅ شامل |
| **Client Logos** | ❌ | ✅ 37 صورة |
| **Catalogs** | ✅ 7+ كتالوجات | ❌ |
| **Studio React** | ✅ React App | ❌ |
| **Studio Advanced** | ❌ | ✅ |

---

## 🎯 خطة الاستخدام السريعة:

### عند الحاجة لـ:

1. **محتوى (صور، كتالوجات):**
   → استخدم `مجلد جديد`

2. **وظائف JavaScript (Studio, Navigation):**
   → استخدم `NewMoon_V0.1_HTML`

3. **SEO & Analytics:**
   → استخدم `NewMoon_V0.1_HTML`

4. **Documentation:**
   → استخدم `NewMoon_V0.1_HTML`

5. **CSS Styles:**
   → استخدم `مجلد جديد` (debug.css) أو `NewMoon_V0.1_HTML` (منظم)

6. **Studio React Components:**
   → استخدم `مجلد جديد/new-moon-studio-glow-main/`

7. **Client Logos:**
   → استخدم `NewMoon_V0.1_HTML/assets/clients_webp/`

---

## 📝 قواعد مهمة:

- ❌ **لا تعدل** الملفات في هذه المجلدات - هي مرجعية فقط
- ❌ **لا تنقل** كود مباشرة - استخدم للفهم والاستلهام فقط
- ✅ **انسخ** ما تحتاجه إلى `NewMoon_V1_ProductReady` بعد الفهم
- ✅ **اختبر** بعد النسخ للتأكد من التوافق
- ✅ **وثق** أي تغييرات في ملفات المشروع الحالي

---

**آخر تحديث:** تم تحديث هذا الملف بعد تنظيف المشروع النشط
