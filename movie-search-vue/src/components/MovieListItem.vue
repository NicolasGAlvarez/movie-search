<template>
  <div class="item">
    <img :src="movie.Poster" :alt="movie.Title" class="item-img" />
    <div class="item-body">
      <h5 class="item-title">{{ movie.Title }} ({{ movie.Year }})</h5>
      <p class="item-plot">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus at
        recusandae veritatis, natus, veniam fugiat laborum dicta consectetur
        necessitatibus debitis quo unde error, doloremque tenetur ullam odit
        illum omnis voluptas?
      </p>
      <button
        @click="removeWatchLater(movie)"
        type="button"
        class="btn btn-primary item-remove-btn"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie', 'removeWatchLater'],
};
</script>

<style>
.item {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 3fr;
  justify-items: center;
  align-items: center;
  border-radius: var(--border-radius);
  /* background: rgb(21,21,21, 0.9); */
    background: linear-gradient(
    270deg,
    rgba(21, 21, 21, 1) 75%,
    rgba(39, 39, 39, 0.05) 90%
  );
  padding: 1rem 1rem 1rem 0;
}

.item-img {
  border-radius: var(--border-radius);
  max-height: 15rem;
}

.item-body {
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  /* padding: 2rem 1rem 1.5rem 1rem; */
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.item-remove-btn {
  align-self: center;
  padding-block: 0.75rem;
  padding-inline: 1.5rem;
  margin-block: 0.5rem;
}

.item-title,
.item-plot {
  font-family: var(--ff-primary);
  font-size: 1em;
  color: white;
  margin: 0;
  /* margin-top: 0; */
  /* margin-bottom: 0.5rem; */
}
</style>
