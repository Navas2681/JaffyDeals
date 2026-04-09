const page = window.location.pathname;

function showProducts() {
  const container = document.getElementById("products");

  let filtered = products;

  // 👉 If accessories page
  if (page.includes("accessories")) {
    filtered = products.filter(p => p.type === "accessory");
  }

  // 👉 If products page
  if (page.includes("products")) {
    filtered = products.filter(p => p.type === "product");
  }

  // 👉 SEARCH FILTER
  if (searchText) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  container.innerHTML = "";

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