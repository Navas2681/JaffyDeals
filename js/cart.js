
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  const container = document.getElementById("cart-container");
  const totalItems = document.getElementById("total-items");
  const totalPrice = document.getElementById("total-price");

  container.innerHTML = "";

  let items = 0;
  let price = 0;

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price} x ${item.qty}</p>
          <button onclick="dec(${index})">-</button>
          <button onclick="inc(${index})">+</button>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;

    items += item.qty;
    price += item.price * item.qty;
  });

  totalItems.innerText = items;
  totalPrice.innerText = price;
}

function inc(i) {
  cart[i].qty++;
  save();
}

function dec(i) {
  if (cart[i].qty > 1) cart[i].qty--;
  else cart.splice(i, 1);
  save();
}

function removeItem(i) {
  cart.splice(i, 1);
  save();
}

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();

