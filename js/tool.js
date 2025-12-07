// Basic Tool Logic
document.getElementById('product-select').addEventListener('change', function() {
    document.getElementById('base-image').src = this.value;
});

document.getElementById('upload-logo').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const logo = document.getElementById('logo-overlay');
        logo.src = event.target.result;
        logo.style.display = 'block';
    }
    reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('scale-slider').addEventListener('input', function() {
    document.getElementById('logo-overlay').style.transform = `scale(${this.value}) rotate(${document.getElementById('rotate-slider').value}deg)`;
});

document.getElementById('rotate-slider').addEventListener('input', function() {
    document.getElementById('logo-overlay').style.transform = `scale(${document.getElementById('scale-slider').value}) rotate(${this.value}deg)`;
});