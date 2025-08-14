const BASE_URL = 'https://api.themoviedb.org/3/'
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p'

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
		movieContainer.addEventListener('click', () => {
			location.hash = `#movie=${movie.id}`
		})

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${BASE_URL_IMAGE}/w300${movie.poster_path}`)

		movieContainer.appendChild(movieImg)
		container.appendChild(movieContainer)
	})
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
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

async function getTrendingMovies() {
	const { data } = await api.get('trending/movie/day')
	const movies = await data.results

	createMovies(movies, genericSection)
}

async function getMovieById(id) {
	const { data } = await api.get(`movie/${id}`)
	const movie = await data

	headerSection.style.background = `
		linear-gradient(
			180deg, 
			rgba(0, 0, 0, 0.35) 19.27%, 
			rgba(0, 0, 0, 0) 29.17%
		),
		url(${BASE_URL_IMAGE}/w500${movie.poster_path})`
	movieDetailTitle.textContent = movie.title
	movieDetailDescription.textContent = movie.overview
	movieDetailScore.textContent = movie.vote_average

	createCategories(movie.genres, movieDetailCategoriesList)
	getRelatedMoviesById(movie.id)
}

async function getRelatedMoviesById(movieId) {
	const { data } = await api.get(`movie/${movieId}/recommendations`)
	const movies = await data.results

	createMovies(movies, relatedMoviesContainer)
}