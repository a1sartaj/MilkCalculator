// ==========================================
// 1. DATA CONFIGURATION: Change / Add items here
// ==========================================
const items = [
    { id: "fullCream", name: "Full Cream Milk", unit: "Kg", price: 71 },   // 35.5 * 2 = 71/kg
    { id: "cowMilk", name: "Cow Milk", unit: "Kg", price: 61 },   // 30.5 * 2 = 61/kg
    { id: "bachha", name: "Bachha", unit: "Pcs", price: 9 },
    { id: "dahi", name: "Dahi", unit: "Pcs", price: 19 },
    { id: "dahi35", name: "Dahi (35rs)", unit: "Pcs", price: 34 },
    { id: "chach", name: "Chach", unit: "Pcs", price: 9.5 },
    { id: "bread10", name: "Bread 10rs", unit: "Pcs", price: 9 },
    { id: "bread20", name: "Bread 20rs", unit: "Pcs", price: 18 }
    // Naya item add karne ke liye bas neeche format me line add kar dein:
    // { id: "paneer", name: "Paneer", unit: "Kg", price: 320 }
];

let generatedSummary = "";

// ==========================================
// 2. RENDER ITEMS DYNAMICALLY
// ==========================================
const itemsContainer = document.getElementById("itemsContainer");

function renderItems() {
    itemsContainer.innerHTML = "";
    items.forEach(item => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
            <div class="item-info">
                <span class="item-title">${item.name}</span>
                <span class="item-rate">₹${item.price} / ${item.unit}</span>
            </div>
            <div class="item-input-wrapper">
                <input type="number" id="input-${item.id}" min="0" step="any" placeholder="0">
                <span class="item-unit">${item.unit}</span>
            </div>
        `;
        itemsContainer.appendChild(row);
    });
}

// ==========================================
// 3. CALCULATION & SUMMARY BUILDER
// ==========================================
// ==========================================
// 3. UPDATED CALCULATION & WHATSAPP MESSAGE FORMATTER
// ==========================================
function calculateBill() {
    let grandTotal = 0;
    let summaryLines = [];

    items.forEach(item => {
        const inputElem = document.getElementById(`input-${item.id}`);
        const qty = parseFloat(inputElem.value) || 0;

        if (qty > 0) {
            const itemTotal = qty * item.price;
            grandTotal += itemTotal;
            // Simple format: Full Cream Milk: 2 Kg - ₹142
            summaryLines.push(`${qty} ${item.unit} ${item.name}`);
        }
    });

    // Bottom screen display update
    document.getElementById("totalAmount").innerText = `₹${grandTotal}`;

    // Simple, readable WhatsApp text
    if (summaryLines.length > 0) {
        generatedSummary = summaryLines.join("\n") + `\n\nTotal = ₹${grandTotal}`;
    } else {
        generatedSummary = "No items selected.";
    }

    document.getElementById("summaryText").value = generatedSummary;
    document.getElementById("modalOverlay").style.display = "flex";
}

// ==========================================
// 4. MODAL & ACTIONS
// ==========================================
function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
}

function copySummaryText() {
    const summaryText = document.getElementById("summaryText");
    summaryText.select();
    navigator.clipboard.writeText(summaryText.value);
    alert("Summary copied to clipboard!");
}

function sendWhatsApp() {
    if (!generatedSummary || generatedSummary === "No items entered.") {
        calculateBill();
    }
    const encoded = encodeURIComponent(generatedSummary);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

// Initialize on load
renderItems();