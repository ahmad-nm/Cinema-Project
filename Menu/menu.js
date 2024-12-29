const navBar = document.querySelector("nav"),
menuBtns = document.querySelectorAll(".menu-icon"),
overlay = document.querySelector(".overlay");

menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
    });
});

overlay.addEventListener("click", () => {
    navBar.classList.remove("open");
});

document.getElementById("small-btn").addEventListener("click", () => {
    let size = document.getElementById("item-price");
    size.innerHTML = "$5.00";
});
document.getElementById("medium-btn").addEventListener("click", () => {
    let size = document.getElementById("item-price");
    size.innerHTML = "$7.50";
});
document.getElementById("large-btn").addEventListener("click", () => {
    let size = document.getElementById("item-price");
    size.innerHTML = "$10.0";
});

let initialPrice = 0;
const sizes = {
    'small': 5.00,
    'medium': 7.50,
    'large': 10.0
};

function updateSize(size) {
    initialPrice = sizes[size];
    document.getElementById("selected-size").innerHTML = size.charAt(0).toUpperCase() + size.slice(1);
    price();
}

function initializePrice() {
    initialPrice = sizes['small'];
    let priceElement = document.getElementById("item-price");
    price();
}

function price() {
    let quantity = parseInt(document.getElementById("quantity-value").innerHTML);
    let priceElement = document.getElementById("item-price");
    let totalPrice = (quantity * initialPrice).toFixed(1);
    priceElement.innerHTML = '$' + totalPrice;
}

function updateSize(size) {
    initialPrice = sizes[size];
    
    document.getElementById("selected-size").innerHTML = size.charAt(0).toUpperCase() + size.slice(1);
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${size}-btn`).classList.add('active');
    
    price();
}

document.getElementById("small-btn").addEventListener("click", () => updateSize('small'));
document.getElementById("medium-btn").addEventListener("click", () => updateSize('medium'));
document.getElementById("large-btn").addEventListener("click", () => updateSize('large'));

document.getElementById("substract-quantity-btn").addEventListener("click", () => {
    let quantity = parseInt(document.getElementById("quantity-value").innerHTML);
    if (quantity > 1) {
        document.getElementById("quantity-value").innerHTML = quantity - 1;
        price();
    }
});

document.getElementById("add-quantity-btn").addEventListener("click", () => {
    let quantity = parseInt(document.getElementById("quantity-value").innerHTML);
    document.getElementById("quantity-value").innerHTML = quantity + 1;
    price();
});

document.addEventListener("DOMContentLoaded", initializePrice);