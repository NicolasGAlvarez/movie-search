const API_URL = 'http://www.omdbapi.com/?type=movie&apikey=9b3b7946&s=';
const IMDB_URL = 'https://www.imdb.com/title/';

const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection = document.querySelector('#results');
const watchLaterSection = document.querySelector('#watch-later');

form.addEventListener('submit', formSubmitted);

async function formSubmitted(event) {
	event.preventDefault();
	const searchTerm = input.value;
	try {
		const results = await getResults(searchTerm);
		showResults(results);
	} catch (error) {
		showError(error);
	}
}

async function getResults(searchTerm) {
	const url = `${API_URL}${searchTerm}`;
	const response = await fetch(url);
	const data = await response.json();
	if (data.Error) {
		throw new Error(data.Error);
	}
	return data.Search;
}

function showResults(results) {
	resultsSection.innerHTML = results.reduce((html, movie) => {
		return html + getMovieTemplate(movie, 4);
	}, '');

	const watchLaterButtons = document.querySelectorAll('.watch-later-button');
	watchLaterButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const { movieid } = button.dataset;
			const movie = results.find((movie) => movie.imdbID === movieid);
			watchLaterSection.innerHTML =
				watchLaterSection.innerHTML + getMovieTemplate(movie, 12, false);
		});
	});
}

function getMovieTemplate(movie, cols, button = true) {
	return `
	<div class="card col-${cols} p-2">
	<img
	src="${movie.Poster}"
	class="card-img-top"
	alt="${movie.Title}"
	/>
	<div class="card-body">
	<h5 class="card-title">${movie.Title}</h5>
	<p class="card-text">${movie.Year}</p>
	<p class="card-text"></p>
	<a href="${IMDB_URL}${movie.imdbID}" target="_blank" >IMDB</a>
	${
		button
			? `<button data-movieid="${movie.imdbID}" type="button" class="btn btn-primary mt-1 watch-later-button">Watch Later</button>`
			: ''
	}
	</div>
	</div>
	`;
}

function showError(error) {
	resultsSection.innerHTML = `
		<div class="alert alert-danger col" role="alert" data-mdb-color="danger">
			${error.message}
		</div>
	`;
}
