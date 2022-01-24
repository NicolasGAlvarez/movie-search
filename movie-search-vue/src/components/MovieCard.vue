<template>
  <div class="card">
    <img :src="movie.Poster" :alt="movie.Title" class="card-img" />
    <div class="card-body">
      <h5 class="card-title">{{ movie.Title }}</h5>
      <p class="card-text">{{ movie.Year }}</p>
      <button
        v-if="!isInWatchLater(movie)"
        @click="addToWatchLater(movie)"
        type="button"
        class="btn btn-primary"
      >
        Watch Later
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie', 'addToWatchLater', 'isInWatchLater'],
};
</script>

<style>
.card {
  box-shadow: 2.5rem 3.75rem 3rem -3rem rgb(21, 21, 21, 0.25);
  display: grid;
}

.card > * {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.card-img {
  border-radius: var(--border-radius);
  width: 100%;
  aspect-ratio: 1 / 1.5;
  object-fit: cover;
}

.card-body {
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  background: linear-gradient(
    0deg,
    rgba(21, 21, 21, 0.8) 75%,
    rgba(255, 255, 255, 0.01) 100%
  );
  align-self: end;
  padding: 2em 1em 1.5em 1em;
  display: flex;
  flex-direction: column;
}

.card-title,
.card-text {
  font-family: var(--ff-primary);
  font-size: 1em;
  color: white;
  margin-top: 0;
  margin-bottom: .5em;
}
</style>
