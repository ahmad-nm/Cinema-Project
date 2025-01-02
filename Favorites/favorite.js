document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('header input');
    
    searchInput.addEventListener('input', (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const movieContainers = document.querySelectorAll('.image-cont');

        movieContainers.forEach((container) => {
            const movie = container.querySelector('img');
            const removeBtn = container.querySelector('.remove-btn');
            const movieTitle = movie.alt.toLowerCase();

            if (movieTitle.includes(searchQuery)) {
                container.style.display = 'block';
                removeBtn.style.display = 'block';
            } else {
                container.style.display = 'none';
                removeBtn.style.display = 'none';
            }
        });
        const visibleMovies = document.querySelectorAll('.image-cont[style*="display: block"]').length;
        document.getElementById('badge-count').textContent = visibleMovies;
        updateBadgeCount();
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
        
        removeButton.addEventListener('click', () => {
            let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovie'));
            favoriteMovies = favoriteMovies.filter((favMovie) => favMovie.title !== movie.title);
            localStorage.setItem('favoriteMovie', JSON.stringify(favoriteMovies));
            movieContainer.removeChild(imagecont);
            updateBadgeCount();
        });
       
        movieContainer.appendChild(imagecont);
        imagecont.appendChild(movieImage);
        imagecont.appendChild(removeButton);

        movieImage.addEventListener('click', () => {
            window.location.href = `../Movie/movie.html?name=${movie.title.split(' ').join('%20')}`;
        });
    });
}

function displayWatchedMovie() {
    const watchedMovie = localStorage.getItem('watchedMovie');

    if(!watchedMovie) {
        return;
    }

    const parsedWatchedMovie = JSON.parse(watchedMovie);

    parsedWatchedMovie.forEach((movie) => {
        const WatchedmovieContainer = document.querySelector('.watched-movies');
        const watchedimagecont = document.createElement('div');
        watchedimagecont.classList.add('image-cont');
        const watchedmovieImage = document.createElement('img');
        watchedmovieImage.src = movie.poster;
        watchedmovieImage.alt = movie.title;
        watchedmovieImage.style.cursor = 'pointer';

        let removeButton = document.createElement('button');
        removeButton.innerHTML = '<img src="../Images/Icons/close.png" alt="Remove">';
        removeButton.classList.add('remove-btn');
        
        removeButton.addEventListener('click', () => {
            let WatchedMovies = JSON.parse(localStorage.getItem('watchedMovie'));
            WatchedMovies = WatchedMovies.filter((watchMovie) => watchMovie.title !== movie.title);
            localStorage.setItem('watchedMovie', JSON.stringify(WatchedMovies));
            WatchedmovieContainer.removeChild(watchedimagecont);
            updateBadgeCount();
        });

        WatchedmovieContainer.appendChild(watchedimagecont);
        watchedimagecont.appendChild(watchedmovieImage);
        watchedimagecont.appendChild(removeButton);

        watchedmovieImage.addEventListener('click', () => {
            window.location.href = `../Movie/movie.html?name=${movie.title.split(' ').join('%20')}`;
        });
    });
}

function displayAddMovie() {
    const addMovie = localStorage.getItem('addMovie');
    
    if (!addMovie) {
        return;
    }

    const parsedAddMovie = JSON.parse(addMovie);

    parsedAddMovie.forEach((movie) => {
        const movieContainer = document.querySelector('.add-movies');
        const movieImagecont = document.createElement('div');
        movieImagecont.classList.add('image-cont');
        const movieImage = document.createElement('img');
        movieImage.src = movie.poster;
        movieImage.alt = movie.title;
        movieImage.style.cursor = 'pointer';

        let removeButton = document.createElement('button');
        removeButton.innerHTML = '<img src="../Images/Icons/close.png" alt="Remove">';
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', () => {
            let addMovies = JSON.parse(localStorage.getItem('addMovie'));
            addMovies = addMovies.filter((addMovie) => addMovie.title !== movie.title);
            localStorage.setItem('addMovie', JSON.stringify(addMovies));
            movieContainer.removeChild(movieImagecont);
            updateBadgeCount();
        });
        
        
        movieContainer.appendChild(movieImagecont);
        movieImagecont.appendChild(movieImage);
        movieImagecont.appendChild(removeButton);

        movieImage.addEventListener('click', () => {
            window.location.href = `../Movie/movie.html?name=${movie.title.split(' ').join('%20')}`;
        });
    });
}

displayFavoriteMovie();
displayWatchedMovie();
displayAddMovie();
updateBadgeCount();

function updateBadgeCount() {

    const favoriteMoviesCount = document.querySelector('.favorite-movies').querySelectorAll('.image-cont').length;
    const watchedMoviesCount = document.querySelector('.watched-movies').querySelectorAll('.image-cont').length;
    const addMoviesCount = document.querySelector('.add-movies').querySelectorAll('.image-cont').length;

    const totalCount = favoriteMoviesCount + watchedMoviesCount + addMoviesCount;

    document.getElementById('badge-count').textContent = totalCount;
}

document.addEventListener('DOMContentLoaded', () => {
    updateBadgeCount();
});