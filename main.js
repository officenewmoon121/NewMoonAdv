/* ====================================================
   NEW MOON - MAIN JAVASCRIPT (الوظائف الأصلية)
   ==================================================== */

console.log('%c🌙 New Moon - Original Design', 'color: #D4AF37; font-size: 20px; font-weight: bold;');

// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    }
});

// ===== COOKIE CONSENT =====
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptBtn = document.querySelector('.btn-accept');
    const rejectBtn = document.querySelector('.btn-reject');
    
    if (cookieConsent) {
        const cookieAccepted = localStorage.getItem('cookieConsent');
        if (!cookieAccepted) {
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 2000);
        }
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieConsent.classList.remove('show');
            });
        }
        
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'rejected');
                cookieConsent.classList.remove('show');
            });
        }
    }
});

// ===== NAVIGATION LOADING =====
fetch("nav.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

// ===== MOBILE MENU =====
    function toggleMenu() {
        document.getElementById("navMenu").classList.toggle("active");
    }

// ===== BACK TO TOP & SCROLL EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
    let backToTop = document.getElementById('backToTop');
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTop);
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== FADE ANIMATIONS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-item, .animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible', 'animated');
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== PRODUCTS PAGE =====
/* ====================================================
   1. DATA SOURCE - بيانات المنتجات
   ==================================================== */
   const products = [
    {
      "id": 1,
      "name": "ميدالية معدنية",
      "desc": "ميدالية محفور عليها لوجو الشركة — مناسبة للهدايا الدعائية.",
      "category": "gifts",
      "img": "assets/products/gifts/keychain1.webp"
    },
    {
      "id": 2,
      "name": "قلم معدني فاخر",
      "desc": "قلم بجودة ممتازة مع نقش الليزر.",
      "category": "gifts",
      "img": "assets/products/gifts/pen1.webp"
    },
    {
      "id": 3,
      "name": "أجندة جلد 2025",
      "desc": "أجندة جلد مع إمكانية طباعة لوجو الشركة.",
      "category": "gifts",
      "img": "assets/products/gifts/notebook1.webp"
    },
    {
      "id": 10,
      "name": "تيشيرت بولو رجال",
      "desc": "يونيفورم شركات بجودة عالية مع تطريز اللوجو.",
      "category": "uniform",
      "img": "assets/products/uniform/polo1.webp"
    },
    {
      "id": 11,
      "name": "يونيفورم كامل — عمال",
      "desc": "بدلة عمل مقاومة للتلف ومناسبة للاستخدام اليومي.",
      "category": "uniform",
      "img": "assets/products/uniform/work1.webp"
    },
    {
      "id": 12,
      "name": "مريلة مطاعم",
      "desc": "مناسبة للمطاعم والكافيهات مع تطريز اللوجو.",
      "category": "uniform",
      "img": "assets/products/uniform/apron1.webp"
    },
    {
      "id": 20,
      "name": "Roll Up Banner",
      "desc": "رول أب بجودة عالية مقاس 200×85 سم.",
      "category": "exhibition",
      "img": "assets/products/exhibition/rollup1.webp"
    },
    {
      "id": 21,
      "name": "Backdrop معرض",
      "desc": "تصميم وطباعة Backdrop للفعاليات والمؤتمرات.",
      "category": "exhibition",
      "img": "assets/products/exhibition/backdrop1.webp"
    },
    {
      "id": 22,
      "name": "ستاند عرض أكريليك",
      "desc": "ستاند عرض منتجات للشركات والمحلات.",
      "category": "exhibition",
      "img": "assets/products/exhibition/stand1.webp"
    },
    {
      "id": 30,
      "name": "طباعة UV على الخشب",
      "desc": "ألواح خشب مطبوعة UV بجودة ممتازة.",
      "category": "uv",
      "img": "assets/products/uv/wood1.webp"
    },
    {
      "id": 31,
      "name": "طباعة UV على الأكريليك",
      "desc": "لوحة أكريليك مطبوعة بتقنية UV للأسماء والمكاتب.",
      "category": "uv",
      "img": "assets/products/uv/acrylic1.webp"
    },
    {
      "id": 32,
      "name": "طباعة UV على المعادن",
      "desc": "طباعة عالية الدقة على الألومنيوم والمعادن.",
      "category": "uv",
      "img": "assets/products/uv/metal1.webp"
    },
    {
      "id": 40,
      "name": "دفاتر الشركة",
      "desc": "دفاتر طباعة أوفست مخصصة للشركات.",
      "category": "office",
      "img": "assets/products/office/books1.webp"
    },
    {
      "id": 41,
      "name": "ملفات وشُنط شركات",
      "desc": "ملفات بلاستيك أو كرتون مطبوعة باسم الشركة.",
      "category": "office",
      "img": "assets/products/office/folder1.webp"
    },
    {
      "id": 42,
      "name": "كروت شخصية",
      "desc": "تصميم وطباعة كروت شركات بجودة عالية.",
      "category": "office",
      "img": "assets/products/office/cards1.webp"
    }
];

/* ====================================================
   2. DISPLAY LOGIC - كود العرض
   ==================================================== */
const grid = document.querySelector('.products-grid');

function renderProducts(items) {
    if (!grid) return;
    grid.innerHTML = ''; // مسح القديم

    if (items.length === 0) {
        grid.innerHTML = '<p class="no-results" style="width:100%; text-align:center; padding:20px;">لا توجد منتجات تطابق بحثك</p>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-item'; // fade-item للأنيميشن
        card.innerHTML = `
            <div class="img-box">
                <img src="${product.img}" alt="${product.name}" loading="lazy" onerror="this.src='assets/logo.png'">
            </div>
            <div class="card-content">
                <span class="product-code">#${product.id}</span>
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
            </div>
        `;
        // تشغيل المودال عند الضغط
        card.addEventListener('click', () => openModal(product));
        grid.appendChild(card);
    });
}

/* ====================================================
   3. FILTERS LOGIC - تشغيل البحث والفلتر
   ==================================================== */
// هنا التعديل المهم: ربطنا البحث والفلتر بالـ HTML الجديد
const searchBox = document.getElementById('searchBox');
const categoryFilter = document.getElementById('categoryFilter');

function filterProducts() {
    const searchText = searchBox.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = products.filter(product => {
        const matchesCategory = (selectedCategory === "") || (product.category === selectedCategory);
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
}

if (searchBox) searchBox.addEventListener('input', filterProducts);
if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);

//* ====================================================
UPDATED MODAL LOGIC - دالة فتح المودال المحسنة
==================================================== */
function openModal(product) {
 const modal = document.querySelector('.modal');
 if (!modal) return;

 // 1. تعبئة البيانات الأساسية
 const modalImg = modal.querySelector('img');
 const modalTitle = modal.querySelector('.modal-title');
 const modalDesc = modal.querySelector('.modal-desc');
 
 if (modalImg) modalImg.src = product.img;
 if (modalTitle) modalTitle.textContent = product.name;
 if (modalDesc) modalDesc.textContent = product.desc;

 // 2. تحديث الروابط (واتساب + استوديو التصميم)
 const waBtn = modal.querySelector('.whatsapp-btn-modal');
 const designBtn = modal.querySelector('.design-btn-modal');

 // رابط الواتساب
 if (waBtn) {
     const msg = `مرحباً، أريد الاستفسار عن: ${product.name} (كود: ${product.id})`;
     waBtn.href = `https://wa.me/201280081544?text=${encodeURIComponent(msg)}`;
 }

 // رابط استوديو التصميم (لو المنتج يسمح بالتصميم)
 if (designBtn) {
     // مثلاً بنسمح بالتصميم لمنتجات الهدايا واليونيفورم فقط
     const allowedCategories = ['gifts', 'uniform', 'uv'];
     
     if (allowedCategories.includes(product.category)) {
         designBtn.style.display = 'inline-flex'; // إظهار الزر
         designBtn.href = `tool.html?product_id=${product.id}`; // يودي لصفحة التصميم
     } else {
         designBtn.style.display = 'none'; // إخفاء الزر
     }
 }

 // 3. إظهار المودال
 modal.style.display = 'flex';
}

const closeBtn = document.querySelector('.close-modal');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ✅ تشغيل المنتجات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});
// ===== PORTFOLIO PAGE =====
/* ====================================================
   1. DATA SOURCE - بيانات المشاريع
   ==================================================== */
   const portfolioData = [
    { 
        title: "حملة اتصالات", 
        category: "branding", 
        img: "assets/images/etisalat.jpg" 
    },
    { 
        title: "هدايا سامسونج", 
        category: "gifts", 
        img: "assets/images/samsung.jpg" 
    },
    { 
        title: "مؤتمر فايزر", 
        category: "events", 
        img: "assets/images/pfizer.jpg" 
    },
    { 
        title: "يونيفورم BUC", 
        category: "uniform", 
        img: "assets/images/buc.jpg" 
    },
    // ضيف مشاريعك الجديدة هنا
];

/* ====================================================
   2. RENDER & INIT - التشغيل
   ==================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;

    // أ) رسم الكروت في الصفحة
    portfolioData.forEach(item => {
        const card = document.createElement('div');
        // هنا بنديها كلاس portfolio-item وكلاس fade-item عشان الأنيميشن
        card.className = `portfolio-item fade-item ${item.category}`; 
        card.setAttribute('data-category', item.category);
        
        card.innerHTML = `
            <div class="img-box">
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <div class="overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
            <h3>${item.title}</h3>
        `;
        grid.appendChild(card);
    });

    // ب) تشغيل الفلتر (كودك)
    initFilters();

    // ج) تشغيل اللايت بوكس المتطور (كودك)
    initLightbox();

    // د) تشغيل أنيميشن السكرول
    revealOnScroll();
});


/* ====================================================
   3. FILTER LOGIC (نفس كودك مع تعديل بسيط)
   ==================================================== */
function initFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Active Class
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    item.style.display = "block"; // إظهار
                    setTimeout(() => item.classList.add("visible"), 100);
                } else {
                    item.style.display = "none"; // إخفاء
                    item.classList.remove("visible");
                }
            });
        });
    });
}

/* ====================================================
   4. LIGHTBOX LOGIC (كودك الممتاز)
   ==================================================== */
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    
    // جمع الصور بعد ما اترسمت
    const images = Array.from(document.querySelectorAll(".portfolio-item img"));
    let currentIndex = 0;

    if(images.length === 0) return;

    // فتح الصورة
    images.forEach((img, index) => {
        // بنخلي الضغط على الكارت كله يفتح الصورة مش الصورة بس
        img.closest('.portfolio-item').addEventListener("click", () => {
            currentIndex = index;
            updateImage();
            lightbox.style.display = "flex";
        });
    });

    function updateImage() {
        lightboxImg.src = images[currentIndex].src;
    }

    // إغلاق
    closeBtn.addEventListener("click", () => lightbox.style.display = "none");
    
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.style.display = "none";
    });

    // التالي
    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });

    // السابق
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });
}

/* ====================================================
   5. SCROLL ANIMATION
   ==================================================== */
function revealOnScroll() {
    const fadeItems = document.querySelectorAll(".fade-item");
    fadeItems.forEach(item => {
        const position = item.getBoundingClientRect().top;
        const screenHeight = window.innerHeight - 50;
        if (position < screenHeight) {
            item.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
// ===== COMPANIES PAGE =====
document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".company-card");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.dataset.category;

            cards.forEach(card => {

                const cardCat = card.dataset.category;

                if (category === "all" || category === cardCat) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

});

// ===== CONTACT PAGE =====
/* ====================================================
   CONTACT PAGE SCRIPT
   ==================================================== */

   document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // 1. Fade-in Animation on Scroll
    // ===============================
    const fadeItems = document.querySelectorAll(".fade-item");
    
    if (fadeItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // ضيف كلاس CSS بدل اللعب في الستايل مباشرة (أفضل للأداء)
                    entry.target.classList.add("visible");
                    // بطل تراقبه عشان الأنيميشن يشتغل مرة واحدة بس
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fadeItems.forEach(item => observer.observe(item));
    }

    // ===============================
    // 2. Form Validation
    // ===============================
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function (e) {
            // منع الإرسال مؤقتاً لحد ما نتأكد
            
            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const phoneInput = form.querySelector('input[name="phone"]');
            const msgInput = form.querySelector('textarea[name="message"]');

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const message = msgInput ? msgInput.value.trim() : "";

            let errors = [];

            if (name.length < 3) {
                errors.push("الاسم يجب أن يكون 3 أحرف على الأقل");
            }

            if (!validateEmail(email)) {
                errors.push("يرجى إدخال بريد إلكتروني صحيح");
            }

            // التحقق من الهاتف (اختياري بس لو اتكتب لازم يكون صح)
            if (phone !== "" && !/^[0-9]{8,15}$/.test(phone)) {
                errors.push("رقم الهاتف غير صحيح (أرقام فقط)");
            }

            if (message.length < 5) {
                errors.push("الرسالة قصيرة جدًا");
            }

            if (errors.length > 0) {
                e.preventDefault(); // وقف الإرسال
                alert(errors.join("\n")); // اعرض الأخطاء
            } else {
                // هنا ممكن تضيف كود إرسال فعلي لو حابب مستقبلاً
                // e.preventDefault();
                // alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
                // form.reset();
            }
        });
    }

    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // ===============================
    // 3. Input Highlight Effect
    // ===============================
    const inputs = document.querySelectorAll("input, textarea");
    
    inputs.forEach(el => {
        el.addEventListener("focus", () => {
            el.style.borderColor = "#c5a059"; // اللون الذهبي (var(--gold))
            el.style.boxShadow = "0 0 8px rgba(197, 160, 89, 0.2)";
        });

        el.addEventListener("blur", () => {
            el.style.borderColor = "#ddd";
            el.style.boxShadow = "none";
        });
    });

});
// ===== SERVICES PAGE =====
/* ============================
   فتح المودال وعرض الصور
============================ */

function openGallery(title, dataStr) {
    const modal = document.getElementById("modal");
    const grid  = document.getElementById("mGrid");
    const mTitle = document.getElementById("mTitle");

    mTitle.innerText = title;
    grid.innerHTML = ""; // تفريغ الصور أولًا

    if (!dataStr || dataStr.trim() === "") {
        grid.innerHTML = `
            <p style="width:100%; text-align:center; color:#777;">
                لا توجد عناصر متاحة حاليًا...
            </p>
        `;
        modal.style.display = "flex";
        return;
    }

    const items = dataStr.split(",");

    items.forEach(item => {
        if (item.trim() !== "") {
            const [src, code] = item.split("|");

            // روابط الواتساب + المعمل
            const waLink  = `https://wa.me/201000000000?text=سعر المنتج ${code}`;
            const labLink = `https://wa.me/201000000000?text=أريد تصميم خاص للمنتج ${code}`;

            grid.innerHTML += `
                <div class="img-item">
                    <a href="${src}" target="_blank">
                        <img src="${src}" loading="lazy">
                    </a>
                    <span class="item-code">${code}</span>

                    <div style="display:flex; gap:8px; margin-top:8px;">
                        <a href="${labLink}" target="_blank"
                           style="
                                flex:1;
                                background:#6366f1;
                                color:#fff;
                                padding:6px 0;
                                font-size:0.8rem;
                                border-radius:4px;
                                font-weight:bold;
                                text-decoration:none;
                           ">
                            <i class="fas fa-paint-brush"></i> صمّم شعارك
                        </a>

                        <a href="${waLink}" target="_blank"
                           style="
                                width:40px;
                                background:#25D366;
                                color:#fff;
                                display:flex;
                                justify-content:center;
                                align-items:center;
                                border-radius:4px;
                           ">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            `;
        }
    });

    modal.style.display = "flex";
}

/* ============================
   غلق المودال
============================ */
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

/* إغلاق عند الضغط خارج المودال */
window.addEventListener("click", function(e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) closeModal();
});

/* إغلاق بالزر Esc */
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeModal();
});

// ===== GALLERY DATA =====
const portfolioItems = [
    { title: "حملة اتصالات", desc: "تصميم وتنفيذ بوثات ومطبوعات", image: "assets/images/etisalat.jpg" },
    { title: "هدايا سامسونج", desc: "أطقم هدايا VIP للموظفين", image: "assets/images/samsung.jpg" },
    { title: "مؤتمر فايزر", desc: "تجهيز القاعات والمواد الدعائية", image: "assets/images/pfizer.jpg" },
    { title: "يونيفورم BUC", desc: "توريد ملابس الطلبة والموظفين", image: "assets/images/buc.jpg" },
    // ضيف مشاريعك هنا بنفس الطريقة
];
/* ===== END OF SCRIPT ===== */
