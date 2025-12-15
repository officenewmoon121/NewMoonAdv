# 🌐 دليل إعداد الدومينات - NEW MOON

---

## 📋 **الدومينات المتاحة:**

1. **newmoonadv.com** → الأساسي (Main)
2. **newmoonadv.shop** → متجر إلكتروني
3. **newmoonadv.net** → شبكة/مدونة
4. **newmoonadv.store** → متجر بديل

---

## ✅ **الإعداد الموصى به:**

### **1. الدومين الأساسي: newmoonadv.com**
```
✓ الموقع الرئيسي
✓ SEO optimization
✓ Google Analytics
✓ sitemap.xml & robots.txt
```

### **2. الدومينات الأخرى (Redirect):**
```
newmoonadv.shop  → إعادة توجيه لـ newmoonadv.com
newmoonadv.net   → إعادة توجيه لـ newmoonadv.com
newmoonadv.store → إعادة توجيه لـ newmoonadv.com
```

**فائدة الـ Redirect:**
- كل الزوار يروحوا للموقع الأساسي
- تحسين الـ SEO (مش هتتوزع القوة على 4 دومينات)
- سهولة الإدارة

---

## 🔧 **خطوات الإعداد:**

### **A. على الـ Hosting (cPanel أو ما شابه):**

#### **1. رفع الملفات:**
```bash
# ارفع كل ملفات الموقع على:
public_html/

# المفروض الهيكل يبقى:
public_html/
├── index.html
├── products.html
├── services.html
├── ... (باقي الصفحات)
├── sitemap.xml
├── robots.txt
├── css/
├── assets/
└── js/
```

#### **2. ربط الدومين الأساسي:**
```
في cPanel:
→ Domains → Add Domain
→ حط: newmoonadv.com
→ Document Root: /public_html
```

#### **3. Redirect الدومينات الأخرى:**
```
في cPanel:
→ Domains → Redirects

Redirect 1:
From: newmoonadv.shop
To: https://newmoonadv.com
Type: Permanent (301)

Redirect 2:
From: newmoonadv.net
To: https://newmoonadv.com
Type: Permanent (301)

Redirect 3:
From: newmoonadv.store
To: https://newmoonadv.com
Type: Permanent (301)
```

---

### **B. SSL Certificate (HTTPS):**

```bash
في cPanel:
→ Security → SSL/TLS Status
→ اختار newmoonadv.com
→ Run AutoSSL (مجاني)
```

**أو استخدم Let's Encrypt:**
```
→ SSL/TLS → Install Let's Encrypt Certificate
→ اختار الدومين
→ Install
```

---

### **C. تحديث ملفات الموقع:**

#### **في كل الصفحات HTML:**
```html
<!-- غير في <head> -->
<link rel="canonical" href="https://newmoonadv.com/صفحة-الحالية.html">
```

#### **مثال في index.html:**
```html
<head>
    <meta charset="utf-8">
    <link rel="canonical" href="https://newmoonadv.com/">
    <!-- باقي الكود -->
</head>
```

---

## 🎯 **Google Search Console:**

### **1. أضف الموقع:**
```
روح: https://search.google.com/search-console/
→ Add Property
→ حط: https://newmoonadv.com
→ اختار "URL prefix"
```

### **2. Verify Ownership:**
اختار طريقة التحقق:
- **HTML file:** حمّل ملف التحقق في public_html/
- **HTML tag:** حط في <head> كل صفحة
- **DNS record:** (الأسهل لو عندك وصول للـ DNS)

### **3. Submit Sitemap:**
```
في Google Search Console:
→ Sitemaps
→ Add new sitemap
→ حط: https://newmoonadv.com/sitemap.xml
→ Submit
```

---

## 🔍 **Google Analytics:**

### **كود التتبع الجاهز:**
```html
<!-- حط ده في <head> كل صفحة -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MQD95TNNBC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MQD95TNNBC');
</script>
```

**✅ تم إضافته في index.html**

---

## 📧 **Email Setup (اختياري):**

### **إنشاء إيميلات احترافية:**
```
info@newmoonadv.com
sales@newmoonadv.com
support@newmoonadv.com
```

**في cPanel:**
```
→ Email Accounts
→ Create
→ املى البيانات
```

---

## 🧪 **اختبار الموقع:**

### **1. بعد الرفع:**
```
✓ افتح https://newmoonadv.com
✓ تأكد من HTTPS يشتغل
✓ جرب كل الروابط
✓ اختبر على الموبايل
```

### **2. أدوات الاختبار:**
```
Speed: https://pagespeed.web.dev/
Mobile: https://search.google.com/test/mobile-friendly
SEO: https://seositecheckup.com/
SSL: https://www.ssllabs.com/ssltest/
```

---

## 📝 **Checklist النهائي:**

- [ ] رفع الملفات على public_html/
- [ ] ربط newmoonadv.com كدومين أساسي
- [ ] Redirect باقي الدومينات (shop, net, store)
- [ ] تفعيل SSL
- [ ] رفع sitemap.xml و robots.txt
- [ ] إضافة Google Analytics (G-MQD95TNNBC)
- [ ] تسجيل في Google Search Console
- [ ] Submit sitemap في Search Console
- [ ] اختبار السرعة والـ SEO
- [ ] اختبار على PC & Mobile

---

## 🆘 **مشاكل شائعة:**

### **المشكلة: الموقع مش بيفتح**
```
✓ تأكد من DNS settings صح
✓ انتظر 24-48 ساعة لـ propagation
✓ امسح الـ cache
```

### **المشكلة: HTTPS مش شغال**
```
✓ فعّل SSL Certificate
✓ تأكد من Force HTTPS في .htaccess
✓ امسح cache المتصفح
```

### **المشكلة: Google مش بيأرشف الموقع**
```
✓ Submit sitemap في Search Console
✓ تأكد من robots.txt مش بيمنع Google
✓ انتظر أسبوع على الأقل
```

---

## 🎉 **بعد الإطلاق:**

1. **شارك الموقع:**
   - Facebook
   - Instagram
   - LinkedIn
   - TikTok

2. **Monitor:**
   - Google Analytics (daily)
   - Search Console (weekly)
   - PageSpeed (monthly)

3. **Update Content:**
   - أضف منتجات جديدة
   - حدث portfolio
   - اكتب blog posts

---

**✅ جاهز للإطلاق!** 🚀
