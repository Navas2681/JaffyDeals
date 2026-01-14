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
    { label: "🎧 Headphones & 🔊 Speakers", value: "headphones & speakers" },
    { label: "⌚ Smart Wearables", value: "smart wearables" },
    { label: "💻 Computing & Laptops", value: "computing & laptops" },
    { label: "🖨 Office Electronics", value: "office electronics" },
    { label: "🔌 Accessories", value: "accessories" },
    { label: "📸 Cameras & Drones", value: "cameras & drones" },
    { label: "🏠 Smart Home", value: "smart home" },
    { label: "⚡ Power & Energy", value: "power & energy" },
    { label: "🚗 Vehicle Electronics", value: "vehicle electronics" },
    { label: "🎮 Gaming Gear", value: "gaming gear" }
  ],

  mobile: [
  { label: "Apple", value: "apple" },
  { label: "Samsung", value: "samsung" },
  { label: "OnePlus", value: "oneplus" },
  { label: "Xiaomi", value: "xiaomi" },
  { label: "Realme", value: "realme" },
  { label: "Vivo", value: "vivo" },
  { label: "Oppo", value: "oppo" },
  { label: "Motorola", value: "motorola" },
  { label: "Nothing", value: "nothing" },
  { label: "IQOO", value: "iqoo" },
  { label: "Google Pixel", value: "google pixel" },
  { label: "Poco", value: "poco" },
  { label: "Tecno", value: "tecno" },
  { label: "Infinix", value: "infinix" },
  { label: "Lava", value: "lava" }
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
         
      <img src="${p.image}" class="product-img" alt="${p.name}">
      <h2>${p.name}</h2>

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
}

function renderPagination() {
  const perPage = getPerPage();
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const pagination = document.querySelector(".pagination");
  const pagesContainer = document.querySelector(".pagination .pages");
  pagesContainer.innerHTML = "";

  if (totalPages <= 1) {
    pagination.style.display = "none";
    return;
  } else {
    pagination.style.display = "flex";
  }

  for (let i = 1; i <= totalPages; i++) {
    pagesContainer.innerHTML += `<span class="page ${i === currentPage ? "active" : ""}">${i}</span>`;
  }

  document.querySelector(".prev").disabled = currentPage === 1;
  document.querySelector(".next").disabled = currentPage === totalPages;

  document.querySelectorAll(".page").forEach(btn => {
    btn.onclick = () => {
      currentPage = Number(btn.textContent);
      renderPage();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });

  document.querySelector(".prev").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  document.querySelector(".next").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
}

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