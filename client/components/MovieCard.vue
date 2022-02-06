<template>
  <div class="w-full bg-white rounded-lg p-2">
    <div class="flex">
      <div class="flex flex-shrink-0">
        <img class="poster" :src="imgUrl" alt="poster" />
      </div>
      <div class="flex flex-col ml-5">
        <h1 class="text-xl font-semibold justify-self-start flex-1">
          {{ title }}<span class="ml-2 text-gray-400">({{ getYear }})</span>
        </h1>
        <p class="justify-self-center flex-1">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <template v-if="!movieExist">
        <button
          class="border border-primary py-1 px-3 focus:outline-none rounded mr-4 hover:bg-primary hover:text-white"
          @click="addMovie(false)"
        >
          {{ $t('movieCard.addWatchlist') }}
        </button>
        <button
          class="border border-primary py-1 px-3 focus:outline-none rounded hover:bg-primary hover:text-white"
          @click="addMovie(true)"
        >
          {{ $t('movieCard.movieSeen') }}
        </button>
      </template>
      <template v-else>
        <template v-if="isInWatchlist">
          <button
            class="border border-red-500 py-1 px-3 focus:outline-none rounded mr-4 hover:bg-red-500 hover:text-white"
            @click="removeMovie"
          >
            {{ $t('movieCard.removeWatchlist') }}
          </button>
          <button
            class="border border-primary py-1 px-3 focus:outline-none rounded hover:bg-primary hover:text-white"
            @click="updateSeen(true)"
          >
            {{ $t('movieCard.movieSeen') }}
          </button>
        </template>
        <template v-else>
          <button
            class="border border-red-500 py-1 px-3 focus:outline-none rounded hover:bg-red-500 hover:text-white"
            @click="removeMovie"
          >
            {{ $t('movieCard.removeMovie') }}
          </button>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    idTmdb: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    posterPath: { type: String, required: true },
    releaseDate: { type: String, required: true },
  },
  computed: {
    getYear() {
      return this.releaseDate.substring(0, 4);
    },
    imgUrl() {
      return `https://image.tmdb.org/t/p/w500${this.posterPath}`;
    },
    movieExist() {
      return this.$store.state.user.movies.some(
        (movie) => movie.idTmdb === this.idTmdb
      );
    },
    isInWatchlist() {
      return this.$store.state.user.movies.some(
        (movie) => movie.idTmdb === this.idTmdb && movie.seen === false
      );
    },
    id() {
      return this.$store.state.user.movies.find(
        (movie) => movie.idTmdb === this.idTmdb
      )._id;
    },
  },
  methods: {
    async addMovie(seen) {
      const res = await this.$axios.post(`/movies?lang=${this.$i18n.locale}`, {
        idTmdb: this.idTmdb,
        seen,
      });
      await this.$store.commit('user/addMovie', res.data);
    },
    async removeMovie() {
      await this.$axios.delete(`/movies/${this.id}`);
      await this.$store.commit('user/removeMovie', this.idTmdb);
    },
    async updateSeen(seen) {
      await this.$axios.patch(`/movies/${this.id}`, { seen });
      await this.$store.commit('user/setSeen', { movieId: this.idTmdb, seen });
    },
  },
};
</script>

<style scoped>
.poster {
  max-height: 200px;
  width: 100%;
}
</style>
