// js/main.js
const imageFiles = ['hero4.jpeg','hero6.jpeg','hero7.jpeg','hero15.jpeg','hero16.jpeg','hero17.jpeg','hero18.jpeg','hero19.jpeg'];
const images = [];
// تحويل المسارات لتعمل في أي صفحة (لو الصفحة في الجذر)
for (let i = 0; i < imageFiles.length; i++) { images.push(`assets/images/${imageFiles[i]}`); }

let currentIndex = 0;
const heroSection = document.querySelector('.hero');

// تشغيل السلايدر فقط في الصفحة الرئيسية
if (heroSection && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    function changeBackground() {
        heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
        currentIndex++;
        if (currentIndex >= images.length) { currentIndex = 0; }
    }
    heroSection.style.backgroundImage = `url('${images[0]}')`;
    currentIndex = 1;
    setInterval(changeBackground, 4500);
}

// تفعيل القائمة النشطة (Active Link)
const currentPage = window.location.pathname.split("/").pop() || 'index.html';
document.querySelectorAll('nav ul li a').forEach(link => {
    if(link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});