<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">MOVIE SEARCH</a>
      </nav>
    </header>
    <main class="container mt-4">
      <form @submit.prevent="getResults" class="row mt-2">
        <fieldset class="form-group col-9">
          <input
            v-model="searchTerm"
            type="text"
            class="form-control"
            id="searchTerm"
            placeholder="Enter a movie title"
          />
        </fieldset>
        <button type="submit" class="btn btn-primary col-3">Search</button>
      </form>
      <section>
        <section class="mt-4 row movies-area">
          <section class="mt-4 col-9 row" id="results">
            <div
              v-if="error"
              class="alert alert-danger col"
              role="alert"
              data-mdb-color="danger"
            >
              {{ error }}
            </div>
            <MovieCard
              v-for="movie in results"
              :key="movie.imdbID"
              :movie="movie"
              :addToWatchLater="addToWatchLater"
              :isInWatchLater="isInWatchLater"
              class="col-4"
            >
            </MovieCard>
          </section>
          <section class="mt-4 col-3 row">
            <h4>Watch Later</h4>
            <section class="row" id="watch-later">
              <MovieCard
                v-for="movie in watchLater"
                :key="movie.imdbID"
                :movie="movie"
                :removeWatchLater="removeWatchLater"
                class="col-12"
              >
              </MovieCard>
            </section>
          </section>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import MovieCard from './components/MovieCard.vue';

const API_URL = 'http://www.omdbapi.com/?type=movie&apikey=9b3b7946&s=';

export default {
  name: 'App',
  components: {
    MovieCard,
  },
  data: () => ({
    searchTerm: '',
    results: [],
    watchLater: [],
    error: '',
  }),
  methods: {
    async getResults() {
      const url = `${API_URL}${this.searchTerm}`;
      const results = await fetch(url);
      const data = await results.json();
      if (data.Error) {
        this.results = [];
        this.error = data.Error;
      } else {
        this.results = data.Search;
        this.error = '';
      }
    },
    addToWatchLater(movie) {
      this.watchLater.push(movie);
    },
    isInWatchLater(movie) {
      return this.watchLater.some((wlMovie) => wlMovie.imdbID === movie.imdbID);
    },
    removeWatchLater(movie) {
      const index = this.watchLater.indexOf(movie);
      this.watchLater.splice(index, 1);
    },
  },
};
</script>

<style>
.movies-area {
  justify-content: space-around;
  align-items: flex-start;
}
</style>
