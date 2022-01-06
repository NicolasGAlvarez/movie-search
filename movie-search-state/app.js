const API_URL = 'http://www.omdbapi.com/?type=movie&apikey=9b3b7946&s=';
const IMDB_URL = 'https://www.imdb.com/title/';

const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const app = document.querySelector('#app');

state = {
	searchTerm: '',
	results: [],
	watchLater: [],
	error: '',
};

render();

input.addEventListener('keyup', () => (state.searchTerm = input.value));
form.addEventListener('submit', formSubmitted);

function setState(newStateValues) {
	state = { ...state, ...newStateValues };
	render();
}

async function formSubmitted(event) {
	event.preventDefault();
	try {
		const results = await getResults(state.searchTerm);
		setState({
			results,
			error: '',
		});
	} catch (error) {
		setState({
			results: [],
			error: error.message,
		});
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

function watchLaterButtonClicked(event) {
	const { movieid } = event.target.dataset;
	const movie = state.results.find((movie) => movie.imdbID === movieid);
	setState({
		watchLater: [...state.watchLater, movie],
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
					? `<button onclick="watchLaterButtonClicked(event)" data-movieid="${movie.imdbID}" type="button" class="btn btn-primary mt-1 watch-later-button">Watch Later</button>`
					: ''
			}
		</div>
	</div>
	`;
}

function render() {
	app.innerHTML = `
		<section class="mt-4 row movies-area">
			<section class="mt-4 col-9 row" id="results">
				${
					!state.error
						? state.results.reduce((html, movie) => {
								return html + getMovieTemplate(movie, 4);
						  }, '')
						: `<div class="alert alert-danger col" role="alert" data-mdb-color="danger">
							${state.error}
						</div>`
				}
			</section>
			<section class="mt-4 col-3 row">
				<h4>Watch Later</h4>
				<section class="row" id="watch-later">
					${state.watchLater.reduce((html, movie) => {
						return html + getMovieTemplate(movie, 12, false);
					}, '')}
				</section>
			</section>
		</section>
	`;
}