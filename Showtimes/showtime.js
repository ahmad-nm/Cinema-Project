const leftseatingArea = document.querySelector('.left-seating');

const leftrows = 7;
const leftcolumns = 7;

for (let i = 0; i < leftrows * leftcolumns; i++) {
    const seat = document.createElement('span');
    seat.classList.add('available');
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

const rightseatingArea = document.querySelector('.right-seating');

const rightrows = 7;
const rightcolumns = 7;

for (let i = 0; i < rightrows * rightcolumns; i++) {
    const seat = document.createElement('span');
    seat.classList.add('available');
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

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

document.querySelector('.buttons button').addEventListener('click', () => {
    let HallDiv = document.getElementById('hall');
    HallDiv.style.display = 'block';
});

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