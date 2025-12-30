/* ============================================================
   NM STUDIO PRO — Full JS Engine
   Clean / Fast / Layered / Snap / Undo / Save / Export
   ============================================================ */

let canvasArea = document.getElementById("canvas-area");
let layersContainer = document.getElementById("layers-container");
let layersList = document.getElementById("layers-list");

let activeLayer = null;
let layerCounter = 0;

let undoStack = [];
let redoStack = [];

/* ============================================================
   SAVE STATE FOR UNDO / REDO
============================================================ */
function saveState() {
    const state = layersContainer.innerHTML;
    undoStack.push(state);
    redoStack = [];
}

/* ============================================================
   RESTORE STATE
============================================================ */
function restoreState(container, html) {
    container.innerHTML = html;
    rebindEvents();
}

/* Undo */
document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "z") {
        if (undoStack.length > 1) {
            const current = undoStack.pop();
            redoStack.push(current);
            const prev = undoStack[undoStack.length - 1];
            restoreState(layersContainer, prev);
        }
    }
});

/* Redo */
document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.shiftKey && e.key === "Z") {
        if (redoStack.length > 0) {
            const next = redoStack.pop();
            undoStack.push(next);
            restoreState(layersContainer, next);
        }
    }
});

/* ============================================================
   CREATE LAYERS LIST ITEM
============================================================ */
function addLayerToList(id, name, type) {
    const row = document.createElement("div");
    row.className = "layer-row";
    row.dataset.id = id;
    row.innerHTML = `
        <span>${name}</span>
        <div class="layer-icons">
            <i class="fas fa-eye toggle-visibility"></i>
            <i class="fas fa-trash delete-layer"></i>
        </div>
    `;
    layersList.prepend(row);

    row.addEventListener("click", () => selectLayer(id));
    row.querySelector(".delete-layer").addEventListener("click", e => {
        e.stopPropagation();
        deleteLayer(id);
    });
    row.querySelector(".toggle-visibility").addEventListener("click", e => {
        e.stopPropagation();
        toggleVisibility(id, row);
    });
}

/* ============================================================
   SELECT LAYER
============================================================ */
function selectLayer(id) {
    activeLayer = document.getElementById(id);

    document.querySelectorAll(".layer-row")
        .forEach(r => r.classList.remove("active"));

    const row = [...layersList.children].find(r => r.dataset.id === id);
    if (row) row.classList.add("active");
}

/* ============================================================
   DELETE LAYER
============================================================ */
function deleteLayer(id) {
    saveState();
    document.getElementById(id)?.remove();
    const row = [...layersList.children].find(r => r.dataset.id === id);
    row?.remove();
    activeLayer = null;
}

/* ============================================================
   TOGGLE VISIBILITY
============================================================ */
function toggleVisibility(id, row) {
    const layer = document.getElementById(id);
    if (!layer) return;

    if (layer.style.display === "none") {
        layer.style.display = "block";
        row.querySelector(".toggle-visibility").style.color = "";
    } else {
        layer.style.display = "none";
        row.querySelector(".toggle-visibility").style.color = "red";
    }
}

/* ============================================================
   ADD TEXT LAYER
============================================================ */
document.getElementById("add-text").addEventListener("click", () => {
    saveState();

    layerCounter++;
    let id = "layer_" + layerCounter;

    let div = document.createElement("div");
    div.className = "text-layer";
    div.id = id;
    div.textContent = "نص جديد";
    div.style.left = "200px";
    div.style.top = "200px";

    layersContainer.appendChild(div);
    addLayerToList(id, "نص " + layerCounter, "text");

    makeLayerDraggable(div);
    selectLayer(id);
});

/* ============================================================
   UPLOAD LOGO
============================================================ */
document.getElementById("upload-logo").addEventListener("change", e => {
    saveState();

    let file = e.target.files[0];
    if (!file) return;

    let img = document.createElement("img");
    img.className = "logo-layer";

    let id = "layer_" + (++layerCounter);
    img.id = id;

    img.src = URL.createObjectURL(file);
    img.style.left = "180px";
    img.style.top = "180px";

    layersContainer.appendChild(img);
    addLayerToList(id, "لوجو " + layerCounter, "logo");

    makeLayerDraggable(img);
    selectLayer(id);
});

/* ============================================================
   DRAG, ROTATE, SCALE
============================================================ */
function makeLayerDraggable(el) {

    let offsetX, offsetY, startX, startY;

    el.addEventListener("mousedown", e => {
        saveState();
        selectLayer(el.id);

        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;

        function move(e) {
            el.style.left = (e.clientX - offsetX) + "px";
            el.style.top = (e.clientY - offsetY) + "px";
            snapLayer(el);
        }

        function up() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        }

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    });

    /* لمس */
    el.addEventListener("touchstart", e => {
        saveState();
        selectLayer(el.id);

        let t = e.touches[0];
        offsetX = t.clientX - el.offsetLeft;
        offsetY = t.clientY - el.offsetTop;

        function move(e) {
            let t = e.touches[0];
            el.style.left = (t.clientX - offsetX) + "px";
            el.style.top = (t.clientY - offsetY) + "px";
            snapLayer(el);
        }

        function end() {
            document.removeEventListener("touchmove", move);
            document.removeEventListener("touchend", end);
        }

        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", end);
    });
}

/* ============================================================
   SNAP ALIGNMENT
============================================================ */
function snapLayer(layer) {
    const area = canvasArea.getBoundingClientRect();
    const rect = layer.getBoundingClientRect();

    let cx = rect.left + rect.width / 2;
    let cy = rect.top + rect.height / 2;

    let areaCx = area.left + area.width / 2;
    let areaCy = area.top + area.height / 2;

    let snapThreshold = 8;

    /* Snap أفقي */
    if (Math.abs(cx - areaCx) < snapThreshold) {
        layer.style.left = (areaCx - rect.width / 2 - area.left) + "px";
    }

    /* Snap رأسي */
    if (Math.abs(cy - areaCy) < snapThreshold) {
        layer.style.top = (areaCy - rect.height / 2 - area.top) + "px";
    }
}

/* ============================================================
   SCALE & ROTATE CONTROLS
============================================================ */
document.getElementById("scale-range").addEventListener("input", e => {
    if (!activeLayer) return;
    activeLayer.style.transform = `scale(${e.target.value}) rotate(${document.getElementById("rotate-range").value}deg)`;
});

document.getElementById("rotate-range").addEventListener("input", e => {
    if (!activeLayer) return;
    activeLayer.style.transform = `scale(${document.getElementById("scale-range").value}) rotate(${e.target.value}deg)`;
});

/* ============================================================
   DUPLICATE LAYER
============================================================ */
document.getElementById("duplicate-layer").addEventListener("click", () => {
    if (!activeLayer) return;

    saveState();

    let clone = activeLayer.cloneNode(true);

    layerCounter++;
    clone.id = "layer_" + layerCounter;
    clone.style.left = (activeLayer.offsetLeft + 20) + "px";
    clone.style.top = (activeLayer.offsetTop + 20) + "px";

    layersContainer.appendChild(clone);
    addLayerToList(clone.id, "نسخة " + layerCounter, "clone");

    makeLayerDraggable(clone);
    selectLayer(clone.id);
});

/* ============================================================
   FLIP
============================================================ */
document.getElementById("flip-h").addEventListener("click", () => {
    if (!activeLayer) return;
    saveState();
    activeLayer.style.transform += " scaleX(-1)";
});

document.getElementById("flip-v").addEventListener("click", () => {
    if (!activeLayer) return;
    saveState();
    activeLayer.style.transform += " scaleY(-1)";
});

/* ============================================================
   DELETE ACTIVE LAYER
============================================================ */
document.getElementById("delete-layer").addEventListener("click", () => {
    if (!activeLayer) return;
    deleteLayer(activeLayer.id);
});

/* ============================================================
   SAVE PROJECT
============================================================ */
document.getElementById("save-project").addEventListener("click", () => {
    let data = layersContainer.innerHTML;
    localStorage.setItem("nm_project", data);
    alert("تم حفظ المشروع ✔");
});

/* LOAD PROJECT */
document.getElementById("load-project").addEventListener("click", () => {
    let data = localStorage.getItem("nm_project");
    if (!data) return alert("لا يوجد مشروع محفوظ");
    layersContainer.innerHTML = data;
    rebindEvents();
});

/* ============================================================
   REBIND EVENTS AFTER RESTORE
============================================================ */
function rebindEvents() {
    [...layersContainer.children].forEach(el => {
        makeLayerDraggable(el);
    });
}

/* ============================================================
   EXPORT JPG
============================================================ */
document.getElementById("save-jpg").addEventListener("click", () => {
    html2canvas(canvasArea).then(canvas => {
        let link = document.createElement("a");
        link.download = "NM_Design.jpg";
        link.href = canvas.toDataURL("image/jpeg", 1.0);
        link.click();
    });
});

/* ============================================================
   EXPORT PDF
============================================================ */
document.getElementById("save-pdf").addEventListener("click", async () => {
    const canvas = await html2canvas(canvasArea, { scale: 2 });
    const img = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jspdf.jsPDF("p", "mm", "a4");
    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(img, "JPEG", 0, 10, width, height);
    pdf.save("NM_Design.pdf");
});

/* ============================================================
   PRODUCT COLORS (DYNAMIC)
============================================================ */
let productSelect = document.getElementById("product-select");
let colorOptions = document.getElementById("color-options");
let productBase = document.getElementById("product-base");

const products = {
    mug: {
        base: "assets/products/mug/base.webp",
        colors: {
            white: "#fff",
            black: "#000",
            red: "#b91c1c",
            blue: "#1e3a8a"
        }
    },
    tshirt: {
        base: "assets/products/tshirt/base.webp",
        colors: {
            white: "#fff",
            navy: "#0f172a",
            gray: "#64748b",
            red: "#dc2626"
        }
    },
    bag: {
        base: "assets/products/bag/base.webp",
        colors: {
            beige: "#f5f5dc",
            brown: "#5a3e2b",
            black: "#000"
        }
    }
};

/* تحميل ألوان المنتج */
function loadColors() {
    colorOptions.innerHTML = "";

    let type = productSelect.value;
    productBase.src = products[type].base;

    for (let c in products[type].colors) {
        let dot = document.createElement("div");
        dot.className = "color-option";
        dot.style.background = products[type].colors[c];

        dot.addEventListener("click", () => {
            [...colorOptions.children].forEach(o => o.classList.remove("active"));
            dot.classList.add("active");
            productBase.style.filter = `brightness(0) saturate(100%) invert(${c === "white" ? "0" : "1"})`;
        });

        colorOptions.appendChild(dot);
    }
}

/* عند تغيير المنتج */
productSelect.addEventListener("change", loadColors);
loadColors();
