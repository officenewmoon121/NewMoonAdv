# 📸 نقل صور الشركات - دليل سريع

## 📍 الموقع المطلوب

### المجلد المرجعي (المصدر):
```
z:\newmoon\NewMoon_V0.1_HTML\assets\clients_webp\
```

### المجلد الهدف (المشروع النشط):
```
Z:\NewMoon_V1_ProductReady\assets\images\companies\
```

---

## 📋 الملفات المطلوبة

**37 صورة:**
- `client_1.webp`
- `client_2.webp`
- `client_3.webp`
- ... (حتى)
- `client_37.webp`

---

## 🔄 طريقة النقل

### الطريقة 1: نسخ يدوي (الأسهل)

1. افتح المجلد المرجعي:
   ```
   z:\newmoon\NewMoon_V0.1_HTML\assets\clients_webp\
   ```

2. حدد جميع الملفات من `client_1.webp` إلى `client_37.webp`

3. انسخ (Ctrl+C)

4. افتح المجلد الهدف:
   ```
   Z:\NewMoon_V1_ProductReady\assets\images\companies\
   ```

5. الصق (Ctrl+V)

---

### الطريقة 2: من PowerShell

افتح PowerShell في مجلد المشروع النشط:

```powershell
# انتقل للمجلد المرجعي
cd "z:\newmoon\NewMoon_V0.1_HTML\assets\clients_webp\"

# انسخ جميع الصور
Copy-Item "client_*.webp" -Destination "Z:\NewMoon_V1_ProductReady\assets\images\companies\"
```

---

### الطريقة 3: من Command Prompt

```cmd
xcopy "z:\newmoon\NewMoon_V0.1_HTML\assets\clients_webp\client_*.webp" "Z:\NewMoon_V1_ProductReady\assets\images\companies\" /Y
```

---

## ✅ بعد النقل

بعد نقل الصور:

1. ✅ افتح `companies.html` في المتصفح
2. ✅ ستظهر أول 12 شركة تلقائياً
3. ✅ كارت "مشاهدة المزيد" سيظهر للباقي (25 شركة)
4. ✅ اضغط "عرض الكل" لرؤية جميع الشركات

---

## 📝 ملاحظات

- الصور بتنسيق `.webp` (مثالي للويب - حجم صغير وجودة عالية)
- الأسماء: `client_1.webp` إلى `client_37.webp`
- النظام يتحمّل عدم وجود الصور (يظهر placeholder)
- يمكنك إضافة المزيد من الصور لاحقاً

---

## 🎯 الشركات المتوفرة (من المرجع)

1. Panocare
2. IPS PHARMACEUTICALS
3. Zmas
4. IPS PHARMA
5. GlobePharma
6. PHARO PHARMA
7. Globe
8. GLC PAINTS
9. daralteb
10. TVS
11. Marcyrl Group
12. MODERN EGYPT PHARMA
13. SEDICO Pharmaceuticals
14. APEX Pharma
15. PHARCO PHARMACEUTICALS
16. Indomie
17. SIGMA
18. Bubbles
19. BUC (Badr University in Cairo)
20. Pfizer
21. INNOVERA
22. WEALTH PHARMA
23. Innovara labs
24. EVER PHARMA
25. AMRIYA PHARMACEUTICALS
26. Rx HealthCare Services
27. ASPIRE
28. itx Healthcare
29. ASPIRE PHARMA
30. mroom Pharma
31. Sunmoon Pharma
32. ... (والمزيد)

---

**آخر تحديث:** 2025

