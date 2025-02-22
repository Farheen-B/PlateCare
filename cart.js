let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Display Cart Items
function displayCartItems() {
    let cartContainer = document.getElementById("cart-items");
    let totalPriceContainer = document.getElementById("total-price");
    cartContainer.innerHTML = ""; // Clear previous content
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceContainer.textContent = "";
        return;
    }

    cart.forEach((item, index) => {
        total += parseFloat(item.price.replace("$", "")) * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div>
                <h4>${item.title}</h4>
                <p>${item.price} each</p>
            </div>
            <input type="number" value="${item.quantity}" min="1" data-index="${index}">
            <button class="remove-item" data-index="${index}">🗑️</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    totalPriceContainer.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to Update Quantity
document.addEventListener("change", function (event) {
    if (event.target.type === "number") {
        let index = event.target.getAttribute("data-index");
        cart[index].quantity = parseInt(event.target.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    }
});

// Function to Remove an Item
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
        let index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    }
});

// Load Cart Items
document.addEventListener("DOMContentLoaded", displayCartItems);
