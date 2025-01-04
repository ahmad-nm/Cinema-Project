const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWQ2MGIzZTg5MDIwYTNhODVkYTQxYjNjNTQ3N2QzZCIsIm5iZiI6MTczNTMzNTM0NC43MjEsInN1YiI6IjY3NmYxZGIwMWVmYzI0MzRjZjEyYzExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PVHfXcbGEfHikdEuL1fiUJ6bjBE7l-ZdMPjrQUGAy7o'
    }
};

function getRandomMovies(count = 60, pages = 4) {
    const fetchPromises = [];

    const pageNumbers = Array.from({ length: pages }, () =>
        Math.floor(Math.random() * 500) + 1
    );

    pageNumbers.forEach(page => {
        fetchPromises.push(
            fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options)
                .then(response => response.json())
        );
    });

    Promise.all(fetchPromises)
        .then(results => {
            const allMovies = results.flatMap(data => data.results);
            const englishMovies = allMovies.filter(movie => movie.original_language === 'en');
            const randomMovies = [];

            while (randomMovies.length < count && englishMovies.length > 0) {
                const randomIndex = Math.floor(Math.random() * englishMovies.length);
                randomMovies.push(englishMovies.splice(randomIndex, 1)[0]);
            }

            displayMovies(randomMovies);
        })
        .catch(err => console.error('Error fetching random movies:', err));
}

function displayMovies(movies) {
    const moviesContainer = document.querySelector('.movie-cards');
    moviesContainer.innerHTML = '';

    localStorage.setItem('randomMovies', JSON.stringify(movies));

    movies.forEach(movie => {
        const movieElement = `
                <a href="http://127.0.0.1:5500/Movie/movie.html?name=${movie.title.split(' ').join('%20')}">
                    <div class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <h3>${movie.title}</h3>
                        <p>Rating:⭐${movie.vote_average.toFixed(1)}/10</p>
                    </div>
                </a>
            `;
        moviesContainer.innerHTML += movieElement;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedMovies = localStorage.getItem('randomMovies');
    if (savedMovies) {
        displayMovies(JSON.parse(savedMovies));
    } else {
        getRandomMovies();
    }
});

document.getElementById('generate-random').onclick = () => getRandomMovies();


const genres = {
    'action': 28,
    'adventure': 12,
    'animated': 16,
    'comedy': 35,
    'crime': 80,
    'documentary': 99,
    'drama': 18,
    'family': 10751,
    'fantasy': 14,
    'horror': 27,
    'mystery': 9648,
    'romance': 10749,
    'sci-fi': 878,
    'thriller': 53,
    'adventure': 12,
    'music': 10402,
    'war': 10752,
    'western': 37,
};

function getMoviesByGenre(genreIds, pages = 4) {
    const fetchPromises = [];

    for (let page = 1; page <= pages; page++) {
        const url = `https://api.themoviedb.org/3/discover/movie?` +
            `with_genres=${genreIds.join(',')}` +
            `&language=en-US` +
            `&sort_by=popularity.desc` +
            `&include_adult=false` +
            `&page=${page}` +
            `&vote_count.gte=100`;

        fetchPromises.push(
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
        );
    }

    Promise.all(fetchPromises)
        .then(results => {
            const allMovies = results.flatMap(data => data.results);
            const filteredMovies = allMovies.filter(movie =>
                movie.poster_path &&
                movie.vote_average > 0 &&
                genreIds.some(id => movie.genre_ids.includes(parseInt(id)))
            );
            displayMovies(filteredMovies);
            localStorage.setItem('currentGenres', JSON.stringify(genreIds));
            localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
        })
        .catch(err => {
            console.error('Error fetching movies:', err);
            getRandomMovies();
        });
}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        console.log('Checkbox changed:', this.id);

        const selectedGenres = [];
        const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

        console.log('Number of checked boxes:', checkedBoxes.length);

        checkedBoxes.forEach(checked => {
            if (genres[checked.id]) {
                selectedGenres.push(genres[checked.id]);
                console.log('Added genre:', checked.id, genres[checked.id]);
            }
        });

        console.log('Selected genres:', selectedGenres);

        if (selectedGenres.length > 0) {
            getMoviesByGenre(selectedGenres);
        } else {
            getRandomMovies();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const savedGenres = JSON.parse(localStorage.getItem('currentGenres'));
    if (savedGenres) {
        savedGenres.forEach(genreId => {
            const genreName = Object.keys(genres).find(key => genres[key] === genreId);
            if (genreName) {
                document.getElementById(genreName).checked = true;
            }
        });
        getMoviesByGenre(savedGenres);
    }
});

let searchTimeout;

function searchMovies(query) {
    if (!query) {
        getRandomMovies();
        return;
    }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
        
        fetch(searchUrl, options)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const filteredResults = data.results.filter(movie => movie.poster_path);
                    displayMovies(filteredResults);
                    localStorage.setItem('searchResults', JSON.stringify(filteredResults));
                } else {
                    displayNoResults();
                }
            })
            .catch(err => console.error('Error searching movies:', err));
    }, 500);
}

document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    console.log('Search query:', query);
    searchMovies(query);
});

function displayNoResults() {
    const moviesContainer = document.querySelector('.movie-cards');
    moviesContainer.innerHTML = '<p class="no-results">No movies found. Try a different search.</p>';
}