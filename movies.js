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


// Menu toggle
const menu = document.getElementById("menu");

const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");

const remove1 = document.querySelector(".remove1");
const remove2 = document.querySelector(".remove2");
const remove3 = document.querySelector(".remove3");

let clicked = false;

/**
 * Toggles the CSS classes of menu bars on click.
 * When clicked for the first time, the function adds "remove1", "remove2", and "remove3" classes
 * while removing "bar1", "bar2", and "bar3" classes from the respective elements.
 * On subsequent clicks, it reverses the changes, removing "remove1", "remove2", and "remove3" classes.
 * It also toggles the clicked state to track the click status.
 */

const sideBar = document.querySelector(".sidebar");
menu.onclick = function () {
    if (!clicked) {
        // إضافة الكلاسات عند النقر
        bar1.classList.add("remove1");
        bar2.classList.add("remove2");
        bar3.classList.add("remove3");
        bar1.classList.remove("bar1");
        bar2.classList.remove("bar2");
        bar3.classList.remove("bar3");
        // display the sidebar with display flex
        sideBar.style.display = "flex";

    } else {
        // إزالة الكلاسات عند النقر مرة أخرى
        bar1.classList.remove("remove1");
        bar2.classList.remove("remove2");
        bar3.classList.remove("remove3");
        bar1.classList.add("bar1");
        bar2.classList.add("bar2");
        bar3.classList.add("bar3");
        // hide the sidebar with display none
        sideBar.style.display = "none";
    }
    clicked = !clicked; // تبديل الحالة
};


// const nav = document.querySelector("nav");
// const navLinks = document.querySelector("nav ul");

// menu.onclick = function () {
//     nav.classList.toggle("nav-active");

//     if (nav.classList.contains("nav-active")) {
//         navLinks.style.display = "flex";
//     } else {
//         navLinks.style.display = "none"; 
//     }
// };
