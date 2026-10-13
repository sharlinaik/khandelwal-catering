/* =========================================================
   Swaad Catering & Events — script.js
   Contains: menu data, page router (single HTML file, no reloads),
   and the quote-request form that notifies the owner via WhatsApp.
   ========================================================= */

/* ---------------- Business config — EDIT THESE VALUES ---------------- */
const BUSINESS = {
  name: "Khandelwal Caterers & Events",
  ownerWhatsApp: "15127585993",   // digits only, country code first, no + or spaces
  ownerEmail: "khandelwalcaterers95@gmail.com",
};

/* ---------------- Menu data ---------------- */
const MENU_DATA = [
  { category: "Sweets", type: "veg", items: ["Tava Halwa","Mohanthal","Badampak","Koprapak","Basundi","Rabdi","Rasmalai","Mango Rasmalai","Mango Delight","Angoori Basundi","Sitafal Basundi","Mango Basundi","Kaju Pista Roll","Jalebi","Fada Lapsi","Shrikhand","Gulab Jamun","Dudhi Halwa","Gajar Halwa","Moong Dal Halwa","Sooji Halwa","Gulab Pak","Dry Fruit Halwa","Matho","Kaju Katli","Badam Pista Barfi","Tiranga Barfi","Mava Barfi","Chocolate Barfi","Kala Jamun","Rasgulla","Kesar Peda","White Mava Peda","Magaj"] },
  { category: "Farsan (Snacks)", type: "veg", items: ["Fulvadi","Vatidal Khaman","Nylon Khaman","Samosa","Cutlets","Methi Gota","Sandwich Dhokla","Plain Dhokla","Khandvi","Surti Pattice","Lilva Kachori","Patra","Papdi no Lot","Khasta Kachori","Bataka Vada","Matar Kachori","Puff (Veg, Paneer, Potato)","Spinach Paneer Samosa","Mix Bhajiya","Sev Roll","Crispy Dahi Kebab","Methi Paneer Tikka"] },
  { category: "Shaak / Sabzi", type: "veg", items: ["Aloo Gobhi Dry","Tava Sabzi","Desi Chana","Bataka Vatana Rasavadu","Mix Kathod","Vaal","Kaju Karela","Tindoda Bataka","Bhindi Masala","Turiya Patra","Sev Tameta nu Shak","Baigan Bharta","Dana Muthiya nu Shak","Surti Undhiyo","Lasan Gathiya nu Shak","Bataka ni Sukhi Bhaji","Paneer Cheese Ghotala","Paneer Bhurji","Kadhai Paneer","Paneer Butter Masala","Palak Paneer","Matar Paneer","Paneer Toofani","Shahi Paneer","Paneer Tikka Masala","Paneer Pasanda","Malai Kofta","Methi Matar Malai","Kaju Curry","Kaju Koya","Navratna Korma","Veg Kolhapuri","Rajma","Cabbage Bataka nu Shak","Ringan Bataka nu Shak","Dal Dhokli","Panch Kutiya Nu Shak","Punjabi Chole","Chana Masala","Gatte ki Sabzi","Dudhi Chana"] },
  { category: "Breads", type: "veg", items: ["Rotli","Puri","Plain Naan","Garlic Naan","Bullet Naan (Chilly)","Parantha","Bhature","Bhakri","Thepla","Dhebra","Rumali Roti","Purna Poli","Stuffed Parantha (Aloo, Paneer, Veg)"] },
  { category: "Rice", type: "veg", items: ["Basmati Steam Rice","Peas and Carrot Pulao","Kesari Rice","Jeera Rice","Veg Biryani","Masala Pulao","Spinach Garlic Rice","Ghee Rice","Lemon Rice","Vagharela Bhat"] },
  { category: "Dal", type: "veg", items: ["Gujarati Dal","Dal Tadka","Dal Makhani","Dal Fry","Surti Kadhi","Rajasthani Kadhi","Bhindi Kadhi"] },
  { category: "Sides & Salads", type: "veg", items: ["Papad (Khichiya, Urad, Bhungra)","Boondi Raita","Gujarati Raita","Mix Veg Raita","Pineapple Raita","Green Salad","Sprout Salad (Kathod)","Cabbage Nu Sambhar"] },
  { category: "Drinks & Refreshments", type: "veg", items: ["Plain Chaas","Masala Chaas","Aam Panna","Rose Lassi","Mango Lassi","Sweet Lassi","Strawberry Milk Shake","Chickoo Milk Shake","Banana Milk Shake","Chocolate Milk Shake","Masala Chai","Ice Tea","Mint Tea","Hot Chocolate","Assorted Sodas"] },
  { category: "Farali (Fasting Menu)", type: "veg", items: ["Moriyo","Sabudana Khichdi","Sabudana Vada","Farali Kadhi","Rajgira nu Shiro","Bataka ni Sukhi Bhaji","Sooran Nu Shak","Bataka Rasavadu","Farali Aloo Paneer Tikki","Farali Chewda"] },
  { category: "Breakfast", type: "veg", items: ["Upma","Bataka Poha","Sev Khamni","Methi na Gota","Fafda","Bread Pakoda","Puna Missal","Live Dhokla","Live Idada","Khakhara","Bun Maska","Bagel Cream Cheese","Assorted Muffin","Croissant","Nankhatai"] },
  { category: "South Indian Station", type: "veg", items: ["Idli","Medu Vada","Dosa","Sambhar","Chutney"] },
  { category: "Chaat Station", type: "veg", items: ["Bombay Bhel","Dahi Bhalla Chat","Papdi Chat","Yam Chat","Pani Puri","Sweet Corn Chat","Samosa Chat Shots","Aloo Tikki Chat","Dry Fruit Chat","Kala Chana Chat","Avocado Papdi Chat","Katori Chat"] },
  { category: "Italian Station", type: "veg", items: ["Red/White/Pink/Pesto Sauce Pasta","Stuffed Raviolis","Penne","Lasagna","Spaghetti","Avocado Bruschetta","Margherita Pizza","Naanza (Pizza on Naan)","Achari Paneer Pizza","Garlic Bread"] },
  { category: "Chinese Station", type: "veg", items: ["Veg Manchurian","Hakka Noodles","Chilly Paneer","Veg Fried Rice","Veg Spring Roll","Chilly Baby Corn","Momos Station"] },
  { category: "Mexican Station", type: "veg", items: ["Tacos","Quesadilla","Mexican Spring Roll","Wonton Tacos","Masala Paneer Taquitos","Chipotle Bar","Paneer Shawarma Taco","Mexican Bhel"] },
  { category: "Soup Station", type: "veg", items: ["Manchow Soup","Tomato Basil Soup","Sweet Corn Soup","Khowsuey Soup","Broccoli Almond Soup","Cream of Mushroom Soup"] },
  { category: "Mediterranean Station", type: "veg", items: ["Falafel Wrap","Paneer Shawarma Wrap","Complete Mediterranean Station with Gyro"] },
  { category: "Specialty Live Stations", type: "veg", items: ["Doughnut Station","Sliders","Pav Bhaji Station","Paneer Tikka Station","Ice Gola Station","Popcorn Station","Rabdi Jalebi Station","Chole Bhature Station","Live Maggi","Vada Pav Station","Dabeli Station","Fresh Cut Fruit Station","Chocolate Fondue Station","Kulfi Bar","Ice Cream Bar","Churros"] },
  { category: "Mocktails & Beverages Bar", type: "veg", items: ["Mango Mojito","Lycheetini","Sparkling Spicy Lemonade","Strawberry Martini","Mint Mojito","Virgin Margarita","Pina Colada","Orange Moscow Mule","Bubble Tea","Faluda","Live Fresh Mix Fruit Juice"] },
  { category: "Egg Dishes", type: "nonveg", items: ["Anda Bhurji","Anda Pulao","Boiled Tikka","Anda Curry","Masala Half Fry","Anda Ghotala","Egg Wrap","Egg Kathi Roll"] },
  { category: "Non-Veg Appetizers", type: "nonveg", items: ["Chicken Tikka","Chicken 65","Tandoori Chicken","Chicken Seekh Kebab","Malai Chicken","Harayali Chicken","Chicken Manchurian","Chicken Spring Roll","Chicken Sliders","Chilli Chicken","Mutton Galouti Kebab","Mutton Seekh Kebab","Amritsari Fish Fry","Fish Tikka","Butter Garlic Shrimps"] },
  { category: "Non-Veg Main Course", type: "nonveg", items: ["Butter Chicken (Murgh Makhani)","Chicken Tikka Masala","Kadhai Chicken","Chicken Curry","Chicken Do Pyaza","Chicken Kolhapuri","Chicken Chettinad","Chicken Handi","Mutton Rogan Josh","Mutton Curry","Laal Maas","Bhuna Gosht","Mutton Korma","Keema Masala"] },
  { category: "Biryani & Non-Veg Rice", type: "nonveg", items: ["Chicken Biryani (Hyderabadi / Dum)","Mutton Biryani","Prawn Biryani","Chicken Pulao","Keema Rice"] },
];

/* ---------------- Router: switch visible section, no page reload ---------------- */
function showPage(name){
  document.querySelectorAll(".page-section").forEach(el => { el.hidden = el.dataset.page !== name; });
  document.querySelectorAll("[data-nav]").forEach(a => a.setAttribute("aria-current", a.dataset.nav === name ? "page" : "false"));
  window.scrollTo({ top: 0 });
  document.getElementById("nav-links")?.classList.remove("open");
  if(name === "menu") renderMenu();
}

function initRouter(){
  document.querySelectorAll("[data-nav]").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = a.dataset.nav;
      history.replaceState(null, "", `#${target}`);
      showPage(target);
    });
  });
  const initial = (location.hash || "#home").replace("#", "");
  showPage(document.querySelector(`.page-section[data-page="${initial}"]`) ? initial : "home");
}

/* ---------------- Menu rendering (plain list — no add-to-order) ---------------- */
let currentFilter = "all";
let currentSearch = "";

function renderMenu(){
  const container = document.getElementById("menu-container");
  if(!container) return;
  let html = "";

  MENU_DATA.forEach(section => {
    if(currentFilter !== "all" && section.type !== currentFilter) return;
    const filtered = section.items.filter(name => name.toLowerCase().includes(currentSearch.toLowerCase()));
    if(filtered.length === 0) return;

    html += `<div class="menu-category">
      <h2>${section.category} <span class="tag ${section.type === 'veg' ? 'tag-veg' : 'tag-nonveg'}">${section.type === 'veg' ? 'Veg' : 'Non-Veg'}</span></h2>
      <div class="dish-grid">
        ${filtered.map(name => `<div class="dish-item">${name}</div>`).join("")}
      </div>
    </div>`;
  });

  container.innerHTML = html || `<p class="text-center" style="padding:40px 0; color:var(--charcoal-soft);">No dishes match your search.</p>`;
}

function initMenuControls(){
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.setAttribute("aria-pressed","false"));
      chip.setAttribute("aria-pressed","true");
      currentFilter = chip.dataset.filter;
      renderMenu();
    });
  });
  document.getElementById("dish-search")?.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderMenu();
  });
}

/* ---------------- Gallery ---------------- */
/* Reads assets/gallery/manifest.json so photos can be added later without
   touching this file — see README.md "Adding gallery photos" section.
   Each entry needs only a "label". Once a real, high-resolution photo is
   ready, add a "file" key (e.g. "file": "tandoori-delights.jpg") and that
   tile will automatically switch from the plain gold tile to the photo —
   no other changes needed. */
const GALLERY_FALLBACK = [
  { label: "Fruit Carving Displays", url: "https://images.unsplash.com/photo-1485962093642-5f4386e84429?auto=format&fit=crop&w=900&q=80" },
  { label: "Traditional Indian Desserts", url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80" },
  { label: "Elegant Mono Portions", url: "https://images.unsplash.com/photo-1746633570370-2b0c49779a4f?auto=format&fit=crop&w=900&q=80" },
  { label: "Live Chaat Station", url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=700&q=80" },
  { label: "Indo-Chinese Fusion" },
  { label: "Tandoori Delights", url: "https://images.unsplash.com/photo-1617692855027-33b14f061079?auto=format&fit=crop&w=700&q=80" },
  { label: "Rich Indian Main Course", url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80" },
  { label: "Fresh Breads & Sides", url: "https://images.unsplash.com/photo-1640625314547-aee9a7696589?auto=format&fit=crop&w=700&q=80" },
  { label: "Signature Curries" },
];

function paintGallery(tiles){
  const grid = document.getElementById("gallery-grid");
  if(!grid) return;
  grid.innerHTML = tiles.map(t => {
    const src = t.file ? `assets/gallery/${t.file}` : t.url;
    if (src) {
      return `<div class="gallery-tile" style="background-image:url('${src}')"><span>${t.label}</span></div>`;
    }
    return `<div class="gallery-tile gallery-tile-plain"><span>${t.label}</span></div>`;
  }).join("");
}

async function renderGallery(){
  const grid = document.getElementById("gallery-grid");
  if(!grid) return;
  try{
    const res = await fetch("assets/gallery/manifest.json");
    if(!res.ok) throw new Error("manifest not ok");
    const tiles = await res.json();
    paintGallery(tiles);
  }catch(err){
    /* Fetch fails if the file is opened directly (file://) instead of
       through a web server — fall back to the built-in list so the
       gallery still shows something. */
    paintGallery(GALLERY_FALLBACK);
  }
}

/* ---------------- Quote form -> owner notification via WhatsApp ---------------- */
function generateOrderId(){
  const d = new Date();
  return `KH-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.floor(Math.random()*9000+1000)}`;
}

function buildMessage(order){
  return `New Catering Inquiry — ${BUSINESS.name}
------------------------------
Name: ${order.name}
Phone: ${order.phone}
Email: ${order.email || "-"}
Event type: ${order.eventType}
Event date: ${order.eventDate}
Guest count: ${order.guests || "-"}
Service: ${order.service}
Notes: ${order.notes || "-"}
------------------------------
Ref: ${order.id}`;
}

function initOrderForm(){
  const form = document.getElementById("order-form");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msgEl = document.getElementById("form-msg");
    const submitBtn = form.querySelector('button[type="submit"]');
    const fd = new FormData(form);

    const order = {
      id: generateOrderId(),
      name: fd.get("name")?.trim(),
      phone: fd.get("phone")?.trim(),
      email: fd.get("email")?.trim(),
      eventType: fd.get("eventType"),
      eventDate: fd.get("eventDate"),
      guests: fd.get("guests"),
      service: fd.get("service"),
      notes: fd.get("notes")?.trim(),
    };

    if(!order.name || !order.phone || !order.eventDate){
      msgEl.textContent = "Please fill in your name, phone number, and event date.";
      msgEl.className = "form-msg show error";
      return;
    }

    const waLink = `https://wa.me/${BUSINESS.ownerWhatsApp}?text=${encodeURIComponent(buildMessage(order))}`;
    msgEl.textContent = `Request ready! Reference #${order.id}. Tap "Send via WhatsApp" below to notify us instantly.`;
    msgEl.className = "form-msg show success";

    const waBtn = document.getElementById("wa-send-btn");
    if(waBtn){ waBtn.href = waLink; waBtn.style.display = "inline-flex"; }

    submitBtn.style.display = "none";
    form.querySelectorAll("input, select, textarea").forEach(el => el.disabled = true);
  });
}

/* ---------------- Nav toggle + footer year ---------------- */
function syncHeaderHeight(){
  const header = document.querySelector(".site-header");
  if(!header) return;
  document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
}
function initNav(){
  const btn = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if(btn && links){
    btn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }
}
function initFooterYear(){
  document.querySelectorAll(".footer-year").forEach(el => el.textContent = new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initMenuControls();
  initOrderForm();
  initFooterYear();
  renderGallery();
  initRouter();
  syncHeaderHeight();
  window.addEventListener("resize", syncHeaderHeight);
  window.addEventListener("load", syncHeaderHeight);
  // Fonts loading can change header height slightly after first paint
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncHeaderHeight);
  }
});
