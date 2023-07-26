//Initial references
let movieNameRef = document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let form = document.getElementById('form')
let cardContainer = document.getElementById('result')
let key = "9feb7a83831e1ed629de0870a737ed2b"
let imgPath = "https://image.tmdb.org/t/p/w1280";
let apiURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9feb7a83831e1ed629de0870a737ed2b&page=1";
let searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${key}&1&query="`;

//Fetch api function
async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}


getMovies(apiURL)

// Function to make movie card
function showMovies(movies){
    cardContainer.innerHTML = ''
    movies.forEach((movie) =>{
        const { title, poster_path, vote_average, overview } = movie;
        let movieCard = document.createElement('div')
        movieCard.classList.add("movie-card")
        
        movieCard.innerHTML = `
                <div class="info">
                    <img src=${nullImage(poster_path)} alt=${title} class="poster">
                    <div>
                        <h2 class="title">${title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg" alt="star">
                            <h4>${vote_average/2}</h4>
                        </div>
                    </div>
                </div>
            <span class = "plot">
                <h3>Plot:</h3>
                <p>${overview}</p>
            <span/>
            `;

            cardContainer.appendChild(movieCard)

    })
}

//Img unavailable function
function nullImage(path){
    if (path !== null){
        return imgPath + path;
    }else {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
    }
}

// Form event listener
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const search = movieNameRef.value;

    if (search !== ''){
        getMovies(searchURL + search)
    } else{
        window.location.reload();
    }
})

