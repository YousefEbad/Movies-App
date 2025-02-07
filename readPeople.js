// Get the movie ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const API_KEY = "f5a452626cda4ba2ce56b27606b67f70"; 

if (movieId) {
    fetchMovieDetails(movieId);
} else {
    document.getElementById("movie-title").textContent = "Movie Not Found";
}

// Fetch movie details from TMDb API
function fetchMovieDetails(id) {
    const API_URL = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;

    fetch(API_URL).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("movie-title").textContent = data.name;
            // document.getElementById("movie-overview").textContent = data.overview;

            // ✅ Set the movie poster OR use fallback image if missing
            if (data.profile_path) {
                document.getElementById("movie-poster").src = `https://image.tmdb.org/t/p/w500/${data.profile_path}`;
            } else {
                document.getElementById("movie-poster").src = "fallback.jpg"; // Ensure fallback.jpg exists
            }
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
            document.getElementById("movie-title").textContent = "Error loading movie details";
        });
}
