const BASE_URL = 'https://api.themoviedb.org/3/'
const BASE_URL_300 = 'https://image.tmdb.org/t/p/w300'

async function getTrendingMoviesPreview() {
	const response = await fetch(`${BASE_URL}trending/movie/day`, { headers: { 'Authorization': API_KEY } })
	const data = await response.json()
	const movies = await data.results

	movies.forEach(movie => {
		const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

		const  movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${BASE_URL_300}${movie.poster_path}`)

		movieContainer.appendChild(movieImg)
		trendingPreviewMoviesContainer.appendChild(movieContainer)
	})

}

getTrendingMoviesPreview()