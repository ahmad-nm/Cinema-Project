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

document.addEventListener("DOMContentLoaded", function () {

    const userSession = localStorage.getItem('sessionData');
    const userData = JSON.parse(userSession);

    if (userSession) {

        try {
            const currentTime = new Date().getTime();
            if (userData.expiresAt && currentTime > userData.expiresAt) {
                localStorage.removeItem('userSession');
                window.location.href = '../Login/Login.html';
                return;
            }
        } catch (error) {
            console.error('Invalid session data:', error);
            localStorage.removeItem('userSession');
            window.location.href = '../Login/Login.html';
            return;
        }
    }

    if (userData && userData.loggedIn) {
        document.querySelector('.Signup-button').style.display = 'none';
        document.querySelector('.Login-button').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
        document.querySelector('.navigational-links').style.justifyContent = 'flex-end';
        document.querySelector('.signup-login').style.width = '0%';
        document.querySelector('.navigational-links').style.width = '40%';
        document.querySelector('.searchbar').style.width = '40%';
        document.querySelector('.searchbar').style.justifyContent = 'flex-end';
        document.getElementById('welcomeMessage').textContent = `Welcome, ${userData.username}`;
    }
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('sessionData');
    window.location.href = './Project.html';
    document.querySelector('.Signup-button').style.display = 'block';
    document.querySelector('.Login-button').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
    document.querySelector('.signup-login').style.width = '20%';
    document.querySelector('.navigational-links').style.width = 'fit-content';
    document.getElementById('welcomeMessage').textContent = '';
});

document.querySelectorAll(".movies-div").forEach((div) => {
    div.addEventListener("click", function () {
        window.location.href = "./Movie/movie.html?name=" + div.querySelector("img").alt;
    });
});

function fetchSearch(searchTerm) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWQ2MGIzZTg5MDIwYTNhODVkYTQxYjNjNTQ3N2QzZCIsIm5iZiI6MTczNTMzNTM0NC43MjEsInN1YiI6IjY3NmYxZGIwMWVmYzI0MzRjZjEyYzExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PVHfXcbGEfHikdEuL1fiUJ6bjBE7l-ZdMPjrQUGAy7o",
        },
    };

    fetch(
        "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(searchTerm) + "&include_adult=false&language=en-US&page=1",
        options
    ).then((res) => res.json())
      .then((res) => {
        const searchOverlay = document.querySelector(".search-result-overlay");
        searchOverlay.innerHTML = "";
    
        let resultsHTML = '';

        if (res.results.length === 0) {
            resultsHTML = `
                <div class="movie-card-no-results">
                    <div class="movie-info-no-results">
                        <h2>No Results Found</h2>
                        <p>Try searching with different keywords</p>
                    </div>
                </div>
            `;
        }
        else{
            res.results.forEach((movie) => {
                resultsHTML += `
                    <div class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <div class="movie-info">
                            <h3>${movie.title}</h3>
                            <p>${movie.overview}</p>
                            <a href="../Movie/movie.html?name=${movie.title}" style=" font-size: 24px">Read more</a>
                        </div>
                    </div>
                `;
            });
        }    
        
        searchOverlay.insertAdjacentHTML('beforeend', resultsHTML);
    
        let closeButton = document.createElement("button");
        closeButton.innerHTML = "<i class='bx bx-x'></i>";
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", () => {
            searchOverlay.style.display = "none";
        });
    
        searchOverlay.insertAdjacentElement('afterbegin', closeButton);
        searchOverlay.style.display = "flex";
    });

}

document.getElementById("movie-search").addEventListener("input", function () {
    fetchSearch(this.value);
});

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.querySelector(".preloader").style.opacity = "0";
        document.querySelector(".preloader").style.pointerEvents = "none";
    }, 2000);
});


let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1])
})


document.querySelectorAll('.See-More-Btn').forEach((button) => {
    button.addEventListener('click', (e) => {
        console.log('Button clicked');
        const movieTitle = e.target.closest('.item').querySelector('.Movie-Name').textContent;
        if (movieTitle) {
            window.location.href = `../Movie/movie.html?name=${encodeURIComponent(movieTitle)}`;
        }
        else{
            console.error('Movie title not found');
        }
    });
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

    }
}

const sliderContainer = document.querySelector('.slider-container');
const upBtn = document.querySelector('.up-btn');
const downBtn = document.querySelector('.down-btn');
const slides = document.querySelectorAll('.slide');
const slidesCount = slides.length;
let activeSlideIndex = 0;

upBtn.addEventListener('click', () => changeSlide('up'));
downBtn.addEventListener('click', () => changeSlide('down'));

function changeSlide(direction) {
    const slideHeight = slides[0].clientHeight;
    
    if (direction === 'up') {
        activeSlideIndex--;
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 2;
        }
    } else if (direction === 'down') {
        activeSlideIndex++;
        if (activeSlideIndex > slidesCount - 2) {
            activeSlideIndex = 0;
        }
    }
    
    sliderContainer.style.transform = `translateY(-${activeSlideIndex * slideHeight}px)`;
}

window.addEventListener('load', () => {
    slides.forEach(slide => {
        slide.style.height = '500px';
    });
});

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
    Sat: [
        { time: '10:00', movie: 'Sonic The Hedgehog 3' },
        { time: '12:00', movie: 'Moana 2' },
        { time: '14:00', movie: 'Mufasa: The Lion King' },
        { time: '16:00', movie: 'Deadpool & Wolverine' },
        { time: '18:00', movie: 'Joker: Folie À Deux' },
        { time: '20:00', movie: 'Venom: The Last Dance' },
        { time: '22:00', movie: 'The Beekeeper' }
    ],
};

document.querySelector('.movie-names select').addEventListener('change', updateTime);
document.querySelector('.movie-time select').addEventListener('change', updateTime);

function updateTime() {
    const MovieDay = document.querySelector('.movie-time select').value;
    const selectedMovie = document.querySelector('.movie-names select').value;
    const dayTimings = movieTimings[MovieDay];
    
    if (dayTimings) {
        const movieSlot = dayTimings.find(slot => slot.movie.toLowerCase() === selectedMovie.toLowerCase());
        
        if (movieSlot) {
            const startTime = movieSlot.time;
            const endHour = parseInt(startTime.split(':')[0]) + 2;
            const timeText = `${startTime} - ${endHour}:00`;
            document.getElementById('time').textContent = timeText;
        }
    }
}

document.getElementById('showtime-button').addEventListener('click', () => {
    const MovieName = document.querySelector('.movie-names select').value;
    const MovieDay = document.querySelector('.movie-time select').value;

    console.log(MovieName, MovieDay);

    localStorage.setItem('MovieName', MovieName);
    localStorage.setItem('MovieDay', MovieDay);

    window.location.href = './Showtimes/showtime.html';
});

document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('MovieName');
    localStorage.removeItem('MovieDay');
});