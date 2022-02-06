<template>
  <div class="bg-gray-100 h-full">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <div class="w-full mb-6">
        <h1 class="text-2xl mb-2 font-semibold">{{ $t('movies.search') }}</h1>
        <SearchBar @clearSearch="clearSearch" @search="search"></SearchBar>
      </div>
      <div v-if="searchText" class="w-full">
        <h1 class="text-2xl mb-2 font-semibold">
          {{ $t('movies.results', { search: searchText }) }}
        </h1>
        <MovieCard
          v-for="movie in searchMovies"
          :key="movie.id"
          :id-tmdb="movie.id"
          :release-date="movie.release_date"
          :title="movie.title"
          :description="movie.overview"
          :poster-path="movie.poster_path"
          class="mb-4"
        ></MovieCard>
      </div>
      <div v-else class="w-full">
        <h1 class="text-2xl mb-2 font-semibold">{{ $t('movies.popular') }}</h1>
        <MovieCard
          v-for="movie in popularsMovies"
          :key="movie.id"
          :id-tmdb="movie.id"
          :release-date="movie.release_date"
          :title="movie.title"
          :description="movie.overview"
          :poster-path="movie.poster_path"
          class="mb-4"
        ></MovieCard>
      </div>
    </div>
    <InfiniteLoading
      ref="infiniteLoading"
      @infinite="infiniteHandler"
    ></InfiniteLoading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
export default {
  components: {
    InfiniteLoading,
  },
  layout: 'home',
  data() {
    return {
      popularsMovies: [],
      popularsPage: 1,
      searchMovies: [],
      searchPage: 1,
      searchText: null,
    };
  },
  methods: {
    async infiniteHandler($state) {
      try {
        if (this.searchText) {
          await this.fetchSearchMovies($state);
        } else {
          await this.fetchPopularsMovies($state);
        }
      } catch (err) {
        this.$toast.error(this.$t('errors.internalError'));
      }
    },
    async fetchSearchMovies($state) {
      const res = await this.$axios.post(
        `/movies/search?page=${this.searchPage}&lang=${this.$i18n.locale}`,
        { search: this.searchText }
      );
      const results = res.data.results;
      if (results.length) {
        this.searchMovies.push(...results);
        this.searchPage += 1;
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async fetchPopularsMovies($state) {
      const res = await this.$axios.get(
        `/movies/populars?page=${this.popularsPage}&lang=${this.$i18n.locale}`
      );
      const results = res.data.results;
      if (results.length) {
        this.popularsMovies.push(...results);
        this.popularsPage += 1;
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    search(text) {
      if (this.searchText !== text) {
        this.searchText = text;
        this.searchMovies = [];
        this.searchPage = 1;
        this.$refs.infiniteLoading.stateChanger.reset();
      }
    },
    clearSearch() {
      this.searchText = null;
      this.searchMovies = [];
      this.searchPage = 1;
    },
  },
};
</script>

<style>
body {
  @apply bg-gray-100;
}
</style>
