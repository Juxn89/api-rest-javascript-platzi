const BASE_URL = 'https://api.themoviedb.org/3/'
const BASE_URL_300 = 'https://image.tmdb.org/t/p/w300'

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		'Authorization': API_KEY,
		'Content-Type': 'application/json;charset=utf-8'
	}
})

// Utils
function createMovies(movies, container) {
	container.innerHTML = ''

	movies.forEach(movie => {
		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${BASE_URL_300}${movie.poster_path}`)

		movieContainer.appendChild(movieImg)
		container.appendChild(movieContainer)
	})
}

// Call to API

async function getTrendingMoviesPreview() {
	const { data } = await api.get('trending/movie/day')
	const movies = await data.results

	createMovies(movies, trendingMoviesPreviewList)
}

async function getCategoriesPreview() {
	const { data } = await api.get('genre/movie/list')
	const categories = await data.genres

	createCategories(categories, categoriesPreviewList)
}

async function getMoviesByCategory(categoryId) {
	const { data } = await api.get(`discover/movie?with_genres=${categoryId}`)
	const movies = await data.results

	createMovies(movies, genericSection)
}

async function getMoviesBySearch(query) {
	const { data } = await api.get(`search/movie?query=${query}`)
	const movies = await data.results

	createMovies(movies, genericSection)
}