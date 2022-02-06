<template>
  <div class="bg-gray-100 h-full">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <div class="w-full">
        <h1 class="text-2xl mb-2 font-semibold">{{ $t('watchlist.title') }}</h1>
        <MovieCard
          v-for="movie in movies"
          :key="movie.idTmdb"
          :id-tmdb="movie.idTmdb"
          :release-date="movie.dataTmdb.release_date"
          :title="movie.dataTmdb.title"
          :description="movie.dataTmdb.overview"
          :poster-path="movie.dataTmdb.poster_path"
          class="mb-4"
        ></MovieCard>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Watchlist',
  computed: {
    movies() {
      return this.$store.state.user.movies.filter(
        (movie) => movie.seen === false
      );
    },
  },
};
</script>

<style>
body {
  @apply bg-gray-100;
}
</style>
