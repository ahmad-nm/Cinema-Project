const movieTimings = {
    Mon: [
        { time: '10:00', movie: 'Venom: The Last Dance' },
        { time: '12:00', movie: 'Moana 2' },
        { time: '14:00', movie: 'Joker: Folie À Deux' },
        { time: '16:00', movie: 'Deadpool & Wolverine' },
        { time: '18:00', movie: 'Mufasa: The Lion King' },
        { time: '20:00', movie: 'The Beekeeper' },
        { time: '22:00', movie: 'Sonic The Hedgehog 3' }
    ],
    Tue: [
        { time: '10:00', movie: 'Moana 2' },
        { time: '12:00', movie: 'Mufasa: The Lion King' },
        { time: '14:00', movie: 'Venom: The Last Dance' },
        { time: '16:00', movie: 'The Beekeeper' },
        { time: '18:00', movie: 'Sonic The Hedgehog 3' },
        { time: '20:00', movie: 'Joker: Folie À Deux' },
        { time: '22:00', movie: 'Deadpool & Wolverine' }
    ],
    Wed: [
        { time: '10:00', movie: 'Sonic The Hedgehog 3' },
        { time: '12:00', movie: 'Deadpool & Wolverine' },
        { time: '14:00', movie: 'Mufasa: The Lion King' },
        { time: '16:00', movie: 'Joker: Folie À Deux' },
        { time: '18:00', movie: 'The Beekeeper' },
        { time: '20:00', movie: 'Moana 2' },
        { time: '22:00', movie: 'Venom: The Last Dance' }
    ],
    Thu: [
        { time: '10:00', movie: 'Moana 2' },
        { time: '12:00', movie: 'Joker: Folie À Deux' },
        { time: '14:00', movie: 'Venom: The Last Dance' },
        { time: '16:00', movie: 'Deadpool & Wolverine' },
        { time: '18:00', movie: 'Mufasa: The Lion King' },
        { time: '20:00', movie: 'Sonic The Hedgehog 3' },
        { time: '22:00', movie: 'The Beekeeper' }
    ],
    Fri: [
        { time: '10:00', movie: 'Mufasa: The Lion King' },
        { time: '12:00', movie: 'Sonic The Hedgehog 3' },
        { time: '14:00', movie: 'Moana 2' },
        { time: '16:00', movie: 'The Beekeeper' },
        { time: '18:00', movie: 'Deadpool & Wolverine' },
        { time: '20:00', movie: 'Joker: Folie À Deux' },
        { time: '22:00', movie: 'Venom: The Last Dance' }
    ],
};

let isAutoSliding = true;

const navBar = document.querySelector(".sidebar");
const overlay = document.querySelector('.overlay');
let menuBtn = document.getElementById("menu-icon");

menuBtn.style.cursor = "pointer";
menuBtn.onclick = function() {
    navBar.classList.toggle("open");
    overlay.classList.toggle("active");
    isAutoSliding = false;
    clearTimeout(runNextAuto);
};

overlay.onclick = function() {
    navBar.classList.remove("open");
    overlay.classList.remove("active");
    isAutoSliding = true;
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext);
};

document.querySelectorAll('.buttons button').forEach((button) => {
    button.addEventListener('click', () => {
        let Step = document.querySelectorAll('.header nav span');
        Step.forEach((step) => {
            step.classList.remove('active');
        });
        Step[1].classList.add('active');

        let timeSelectionDiv = document.getElementById('date-time');
        timeSelectionDiv.style.display = 'flex';
        timeSelectionDiv.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

        isAutoSliding = false;
        clearTimeout(runNextAuto);
    });
});
    
document.querySelectorAll('.dates span').forEach((span) => {
    span.addEventListener('click', (date) => {
        date.target.classList.add('active');
        let activeDate = document.querySelector('.dates span.active');
        let movieTitle = document.querySelector('.movie-title');
        let day = document.querySelector('.dates span.active').textContent;
        let timings = movieTimings[day];
        let timeDiv = document.querySelectorAll('.times span');
        let setTime = document.getElementById('set-time-btn');

        setTime.style.visibility = 'visible';
        document.getElementById('hall').style.display = 'none';

        if (activeDate) {
            activeDate.classList.remove('active');
            timeDiv.forEach((time) => {
                time.classList.remove('active');
            });
        }

        for (let i = 0; i < timings.length; i++) {
            if (movieTitle.textContent.toUpperCase() === timings[i].movie.toUpperCase()) {
                let movieTime = movieTimings[day][i].time;
                timeDiv.forEach((time) => {
                    if (time.textContent === movieTime) {
                        time.classList.add('active');
                    }
                });
            }
        }
    });
});

document.getElementById('set-time').addEventListener('click', () => {
    let timeSelectionBtn = document.getElementById('set-time-btn');
    timeSelectionBtn.style.visibility = 'hidden';
    let SeatsDiv = document.getElementById('hall');
    SeatsDiv.style.display = 'block';
    SeatsDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    let Step = document.querySelectorAll('.header nav span');
    Step.forEach((step) => {
        step.classList.remove('active');
    });
    Step[2].classList.add('active');
});

const leftseatingArea = document.querySelector('.left-seating');
const leftrows = 7;
const leftcolumns = 9;

for (let row = 0; row < leftrows; row++) {
    for (let col = 0; col < leftcolumns; col++) {
        const seat = document.createElement('span');
        seat.classList.add('available');

        const rowLetter = String.fromCharCode(65 + row);
        const seatNumber = col + 1;
        let seatName = `${rowLetter}${seatNumber}`;
        seat.style.color = '#ccc';
        seat.style.fontSize = '12px';
        seat.style.textAlign = 'center';

        seat.dataset.seatName = seatName;
        seat.title = seatName;
        seat.textContent = seatName;

        if (Math.random() > 0.8) {
            seat.classList.remove('available');
            seat.classList.add('taken');
        }

        leftseatingArea.appendChild(seat);

        seat.addEventListener('click', () => {
            if (seat.classList.contains('available')) {
                seat.classList.toggle('selected');
            }
        });
    }
}

const rightseatingArea = document.querySelector('.right-seating');
const rightrows = 7;
const rightcolumns = 9;

for (let row = 0; row < rightrows; row++) {
    for (let col = 0; col < rightcolumns; col++) {
        const seat = document.createElement('span');
        seat.classList.add('available');

        const rowLetter = String.fromCharCode(65 + row);
        const seatNumber = col + 10;
        let seatName = `${rowLetter}${seatNumber}`;
        seat.style.color = '#ccc';
        seat.style.fontSize = '12px';
        seat.style.textAlign = 'center';

        seat.dataset.seatName = seatName;
        seat.title = seatName;
        seat.textContent = seatName;

        if (Math.random() > 0.8) {
            seat.classList.remove('available');
            seat.classList.add('taken');
        }

        rightseatingArea.appendChild(seat);

        seat.addEventListener('click', () => {
            if (seat.classList.contains('available')) {
                seat.classList.toggle('selected');
            }
        });
    }
}

let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.addEventListener('click', () => {
    showSlider('next');
});

prevDom.onclick = function () {
    showSlider('prev');
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);


    if (isAutoSliding) {
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            next.click();
        }, timeAutoNext);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dateSpans = document.querySelectorAll('.dates span');

    dateSpans.forEach((date) => {
        date.addEventListener('click', () => {
            const activeDate = document.querySelector('.dates span.active');

            if (activeDate) {
                activeDate.classList.remove('active');
            }

            date.classList.add('active');
        });
    });
});

document.getElementById('confirm').addEventListener('click', () => {
    let date = document.querySelector('.dates span.active').textContent;
    let time = document.querySelector('.times span.active').textContent;
    let endTime = time.split(':');
    endTime[0] = parseInt(endTime[0]) + 2;
    endTime = endTime.join(':');
    document.getElementById('receipt-date').textContent = 'Date:' + ' ' + date + ' ' + time + ' - ' + endTime;

    let selectedSeats = document.querySelectorAll('.selected');
    let seatNames = [];

    selectedSeats.forEach((seat) => {
        seatNames.push(seat.dataset.seatName);
    });

    for (let i = 0; i < selectedSeats.length; i++) {
        document.getElementById('receipt-seat').textContent = 'Seat/s:' + ' ' + seatNames.join(' ');
    }

    const totalPrice = TotalPrice();

    if (totalPrice <= 0) {
        const alertElement = document.getElementById('alert');
        alertElement.style.display = 'block';
        alertElement.textContent = 'Please select a seat';
        return;
    }
    else {
        document.getElementById('alert').style.display = 'none';
        document.getElementById('confirm').textContent = 'Book Your Ticket';
    }

    let Ticket = document.querySelector('.ticket-page');
    Ticket.style.display = 'flex';
    Ticket.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    let Step = document.querySelectorAll('.header nav span');
    Step.forEach((step) => {
        step.classList.remove('active');
    });
    Step[3].classList.add('active');

    if (Ticket.style.display === 'flex' && totalPrice > 0) {
        const selectedSeats = document.querySelectorAll('.selected');
        if (selectedSeats.length > 0) {
            document.getElementById('confirm').onclick = function() {
                window.location.href = '../Payment/payment.html';
            }
        }
    }
});

function TotalPrice() {
    const selectedSeats = document.querySelectorAll('.selected');
    const price = (selectedSeats.length - 1) * 8;
    document.getElementById('receipt-price').innerHTML = 'Total Price: $' + price;
    localStorage.setItem('SeatPrice', price);
    return price;
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const headerPosition = header.offsetTop;
    
    if (window.scrollY > headerPosition) {
        header.classList.add('fixed-header');
    } else {
        header.classList.remove('fixed-header');
    }
});