function detectStore(url) {
  url = url.toLowerCase();
  if (url.includes("amazon") || url.includes("amzn")) return "Amazon";
  if (url.includes("flipkart") || url.includes("fkrt")) return "Flipkart";
  if (url.includes("meesho")) return "Meesho";
  if (url.includes("ajio")) return "Ajio";
  if (url.includes("myntra")) return "Myntra";
  if (url.includes("jiomart")) return "JioMart";
  return "Online Store";
}

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let userFashionFilter = {
  gender: null,
  sub: [],
  occasion: [],
  price: null
};

const subCategories = {
  electronics: [
    { label: "📺 Home Entertainment", value: "home entertainment" },
    { label: "🎧 Headphones & Speakers", value: "headphones speakers" },
    { label: "⌚ Smart Wearables", value: "smart wearables" },
    { label: "💻 Computing & Laptops", value: "computing laptops" },
    { label: "🖨 Office Electronics", value: "office electronics" },
    { label: "🔌 Mobile Accessories", value: "mobile accessories" },
    { label: "📸 Cameras & Drones", value: "cameras drones" },
    { label: "🏠 Smart Home", value: "smart home" },
    { label: "⚡ Power & Energy", value: "power energy" },
    { label: "🚗 Vehicle Electronics", value: "vehicle electronics" },
    { label: "🎮 Gaming Gear", value: "gaming gear" }
  ],

  mobile: [
  { label: "🍎 Apple", value: "apple" },
  { label: "📱 Samsung", value: "samsung" },
  { label: "➕ OnePlus", value: "oneplus" },
  { label: "🇨🇳 Xiaomi", value: "xiaomi" },
  { label: "⚡ Realme", value: "realme" },
  { label: "📸 Vivo", value: "vivo" },
  { label: "✨ Oppo", value: "oppo" },
  { label: "📞 Motorola", value: "motorola" },
  { label: "⭕ Nothing", value: "nothing" },
  { label: "⚙️ IQOO", value: "iqoo" },
  { label: "🧠 Google Pixel", value: "google pixel" },
  { label: "🚀 Poco", value: "poco" },
  { label: "📶 Tecno", value: "tecno" },
  { label: "🔋 Infinix", value: "infinix" },
  { label: "🔥 Lava", value: "lava" }
],

  grocery: [
    { label: "🌾 Atta & Rice", value: "atta rice" },
    { label: "🧴 Oil & Ghee", value: "oil ghee" },
    { label: "🌶 Masala & Spices", value: "masala spices" },
    { label: "🍟 Chips", value: "chips" },
    { label: "🥜 Dry Fruits & Nuts", value: "dry fruits nuts" },
    { label: "🍪 Cookies", value: "cookies" },
    { label: "🥤 Soft Drinks", value: "soft drinks" },
    { label: "🧃 Fruit Drinks", value: "fruit drinks" },
    { label: "🍜 Noodles", value: "noodles" },
    { label: "🍫 Chocolates & Sweets", value: "chocolates sweets" }
  ],

  beauty: [
    { label: "💄 Makeup", value: "makeup" },
    { label: "🧴 Skincare", value: "skincare" },
    { label: "💇 Haircare", value: "haircare" },
    { label: "🛁 Bath & Body", value: "bath body" },
    { label: "🌸 Fragrances", value: "fragrances" },
    { label: "🧔 Men’s Grooming", value: "mens grooming" }
  ],

  healthpersonalcare: [
    { label: "💊 Vitamins & Supplements", value: "vitamins supplements" },
    { label: "🩺 Medical Supplies", value: "medical supplies" },
    { label: "🦷 Oral Care", value: "oral care" },
    { label: "🧼 Skin & Body Care", value: "skin body care" },
    { label: "💇 Hair Care", value: "hair care" },
    { label: "🚺 Feminine Care", value: "feminine care" },
    { label: "👶 Baby Care", value: "baby care" },
    { label: "🧔 Personal Grooming", value: "personal grooming" }
  ],

  accessories: [
    { label: "👜 Bags & Wallets", value: "bags wallets" },
    { label: "💍 Jewellery", value: "jewellery" },
    { label: "⌚ Watches", value: "watches" },
    { label: "🕶 Sunglasses", value: "sunglasses" },
    { label: "🧢 Caps & Hats", value: "caps hats" },
    { label: "💼 Travel Accessories", value: "travel accessories" }
  ],

  toysgames: [
    { label: "🎓 Learning Toys", value: "learning toys" },
    { label: "🏸 Sports Toys", value: "sports toys" },
    { label: "🎲 Indoor Games", value: "indoor games" },
    { label: "🧸 Soft Toys", value: "soft toys" },
    { label: "🧱 Building Blocks", value: "building blocks" },
    { label: "🚗 RC Toys", value: "rc toys" },
    { label: "🦸 Action Figures", value: "action figures" }
  ],

  sportsfitness: [
    { label: "🏋️ Fitness Equipment", value: "fitness equipment" },
    { label: "🥅 Sports Gear", value: "sports gear" },
    { label: "👟 Athletic Footwear", value: "athletic footwear" },
    { label: "🎒 Fitness Accessories", value: "fitness accessories" },
    { label: "🥤 Nutrition & Supplements", value: "nutrition supplements" }
  ],

  baby: [
    { label: "🍼 Feeding Essentials", value: "feeding essentials" },
    { label: "🧴 Bath & Skincare", value: "bath skincare" },
    { label: "🧸 Baby Toys", value: "baby toys" },
    { label: "👶 Baby Clothing", value: "baby clothing" },
    { label: "🚼 Baby Gear", value: "baby gear" },
    { label: "🧼 Health & Safety", value: "baby health safety" }
  ],

  homekitchen: [
    { label: "🍳 Kitchen Tools", value: "kitchen tools" },
    { label: "🍽 Cookware", value: "cookware" },
    { label: "🔌 Appliances", value: "kitchen appliances" },
    { label: "🧺 Home Organization", value: "home organization" },
    { label: "🖼 Home Decor", value: "home decor" },
    { label: "🧹 Cleaning Supplies", value: "cleaning supplies" },
    { label: "🛏 Bedding", value: "bedding furnishing" }
  ],

  books: [
    { label: "📘 Fiction", value: "fiction" },
    { label: "📗 Non Fiction", value: "non fiction" },
    { label: "📙 Children", value: "children books" },
    { label: "📚 Academic", value: "academic" },
    { label: "💡 Self Help", value: "self help" }
  ]
};

const fashionFilters = {
  gender: ["Women", "Men", "Kids"],

  sub: {
    Women: ["Tops", "Dresses", "Sarees", "Jeans", "Winter Wear", "Footwear"],
    Men: ["T-Shirts", "Shirts", "Jeans", "Winter Wear", "Activewear", "Footwear"],
    Kids: ["Boys Clothing", "Girls Clothing", "Footwear", "Accessories"]
  },

};

function showFashionPanel() {
  document.getElementById("fashion-panel").style.display = "block";
  renderRow("fashion-gender", fashionFilters.gender, "gender");
}

function hideFashionPanel() {
  document.getElementById("fashion-panel").style.display = "none";
}

function renderRow(containerId, items, type) {
  const box = document.getElementById(containerId);

  box.innerHTML = items.map(item =>
    `<button class="f-btn" data-type="${type}" data-value="${item}">${item}</button>`
  ).join('');

  attachFashionClickEvents();
}

function attachFashionClickEvents() {
  document.querySelectorAll(".f-btn").forEach(btn => {
    btn.onclick = () => {
      const name = btn.textContent.toLowerCase();
      const type = btn.dataset.type;
      const val = btn.dataset.value;

      // Highlight buttons
      document.querySelectorAll(".f-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // ---------------------------
      // FASHION FILTER START
      // ---------------------------

      if (type === "gender") {
        userFashionFilter.gender = val;

        // Filter only gender
        filteredProducts = allProducts.filter(p =>
          p.gender?.toLowerCase() === val.toLowerCase()
        );

        // Load sub filters for this gender
        renderRow("fashion-sub", fashionFilters.sub[val], "sub");
      }

      if (type === "sub") {
        filteredProducts = allProducts.filter(p =>
          p.gender?.toLowerCase() === userFashionFilter.gender?.toLowerCase() &&
          p.sub?.toLowerCase() === val.toLowerCase()
        );
      }

      // ---------------------------
      // RENDER
      // ---------------------------

      currentPage = 1;
      renderPage();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });
}
function renderSubFilters(category) {
  const box = document.getElementById("subfilters");

  if (subCategories[category]) {
  box.innerHTML = subCategories[category]
    .map(item => `<button class="sub-btn" data-sub="${item.value}">${item.label}</button>`)
    .join('');

  attachSubFilterEvents(); 
} else {
  box.innerHTML = "";
}
}
function attachSubFilterEvents() {
  document.querySelectorAll(".sub-btn").forEach(btn => {
    btn.onclick = () => {

      // 🔵 Highlight system
      document.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const name = btn.dataset.sub.toLowerCase();

      filteredProducts = allProducts.filter(p =>
  p.subcategory?.toLowerCase().includes(name) ||
  p.name.toLowerCase().includes(name) ||
  p.keywords?.toLowerCase().includes(name)
);

      currentPage = 1;
      renderPage();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });
}

fetch("products.json")
  .then(res => res.json())
  .then(products => {
    allProducts = products.reverse();
    filteredProducts = [...allProducts];
    renderPage();
    renderPagination();
    setupFilters();
});

function getPerPage() {
  if (window.innerWidth < 768) return 12;
  return 15;
}

function renderPage() {
  const perPage = getPerPage();
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const pageProducts = filteredProducts.slice(start, end);

  const container = document.getElementById("products");
  container.innerHTML = pageProducts.map(p => `
    <div class="deal-card" 
         data-name="${p.name.toLowerCase()}" 
         data-category="${p.category?.toLowerCase() || ''}"
         data-keywords="${p.keywords?.toLowerCase() || ''}">
         
      <div class="img-wrap">
  <img src="${p.image}" class="product-img" alt="${p.name}">

  <button class="fav-btn ${isInCart(p.link) ? 'active' : ''}"
onclick='toggleCart(this, {
  name: "${p.name}",
  price: "${p.price}",
  image: "${p.image}",
  link: "${p.link}"
})'>
❤️
</button>



</div>

      <h2 class="product-title">${p.name}</h2>

      <div class="rating">
        ${generateStars(p.rating)}
        <span class="rating-number">${p.rating}</span>
      </div>

      <p class="price">
        <span class="new">${p.price}</span>
        <span class="old">${p.mrp || ''}</span>
        ${p.discount ? `<span class="off">${p.discount}</span>` : ""}
      </p>

      <p class="store">${detectStore(p.link)}</p>

      <div class="actions">
        <button class="buy-btn" data-link="${p.link}" data-name="${p.name}">Buy Now</button>
        <button class="share-btn" data-link="${p.link}" data-name="${p.name}">Share</button>
      </div>
    </div>
  `).join("");
  
  setupImageViewer();
}

function renderPagination() {
    const perPage = getPerPage();
    const totalPages = Math.ceil(filteredProducts.length / perPage);
    const current = currentPage;

    const prevBtn = document.querySelector(".pg-prev");
    const nextBtn = document.querySelector(".pg-next");
    const pagesContainer = document.querySelector(".pg-pages");

    pagesContainer.innerHTML = "";

    // Hide if only 1 page
    if (totalPages <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        return;
    }

    prevBtn.style.display = "block";
    nextBtn.style.display = "block";

    function addPage(num) {
        const btn = document.createElement("button");
        btn.className = "pg-page" + (num === current ? " active" : "");
        btn.textContent = num;
        btn.onclick = () => goToPage(num);
        pagesContainer.appendChild(btn);
    }

    // page layout logic
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) addPage(i);
    } else {
        addPage(1);

        if (current > 3) {
            const dots = document.createElement("span");
            dots.className = "pg-ellipsis";
            dots.textContent = "...";
            pagesContainer.appendChild(dots);
        }

        const start = Math.max(2, current - 1);
        const end = Math.min(totalPages - 1, current + 1);

        for (let i = start; i <= end; i++) addPage(i);

        if (current < totalPages - 2) {
            const dots = document.createElement("span");
            dots.className = "pg-ellipsis";
            dots.textContent = "...";
            pagesContainer.appendChild(dots);
        }

        addPage(totalPages);
    }

    // Disable prev/next at edges
    prevBtn.disabled = (current === 1);
    nextBtn.disabled = (current === totalPages);

    // button actions
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
            renderPagination();
            scrollUp();
        }
    };

    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage();
            renderPagination();
            scrollUp();
        }
    };
}

// CHANGE PAGE DIRECTLY
function goToPage(num) {
    currentPage = num;
    renderPage();
    renderPagination();
    scrollUp();
}

// SMOOTH SCROLL UP
function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================
   IMAGE VIEWER
===========================*/

const viewer = document.getElementById("img-viewer");
const viewerImg = document.getElementById("viewer-img");

function setupImageViewer() {
    document.querySelectorAll(".product-img").forEach(img => {
        img.onclick = () => {
            viewerImg.src = img.src;
            viewer.style.display = "flex";
        };
    });
}

document.querySelector(".close-btn").onclick = () => {
    viewer.style.display = "none";
};

// close when clicking outside
viewer.onclick = (e) => {
    if (e.target === viewer) viewer.style.display = "none";
};

function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(btn => {
    btn.onclick = () => {
      const filter = btn.getAttribute("data-filter");

      // highlight active tab
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // FASHION SPECIAL
      if (filter === "fashion") {
        showFashionPanel();
        document.getElementById("subfilters").style.display = "none";
      } else {
        hideFashionPanel();
        document.getElementById("subfilters").style.display = "flex";
        renderSubFilters(filter);
      }

      // normal filtering
      currentPage = 1;

      if (filter === "all") {
        filteredProducts = [...allProducts];
      } else {
        filteredProducts = allProducts.filter(p => p.category === filter);
      }

      renderPage();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });
}
  
function handleSearch(query) {
  query = query.toLowerCase();
  filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category?.toLowerCase().includes(query) ||
    p.keywords?.toLowerCase().includes(query)
  );
  currentPage = 1;
  renderPage();
  renderPagination();
}

const searchInputBox = document.getElementById("searchInput");
const searchIcon = document.querySelector(".search-icon");

searchInputBox.addEventListener("input", e => handleSearch(e.target.value));
searchIcon.addEventListener("click", () => handleSearch(searchInputBox.value));

// 🟡 CLOSE KEYBOARD ON ENTER (Mobile fix)
searchInputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch(searchInputBox.value);
    searchInputBox.blur(); // close keyboard
  }
});

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return "⭐".repeat(fullStars) + (halfStar ? "🌟" : "") + "☆".repeat(emptyStars);
}

const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("buy-btn")) {
    window.open(e.target.getAttribute("data-link"), "_blank");
  }

  if (e.target.classList.contains("share-btn")) {
    const link = e.target.getAttribute("data-link");
    const name = e.target.getAttribute("data-name");
    const text = `Check this deal: ${name}\nBuy 👉 ${link}`;
    if (navigator.share) {
      navigator.share({ title: name, text, url: link });
    } else {
      alert(text);
    }
  }
});

// ... your last existing JavaScript code
// (share, theme toggle, saved theme, etc)


// ------------------------------------
// ADD THE SWIPE SUBFILTER SCROLL CODE HERE
// ------------------------------------

const subFiltersBox = document.getElementById("subfilters");

let isDown = false;
let startX;
let scrollLeft;

subFiltersBox.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - subFiltersBox.offsetLeft;
  scrollLeft = subFiltersBox.scrollLeft;
});

subFiltersBox.addEventListener('mouseleave', () => {
  isDown = false;
});

subFiltersBox.addEventListener('mouseup', () => {
  isDown = false;
});

subFiltersBox.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - subFiltersBox.offsetLeft;
  const walk = (x - startX) * 1.5;
  subFiltersBox.scrollLeft = scrollLeft - walk;
});

// Done 

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");

  if (!slides || dots.length === 0) return;

  let index = 0;

  function showSlide(i) {
    slides.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");
  }

  // Auto slide
  setInterval(() => {
    index = (index + 1) % dots.length;
    showSlide(index);
  }, 4000);

  // Dot click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });

  // Swipe support (mobile)
  let startX = 0;

  slides.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  slides.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) index = (index + 1) % dots.length;
    if (endX - startX > 50) index = (index - 1 + dots.length) % dots.length;

    showSlide(index);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profileBtn");
  const loginModal = document.getElementById("loginModal");
  const closeLogin = document.getElementById("closeLogin");

  profileBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });

  closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
  });
});

// ================= CART LOGIC (FINAL) =================

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function isInCart(link) {
  const cart = getCart();
  return cart.some(item => item.link === link);
}

function toggleCart(btn, product) {
  let cart = getCart();

  const index = cart.findIndex(item => item.link === product.link);

  if (index === -1) {
    cart.push(product);
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // 🔥 MOBILE FORCE REPAINT
  btn.classList.toggle("active", index === -1);

  // 🔥 RE-RENDER ONLY IF NEEDED
  requestAnimationFrame(() => {
    renderPage();
  });
}

function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  const cart = getCart();
  if (countEl) countEl.innerText = cart.length;
}

function openCart() {
  window.location.href = "cart.html";
}

updateCartCount();

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
  document.getElementById("menuOverlay").classList.toggle("active");
}


document.querySelectorAll("#mobileMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.remove("active");
  });
});

function loadCategoryProducts(category) {
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById("productList");
      if (!container) return;

      container.innerHTML = "";

      products
        .filter(p => p.category === category)
        .slice(0, 15)
        .forEach(p => {
          container.innerHTML += `
            <div class="product-card">
              <img src="${p.image}" alt="${p.name}">
              <h3>${p.name}</h3>

              <p class="price">
                ₹${p.price}
                ${p.mrp ? `<span class="mrp">₹${p.mrp}</span>` : ""}
                ${p.discount ? `<span class="discount">${p.discount}</span>` : ""}
              </p>

              ${p.rating ? `<p class="rating">⭐ ${p.rating}</p>` : ""}

              <a href="${p.link}" target="_blank">View Deal</a>
            </div>
          `;
        });
    });
}
