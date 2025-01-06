const creditCardBtn = document.getElementById('credit-card');
const paypalBtn = document.getElementById('paypal');
const visaBtn = document.getElementById('visa');

creditCardBtn.addEventListener('change', () => {
    document.querySelector('.credit-card').style.display = 'block';
    document.querySelector('.paypal').style.display = 'none';
    document.querySelector('.visa').style.display = 'none';
});

paypalBtn.addEventListener('change', () => {
    document.querySelector('.credit-card').style.display = 'none';
    document.querySelector('.paypal').style.display = 'block';
    document.querySelector('.visa').style.display = 'none';
});

visaBtn.addEventListener('change', () => {
    document.querySelector('.credit-card').style.display = 'none';
    document.querySelector('.paypal').style.display = 'none';
    document.querySelector('.visa').style.display = 'block';
});

document.addEventListener('DOMContentLoaded', () => {
    const MenuPrice = localStorage.getItem('MenuPrice');
    const SeatPrice = localStorage.getItem('SeatPrice');
    //const RentPrice = localStorage.getItem('RentPrice');
    document.getElementById('seat-price').innerHTML = 'Seats Price: $' + SeatPrice;
    document.getElementById('menu-price').innerHTML = 'Food Price: $' + MenuPrice;
    //document.getElementById('rent-price').innerHTML = '$' + RentPrice;
    document.getElementById('total').innerHTML = 'Total Price: $' + (parseFloat(MenuPrice) + parseFloat(SeatPrice)).toFixed(2);
});