<template>
  <div id="app" class="container">
    <header>
      <div class="title-container">
        <div class="title-line-1">MOVIES</div>
        <div class="title-line-2">An OMDB async search</div>
      </div>
    </header>
    <main>
      <div class="search-form-container">
        <form @submit.prevent="getResults" class="search-form">
          <input
            v-model="searchTerm"
            type="text"
            class=""
            id="searchTerm"
            placeholder="Enter a movie title"
          />
          <button type="submit" class="btn btn-primary">Search</button>
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="toggleWatchLaterSection"
          >
            List
          </button>
        </form>
      </div>
      <section class="movie-results-grid border-radius" id="results">
        <div v-if="error" class="">
          {{ error }}
        </div>
        <MovieCard
          v-for="movie in results"
          :key="movie.imdbID"
          :movie="movie"
          :addToWatchLater="addToWatchLater"
          :isInWatchLater="isInWatchLater"
          class="movie-results-card"
        >
        </MovieCard>
      </section>
    </main>
    <section class="watch-later-container hidden">
      <button
        class="watch-later-section-close"
        v-on:click="toggleWatchLaterSection"
      ></button>
      <MovieListItem
        v-for="movie in watchLater"
        :key="movie.imdbID"
        :movie="movie"
        :removeWatchLater="removeWatchLater"
        class="watch-later-item"
      >
      </MovieListItem>
    </section>
  </div>
</template>

<script>
import MovieCard from './components/MovieCard.vue';
import MovieListItem from './components/MovieListItem.vue';

const API_URL = 'http://www.omdbapi.com/?type=movie&apikey=9b3b7946&s=';

export default {
  name: 'App',
  components: {
    MovieCard,
    MovieListItem,
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
    toggleWatchLaterSection() {
      const watchLaterSection = document.querySelector('.watch-later-container');
      const isHidden = watchLaterSection.classList.contains('hidden');
      if (!isHidden) watchLaterSection.classList.add('hidden');
      else watchLaterSection.classList.remove('hidden');
    },
  },
};
</script>

<style>
.border-radius {
  border-radius: var(--border-radius);
}

.container {
  /* max-width: 100rem; */
  min-height: 100vh;
  /* min-width: 100vw; */
  /* margin-inline: auto; */
  /* padding-inline: 2rem; */
  /* border: 3px solid rgba(31, 221, 255, 0.7); */
}

.title-container {
  /* border: 1px solid burlywood; */
  min-height: 21rem;
  text-align: center;
  display: grid;
  gap: 0.5rem;
  grid-template: 1.25fr 1fr / 1fr 3fr 1fr;
  background-color: var(--clr-accent-background);
}

.title-line-1 {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: center;
  align-self: end;
  font-weight: 600;
  font-size: 3rem;
  letter-spacing: 0.25em;
  word-spacing: 0.5em;
  line-height: 1;
  color: var(--clr-accent-foreground);
}

.title-line-2 {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  justify-self: center;
  align-self: start;
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: 0.25em;
  /* word-spacing: .5em; */
  line-height: 1;
  /* text-transform: uppercase; */
  color: var(--clr-accent-foreground);
}

.search-form {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: space-between;
}

.search-form input {
  flex-basis: 30em;
  flex-grow: 1;
  line-height: 2;
  padding-left: 0.5em;
}

main {
  padding-top: 2em;
  min-height: 100%;
  /* border: 3px solid rgba(31, 221, 255, 0.7); */
  display: flex;
  gap: 1.5em;
  flex-direction: column;
}

.movie-results-grid {
  align-self: center;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(4, 1fr);
}

@media (min-width: 1px) and (max-width: 600px) {
  .title-container {
    min-height: 10rem;
  }

  .title-line-1 {
    font-weight: 600;
    font-size: 2em;
    letter-spacing: 0.2em;
    word-spacing: 0.5em;
  }

  .title-line-2 {
    font-weight: 400;
    font-size: 1em;
    letter-spacing: 0.05em;
  }

  main {
    padding-inline: 2em;
  }

  .search-form button {
    flex-grow: 1;
  }

  .movie-results-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 601px) and (max-width: 900px) {
  .title-container {
    min-height: 10rem;
  }

  .title-line-1 {
    font-weight: 600;
    font-size: 2.5em;
    letter-spacing: 0.2em;
    word-spacing: 0.5em;
  }

  .title-line-2 {
    font-weight: 400;
    font-size: 1em;
    letter-spacing: 0.25em;
  }

  main {
    padding-inline: 6em;
  }

  .search-form button {
    flex-grow: 1;
  }

  .movie-results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 901px) and (max-width: 1400px) {
  .title-container {
    min-height: 21rem;
  }

  main {
    padding-inline: 6em;
  }

  .title-line-1 {
    font-weight: 600;
    font-size: 3em;
    letter-spacing: 0.25em;
    word-spacing: 0.5em;
  }

  .title-line-2 {
    font-weight: 400;
    font-size: 1em;
    letter-spacing: 0.25em;
  }

  .movie-results-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1400px) {
  main {
    padding-inline: 15em;
  }
}

.watch-later-container {
  padding: 4rem 1rem 1rem 1rem;
  position: fixed;
  inset: 1rem;
  border-radius: var(--border-radius);
  background: rgba(26, 26, 26, 0.75);
  display: flex;
  gap: 1rem;
  flex-direction: column;
  overflow : auto;
}

.hidden {
  visibility: hidden;
}

.watch-later-section-close {
  position: absolute;
  background: url('./assets/close_white_24dp.svg');
  background-repeat: no-repeat;
  cursor: pointer;
  border: 0;
  width: 1.5rem;
  aspect-ratio: 1;
  top: 1.25rem;
  right: 1.25rem;
}
</style>
