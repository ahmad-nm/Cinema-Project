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

const flavorPrices = {
    1: { name: 'Salted', small: 5.00, medium: 7.50, large: 10.00 },
    2: { name: 'Caramel', small: 6.00, medium: 8.50, large: 11.00 },
    3: { name: 'Cheese', small: 6.50, medium: 9.00, large: 11.50 },
    4: { name: 'Cheetos', small: 5.50, medium: 8.00, large: 10.50 },
    5: { name: 'Salt-Free', small: 5.00, medium: 7.50, large: 10.00 },
    6: { name: 'Zaatar', small: 7.00, medium: 9.50, large: 12.00 },
    7: { name: 'Salted-Zaatar', small: 5.50, medium: 8.00, large: 10.50 },
    8: { name: 'Chilly', small: 8.00, medium: 10.50, large: 13.00 },
    9: { name: 'Butter', small: 5.00, medium: 7.50, large: 10.00 },
    10:{ name: 'Orange-Juice', small: 3.00, medium: 4.50, large: 6.00 },
};

let itemPrices = {};

function updateSize(size, itemId) {
    itemPrices[itemId] = flavorPrices[itemId][size];

    price(itemId);
}

function price(itemId) {
    let quantity = parseInt(document.getElementById(`quantity-value-${itemId}`).innerHTML);
    let priceElement = document.getElementById(`item-price-${itemId}`);
    let totalPrice = (quantity * itemPrices[itemId]).toFixed(2);
    priceElement.innerHTML = '$' + totalPrice;
}

function initializeItem(itemId) {
    // Initialize price for this item
    itemPrices[itemId] = flavorPrices[itemId].small;
    
    // Add size button listeners
    document.getElementById(`small-btn-${itemId}`).addEventListener("click", () => updateSize('small', itemId));
    document.getElementById(`medium-btn-${itemId}`).addEventListener("click", () => updateSize('medium', itemId));
    document.getElementById(`large-btn-${itemId}`).addEventListener("click", () => updateSize('large', itemId));

    // Add quantity button listeners
    document.getElementById(`substract-quantity-btn-${itemId}`).addEventListener("click", () => {
        let quantity = parseInt(document.getElementById(`quantity-value-${itemId}`).innerHTML);
        if (quantity > 1) {
            document.getElementById(`quantity-value-${itemId}`).innerHTML = quantity - 1;
            price(itemId);
        }
    });

    document.getElementById(`add-quantity-btn-${itemId}`).addEventListener("click", () => {
        let quantity = parseInt(document.getElementById(`quantity-value-${itemId}`).innerHTML);
        document.getElementById(`quantity-value-${itemId}`).innerHTML = quantity + 1;
        price(itemId);
    });

    // Set initial price
    price(itemId);
}

// Initialize all items when document loads
document.addEventListener('DOMContentLoaded', () => {
    initializeItem(1);
    initializeItem(2);
    initializeItem(3);
    initializeItem(4);
    initializeItem(5);
    initializeItem(6);
    initializeItem(7);
    initializeItem(8);
    initializeItem(9);
    initializeItem(10);
});

const PopcornMenuBtn = document.getElementById('menu-popcorn');
const ColdDrinksMenuBtn = document.getElementById('menu-cold-drinks');
const HotDrinksMenuBtn = document.getElementById('menu-hot-drinks');
const SnacksMenuBtn = document.getElementById('menu-snacks');

PopcornMenuBtn.addEventListener('click', () => {
    const PopcornMenu = document.getElementById('Popcorn-Menu');

    console.log('Popcorn Button:', PopcornMenuBtn);
    console.log('Popcorn Menu:', PopcornMenu);

    if (PopcornMenu.style.display === 'flex') {
        PopcornMenu.style.display = 'none';
        PopcornMenuBtn.style.backgroundColor = 'hsl(0, 95%, 31%)';
        return;
    }
    else {
        PopcornMenu.style.display = 'flex';
        PopcornMenu.classList.add('active')
        PopcornMenuBtn.style.backgroundColor = 'hsl(0, 95%, 21%)';
    }
});

ColdDrinksMenuBtn.addEventListener('click', () => {
    const ColdDrinksMenu = document.getElementById('Cold-drinks-menu');

    if (ColdDrinksMenu.style.display === 'flex') {
        ColdDrinksMenu.style.display = 'none';
        ColdDrinksMenuBtn.style.backgroundColor = 'hsl(0, 95%, 31%)';
        return;
    }
    else {
        ColdDrinksMenu.style.display = 'flex';
        ColdDrinksMenu.classList.add('active')
        ColdDrinksMenuBtn.style.backgroundColor = 'hsl(0, 95%, 21%)';
    }
});

HotDrinksMenuBtn.addEventListener('click', () => {
    const HotDrinksMenu = document.getElementById('Hot-drinks-menu');

    if (HotDrinksMenu.style.display === 'flex') {
        HotDrinksMenu.style.display = 'none';
        HotDrinksMenuBtn.style.backgroundColor = 'hsl(0, 95%, 31%)';
        return;
    }
    else {
        HotDrinksMenu.style.display = 'flex';
        HotDrinksMenu.classList.add('active')
        HotDrinksMenuBtn.style.backgroundColor = 'hsl(0, 95%, 21%)';
    }
});

SnacksMenuBtn.addEventListener('click', () => {
    const SnacksMenu = document.getElementById('Snacks-menu');

    if (SnacksMenu.style.display === 'flex') {
        SnacksMenu.style.display = 'none';
        SnacksMenuBtn.style.backgroundColor = 'hsl(0, 95%, 31%)';
        return;
    }
    else {
        SnacksMenu.style.display = 'flex';
        SnacksMenu.classList.add('active')
        SnacksMenuBtn.style.backgroundColor = 'hsl(0, 95%, 21%)';
    }
});