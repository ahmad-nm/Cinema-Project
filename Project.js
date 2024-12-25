document.addEventListener('DOMContentLoaded', function() {
    const seeMoreLinks = document.querySelectorAll('.see-more');
    const movieNotes = document.querySelectorAll('.movie_notes');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const newReleases = document.querySelector('.newreleases');
    const images = [
        {
            url: 'url("./Images/Moviesbg/venombg.jpg")',
            title: 'Venom: The Last Dance',
            duration: '1h50m',
            genres: 'Action, Thriller, Sci-Fi',
            shortDescription: 'Description: Eddie Brock and Venom must make a devas...',
            fullDescription: 'Description: Eddie Brock and Venom must make a devastating decision as they\'re pursued by a mysterious military man and alien monsters from Venom\'s home world.'
        },
        {
            url: 'url("./Images/Moviesbg/joker2.jpg")',
            title: 'Joker: Folie à Deux',
            duration: '2h18m',
            genres: 'Crime, Drama, Thriller',
            shortDescription: 'Description: Struggling with his dual identity, failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.',
            fullDescription: 'Description: Struggling with his dual identity, failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.'
        },
        {
            url: 'url("./Images/Moviesbg/beekeeper.jpg")',
            title: 'The Beekeeper',
            duration: '1h45m',
            genres: 'Action, Crime, Thriller',
            shortDescription: 'Description: A kind-hearted landlady commits suicide after falling victim to a phishing scam, leading former "Beekeeper" operative Adam Clay to set out on a brutal campaign for revenge upon those responsible.',
            fullDescription: 'Description: A kind-hearted landlady commits suicide after falling victim to a phishing scam, leading former "Beekeeper" operative Adam Clay to set out on a brutal campaign for revenge upon those responsible.'
        },
        {
            url: 'url("./Images/Moviesbg/moana2.jpg")',
            title: 'Moana 2',
            duration: '1h40m',
            genres: 'Animation, Adventure, Comedy, Family',
            shortDescription: 'Description: After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she\'s ever faced.',
            fullDescription: 'Description: After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she\'s ever faced.'
        },
        {
            url: 'url("./Images/Moviesbg/mufasa.jpg")',
            title: 'Mufasa: The Lion King',
            duration: '1h58m',
            genres: 'Animation, Adventure, Family',
            shortDescription: 'Description: Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.',
            fullDescription: 'Description: Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.'
        },
        {
            url: 'url("./Images/Moviesbg/sonic3.jpg")',
            title: 'Sonic the Hedgehog 3',
            duration: '1h50m',
            genres: 'Action, Adventure, Comedy, Family, Sci-Fi',
            shortDescription: 'Description: Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched, Team Sonic must seek out an unlikely alliance.',
            fullDescription: 'Description: Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched, Team Sonic must seek out an unlikely alliance.'
        },
        {
            url: 'url("./Images/Moviesbg/deadpool3.jpg")',
            title: 'Deadpool & Wolverine',
            duration: '2h8m',
            genres: 'Action, Comedy, Sci-Fi',
            shortDescription: 'Description: Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.',
            fullDescription: 'Description: Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.'
        },
        {
            url: 'url("./Images/Moviesbg/expendables.jpg")',
            title: 'The Expendables 4',
            duration: '1h55m',
            genres: 'Action, War, Thriller',
            shortDescription: 'Description: Armed with every weapon they can get their hands on, the Expendables are the world\'s last line of defense and the team that gets called when all other options are off the table.',
            fullDescription: 'Description: Armed with every weapon they can get their hands on, the Expendables are the world\'s last line of defense and the team that gets called when all other options are off the table.'
        }
    ];
    let currentIndex = 0;

    function updateMovieNotes(index) {
        
        if (index < 0 || index >= images.length) {
            console.error('Invalid index:', index);
            return;
        }
    
        const movie = images[index];
        console.log('Updating movie notes for:', movie);
    
        if (!newReleases || !movieNotes) {
            console.error('newReleases or movieNotes element not found');
            return;
        }

        newReleases.style.backgroundImage = movie.url;
        movieNotes.querySelector('.movie-details p span:first-child').textContent = movie.title;
        movieNotes.querySelector('.duration p:first-child').textContent = movie.duration;
        movieNotes.querySelector('.duration p:last-child').textContent = movie.genres;
        movieNotes.querySelector('.short-description').innerHTML = `${movie.shortDescription} <a href="#" class="see-more">See More</a>`;
        movieNotes.querySelector('.full-description').innerHTML = `${movie.fullDescription} <a href="#" class="see-more">See Less</a>`;
    }

    movieNotes.forEach(note => {
        const fullDescription = note.querySelector('.full-description');
        const shortDescription = note.querySelector('.short-description');
        fullDescription.style.display = 'none';
        shortDescription.style.display = 'block';
    });

    seeMoreLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const movieNotes = this.closest('.movie_notes');
            const fullDescription = movieNotes.querySelector('.full-description');
            const shortDescription = movieNotes.querySelector('.short-description');

            if (fullDescription.style.display === 'none' || fullDescription.style.display === '') {
                fullDescription.style.display = 'block';
                shortDescription.style.display = 'none';
            } else {
                fullDescription.style.display = 'none';
                shortDescription.style.display = 'block';
            }
        });
    });

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

    nextButton.addEventListener('click', function() {
        next();
    });

    prevButton.addEventListener('click', function() {
        prev();
    });    

    const movienotes = document.querySelector('.movie-notes');
    if (!movienotes) {
        console.error('movieNotes element not found');
    }

    newReleases.style.backgroundImage = images[currentIndex];
    updateMovieNotes(currentIndex);
});