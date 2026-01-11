fetch("products.json")
  .then(res => res.json())
  .then(products => {
  
  // newest items first
  products = products.reverse();

  let container = document.getElementById("products");

    container.innerHTML = products.map(p => `
      <div class="deal-card" data-category="${p.category}">
        <img src="${p.image}" class="product-img">
        <h2>${p.name}</h2>

        <!-- ⭐ RATING ADDED -->
        ${p.rating ? `
        <div class="rating">
          ${generateStars(p.rating)}
          <span class="rating-number">${p.rating}</span>
        </div>
        ` : ''}

        <p class="price">
            <span class="new">${p.price}</span>
            <span class="old">${p.mrp}</span>
            <span class="off">${p.discount}</span>
        </p>
        <p class="store">Amazon</p>
        <a href="${p.link}" target="_blank" class="btn">Buy Now</a>
      </div>
    `).join("");

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

// ⭐ Generate star icons based on rating value
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = '';

  for (let i = 0; i < fullStars; i++) {
    stars += '⭐';
  }

  if (halfStar) {
    stars += '⭐';
  }

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