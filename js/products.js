let products = [];
let currentType = "all";
let searchText = getSearchQuery().toLowerCase();

fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    showProducts();
  });

function getQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("brand");
}

function showProducts() {
  const brand = getQuery();
  const container = document.getElementById("products");
  const title = document.getElementById("title");

 let filtered = products;

// 🔍 SEARCH FIRST (IMPORTANT)
if (searchText !== "") {
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(searchText) ||
    p.brand.toLowerCase().includes(searchText)
  );
}

// 🏷 BRAND FILTER
if (brand) {
  filtered = filtered.filter(p => p.brand === brand);
}

// 📦 TYPE FILTER
if (currentType !== "all") {
  filtered = filtered.filter(p => p.type === currentType);
}

  // 🔍 SEARCH FILTER (IMPORTANT)
  if (searchText !== "") {
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(searchText) ||
    p.brand.toLowerCase().includes(searchText)
  );
}

  // UI
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found 😢</p>";
    return;
  }

  filtered.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
      </div>
    `;
  });
}

const params = new URLSearchParams(window.location.search);
const brand = params.get("brand");

if (brand) {
  filtered = products.filter(p => p.brand === brand);
}

function filterType(type) {
  currentType = type;

  // update active button UI
  document.querySelectorAll(".filter-buttons button").forEach(btn => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");

  showProducts();
}

function searchProduct() {
  searchText = document.getElementById("search").value;
  console.log("Searching:", searchText); // 👈 ADD THIS
  showProducts();
}

function getSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || "";
}
