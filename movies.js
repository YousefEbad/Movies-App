const apiKey = "f5a452626cda4ba2ce56b27606b67f70";
const baseUrl = "https://api.themoviedb.org/3";

async function fetchMovies(url) {
    const response = await fetch(url);
    if (!response.ok) {
        console.log("Error fetching movies");
        return [];
    }
    const data = await response.json();
    return data.results;
}

function displayMovies(movies) {
    // console.log(movies);
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear previous results

    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('moviepiece');
        movieElement.innerHTML = `
            <span>
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                <p class="paragraph">${movie.overview}</p>
            </span>
            <div class="display">
                <h2>${movie.title}</h2>
                <a href="read.html?id=${movie.id}">Read more</a>
            </div>
        `;
        movieList.appendChild(movieElement);
    });
}

window.addEventListener('load', () => {
    const popularMoviesUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    fetchMovies(popularMoviesUrl).then(displayMovies);
});

// Handle search form submission
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const searchQuery = document.getElementById('search').value.trim();
    if (searchQuery) {
        const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1&include_adult=false`;
        fetchMovies(searchUrl).then(displayMovies);
    }
});