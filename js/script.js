let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts();
    updateCartCount();
  });

function displayProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((p, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" onclick="openModal('${p.image}')" style="cursor:pointer;" />
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(i) {
  const existing = cart.find(item => item.name === products[i].name);

  if (existing) existing.qty++;
  else cart.push({ ...products[i], qty: 1 });

  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}

function openModal(src) {
  document.getElementById("imageModal").style.display = "block";
  document.getElementById("modalImg").src = src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

function goBrand(brand) {
  window.location.href = `products.html?brand=${brand}`;
}
function goAccessoryBrand(brand) {
  window.location.href = `accessories.html?brand=${brand}`;
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

function goSearch(e) {
  if (e.key === "Enter") {
    const value = document.getElementById("search").value.trim();

    if (value !== "") {
      window.location.href = `products.html?search=${value}`;
    }
  }
}