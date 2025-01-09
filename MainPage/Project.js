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
        document.querySelector('.navigational-links').style.width = '60%';
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

function changeImage() {
    let seats = document.querySelectorAll('.seat');

    seats.forEach((seat) => {
        seat.addEventListener('click', () => {
            if (seat.src.includes('seat.png')) {
                seat.src = './Images/Icons/selected.png';
            } else if (seat.src.includes('selected.png')) {
                seat.src = './Images/Icons/seat.png';
            }
        });
    });
}
changeImage();

function changebuttoncolor() {
    const buttons = document.querySelectorAll('.book-timing-button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((btn) => {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            });

            button.style.backgroundColor = '#002466';
            button.style.color = 'rgb(255, 255, 255)';
        });
    });
}
changebuttoncolor();


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


const StreamDetails = [
    {
        src: './Images/Moviesbg/venom3.jpg',
        title: 'Venom: The Last Dance',
        hall: 'Hall A',
        time: '5:30 PM - 7:30 PM'
    },
    {
        src: './Images/Moviesbg/joker_2.jpg',
        title: 'Joker: Folie à Deux',
        hall: 'Hall A',
        time: '8:00 PM - 10:00 PM'
    },
    {
        src: './Images/Moviesbg/bee_keeper.jpg',
        title: 'The Beekeeper',
        hall: 'Hall A',
        time: '10:30 PM - 12:30 AM'
    },
    {
        src: './Images/Moviesbg/moana_2.jpg',
        title: 'Moana 2',
        hall: 'Hall A',
        time: '10:00 AM - 12:00 PM',
    },
    {
        src: './Images/Moviesbg/Mufasa_1.jpg',
        title: 'Mufasa: The Lion King',
        hall: 'Hall A',
        time: '12:30 PM - 2:30 PM',
    },
    {
        src: './Images/Moviesbg/Sonic_3.jpg',
        title: 'Sonic the Hedgehog 3',
        hall: 'Hall A',
        time: '3:00 PM - 5:00 PM',
    },
    {
        src: './Images/Moviesbg/deadpool_wolverine.jpg',
        title: 'Deadpool & Wolverine',
        hall: 'Hall A',
        time: '1:00 AM - 3:00 AM',
    }
];

document.querySelectorAll('.book-timing-button').forEach((button , index) => {
    button.addEventListener('click', () => {
        
        const Content = document.getElementById('book-timing-content-id'); 

        document.querySelectorAll('.book-timing-button').forEach((btn) => {
            Content.style.display = 'none';
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });

        Content.style.display = 'flex';
        button.style.backgroundColor = '#002466';
        button.style.color = 'rgb(255, 255, 255)';
        document.getElementById('seats-image').src = StreamDetails[index].src;
        document.getElementById('seats-movie-title').textContent = StreamDetails[index].title;
        document.getElementById('seats-movie-hall').innerHTML = StreamDetails[index].hall;
        document.getElementById('seats-times').textContent = StreamDetails[index].time;
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