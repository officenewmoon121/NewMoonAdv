/* ============================================================
   NM Studio — FINAL ENTERPRISE EDITION
   PART 1 — CORE ENGINE
   Layers • Add Text • Add Logo • Drag • Select
============================================================ */

// =========================
// ELEMENTS
// =========================
const layersContainer = document.getElementById("layers-container");
const layersList = document.getElementById("layers-list");

const addTextBtn = document.getElementById("add-text-btn");
const addLogoBtn = document.getElementById("add-logo-btn");
const uploadInput = document.createElement("input");

uploadInput.type = "file";
uploadInput.accept = "image/*";

let activeLayer = null;
let layerId = 0;

let undoStack = [];
let redoStack = [];

/* SAVE STATE FOR UNDO */
function saveState() {
    undoStack.push(layersContainer.innerHTML);
    redoStack = [];
}

/* RESTORE AFTER LOAD / UNDO */
function rebindLayers() {
    [...layersContainer.children].forEach(el => makeLayerInteractive(el));
}

/* ============================================================
   CREATE LAYER ROW IN SIDE PANEL
============================================================ */
function addLayerToPanel(id, label) {
    const row = document.createElement("div");
    row.className = "layer-row";
    row.dataset.id = id;

    row.innerHTML = `
        <span>${label}</span>
        <div class="layer-icons">
            <i class="fas fa-eye toggle-visibility"></i>
            <i class="fas fa-lock lock-layer"></i>
            <i class="fas fa-trash delete-layer"></i>
        </div>
    `;

    layersList.prepend(row);

    // Select Layer
    row.addEventListener("click", () => setActiveLayer(id));

    // Delete
    row.querySelector(".delete-layer").addEventListener("click", e => {
        e.stopPropagation();
        deleteLayer(id);
    });

    // Hide / Show
    row.querySelector(".toggle-visibility").addEventListener("click", e => {
        e.stopPropagation();
        toggleLayerVisibility(id, row);
    });

    // Lock
    row.querySelector(".lock-layer").addEventListener("click", e => {
        e.stopPropagation();
        toggleLayerLock(id, row);
    });
}

/* ============================================================
   SET ACTIVE LAYER
============================================================ */
function setActiveLayer(id) {
    activeLayer = document.getElementById(id);
    if (!activeLayer) return;

    document.querySelectorAll(".layer-row").forEach(r => r.classList.remove("active"));

    const row = [...layersList.children].find(r => r.dataset.id === id);
    if (row) row.classList.add("active");
}

/* ============================================================
   DELETE LAYER
============================================================ */
function deleteLayer(id) {
    saveState();

    const layer = document.getElementById(id);
    if (layer) layer.remove();

    const row = [...layersList.children].find(r => r.dataset.id === id);
    if (row) row.remove();

    activeLayer = null;
}

/* ============================================================
   VISIBILITY
============================================================ */
function toggleLayerVisibility(id, row) {
    const layer = document.getElementById(id);
    if (!layer) return;

    const icon = row.querySelector(".toggle-visibility");

    if (layer.style.display === "none") {
        layer.style.display = "block";
        icon.style.color = "";
    } else {
        layer.style.display = "none";
        icon.style.color = "red";
    }
}

/* ============================================================
   LOCK / UNLOCK LAYER
============================================================ */
function toggleLayerLock(id, row) {
    const layer = document.getElementById(id);
    if (!layer) return;

    const icon = row.querySelector(".lock-layer");

    if (layer.dataset.locked === "true") {
        layer.dataset.locked = "false";
        icon.style.color = "";
    } else {
        layer.dataset.locked = "true";
        icon.style.color = "gold";
    }
}

/* ============================================================
   ADD TEXT LAYER
============================================================ */
addTextBtn.addEventListener("click", () => {
    saveState();

    layerId++;
    const id = "layer_" + layerId;

    const div = document.createElement("div");
    div.id = id;
    div.className = "text-layer";
    div.textContent = "نص جديد";

    div.style.left = "200px";
    div.style.top = "200px";

    layersContainer.appendChild(div);
    addLayerToPanel(id, "نص " + layerId);

    makeLayerInteractive(div);
    setActiveLayer(id);
});

/* ============================================================
   ADD LOGO
============================================================ */
addLogoBtn.addEventListener("click", () => {
    uploadInput.click();
});

uploadInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    saveState();

    layerId++;
    const id = "layer_" + layerId;

    const img = document.createElement("img");
    img.id = id;
    img.className = "logo-layer";

    img.src = URL.createObjectURL(file);
    img.style.left = "160px";
    img.style.top = "160px";
    img.style.width = "180px";

    layersContainer.appendChild(img);
    addLayerToPanel(id, "لوجو " + layerId);

    makeLayerInteractive(img);
    setActiveLayer(id);
});

/* ============================================================
   DRAGGING (MOVE)
============================================================ */
function makeLayerInteractive(el) {
    let offsetX, offsetY;

    el.addEventListener("mousedown", e => {
        if (el.dataset.locked === "true") return;
        saveState();

        setActiveLayer(el.id);

        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;

        function move(e) {
            if (el.dataset.locked === "true") return;
            el.style.left = e.clientX - offsetX + "px";
            el.style.top = e.clientY - offsetY + "px";
        }

        function stop() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stop);
        }

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", stop);
    });
}

/* ============================================================
   AFTER RESTORE
============================================================ */
rebindLayers();

/* ============================================================
   END OF PART 1
============================================================ */
/* ============================================================
   NM Studio — FINAL ENTERPRISE EDITION
   PART 2 — ADVANCED EDITING ENGINE
   Resize • Rotate • Effects • Snap Guides
============================================================ */

/* ============================================================
   RESIZE / ROTATE HANDLES SETUP
============================================================ */

function addHandles(el) {
    // Remove previous handles
    const old = el.querySelector(".resize-box");
    if (old) old.remove();

    const box = document.createElement("div");
    box.className = "resize-box";
    box.innerHTML = `
        <div class="handle top-left" data-dir="tl"></div>
        <div class="handle top-right" data-dir="tr"></div>
        <div class="handle bottom-left" data-dir="bl"></div>
        <div class="handle bottom-right" data-dir="br"></div>
        <div class="rotate-handle"></div>
    `;

    el.appendChild(box);

    box.querySelectorAll(".handle").forEach(h =>
        h.addEventListener("mousedown", resizeStart)
    );

    box.querySelector(".rotate-handle")
        .addEventListener("mousedown", rotateStart);
}

/* ============================================================
   RESIZING
============================================================ */

let startX, startY, startW, startH, startLeft, startTop;

function resizeStart(e) {
    e.stopPropagation();
    saveState();
    const handle = e.target;
    const dir = handle.dataset.dir;
    const el = activeLayer;

    if (!el) return;

    startX = e.clientX;
    startY = e.clientY;
    startW = el.offsetWidth;
    startH = el.offsetHeight;
    startLeft = el.offsetLeft;
    startTop = el.offsetTop;

    function resizing(ev) {
        let dx = ev.clientX - startX;
        let dy = ev.clientY - startY;

        if (dir === "br") {
            el.style.width = startW + dx + "px";
            el.style.height = startH + dy + "px";
        }
        if (dir === "tr") {
            el.style.width = startW + dx + "px";
            el.style.height = startH - dy + "px";
            el.style.top = startTop + dy + "px";
        }
        if (dir === "bl") {
            el.style.width = startW - dx + "px";
            el.style.height = startH + dy + "px";
            el.style.left = startLeft + dx + "px";
        }
        if (dir === "tl") {
            el.style.width = startW - dx + "px";
            el.style.height = startH - dy + "px";
            el.style.left = startLeft + dx + "px";
            el.style.top = startTop + dy + "px";
        }
    }

    function stop() {
        document.removeEventListener("mousemove", resizing);
        document.removeEventListener("mouseup", stop);
    }

    document.addEventListener("mousemove", resizing);
    document.addEventListener("mouseup", stop);
}

/* ============================================================
   ROTATION ENGINE
============================================================ */

let rotateStartAngle = 0;
let elementStartAngle = 0;

function rotateStart(e) {
    e.stopPropagation();
    saveState();

    const el = activeLayer;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    rotateStartAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
    const currentTransform = el.style.transform.match(/rotate\(([-0-9.]+)deg\)/);

    elementStartAngle = currentTransform ? parseFloat(currentTransform[1]) : 0;

    function rotating(ev) {
        const angle = Math.atan2(ev.clientY - cy, ev.clientX - cx);
        const delta = (angle - rotateStartAngle) * (180 / Math.PI);

        el.style.transform = `rotate(${elementStartAngle + delta}deg)`;
    }

    function stop() {
        document.removeEventListener("mousemove", rotating);
        document.removeEventListener("mouseup", stop);
    }

    document.addEventListener("mousemove", rotating);
    document.addEventListener("mouseup", stop);
}

/* ============================================================
   SNAP PRO — CENTER GUIDES
============================================================ */

function snapLayerPRO(el) {
    const workspace = document.getElementById("workspace-container").getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    const elCx = rect.left + rect.width / 2;
    const elCy = rect.top + rect.height / 2;

    const wsCx = workspace.left + workspace.width / 2;
    const wsCy = workspace.top + workspace.height / 2;

    const threshold = 8;

    // Snap horizontally
    if (Math.abs(elCx - wsCx) < threshold) {
        el.style.left = (wsCx - rect.width / 2 - workspace.left) + "px";
    }

    // Snap vertically
    if (Math.abs(elCy - wsCy) < threshold) {
        el.style.top = (wsCy - rect.height / 2 - workspace.top) + "px";
    }
}

/* ============================================================
   EFFECTS: OUTLINE / SHADOW / OPACITY / BLUR
============================================================ */

const textColor = document.getElementById("text-color");
const outlineColor = document.getElementById("text-outline-color");
const outlineSize = document.getElementById("text-outline-size");
const shadowColor = document.getElementById("text-shadow-color");
const shadowBlur = document.getElementById("text-shadow-blur");

const opacityInput = document.getElementById("layer-opacity");
const blurInput = document.getElementById("layer-blur");

/* TEXT COLOR */
textColor.addEventListener("input", () => {
    if (!activeLayer) return;
    activeLayer.style.color = textColor.value;
});

/* OUTLINE */
outlineSize.addEventListener("input", () => applyTextEffects());
outlineColor.addEventListener("input", () => applyTextEffects());

function applyTextEffects() {
    if (!activeLayer) return;
    activeLayer.style.webkitTextStroke = `${outlineSize.value}px ${outlineColor.value}`;
}

/* SHADOW */
shadowBlur.addEventListener("input", () => {
    if (!activeLayer) return;
    activeLayer.style.textShadow = `0 0 ${shadowBlur.value}px ${shadowColor.value}`;
});
shadowColor.addEventListener("input", () => {
    if (!activeLayer) return;
    activeLayer.style.textShadow = `0 0 ${shadowBlur.value}px ${shadowColor.value}`;
});

/* OPACITY */
opacityInput.addEventListener("input", () => {
    if (!activeLayer) return;
    activeLayer.style.opacity = opacityInput.value;
});

/* BLUR */
blurInput.addEventListener("input", () => {
    if (!activeLayer) return;
    activeLayer.style.filter = `blur(${blurInput.value}px)`;
});

/* ============================================================
   END OF PART 2
============================================================ */
/* ============================================================
   NM Studio — FINAL ENTERPRISE EDITION
   PART 3 — CANVAS ENGINE
   Zoom • Pan • Grid • Print Area • Save/Load • Export
============================================================ */

/* ============================================================
   ZOOM SYSTEM
============================================================ */

let zoomLevel = 1;
const zoomLabel = document.getElementById("zoom-level");
const workspaceContainer = document.getElementById("workspace-container");

document.getElementById("zoom-in").addEventListener("click", () => setZoom(zoomLevel + 0.1));
document.getElementById("zoom-out").addEventListener("click", () => setZoom(zoomLevel - 0.1));
document.getElementById("fit-screen").addEventListener("click", fitToScreen);

function setZoom(z) {
    zoomLevel = Math.min(3, Math.max(0.3, z));
    workspaceContainer.style.transform = `scale(${zoomLevel})`;
    zoomLabel.textContent = Math.round(zoomLevel * 100) + "%";
}

function fitToScreen() {
    zoomLevel = 1;
    workspaceContainer.style.transform = "scale(1)";
    zoomLabel.textContent = "100%";
}

/* Zoom with mouse wheel */
workspaceContainer.addEventListener("wheel", e => {
    if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY > 0) setZoom(zoomLevel - 0.05);
        else setZoom(zoomLevel + 0.05);
    }
}, { passive: false });

/* ============================================================
   PAN SYSTEM
============================================================ */

let isPanning = false;
let panStartX, panStartY;
let panOffsetX = 0, panOffsetY = 0;

workspaceContainer.addEventListener("mousedown", e => {
    if (e.target === workspaceContainer) {
        isPanning = true;
        panStartX = e.clientX - panOffsetX;
        panStartY = e.clientY - panOffsetY;
    }
});

document.addEventListener("mousemove", e => {
    if (isPanning) {
        panOffsetX = e.clientX - panStartX;
        panOffsetY = e.clientY - panStartY;

        workspaceContainer.style.marginLeft = panOffsetX + "px";
        workspaceContainer.style.marginTop = panOffsetY + "px";
    }
});

document.addEventListener("mouseup", () => isPanning = false);

/* ============================================================
   GRID SYSTEM
============================================================ */

const gridOverlay = document.getElementById("grid-overlay");
document.getElementById("show-grid").addEventListener("change", e => {
    gridOverlay.style.display = e.target.checked ? "block" : "none";
});

/* ============================================================
   PRINT AREA TOGGLE
============================================================ */

const printArea = document.getElementById("print-area");
document.getElementById("show-print-area").addEventListener("change", e => {
    printArea.style.display = e.target.checked ? "block" : "none";
});

/* ============================================================
   AUTO FIT / CENTER
============================================================ */

document.getElementById("auto-center").addEventListener("click", () => {
    if (!activeLayer) return;

    const ws = workspaceContainer.getBoundingClientRect();
    const el = activeLayer.getBoundingClientRect();

    activeLayer.style.left = (ws.width / 2 - el.width / 2) + "px";
    activeLayer.style.top = (ws.height / 2 - el.height / 2) + "px";
});

document.getElementById("auto-fit").addEventListener("click", () => {
    if (!activeLayer) return;

    const pw = printArea.offsetWidth;
    const ph = printArea.offsetHeight;

    activeLayer.style.width = pw * 0.9 + "px";
    activeLayer.style.height = "auto";

    // Center after fit
    document.getElementById("auto-center").click();
});

/* ============================================================
   SAVE / LOAD PROJECT
============================================================ */

document.getElementById("save-project").addEventListener("click", () => {
    const data = layersContainer.innerHTML;
    localStorage.setItem("nm_studio_project", data);
    alert("تم حفظ المشروع ✔");
});

document.getElementById("load-project").addEventListener("click", () => {
    const data = localStorage.getItem("nm_studio_project");
    if (!data) return alert("لا يوجد مشروع محفوظ");

    layersContainer.innerHTML = data;
    rebindLayers(); // من PART 1
});

/* ============================================================
   AUTO BACKUP
============================================================ */

setInterval(() => {
    const data = layersContainer.innerHTML;
    localStorage.setItem("nm_studio_auto", data);
}, 30000);

/* ============================================================
   EXPORT JPG
============================================================ */

document.getElementById("export-jpg").addEventListener("click", () => {
    html2canvas(workspaceContainer, { scale: 2 }).then(canvas => {
        const link = document.createElement("a");
        link.download = "NM_Design.jpg";
        link.href = canvas.toDataURL("image/jpeg", 1.0);
        link.click();
    });
});

/* ============================================================
   EXPORT PNG (TRANSPARENT)
============================================================ */

document.getElementById("export-png").addEventListener("click", () => {
    html2canvas(workspaceContainer, {
        backgroundColor: null,
        scale: 2
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "NM_Design.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});

/* ============================================================
   EXPORT PDF
============================================================ */

document.getElementById("export-pdf").addEventListener("click", async () => {
    const canvas = await html2canvas(workspaceContainer, { scale: 2 });
    const img = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jspdf.jsPDF("p", "mm", "a4");
    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(img, "JPEG", 0, 10, width, height);
    pdf.save("NM_Design.pdf");
});

/* ============================================================
   END OF PART 3 — END OF FULL ENGINE
============================================================ */
