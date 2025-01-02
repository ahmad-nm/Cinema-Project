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

function displayFavoriteMovie() {
    const favoriteMovie = localStorage.getItem('favoriteMovie');

    if (!favoriteMovie) {
        return;
    }

    const parsedFavoriteMovie = JSON.parse(favoriteMovie);

    parsedFavoriteMovie.forEach((movie) => {
        const movieContainer = document.querySelector('.favorite-movies');

        const imagecont = document.createElement('div');
        imagecont.classList.add('image-cont');

        const movieImage = document.createElement('img');

        movieImage.src = movie.poster;
        movieImage.alt = movie.title;
        movieImage.style.cursor = 'pointer';

        let removeButton = document.createElement('button');
        removeButton.innerHTML = '<img src="../Images/Icons/close.png" alt="Remove">';
        removeButton.classList.add('remove-btn');
        removeButton.style.position = 'absolute';
        removeButton.style.top = '-10px';
        removeButton.style.right = '-10px';
        
        removeButton.addEventListener('click', () => {
            let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovie'));

            favoriteMovies = favoriteMovies.filter((favMovie) => favMovie.title !== movie.title);

            localStorage.setItem('favoriteMovie', JSON.stringify(favoriteMovies));

            movieContainer.removeChild(imagecont);

            updateBadgeCount();
        });

        imagecont.appendChild(movieImage);
        imagecont.appendChild(removeButton);

        movieContainer.appendChild(imagecont);

        movieImage.addEventListener('click', () => {
            window.location.href = `../Movie/movie.html?name=${movie.title.split(' ').join('%20')}`;
        });
    });
}

function displayWatchedMovie() {
    const watchedMovie = localStorage.getItem('watchedMovie');
    // Specifically target the watched-movies container
    const watchedContainer = document.querySelector('.shelf .watched-movies');
    console.log(watchedContainer);

    if (!watchedContainer) {
        console.error('Watched movies container not found');
        return;
    }

    let parsedWatchedMovie = [];

    if (watchedMovie) {
        try {
            parsedWatchedMovie = JSON.parse(watchedMovie);
            if (!Array.isArray(parsedWatchedMovie)) {
                parsedWatchedMovie = [parsedWatchedMovie];
            }
        } catch (error) {
            console.error('Error parsing watched movies:', error);
            return;
        }
    }

    parsedWatchedMovie.forEach((movie) => {
        const WatchedmovieContainer = document.querySelector('.watched-movies');
        console.log(WatchedmovieContainer);
        const watchedimagecont = document.createElement('div');
        watchedimagecont.classList.add('image-cont');
        const watchedmovieImage = document.createElement('img');
        watchedmovieImage.src = movie.poster;
        watchedmovieImage.alt = movie.title;
        watchedmovieImage.style.cursor = 'pointer';

        let removeButton = document.createElement('button');
        removeButton.innerHTML = '<img src="../Images/Icons/close.png" alt="Remove">';
        removeButton.classList.add('remove-btn');
        removeButton.style.position = 'absolute';
        removeButton.style.top = '-10px';
        removeButton.style.right = '-10px';
        
        removeButton.addEventListener('click', () => {
            let WatchedMovies = JSON.parse(localStorage.getItem('watchedMovie'));

            WatchedMovies = WatchedMovies.filter((watchMovie) => watchMovie.title !== movie.title);

            localStorage.setItem('watchedMovie', JSON.stringify(WatchedMovies));

            WatchedmovieContainer.removeChild(watchedimagecont);

            updateBadgeCount();
        });

        watchedimagecont.appendChild(watchedmovieImage);
        watchedimagecont.appendChild(removeButton);

        WatchedmovieContainer.appendChild(watchedimagecont);

        watchedmovieImage.addEventListener('click', () => {
            window.location.href = `../Movie/movie.html?name=${movie.title.split(' ').join('%20')}`;
        });
    });
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