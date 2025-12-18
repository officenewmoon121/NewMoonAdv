// ===============================
//  Fade-in Animation on Scroll
// ===============================

const fadeItems = document.querySelectorAll(".fade-item");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
        }
    });
}, { threshold: 0.2 });

fadeItems.forEach(item => observer.observe(item));


// ===============================
//  Form Validation
// ===============================

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    let errors = [];

    if (name.length < 3) {
        errors.push("الاسم يجب أن يكون 3 أحرف على الأقل");
    }

    if (!validateEmail(email)) {
        errors.push("يرجى إدخال بريد إلكتروني صحيح");
    }

    if (phone !== "" && !/^[0-9]{8,15}$/.test(phone)) {
        errors.push("رقم الهاتف غير صحيح");
    }

    if (message.length < 5) {
        errors.push("الرسالة قصيرة جدًا");
    }

    if (errors.length > 0) {
        e.preventDefault();
        alert(errors.join("\n"));
    }
});

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}


// ===============================
//  Input highlight effect
// ===============================

document.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("focus", () => {
        el.style.borderColor = "var(--gold)";
    });

    el.addEventListener("blur", () => {
        el.style.borderColor = "#ddd";
    });
});
