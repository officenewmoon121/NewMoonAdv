// ===============================
// FILTER PORTFOLIO ITEMS
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

// عند الضغط على أي زر فلترة
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // إزالة active من كل الأزرار
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        portfolioItems.forEach(item => {
            const category = item.getAttribute("data-category");

            // لو الفلتر "الكل"
            if (filter === "all") {
                item.classList.remove("hidden");
                return;
            }

            // فلترة حسب التصنيف
            if (category === filter) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});

// ===============================
// OPTIONAL: Fade items on scroll
// ===============================
const fadeItems = document.querySelectorAll(".fade-item");

function revealOnScroll() {
    fadeItems.forEach(item => {
        const position = item.getBoundingClientRect().top;
        const screenHeight = window.innerHeight - 80;

        if (position < screenHeight) {
            item.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
// ===============================
// LIGHTBOX FEATURE
// ===============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

// كل الصور
const images = Array.from(document.querySelectorAll(".portfolio-item img"));

// فتح الصورة عند الضغط عليها
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = "flex";
    });
});

// إظهار الصورة في Lightbox
function showImage() {
    lightboxImg.src = images[currentIndex].src;
}

// غلق
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Next
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
});

// Previous
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
});

// غلق عند الضغط خارج الصورة
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});
