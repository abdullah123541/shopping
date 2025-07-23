// Load products from localStorage if available, otherwise use default products
const PRODUCTS_KEY = "shop_products";
let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [
  {
    name: "Smartphone XYZ",
    price: "$499",
    images: ["image1.jpeg", "image.jpeg", "image3.jpeg"]
  },
  {
    name: "Wireless Headphones",
    price: "$99",
    images: ["https://via.placeholder.com/300x200?text=Headphones"]
  },
  {
    name: "Smartwatch Pro",
    price: "$149",
    images: ["https://via.placeholder.com/300x200?text=Smartwatch"]
  },
  {
    name: "Gaming Laptop",
    price: "$1299",
    images: ["https://via.placeholder.com/300x200?text=Laptop"]
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = products.map((product) => `
    <div class="product">
      <img src="${product.images[0]}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
    </div>
  `).join('');
}

function renderCartPage() {
  const cartContainer = document.getElementById("cartItems");
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <img src="${item.images[0]}" alt="${item.name}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      </div>
    </div>
  `).join('');
}

function updateCartCount() {
  const countElem = document.getElementById("cartCount");
  if (countElem) countElem.innerText = cart.length;
}

// Sticky header functionality
function handleScroll() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCartPage();
  updateCartCount();

  window.addEventListener('scroll', handleScroll);

  const animateElements = document.querySelectorAll('.product, .deal-card');
  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
      element.classList.add('animate-on-scroll');
      observer.observe(element);
    });
  }
});
