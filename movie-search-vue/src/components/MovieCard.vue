<template>
  <div class="card p-2">
    <img :src="movie.Poster" :alt="movie.Title" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ movie.Title }}</h5>
      <p class="card-text">{{ movie.Year }}</p>
      <p class="card-text"></p>
      <button
        v-if="addToWatchLater && !isInWatchLater(movie)"
        @click="addToWatchLater(movie)"
        type="button"
        class="btn btn-primary mt-1 watch-later-button"
      >
        Watch Later
      </button>
      <button
        v-if="removeWatchLater"
        @click="removeWatchLater(movie)"
        type="button"
        class="btn btn-danger mt-1 watch-later-button"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie', 'addToWatchLater', 'isInWatchLater', 'removeWatchLater'],
};
</script>
