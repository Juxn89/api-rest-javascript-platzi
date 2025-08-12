const BASE_URL = 'https://api.themoviedb.org/3/'
const BASE_URL_300 = 'https://image.tmdb.org/t/p/w300'

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		'Authorization': API_KEY,
		'Content-Type': 'application/json;charset=utf-8'
	}
})

async function getTrendingMoviesPreview() {
	const { data } = await api.get('trending/movie/day')
	const movies = await data.results

	movies.forEach(movie => {
		const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${BASE_URL_300}${movie.poster_path}`)

		movieContainer.appendChild(movieImg)
		trendingPreviewMoviesContainer.appendChild(movieContainer)
	})
}

async function getCategoriesPreview() {
	const { data } = await api.get('genre/movie/list')
	const categories = await data.genres

	categories.forEach(category => {
		const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

		const categoryContainer = document.createElement('div')
		categoryContainer.classList.add('category-container')

		const categoryTitle = document.createElement('h3')
		categoryTitle.classList.add('category-title')
		categoryTitle.setAttribute('id', `id${ category.id }`)

		const categoryTitleText = document.createTextNode(category.name)

		categoryTitle.appendChild(categoryTitleText)
		categoryContainer.appendChild(categoryTitle)
		previewCategoriesContainer.appendChild(categoryContainer)
	})
}