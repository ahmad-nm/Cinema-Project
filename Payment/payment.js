const creditCardBtn = document.getElementById('credit-card');
const paypalBtn = document.getElementById('paypal');
const visaBtn = document.getElementById('visa');

creditCardBtn.addEventListener('change', () => {
    document.querySelector('.credit-card').style.display = 'block';
    document.querySelector('.paypal').style.display = 'none';
    document.querySelector('.visa').style.display = 'none';
    const image = document.querySelector('.image');
    image.classList.remove('image');
    image.classList.add('image-open');
});

paypalBtn.addEventListener('change', () => {
    document.querySelector('.credit-card').style.display = 'none';
    document.querySelector('.paypal').style.display = 'block';
    document.querySelector('.visa').style.display = 'none';
    const image = document.querySelector('.image');
    image.classList.remove('image');
    image.classList.add('image-open-paypal');
});

visaBtn.addEventListener('change', () => {
    document.querySelector('.credit-card').style.display = 'none';
    document.querySelector('.paypal').style.display = 'none';
    document.querySelector('.visa').style.display = 'block';
    const image = document.querySelector('.image');
    image.classList.remove('image');
    image.classList.add('image-open');
});

document.addEventListener('DOMContentLoaded', () => {
    const MenuPrice = localStorage.getItem('MenuPrice');
    const SeatPrice = localStorage.getItem('SeatPrice');
    const RentPrice = localStorage.getItem('totalRentPrice');

    if (!MenuPrice || MenuPrice === 'null') {
        localStorage.setItem('MenuPrice', '0');
    }
    if (!SeatPrice || SeatPrice === 'null') {
        localStorage.setItem('SeatPrice', '0');
    }
    if (!RentPrice || RentPrice === 'null') {
        localStorage.setItem('totalRentPrice', '0');
    }

    const menuPriceElement = document.getElementById('menu-price');
    if (MenuPrice === '0' || !MenuPrice || MenuPrice === 'null') {
        menuPriceElement.style.display = 'none';
    } else {
        menuPriceElement.innerHTML = `Ordered Food Price: $${parseFloat(MenuPrice).toFixed(2)}`;
    }

    const seatPriceElement = document.getElementById('seat-price');
    if (SeatPrice === '0' || !SeatPrice || SeatPrice === 'null') {
        seatPriceElement.style.display = 'none';
    } else {
        seatPriceElement.innerHTML = `Reserved Seats Price: $${parseFloat(SeatPrice).toFixed(2)}`;
    }

    if (RentPrice == 0) {
        document.getElementById('rent-price').style.display = 'none';
    } else {
        document.getElementById('rent-price').innerHTML = 'Rented Movies Price: $' + parseFloat(RentPrice).toFixed(2);
    }

    let totalPrice = (parseFloat(MenuPrice) + parseFloat(SeatPrice) + parseFloat(RentPrice)).toFixed(2);
    if (totalPrice === '0.00') {
        document.getElementById('total').innerHTML = 'You have not ordered anything yet.';
    } else {
        document.getElementById('total').innerHTML = 'Total Price: $' + totalPrice;
    }

    document.getElementById('apply-button').addEventListener('click', () => {
        const userInput = document.getElementById('promo-code').value;
        const promoCode = 'M1';
    
        if(userInput == promoCode){
            totalPrice = (totalPrice - (totalPrice * 0.25)).toFixed(2);
            document.getElementById('total').innerHTML = 'Total Price: $' + totalPrice;
            document.getElementById('apply-button').disabled = true;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    if (!sessionStorage.getItem('pageLoaded')) {
        sessionStorage.setItem('pageLoaded', 'true');
        window.location.reload();
        return;
    }

    sessionStorage.removeItem('pageLoaded');
});

