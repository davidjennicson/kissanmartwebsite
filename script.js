// Sample live farm produce data
const initialProduce = [
  {
    id: 1,
    name: "A-Grade Hybrid Tomatoes",
    category: "vegetables",
    farmer: "Balram Jadhav",
    location: "Kolar, Karnataka",
    quantity: "4,500 kg",
    price: 24,
    unit: "/kg",
    harvestDate: "Today (05:00 AM)",
    coldChain: "Active (12°C)"
  },
  {
    id: 2,
    name: "Export Quality Alphonso Mangoes",
    category: "fruits",
    farmer: "Sunil Sawant",
    location: "Ratnagiri, Maharashtra",
    quantity: "1,200 Crates",
    price: 650,
    unit: "/crate",
    harvestDate: "Yesterday",
    coldChain: "Air-Flow Chilled"
  },
  {
    id: 3,
    name: "Sharbati Golden Wheat (Unpolished)",
    category: "grains",
    farmer: "Gurinder Singh",
    location: "Sehore, Madhya Pradesh",
    quantity: "15 MT",
    price: 36,
    unit: "/kg",
    harvestDate: "3 days ago",
    coldChain: "Dry Moisture-Proof"
  },
  {
    id: 4,
    name: "Organic Red Onion (Medium-Large)",
    category: "vegetables",
    farmer: "Shivaji Gaikwad",
    location: "Lasalgaon, Nashik",
    quantity: "8,000 kg",
    price: 28,
    unit: "/kg",
    harvestDate: "Today (06:30 AM)",
    coldChain: "Ventilated Transit"
  },
  {
    id: 5,
    name: "Shimla Royal Delicious Apples",
    category: "fruits",
    farmer: "Anil Thakur",
    location: "Kotkhai, Himachal Pradesh",
    quantity: "2,500 kg",
    price: 110,
    unit: "/kg",
    harvestDate: "2 days ago",
    coldChain: "Controlled Temp (4°C)"
  },
  {
    id: 6,
    name: "Desi Organic Chana Dal",
    category: "grains",
    farmer: "Bhanu Prakash",
    location: "Bikaner, Rajasthan",
    quantity: "5.5 MT",
    price: 74,
    unit: "/kg",
    harvestDate: "1 week ago",
    coldChain: "Silo Stored"
  }
];

let produceList = [...initialProduce];
let currentFilter = 'all';

function renderProduce(items) {
  const container = document.getElementById('produce-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">
      <p>No produce found matching this category right now.</p>
    </div>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="produce-card">
      <div class="produce-header">
        <span class="crop-badge">${item.category.toUpperCase()}</span>
        <span style="font-size: 0.8rem; color: #86efac;">❄️ ${item.coldChain}</span>
      </div>
      <div class="produce-body">
        <h4>${item.name}</h4>
        <p class="farmer-tag">👨‍🌾 ${item.farmer} • 📍 ${item.location}</p>
        
        <div class="detail-line">
          <span>Available Batch:</span>
          <strong>${item.quantity}</strong>
        </div>
        <div class="detail-line">
          <span>Harvested:</span>
          <span>${item.harvestDate}</span>
        </div>
        <div class="detail-line">
          <span>Traceability ID:</span>
          <span style="font-family: monospace; color: #4ade80;">KM-${item.id}092</span>
        </div>

        <div class="price-box">
          <div>
            <span class="current-price">₹${item.price}</span>
            <span class="unit">${item.unit}</span>
          </div>
          <span style="font-size: 0.78rem; color: #22c55e;">Zero Middleman Fee</span>
        </div>
      </div>
      <div class="produce-footer">
        <button class="btn btn-primary" onclick="openOrderModal(${item.id})">Procure Lot</button>
      </div>
    </div>
  `).join('');
}

function filterProduce(category) {
  currentFilter = category;
  
  // Highlight chip
  const chips = document.querySelectorAll('.filter-chips .chip');
  chips.forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('onclick').includes(`'${category}'`));
  });

  if (category === 'all') {
    renderProduce(produceList);
  } else {
    const filtered = produceList.filter(item => item.category === category);
    renderProduce(filtered);
  }
}

// Modal handling
function openModal(type) {
  const modal = document.getElementById('produce-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;

  if (type === 'list-produce') {
    modalContent.innerHTML = `
      <h3 style="margin-bottom: 8px;">List New Farm Produce</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 20px;">Direct entry into Kissan Mart wholesale auction & cold chain</p>
      <form id="new-produce-form" onsubmit="handleProduceSubmit(event)">
        <div class="form-group">
          <label>Farmer Name / FPO Name</label>
          <input type="text" id="p-farmer" required placeholder="e.g. Rameshwar Patel (Kisan FPO)">
        </div>
        <div class="form-group">
          <label>Crop / Produce Name</label>
          <input type="text" id="p-name" required placeholder="e.g. Fresh Shimla Capsicum">
        </div>
        <div class="form-group">
          <label>Category</label>
          <select id="p-cat">
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains & Pulses</option>
          </select>
        </div>
        <div class="form-group">
          <label>Location & Mandi</label>
          <input type="text" id="p-loc" required placeholder="e.g. Nashik, Maharashtra">
        </div>
        <div class="form-group">
          <label>Batch Quantity (with unit)</label>
          <input type="text" id="p-qty" required placeholder="e.g. 3,000 kg or 20 Quintals">
        </div>
        <div class="form-group">
          <label>Target Price (₹ per kg / unit)</label>
          <input type="number" id="p-price" required placeholder="e.g. 35">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Submit & Schedule Cold-Van Pickup</button>
      </form>
    `;
  } else if (type === 'login') {
    modalContent.innerHTML = `
      <h3 style="margin-bottom: 8px;">Farmer & Buyer Portal</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 20px;">Enter your registered mobile number for instant OTP verification.</p>
      <form onsubmit="handleLoginSubmit(event)">
        <div class="form-group">
          <label>Mobile Number</label>
          <input type="tel" required placeholder="e.g. +91 98765 43210">
        </div>
        <div class="form-group">
          <label>Select Role</label>
          <select>
            <option>Farmer / Producer Group (FPO)</option>
            <option>Wholesale Buyer / Supermarket Chain</option>
            <option>Logistics & Cold Storage Partner</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Send OTP & Verify</button>
      </form>
    `;
  }

  modal.classList.add('show');
}

function openOrderModal(id) {
  const item = produceList.find(p => p.id === id);
  if (!item) return;

  const modal = document.getElementById('produce-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <h3 style="margin-bottom: 8px;">Order Procurement Request</h3>
    <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 16px;">Direct booking with escrow guarantee and quality inspection report.</p>
    
    <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 8px; margin-bottom: 18px; border: 1px solid rgba(255,255,255,0.1);">
      <h4 style="color: #4ade80;">${item.name}</h4>
      <div style="font-size: 0.85rem; color: #cbd5e1; margin-top: 4px;">
        Farmer: ${item.farmer} (${item.location})<br>
        Price: <strong>₹${item.price} ${item.unit}</strong> | Batch: ${item.quantity}
      </div>
    </div>

    <form onsubmit="handleOrderSubmit(event, '${item.name}')">
      <div class="form-group">
        <label>Buyer Business Name</label>
        <input type="text" required placeholder="e.g. FreshGroce Mart Ltd / Reliance Retail">
      </div>
      <div class="form-group">
        <label>Quantity Required</label>
        <input type="text" required placeholder="e.g. 1,500 kg">
      </div>
      <div class="form-group">
        <label>Delivery Hub / Mandi Address</label>
        <input type="text" required placeholder="Fulfillment warehouse location">
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Confirm Direct Contract</button>
    </form>
  `;

  modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('produce-modal');
  if (modal) modal.classList.remove('show');
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'produce-modal') {
    closeModal();
  }
}

function handleProduceSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('p-name').value;
  const farmer = document.getElementById('p-farmer').value;
  const category = document.getElementById('p-cat').value;
  const location = document.getElementById('p-loc').value;
  const quantity = document.getElementById('p-qty').value;
  const price = Number(document.getElementById('p-price').value);

  const newLot = {
    id: Date.now(),
    name,
    category,
    farmer,
    location,
    quantity,
    price,
    unit: "/kg",
    harvestDate: "Just now",
    coldChain: "Scheduled Pickup"
  };

  produceList.unshift(newLot);
  filterProduce(currentFilter);
  closeModal();
  alert(`Success! Lot for "${name}" has been registered. Cold-chain pickup dispatched to ${location}.`);
}

function handleLoginSubmit(e) {
  e.preventDefault();
  closeModal();
  alert("Verification OTP sent to your registered phone number!");
}

function handleOrderSubmit(e, cropName) {
  e.preventDefault();
  closeModal();
  alert(`Procurement request for ${cropName} submitted! Our cold-chain coordinator will contact your warehouse team.`);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderProduce(produceList);
});
