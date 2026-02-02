const products = [
    {
        id: 1,
        name: "Radiant Roots Hair Oil",
        price: 999.00,
        image: "assets/oil.png",
        description: "Infused with 18 rare herbs to strengthen roots and restore natural shine."
    },
    {
        id: 2,
        name: "Saffron & Almond Face Cream",
        price: 1499.00,
        image: "assets/cream.png",
        description: "A luxurious blend of Kashmiri Saffron and Sweet Almond for eternal youth."
    },
    {
        id: 3,
        name: "Jasmine Body Butter",
        price: 1250.00,
        image: "assets/cream.png", // Reusing image
        description: "Deep hydration with the soothing aroma of night-blooming Jasmine."
    },
    {
        id: 4,
        name: "Bhringraj Scalp Therapy",
        price: 1100.00,
        image: "assets/oil.png", // Reusing image
        description: "Revitalize your scalp with our potent ancient Bhringraj formula."
    }
];

let cart = [];

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-price">₹${product.price.toFixed(2)}</div>
            <button class="btn-glossy" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Bag</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCart(true); // Open cart when item added
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update total
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = totalAmount.toFixed(2);

    // Update list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your bag is empty. Start your wellness journey today.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-actions">
                    <button class="btn-glossy" style="padding: 5px 10px; font-size: 0.8rem;" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }
}

function toggleCart(forceOpen = false) {
    const modal = document.getElementById('cart-modal');
    if (forceOpen) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('product-detail-modal');

    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-desc').innerText = product.description;
    document.getElementById('modal-price').innerText = '₹' + product.price.toFixed(2);

    // Set up the add to cart button in the modal
    const addToCartBtn = document.getElementById('modal-add-btn');
    addToCartBtn.onclick = function () {
        addToCart(product.id);
        closeProductModal();
    };

    modal.style.display = 'flex';
}

function closeProductModal() {
    const modal = document.getElementById('product-detail-modal');
    modal.style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert("Your bag is empty!");
        return;
    }
    alert("Thank you for your purchase! Your journey to wellness begins now.");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        renderProducts();
    }
});
