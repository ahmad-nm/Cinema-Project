document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('header input');
    const movies = document.querySelectorAll('.shelf img');

    searchInput.addEventListener('input', (event) => {
        const searchQuery = event.target.value.toLowerCase();

        movies.forEach((movie) => {
            const movieTitle = movie.alt.toLowerCase();
            if (movieTitle.includes(searchQuery)) {
                movie.style.display = 'block';
            } else {
                movie.style.display = 'none';
            }
        });
    });
});


function getMovieDetails() {

    const storedMovie = localStorage.getItem('favoriteMovie');

    if (storedMovie) {
        const movieData = JSON.parse(storedMovie);

        const title = movieData.title;
        const poster = movieData.poster;

        console.log('Favorite Movie:', title);
        console.log('Poster Path:', poster);

        return movieData;
    } else {
        console.log('No favorite movie found');
        return null;
    }
}

function displayFavoriteMovie() {
    const favoriteMovie = getMovieDetails();

    if (favoriteMovie) {
        const movieContainer = document.querySelector('.favorite-movies');
        const movieImage = document.createElement('img');
        movieImage.src = favoriteMovie.poster;
        movieImage.alt = favoriteMovie.title;
        movieImage.style.cursor = 'pointer';
        movieContainer.appendChild(movieImage);

        movieImage.addEventListener('click', () => {
            window.location.href = `../Movie/movie.html?name=${favoriteMovie.title.split(' ').join('%20')}`;
        });
    }
}

function displayWatchedMovie() {
    const watchedMovie = localStorage.getItem('watchedMovie');
    const parsedWatchedMovie = watchedMovie ? JSON.parse(watchedMovie) : null;

    if (parsedWatchedMovie) {
        const movieContainer = document.querySelector('.watched-movies');
        const movieImage = document.createElement('img');
        movieImage.src = parsedWatchedMovie.poster;
        movieImage.alt = parsedWatchedMovie.title;
        movieImage.style.cursor = 'pointer';

        movieContainer.appendChild(movieImage);

        movieImage.addEventListener('click', () => {
            window.location.href = `../Movie/movie.html?name=${parsedWatchedMovie.title.split(' ').join('%20')}`;
        });
    }
}

function displayAddMovie() {
    const addMovie = localStorage.getItem('addMovie');
    const parsedAddMovie = addMovie ? JSON.parse(addMovie) : null;

    if (parsedAddMovie) {
        const movieContainer = document.querySelector('.add-movies');
        const movieImage = document.createElement('img');
        movieImage.src = parsedAddMovie.poster;
        movieImage.alt = parsedAddMovie.title;
        movieImage.style.cursor = 'pointer';
        movieContainer.appendChild(movieImage);

        movieImage.addEventListener('click', () => {
            window.location.href = `../Movie/movie.html?name=${parsedAddMovie.title.split(' ').join('%20')}`;
        });
    }
}

displayFavoriteMovie();
displayWatchedMovie();
displayAddMovie();

let editMode = false;

document.getElementById("edit-shelf").addEventListener('click', () => {
    editMode = !editMode;

    document.querySelectorAll('.shelf img').forEach((img) => {
        const parentDiv = img.parentElement;

        if (editMode) {
            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<img src="../Images/Icons/close.png" alt="Remove">';
            removeButton.classList.add('remove-btn');
            parentDiv.style.position = 'relative';
            parentDiv.appendChild(removeButton);

            removeButton.addEventListener('click', () => {
                parentDiv.remove();
                updateBadgeCount();
            });
        } else {
            const removeButton = parentDiv.querySelector('.remove-btn');
            if (removeButton) {
                removeButton.remove();
            }
        }
    });
});

function updateBadgeCount() {

    const favoriteMoviesCount = document.querySelectorAll('.favorite-movies img').length;
    const watchedMoviesCount = document.querySelectorAll('.watched-movies img').length;
    const addMoviesCount = document.querySelectorAll('.add-movies img').length;
    const totalCount = favoriteMoviesCount + watchedMoviesCount + addMoviesCount;

    console.log('Total Count:', totalCount);

    document.getElementById('badge-count').textContent = totalCount;
}

document.addEventListener('DOMContentLoaded', () => {
    updateBadgeCount();
});