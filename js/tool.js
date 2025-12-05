const productSelect = document.getElementById('product-select');
const baseImage = document.getElementById('base-image');
const logoOverlay = document.getElementById('logo-overlay');
const uploadInput = document.getElementById('upload-logo');
const mockupContainer = document.querySelector('.mockup-container');
let currentScale = 1; let currentRotate = 0; let logoPos = { x: 50, y: 50 }; let isDragging = false;

function initTool() {
    productsDB.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id; option.textContent = product.name;
        productSelect.appendChild(option);
    });
    loadProduct(productsDB[0].id);
}
function loadProduct(id) { const product = productsDB.find(p => p.id === id); if (product) baseImage.src = product.baseImage; resetAll(); }
productSelect.addEventListener('change', (e) => loadProduct(e.target.value));
uploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) { const reader = new FileReader(); reader.onload = function(ev) { logoOverlay.src = ev.target.result; logoOverlay.style.display = 'block'; logoOverlay.onload = () => resetAll(); }; reader.readAsDataURL(file); }
});
function updateTransform() { logoOverlay.style.left = logoPos.x + '%'; logoOverlay.style.top = logoPos.y + '%'; logoOverlay.style.transform = `translate(-50%, -50%) scale(${currentScale}) rotate(${currentRotate}deg)`; }
document.getElementById('scale-slider').addEventListener('input', (e) => { currentScale = e.target.value; updateTransform(); });
document.getElementById('rotate-slider').addEventListener('input', (e) => { currentRotate = e.target.value; updateTransform(); });
window.setBlendMode = (mode) => logoOverlay.style.mixBlendMode = mode;
window.resetAll = () => { currentScale = 1; currentRotate = 0; logoPos = {x:50,y:50}; document.getElementById('scale-slider').value = 1; document.getElementById('rotate-slider').value = 0; logoOverlay.style.mixBlendMode = 'multiply'; updateTransform(); };
// الرسم والتحميل (Canvas API)
window.generateHighResImage = function() {
    if (logoOverlay.style.display === 'none') { alert('ارفع شعار أولاً'); return; }
    const btn = document.querySelector('.btn-primary');
    const oldText = btn.innerHTML;
    btn.innerHTML = 'جاري المعالجة...';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = baseImage.naturalWidth; canvas.height = baseImage.naturalHeight;
    ctx.drawImage(baseImage, 0, 0);
    const logo = new Image(); logo.crossOrigin = "Anonymous"; logo.src = logoOverlay.src;
    logo.onload = () => {
        if (logoOverlay.style.mixBlendMode === 'multiply') ctx.globalCompositeOperation = 'multiply';
        const ratio = canvas.width / mockupContainer.offsetWidth;
        const cx = (logoPos.x / 100) * canvas.width; const cy = (logoPos.y / 100) * canvas.height;
        const lw = (logoOverlay.offsetWidth * ratio) * currentScale; const lh = (logoOverlay.offsetHeight * ratio) * currentScale;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(currentRotate * Math.PI / 180);
        ctx.drawImage(logo, -lw/2, -lh/2, lw, lh); ctx.restore();
        const link = document.createElement('a'); link.download = 'NewMoon-Product.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.95); link.click();
        btn.innerHTML = oldText;
    };
}
const moveDrag = (e) => { if (!isDragging) return; const cx = e.touches ? e.touches[0].clientX : e.clientX; const cy = e.touches ? e.touches[0].clientY : e.clientY; const rect = mockupContainer.getBoundingClientRect(); logoPos.x = ((cx - rect.left) / rect.width) * 100; logoPos.y = ((cy - rect.top) / rect.height) * 100; updateTransform(); };
mockupContainer.addEventListener('mousedown', (e)=>{if(e.target===logoOverlay) isDragging=true;});
window.addEventListener('mouseup', ()=>{isDragging=false;});
mockupContainer.addEventListener('mousemove', moveDrag);
mockupContainer.addEventListener('touchstart', (e)=>{if(e.target===logoOverlay) isDragging=true;}, {passive:false});
window.addEventListener('touchend', ()=>{isDragging=false;});
mockupContainer.addEventListener('touchmove', moveDrag, {passive:false});
initTool();