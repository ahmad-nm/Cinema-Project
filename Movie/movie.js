function fetchName() {
    let queryString = window.location.search;

    let urlParams = new URLSearchParams(queryString);

    let name = urlParams.get("name");

    return name;
}

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWQ2MGIzZTg5MDIwYTNhODVkYTQxYjNjNTQ3N2QzZCIsIm5iZiI6MTczNTMzNTM0NC43MjEsInN1YiI6IjY3NmYxZGIwMWVmYzI0MzRjZjEyYzExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PVHfXcbGEfHikdEuL1fiUJ6bjBE7l-ZdMPjrQUGAy7o",
    },
};

fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
    encodeURIComponent(fetchName()) +
    "&include_adult=false&language=en-US&page=1",
    options
)
    .then((res) => res.json())
    .then((res) => {
        console.log(res.results[0]);
        let movie = res.results[0];
        document.getElementById("h1movie").innerHTML = movie.title;
        document.getElementById("language").innerHTML = movie.original_language + " &nbsp | &nbsp";
        fetch('../JSON/genre.Json')
            .then(response => response.json())
            .then(data => {
                let genres = [];

                movie.genre_ids.forEach(genreId => {
                    const genre = data.find(g => g.code === genreId);
                    if (genre) {
                        genres.push(genre.genre);
                    }
                });

                document.getElementById('genre').innerHTML = genres.join(', ');
            })
            .catch(error => {
                console.error('Error loading genres:', error);
            });
        document.getElementById("release-date").innerHTML = "Release Date:&nbsp " + movie.release_date;
        document.getElementById("overview").innerHTML = movie.overview;
        adultmovie = document.getElementById("adult");
        if (movie.adult) {
            adultmovie.innerHTML = "18+";
        } else {
            adultmovie.innerHTML = "PG";
        }
        document.getElementById("rating").innerHTML = movie.vote_average.toFixed(1);
        document.getElementById("poster").src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        body = document.getElementById('body');
        if (movie.backdrop_path) {
            body.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundAttachment = 'fixed';
            body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }
        else {
            console.log('No backdrop image available');
        }
    })
    .catch((err) => {
        console.error(err)
        document.getElementById("error-message").innerHTML = "Movie not found";
    });

function changefavorite() {
    let fav = document.getElementById("favorite-icon").src;

    if (fav.includes("red-heart")) {
        document.getElementById("favorite-icon").src = "../Images/Icons/heart.png";
    }
    else {
        document.getElementById("favorite-icon").src = "../Images/Icons/red-heart.png";
    }
}

function changechecked() {
    let checked = document.getElementById("watched-icon").src;

    if (checked.includes("greencheck")) {
        document.getElementById("watched-icon").src = "../Images/Icons/checked.png";
    }
    else {
        document.getElementById("watched-icon").src = "../Images/Icons/greencheck.png";
    }
}

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
            document.querySelector(".search-result-overlay").innerHTML = "<h2>No results found</h2>";
            document.querySelector(".search-result-overlay").style.display = "flex";
            return;
        }

        document.querySelector(".search-result-overlay").innerHTML = "";

        let closeButton = document.createElement("button");

        closeButton.innerHTML = "<i class='bx bx-x'></i>";
        closeButton.classList.add("close-button");

        closeButton.addEventListener("click", () => {
            console.log("clicked");
            document.querySelector(".search-result-overlay").style.display = "none";
        });

        document.querySelector(".search-result-overlay").appendChild(closeButton);

        res.results.forEach((movie) => {
            document.querySelector(".search-result-overlay").innerHTML += `
                <div class="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            `;
        });

        let cards = document.querySelectorAll(".movie-card");

        cards.forEach((card) => {
            card.addEventListener("click", () => {
                window.location.href = `movie.html?name=${card.querySelector("h3").innerHTML}`;
            });
        });

        document.querySelector(".search-result-overlay").style.display = "flex";

    }).catch((err) => console.error(err));
}

document.getElementById("movie-search").addEventListener("input", function () {
    fetchSearch(this.value);
});