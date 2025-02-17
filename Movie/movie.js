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
        console.log(res);
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
    const movieTitle = document.getElementById("h1movie").textContent;
    const posterPath = document.getElementById("poster").src;

    if (fav.includes("red-heart")) {
        document.getElementById("favorite-icon").src = "../Images/Icons/heart.png";
        localStorage.removeItem('favoriteMovie');
    }
    else {
        document.getElementById("favorite-icon").src = "../Images/Icons/red-heart.png";

        let current = localStorage.getItem('favoriteMovie');

        if (current) {
            try {
                current = JSON.parse(current);

                if (!Array.isArray(current)) {
                    current = [];
                }
            } catch (e) {
                current = [];
            }
        } else {
            current = [];
        }

        const movieData = {
            title: movieTitle,
            poster: posterPath
        };

        current.push(movieData);

        localStorage.setItem('favoriteMovie', JSON.stringify(current));
    }
}

function changechecked() {
    let checked = document.getElementById("watched-icon").src;
    const movieTitle = document.getElementById("h1movie").textContent;
    const posterPath = document.getElementById("poster").src;

    if (checked.includes("greencheck")) {
        document.getElementById("watched-icon").src = "../Images/Icons/checked.png";
        localStorage.removeItem('watchedMovie');
    }
    else {
        document.getElementById("watched-icon").src = "../Images/Icons/greencheck.png";

        let current = localStorage.getItem('watchedMovie');

        if (current) {
            try {
                current = JSON.parse(current);

                if (!Array.isArray(current)) {
                    current = [];
                }
            } catch (e) {
                current = [];
            }
        } else {
            current = [];
        }

        const movieData = {
            title: movieTitle,
            poster: posterPath
        };

        current.push(movieData);

        localStorage.setItem('watchedMovie', JSON.stringify(current));
    }
}

function changeadd() {
    let add = document.getElementById("add-button").src;
    const movieTitle = document.getElementById("h1movie").textContent;
    const posterPath = document.getElementById("poster").src;

    if (add.includes("bookmarkorange")) {
        document.getElementById("add-button").src = "../Images/Icons/bookmark.png";
        localStorage.removeItem('addMovie');
    }
    else {
        document.getElementById("add-button").src = "../Images/Icons/bookmarkorange.png";

        let current = localStorage.getItem('addMovie');

        if (current) {
            try {
                current = JSON.parse(current);

                if (!Array.isArray(current)) {
                    current = [];
                }
            } catch (e) {
                current = [];
            }
        } else {
            current = [];
        }

        const movieData = {
            title: movieTitle,
            poster: posterPath
        };

        current.push(movieData);

        localStorage.setItem('addMovie', JSON.stringify(current));
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
    ).then((res) => res.json())
        .then((res) => {
            const searchOverlay = document.querySelector(".search-result-overlay");
            searchOverlay.innerHTML = "";

            let resultsHTML = '';
            res.results.forEach((movie) => {
                resultsHTML += `
                <div class="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <p>${movie.overview}</p>
                        <a href="./movie.html?name=${movie.title}" style=" font-size: 24px">Read more</a>
                    </div>
                </div>
            `;
            });

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

function fetchMovieVideos(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWQ2MGIzZTg5MDIwYTNhODVkYTQxYjNjNTQ3N2QzZCIsIm5iZiI6MTczNTMzNTM0NC43MjEsInN1YiI6IjY3NmYxZGIwMWVmYzI0MzRjZjEyYzExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PVHfXcbGEfHikdEuL1fiUJ6bjBE7l-ZdMPjrQUGAy7o'
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => {

            if (res.results && res.results.length > 0) {

                const trailer = res.results.find(video => video.type === "Trailer");

                if (trailer && trailer.key) {
                    const videoLink = `https://www.youtube.com/watch?v=${trailer.key}`;
                    console.log('Found trailer link:', videoLink);

                    const trailerButton = document.getElementById("watch-trailer");
                    if (trailerButton) {
                        trailerButton.href = videoLink;
                    } else {
                        console.error('Trailer button not found');
                    }
                } else {
                    console.log('No trailer found in results');
                }
            } else {
                console.log('No videos found for this movie');
            }
        })
        .catch(err => console.error('Error fetching movie videos:', err));
}

document.getElementById("watch-trailer").addEventListener("click", function () {

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
            fetchMovieVideos(res.results[0].id);
            const trailerButton = document.getElementById("watch-trailer");
            if (trailerButton) {
                trailerButton.addEventListener("click", function (event) {
                    event.preventDefault();
                    const videoId = trailerButton.href.split('v=')[1];
                    const iframeContainer = document.getElementById("trailer-container-id");
                    const iframe = document.getElementById("trailer");

                    if (videoId) {
                        iframeContainer.style.display = "flex";
                        iframe.style.display = "block";
                        iframe.src = `https://www.youtube.com/embed/${videoId}`;
                        console.log('Setting iframe src:', iframe.src);
                    } else {
                        console.error('Invalid video ID');
                    }
                });
            }

            document.getElementById("close-trailer-btn").addEventListener("click", function () {
                const iframeContainer = document.getElementById("trailer-container-id");
                const iframe = document.getElementById("trailer");
                iframeContainer.style.display = "none";
                iframe.style.display = "none";
                iframe.src = "";
            });
        })
        .catch((err) => {
            console.error(err)
            document.getElementById("error-message").innerHTML = "Movie not found";
        });

});

document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.cart-button');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const body = document.getElementById('body');

    cartButton.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        body.style.overflow = 'hidden';
        const overlay = document.createElement('div');
        overlay.classList.add('cart-overlay');
        body.appendChild(overlay);
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        body.style.overflow = 'auto';
        const overlay = document.querySelector('.cart-overlay');
        if (overlay) overlay.remove();
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-overlay')) {
            cartSidebar.classList.remove('open');
            body.style.overflow = 'auto';
            e.target.remove();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (savedCart.length > 0) {
        displayCartItems(savedCart);
        attachRemoveListeners();
    }
});

document.querySelector('.rent-btn').addEventListener('click', () => {
    const MovieTitle = document.getElementById('h1movie').textContent;
    const MoviePoster = document.getElementById('poster').src;
    
    const newItem = {
        title: MovieTitle,
        poster: MoviePoster,
        price: 6
    };
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems.push(newItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    displayCartItems(cartItems);
    attachRemoveListeners();
    TotalPrice();
});

function displayCartItems(items) {
    const CartContent = document.querySelector('.cart-content');
    CartContent.innerHTML = items.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <img src="${item.poster}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>Price: $${item.price}</p>
            </div>
            <button class="remove-item"><i class='bx bx-x'></i></button>
        </div>
    `).join('');
}

function attachRemoveListeners() {
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const index = cartItem.dataset.index;
            
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));
            cartItems.splice(index, 1);

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems(cartItems);
            attachRemoveListeners();
            TotalPrice();
        });
    });
}

function TotalPrice() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').textContent = `Total Price: $${totalPrice}`;
    localStorage.setItem('totalRentPrice', totalPrice);
    return totalPrice;
}

document.addEventListener('DOMContentLoaded', () => {
    const totalPrice = TotalPrice();
    document.getElementById('total-price').textContent = `Total Price: $${totalPrice}`;
});