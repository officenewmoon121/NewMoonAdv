# 🚀 NEW MOON - الخطوات القادمة

---

## 📌 **للمواصلة في شات جديد:**

### **ارفع هذه الملفات:**
1. `AI_INSTRUCTIONS.md` (مهم جداً!)
2. `CHECKLIST.md` (هذا الملف)
3. آخر نسخة من:
   - index.html
   - nav.html
   - footer.html
   - أي صفحة تعدل عليها

### **قول:**
```
كمّل من مكان ما وقفنا.
آخر تعديل: كل الصفحات الأساسية جاهزة (index, products, services, portfolio, companies, about, contact).
محتاج: Favicon + SEO + Performance.
```

---

## 🎯 **الأولويات الحالية:**

### **1. Favicon (5 دقائق)**
- أنشئ أيقونة صغيرة للموقع
- حطها في `assets/favicon/`
- لينك في كل صفحة

### **2. SEO Basics (15 دقيقة)**
- Meta descriptions محسنة
- Open Graph tags
- Schema.org markup
- Alt text للصور

### **3. sitemap.xml + robots.txt (10 دقائق)**
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://newmoon.com/</loc><priority>1.0</priority></url>
  <url><loc>https://newmoon.com/products.html</loc><priority>0.8</priority></url>
  ...
</urlset>
```

### **4. Google Analytics (5 دقائق)**
- سجل في Google Analytics
- اخد الكود
- حطه قبل `</head>` في كل صفحة

---

## 📝 **كيف تعدل يدوياً:**

### **تغيير لون:**
```css
/* في css/variables.css */
:root {
    --primary-gold: #D4AF37;  /* غير القيمة هنا */
}
```

### **تغيير حجم Hero:**
```css
/* في أي صفحة */
.hero-section {
    min-height: 85vh; /* غير الرقم (60vh, 70vh, 100vh) */
}
```

### **تغيير سرعة Carousel:**
```css
/* في index.html */
.clients-track {
    animation: scrollClients 30s linear infinite; /* غير 30s */
}
```

### **إضافة منتج جديد:**
```json
/* في products.json */
{
  "id": 99,
  "name": "اسم المنتج",
  "desc": "وصف المنتج",
  "category": "gifts",
  "img": "assets/products/new.webp"
}
```

---

## 🔧 **المشاكل الشائعة والحلول:**

### **المشكلة: الصور مش بتظهر**
```html
<!-- تأكد من المسار صح -->
<img src="assets/clients_webp/client_1.webp" alt="">
<!-- مش -->
<img src="/assets/clients_webp/client_1.webp" alt="">
```

### **المشكلة: الـ Navigation مش شغال**
```javascript
// تأكد من السكربت ده موجود في كل صفحة
fetch("nav.html?" + Date.now())
  .then(res => res.text())
  .then(data => document.getElementById("navbar").innerHTML = data)
  .then(() => { if(typeof initNav === 'function') initNav(); });
```

### **المشكلة: الموقع مش responsive**
```html
<!-- تأكد من ده موجود في <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## 📱 **اختبار الموقع:**

### **على الكمبيوتر:**
1. افتح index.html في Chrome
2. اضغط F12 → Console
3. شوف في errors؟
4. جرب كل الروابط

### **على الموبايل:**
1. اضغط F12 → Toggle Device Toolbar
2. اختار iPhone أو Samsung
3. جرب التصفح
4. تأكد من المسافات والأحجام

### **السرعة:**
- افتح: https://pagespeed.web.dev/
- حط رابط موقعك
- شوف النتيجة (المفروض 80+)

---

## 🌐 **النشر على الإنترنت:**

### **الخيارات:**

**1. GitHub Pages (مجاناً):**
```bash
git add .
git commit -m "نسخة نهائية"
git push origin main
# روح على Settings → Pages → اختار main branch
```

**2. Netlify (مجاناً):**
- روح https://netlify.com
- اربط الـ GitHub repo
- Deploy تلقائي

**3. Hosting عادي:**
- رفع كل الملفات على السيرفر
- تأكد من SSL
- ربط الدومين

---

## 💬 **لو احتجت مساعدة:**

### **في الشات الجديد قول:**
```
عندي مشكلة في [اسم المشكلة]
آخر حاجة عملتها: [التعديل الأخير]
الخطأ اللي بيظهر: [نص الخطأ]
```

### **أو:**
```
عايز أضيف [ميزة جديدة]
مكان الميزة: [في أنهي صفحة]
الشكل المطلوب: [وصف أو صورة]
```

---

## 🎓 **لو حابب تتعلم أكتر:**

- **HTML/CSS:** https://www.w3schools.com
- **JavaScript:** https://javascript.info
- **Git:** https://git-scm.com/book/en/v2
- **SEO:** https://developers.google.com/search/docs

---

**✅ أنت دلوقتي عندك موقع احترافي كامل!**

**باقي بس:**
- Favicon
- SEO
- النشر

**وكده تكون خلصت 100%** 🎉
