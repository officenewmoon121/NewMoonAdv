// ================================
//      تشغيل الأكورديون
// ================================
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {

        // لو مفتوح اقفله
        if (header.classList.contains("active")) {
            header.classList.remove("active");
            header.nextElementSibling.style.maxHeight = 0;
            return;
        }

        // اقفل الباقي
        accordionHeaders.forEach(h => {
            h.classList.remove("active");
            h.nextElementSibling.style.maxHeight = 0;
        });

        // افتح المختار
        header.classList.add("active");
        const body = header.nextElementSibling;
        body.style.maxHeight = body.scrollHeight + "px";
    });
});


// ================================
//      المــودال (فتح / غلق)
// ================================
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const modalCode = document.querySelector(".modal-code");
const closeModal = document.querySelector(".close-modal");
const studioBtn = document.getElementById("studio-btn");
const whatsappBtn = document.getElementById("whatsapp-btn");

const productCards = document.querySelectorAll(".product-card");

// عند الضغط على منتج
productCards.forEach(card => {
    card.addEventListener("click", () => {

        const img = card.querySelector("img").src;
        const code = card.dataset.code;

        // اعرض البيانات
        modalImg.src = img;
        modalCode.textContent = code;

        // زر رفع التصميم للاستوديو
        studioBtn.href = `studio.html?product=${code}`;

        // زر واتساب
        whatsappBtn.href = `https://wa.me/201200000000?text=اريد%20طلب%20المنتج%20${code}`;

        // افتح المودال
        modal.style.display = "flex";
    });
});

// اغلاق المودال
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// اغلاق عند الضغط خارج الصورة
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});
