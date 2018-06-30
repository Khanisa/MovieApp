var API_KEY = "93504c920dd227f808629b6700607a8b";
var movieCards = document.querySelector(".movie-cards");
var dropdown = document.querySelector(".dropdown");

function getLatestMovies(callback) {
    fetch("http://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&year=2018",  {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
    .then(function(res) {
        if(res.status == 200) {
            res.json()
            .then(function(data) {
                callback(data);
            })
        }
    })
}

getLatestMovies(function(data) {
    data.results.forEach(function(result) {
        var card = createMovieCard(result);
        movieCards.appendChild(card);
    })
});

function createMovieCard(data) {
    var li = document.createElement("li"); //creating li
    li.classList.add("movie-card"); //add class to li
    var img = document.createElement("img"); ///creating img
    img.classList.add("image"); //adding image class
    img.setAttribute("src", "http://image.tmdb.org/t/p/w500" + data.poster_path); //setting attribute for the img
    li.appendChild(img);
    var div = document.createElement("div"); //creating div
    div.classList.add("img-detail"); //adding
    var year = document.createElement("p");
    year.classList.add("year");
    year.innerHTML = "Year: " + data.release_date.substring(0, 4);
    var synopsis = document.createElement("p"); // creating p tag
    synopsis.classList.add("synopsis"); //adding class synopsis
    synopsis.innerText = data.overview.substring(0, 150) + "..."; ///adding inner text
    div.appendChild(year);
    div.appendChild(synopsis);
    li.appendChild(div);
    return li;
}

function getMovieGenres(callback) {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY, {
        method: "GET",
        mode: "cors"
    })
    .then(function(res) {
        if(res.status === 200) {
            res.json()
            .then(function(data) {
                callback(data.genres);
            })
        }
    })
    .catch(function(err) {
        console.log(err);
    })
}

function createDropdownOption(data) {
    var li = document.createElement("li");
    li.classList.add("option");
    li.setAttribute("id", data.id);
    li.innerText = data.name;
    li.addEventListener("click", function() {
        var id = this.getAttribute("id");
        getMoviesByGenre(id, function(movies) {
            populateMovies(movies);
        })
    })
    return li;
}

function populateDropdown() {
    getMovieGenres(function(genres) {
        genres.forEach(function(data) {
            var dropdownOption = createDropdownOption(data);
            dropdown.appendChild(dropdownOption);
        });
    })
}

populateDropdown();

function getMoviesByGenre(id, callback) {
    fetch("https://api.themoviedb.org/3/genre/" + id + "/movies?api_key=" + API_KEY, {
        method: "GET",
        mode: "cors"
    })
    .then(function(res) {
        if(res.status === 200) {
            res.json()
            .then(function(data) {
                callback(data.results);
            })
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function populateMovies(data) {
    movieCards.innerHTML = "";
    data.forEach(function(movie) {
        var movieCard = createMovieCard(movie);
        movieCards.appendChild(movieCard);
    })
}