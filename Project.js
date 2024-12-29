document.addEventListener('DOMContentLoaded', function () {
    const seeMoreLinks = document.querySelectorAll('.see-more');
    const movieNotes = document.querySelector('.movie_notes');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const newReleases = document.querySelector('.newreleases');
    const images = [
        {
            url: 'url("./Images/Moviesbg/venombg.jpg")',
            title: 'Venom: The Last Dance',
            duration: '1h50m',
            genres: 'Action, Thriller, Sci-Fi',
            shortDescription: 'Description: Eddie Brock and Venom must make a devastating...',
            fullDescription: 'Description: Eddie Brock and Venom must make a devastating decision as they\'re pursued by a mysterious military man and alien monsters from Venom\'s home world.',
            PG: 'PG-13'
        },
        {
            url: 'url("./Images/Moviesbg/joker2.jpg")',
            title: 'Joker: Folie à Deux',
            duration: '2h18m',
            genres: 'Crime, Drama, Thriller',
            shortDescription: 'Description: Struggling with his dual identity, failed comedian...',
            fullDescription: 'Description: Struggling with his dual identity, failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.',
            PG: 'PG-13'
        },
        {
            url: 'url("./Images/Moviesbg/beekeeper.jpg")',
            title: 'The Beekeeper',
            duration: '1h45m',
            genres: 'Action, Crime, Thriller',
            shortDescription: 'Description: A kind-hearted landlady commits suicide after falling...',
            fullDescription: 'Description: A kind-hearted landlady commits suicide after falling victim to a phishing scam, leading former "Beekeeper" operative Adam Clay to set out on a brutal campaign for revenge upon those responsible.',
            PG: 'PG-13'
        },
        {
            url: 'url("./Images/Moviesbg/moana2.jpg")',
            title: 'Moana 2',
            duration: '1h40m',
            genres: 'Animation, Adventure, Comedy, Family',
            shortDescription: 'Description: After receiving an unexpected call from her wayf...',
            fullDescription: 'Description: After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she\'s ever faced.',
            PG: 'PG'
        },
        {
            url: 'url("./Images/Moviesbg/mufasa.jpg")',
            title: 'Mufasa: The Lion King',
            duration: '1h58m',
            genres: 'Animation, Adventure, Family',
            shortDescription: 'Description: Mufasa, a cub lost and alone, meets a sympathetic...',
            fullDescription: 'Description: Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.',
            PG: 'PG-13'
        },
        {
            url: 'url("./Images/Moviesbg/sonic3.jpg")',
            title: 'Sonic the Hedgehog 3',
            duration: '1h50m',
            genres: 'Action, Adventure, Comedy, Family, Sci-Fi',
            shortDescription: 'Description: Sonic, Knuckles, and Tails reunite against a powerful...',
            fullDescription: 'Description: Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched, Team Sonic must seek out an unlikely alliance.',
            PG: 'PG-13'
        },
        {
            url: 'url("./Images/Moviesbg/deadpool3.jpg")',
            title: 'Deadpool & Wolverine',
            duration: '2h8m',
            genres: 'Action, Comedy, Sci-Fi',
            shortDescription: 'Description: Deadpool is offered a place in the Marvel Cinematic...',
            fullDescription: 'Description: Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.',
            PG: 'PG-13'
        },
    ];
    let currentIndex = 0;

    function updateMovieNotes(index) {
        const movie = images[index];
        newReleases.style.backgroundImage = movie.url;
        movieNotes.querySelector('.movie_details p').textContent = movie.title;
        movieNotes.querySelector('.movie_details .duration #duration-tag').textContent = movie.duration;
        movieNotes.querySelector('.movie_details .duration #genre-tag').textContent = movie.genres;
        movieNotes.querySelector('.movie_details .description .short-description').innerHTML = `${movie.shortDescription} <a href="#" class="see-more">See More</a>`;
        movieNotes.querySelector('.movie_details .description .full-description').innerHTML = `${movie.fullDescription} <a href="#" class="see-more">See Less</a>`;
        movieNotes.querySelector('.pg').textContent = movie.PG;

        const seeMoreLinks = movieNotes.querySelectorAll('.see-more');
        seeMoreLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const near = this.closest('.movie_notes');
                const fullDescription = near.querySelector('.full-description');
                const shortDescription = near.querySelector('.short-description');

                if (fullDescription.style.display === 'none' || fullDescription.style.display === '') {
                    fullDescription.style.display = 'block';
                    shortDescription.style.display = 'none';
                } else {
                    fullDescription.style.display = 'none';
                    shortDescription.style.display = 'block';
                }
            });
        });
    }

    const fullDescription = movieNotes.querySelector('.full-description');
    const shortDescription = movieNotes.querySelector('.short-description');
    fullDescription.style.display = 'none';
    shortDescription.style.display = 'block';

    function next() {
        currentIndex = (currentIndex + 1) % images.length;
        newReleases.style.backgroundImage = images[currentIndex];
        updateMovieNotes(currentIndex);
    }

    function prev() {
        currentIndex = (currentIndex - 1) % images.length;
        newReleases.style.backgroundImage = images[currentIndex];
        updateMovieNotes(currentIndex);
    }

    nextButton.addEventListener('click', function () {
        next();
    });

    prevButton.addEventListener('click', function () {
        prev();
    });

    newReleases.style.backgroundImage = images[currentIndex];
    updateMovieNotes(currentIndex);

});
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

// ...existing code...

document.querySelectorAll(".movies-div").forEach((div) => {
    div.addEventListener("click", function () {
        window.location.href = "/movie.html?name=" + div.querySelector("img").alt;
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
    ).then((res) => {
        return res.json();
    }).then((res) => {
        if (res.results.length === 0) {
            document.querySelector(".ali-overlay").innerHTML = "<h2>No results found</h2>";
            document.querySelector(".ali-overlay").style.display = "grid";
            return;
        }

        document.querySelector(".ali-overlay").innerHTML = "";

        res.results.forEach((movie) => {
            document.querySelector(".ali-overlay").innerHTML += `
                <div class="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            `;
        });

        document.querySelector(".ali-overlay").style.display = "grid";
        document.querySelector(".ali-overlay").style.gridTemplateColumns = "repeat(auto, 1fr)";
        document.querySelector(".ali-overlay").style.gridTemplateRows = "repeat(20 , 200px)";

    }).catch((err) => console.error(err));
}

document.getElementById("movie-search").addEventListener("input", function () {
    fetchSearch(this.value);
});

document.getElementById("movie-search").addEventListener("blur", function () {
    document.querySelector(".ali-overlay").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.querySelector(".preloader").style.opacity = "0";
        document.querySelector(".preloader").style.pointerEvents = "none";
    }, 2000);
});