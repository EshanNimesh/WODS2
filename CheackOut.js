// Helper functions for localStorage with error handling
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(cart) ? cart : [];
  } catch (e) {
    console.error("Error parsing cart data:", e);
    return [];
  }
}

function setCart(cart) {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Error saving cart data:", e);
  }
}

// Event listener to render the cart summary when page loads
window.addEventListener("DOMContentLoaded", () => {
  const cart = getCart();
  const tbody = document.querySelector("#summaryTable tbody");
  const summaryTotal = document.getElementById("summaryTotal");

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">Your cart is empty.</td></tr>`;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>Rs.${item.price}</td>
      <td>Rs.${subtotal}</td>
    `;
    tbody.appendChild(row);
  });

  summaryTotal.textContent = `Rs.${total}`;
});

// Function to submit the order
function submitOrder() {
  const fullName = document.getElementById("fullName");
  const address = document.getElementById("address");
  const payment = document.getElementById("payment");
  const confirmation = document.getElementById("confirmation");

  const cart = getCart();

  // Check if cart is empty
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }

  // Check if required fields are filled
  if (!fullName.value.trim() || !address.value.trim() || !payment.value.trim()) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Proceed with order
  confirmation.style.display = "block";
  fullName.value = "";
  address.value = "";
  payment.value = "";

  setCart([]); // Clear cart from localStorage

  // Clear cart display
  document.querySelector("#summaryTable tbody").innerHTML = `<tr><td colspan="4">Your cart is empty.</td></tr>`;
  summaryTotal.textContent = "Rs0";

  setTimeout(() => {
    confirmation.style.display = "none"; // Hide confirmation after 3 seconds
  }, 3000);
}





// Function to remove an item from the cart
function removeItemFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1); // Remove the item at the specified index
  setCart(cart);
  updateCartUI(); // Update the cart count
}

// Function to update cart count on the cart icon
function updateCartUI() {
  const cart = getCart();
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    let totalQty = 0;
    cart.forEach(item => totalQty += item.qty);
    cartCount.textContent = totalQty;
  }
}

// Run this when the page loads (if the cart icon exists)
window.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
