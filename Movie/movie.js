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
        if (movie.backdrop_path){
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

    function changefavorite(){
        let fav = document.getElementById("favorite-icon").src;
        
        if (fav.includes("red-heart")) {
            document.getElementById("favorite-icon").src = "./Images/Icons/heart.png";
        }
        else{
            document.getElementById("favorite-icon").src = "./Images/Icons/red-heart.png";
        }
    }

    function changechecked(){
        let checked = document.getElementById("watched-icon").src;
        
        if (checked.includes("greencheck")) {
            document.getElementById("watched-icon").src = "./Images/Icons/checked.png";
        }
        else{
            document.getElementById("watched-icon").src = "./Images/Icons/greencheck.png";
        }
    }