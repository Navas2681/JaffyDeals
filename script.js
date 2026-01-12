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

fetch("products.json")
  .then(res => res.json())
  .then(products => {
  
  // newest items first
  products = products.reverse();

  let container = document.getElementById("products");

   container.innerHTML = products.map(p => `
  <div class="deal-card" data-category="${p.category}" data-name="${p.name.toLowerCase()}">

    <img src="${p.image}" class="product-img" alt="${p.name}">

    <h2>${p.name}</h2>

    <div class="rating">
      ${generateStars(p.rating)}
      <span class="rating-number">${p.rating}</span>
    </div>

    <p class="price">
      <span class="new">${p.price}</span>
      <span class="old">${p.mrp}</span>
      <span class="off">${p.discount}</span>
    </p>

    <p class="store">${detectStore(p.link)}</p>

    <div class="actions">
      <a href="${p.link}" target="_blank" class="btn">Buy Now</a>

      <button class="share-btn" 
        data-link="${p.link}" 
        data-name="${p.name}">
        <span class="share-icon">🔗</span> Share
      </button>
    </div>

  </div>
`).join('');

    setupFilters();
  });

function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.deal-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let stars = '';

  for (let i = 0; i < fullStars; i++) stars += "⭐";
  if (halfStar) stars += "🌟";
  for (let i = 0; i < emptyStars; i++) stars += "☆";

  return stars;
}

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  toggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});

// Save theme preference
toggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load theme on startup
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

const searchInput = document.querySelector('.search-box input');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.deal-card');

  cards.forEach(card => {
    const name = card.getAttribute('data-name');
    const category = card.getAttribute('data-category');
    const keywords = card.getAttribute('data-keywords') || '';

    if (name.includes(q) || category.includes(q) || keywords.includes(q)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('share-btn')) {
    const link = e.target.getAttribute('data-link');
    const name = e.target.getAttribute('data-name');

    const text = `Check this deal: ${name}\nBuy 👉 ${link}`;

    if (navigator.share) {
      navigator.share({
        title: name,
        text: text,
        url: link
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Link copied! You can paste and share.');
    }
  }
});