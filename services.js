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
