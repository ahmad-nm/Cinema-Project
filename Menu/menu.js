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
    2: { name: 'Caramel', small: 4.00, medium: 6.50, large: 9.00 },
    3: { name: 'Cheese', small: 6.50, medium: 9.00, large: 11.50 },
    4: { name: 'Cheetos', small: 5.50, medium: 8.00, large: 10.50 },
    5: { name: 'Salt-Free', small: 5.00, medium: 7.50, large: 10.00 },
    6: { name: 'Zaatar', small: 7.00, medium: 9.50, large: 12.00 },
    7: { name: 'Salted-Zaatar', small: 5.50, medium: 8.00, large: 10.50 },
    8: { name: 'Chilly', small: 8.00, medium: 10.50, large: 13.00 },
    9: { name: 'Butter', small: 5.00, medium: 7.50, large: 10.00 },
    10:{ name: 'Orange-Juice', small: 3.00, medium: 4.50, large: 6.00 },
    11:{ name: 'Mango-Juice', small: 3.00, medium: 4.50, large: 6.00 },
    12:{ name: 'Lemonade', small: 2.00, medium: 3.50, large: 5.00 },
    13:{ name: 'Cocktail', small: 4.00, medium: 5.00, large: 7.00 },
    14:{ name: 'Strawberry Smoothie', small: 4.00, medium: 5.00, large: 7.00 },
    15:{ name: 'Mango Smoothie', small: 4.00, medium: 5.00, large: 7.00 },
    16:{ name: 'Oreo Milkshake', small: 4.50, medium: 6.00, large: 8.00 },
    17:{ name: 'Strawberry Milkshake', small: 4.50, medium: 6.00, large: 8.00 },
    18:{ name: 'Blueberry Milkshake', small: 4.50, medium: 6.00, large: 8.00 },
    19:{ name: 'Espresso', small: 2.00, medium: 3.00, large: 4.00 },
    20:{ name: 'Americano', small: 2.50, medium: 3.50, large: 4.50 },
    21:{ name: 'Latte', small: 3.00, medium: 4.00, large: 5.00 },
    22:{ name: 'Cappuccino', small: 3.00, medium: 4.00, large: 5.00 },
    23:{ name: 'Mocha', small: 3.50, medium: 4.50, large: 5.50 },
    24:{ name: 'Hot Chocolate', small: 3.50, medium: 4.50, large: 5.50 },
    25:{ name: 'Tea', small: 2.00, medium: 3.00, large: 4.00 },
    26:{ name: 'Green Tea', small: 2.00, medium: 3.00, large: 4.00 },
    27:{ name: 'Sahlab', small: 3.00, medium: 4.00, large: 5.00 },
    28:{ name: 'Nachos', small: 5.00, medium: 7.00, large: 9.00 },
    29:{ name: 'Nachos-Cheese', small: 6.00, medium: 8.00, large: 10.00 },
    30:{ name: 'Nachos-Mexican', small: 6.00, medium: 8.00, large: 10.00 },
    31:{ name: 'Fries', small: 4.00, medium: 6.00, large: 8.00 },
    32:{ name: 'Chicken Nuggets', small: 6.00, medium: 8.00, large: 10.00 },
    33:{ name: 'Chicken Wings', small: 6.00, medium: 8.00, large: 10.00 },
    34:{ name: 'Chicken Strips', small: 6.00, medium: 8.00, large: 10.00 },
    35:{ name: 'Chicken Popcorn', small: 6.00, medium: 8.00, large: 10.00 },
    36:{ name: 'Tacos', small: 5.00, medium: 7.00, large: 9.00 },
    37:{ name: 'Water', small: 0.50, medium: 1.00, large: 1.50 },
    38:{ name: 'CocaCola', small: 50.0, medium: 75.0, large: 100 },

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
    itemPrices[itemId] = flavorPrices[itemId].small;

    console.log(`Initializing item ${itemId}`);
    console.log(`Flavor prices for item ${itemId}:`, flavorPrices[itemId]);
    
    const smallBtn = document.getElementById(`small-btn-${itemId}`);
    const mediumBtn = document.getElementById(`medium-btn-${itemId}`);
    const largeBtn = document.getElementById(`large-btn-${itemId}`);

    if (smallBtn) {
        smallBtn.addEventListener("click", () => updateSize('small', itemId));
    } else {
        console.error(`Small button not found for item ${itemId}`);
    }

    if (mediumBtn) {
        mediumBtn.addEventListener("click", () => updateSize('medium', itemId));
    } else {
        console.error(`Medium button not found for item ${itemId}`);
    }

    if (largeBtn) {
        largeBtn.addEventListener("click", () => updateSize('large', itemId));
    } else {
        console.error(`Large button not found for item ${itemId}`);
    }


    document.getElementById(`substract-quantity-btn-${itemId}`).addEventListener("click", () => {
        let quantity = parseInt(document.getElementById(`quantity-value-${itemId}`).innerHTML);
        if (quantity > 0) {
            document.getElementById(`quantity-value-${itemId}`).innerHTML = quantity - 1;
            price(itemId);
            TotalPrice();
        }
    });

    document.getElementById(`add-quantity-btn-${itemId}`).addEventListener("click", () => {
        let quantity = parseInt(document.getElementById(`quantity-value-${itemId}`).innerHTML);
        document.getElementById(`quantity-value-${itemId}`).innerHTML = quantity + 1;
        price(itemId);
        TotalPrice();
    });

    price(itemId);
}

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
    initializeItem(11);
    initializeItem(12);
    initializeItem(13);
    initializeItem(14);
    initializeItem(15);
    initializeItem(16);
    initializeItem(17);
    initializeItem(18);
    initializeItem(19);
    initializeItem(20);
    initializeItem(21);
    initializeItem(22);
    initializeItem(23);
    initializeItem(24);
    initializeItem(25);
    initializeItem(26);
    initializeItem(27);
    initializeItem(28);
    initializeItem(29);
    initializeItem(30);
    initializeItem(31);
    initializeItem(32);
    initializeItem(33);
    initializeItem(34);
    initializeItem(35);
    initializeItem(36);
    initializeItem(37);
    initializeItem(38);
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

function TotalPrice() {
    let total = 0;
    for (let i = 1; i <= 36; i++) {
        total += parseFloat(document.getElementById(`item-price-${i}`).innerHTML.slice(1));
    }

    document.getElementById('total-price-value').innerHTML = '$' + total.toFixed(2);
    
    localStorage.setItem('MenuPrice', total);
}

document.getElementById('order').addEventListener('click', () => {
    window.location.href = '../Payment/payment.html';
});