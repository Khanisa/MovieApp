var API_Key = "93504c920dd227f808629b6700607a8b";
var movieCards = document.querySelector(".movie-cards") //selecting the .movie-cards class

function getLastestMOvies(callback) {
    fetch("http://api.themoviedb.org/3/discover/movie?api_key=" + API_Key + "&year=2018", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
    .then (function(res) {
        if(res.status == 200) {
            res.json()
            .then(function(data) {
                callback(data)
            })
        }
    })
}

getLastestMOvies(function(data) {
    console.log(data);
    data.results.forEach(function(result) {
        var card  = creatMovieCard(result);
        movieCards.appendChild(card);
    })
});

function creatMovieCard (data) {
    var li = document.createElement("li"); //creating li
    li.classList.add("movie-card") //add class to li
    var img = document.createElement("img") ///creating img
    img.classList.add("image"); //adding image class
    img.setAttribute("src", "http://image.tmdb.org/t/p/w500" + data.poster_path ); //setting attribute for the img task
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

// function getActionMovies(callback) {
//     fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_Key + "&with_genres=18", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         mode: "cors"
//     })
//     .then (function(res) {
//         if(res.status == 200) {
//             res.json()
//             .then(function(data) {
//                 callback(data)
//             })
//         }
//     })
// }

// getActionMovies(function(data) {
//     console.log(data);
//     data.results.forEach(function(result) {
//         var card  = creatMovieCard(result);
//         movieCards.appendChild(card);
//     })
// });


// var className = document.getElementsByClassName("about_page")
// className.addEventListener("click", getActionMovies);