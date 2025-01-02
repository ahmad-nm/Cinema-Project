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

document.querySelectorAll('.buttons button').forEach((button) => {
    button.addEventListener('click', () => {
        let timeSelectionDiv = document.getElementById('date-time');
        timeSelectionDiv.style.display = 'flex';
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
                        document.getElementById('set-time-btn').style.display = 'flex';
                    }
                });
            }
        }
    });
});

document.getElementById('set-time').addEventListener('click', () => {
    let timeSelectionBtn = document.getElementById('set-time');
    timeSelectionBtn.style.display = 'none';
    let SeatsDiv = document.getElementById('hall');
    SeatsDiv.style.display = 'block';
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

    if (selectedSeats.length === 0) {
        const alertElement = document.getElementById('alert');
        alertElement.style.display = 'block';
        alertElement.innerHTML = 'Please select a seat';
        return;
    }

    selectedSeats.forEach((seat) => {
        seatNames.push(seat.dataset.seatName);
    });

    for (let i = 0; i < selectedSeats.length; i++) {
        document.getElementById('receipt-seat').textContent = 'Seat/s:' + ' ' + seatNames.join(' ');
    }

    TotalPrice();
    document.querySelector('.ticket-page').style.display = 'flex';
});

function TotalPrice() {
    let price = -8;
    let selectedSeats = document.querySelectorAll('.selected');
    selectedSeats.forEach(() => {
        price += 8;
    });
    document.getElementById('receipt-price').innerHTML = 'Total Price: $' + price;
}


