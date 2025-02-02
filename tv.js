const apiKey = "f5a452626cda4ba2ce56b27606b67f70";
const baseUrl = "https://api.themoviedb.org/3";

async function fetchTVSeries(url) {
    const response = await fetch(url);
    if (!response.ok) {
        console.log("Error fetching TV series");
        return [];
    }
    const data = await response.json();
    return data.results;
}

function displayTVSeries(tvSeries) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear previous results

    tvSeries.forEach((series) => {
        const seriesElement = document.createElement('div');
        seriesElement.classList.add('moviepiece');
        seriesElement.innerHTML = `
            <span>
                <img src="https://image.tmdb.org/t/p/w500/${series.poster_path}" alt="${series.name}">
                <p class="paragraph">${series.overview}</p>
            </span>
            <div class="display">
                <h2>${series.name}</h2>
                <a href="readseries.html?id=${series.id}">Read more</a>
            </div>
        `;
        movieList.appendChild(seriesElement);
    });
}

window.addEventListener('load', () => {
    const popularTVSeriesUrl = `${baseUrl}/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    fetchTVSeries(popularTVSeriesUrl).then(displayTVSeries);
});

// Handle search form submission
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault(); 

    const searchQuery = document.getElementById('search').value.trim();
    if (searchQuery) {
        const searchUrl = `${baseUrl}/search/tv?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1&include_adult=false`;
        fetchTVSeries(searchUrl).then(displayTVSeries);
    }
});