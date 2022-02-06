export const state = () => ({
  movies: [],
});

export const actions = {
  async fetchMovies({ commit }) {
    const res = await this.$axios.get(`/movies?lang=${this.$i18n.locale}`);
    commit('setMovies', res.data);
  },
};

export const mutations = {
  setMovies(state, movies) {
    state.movies = movies;
  },
  removeMovie(state, movieId) {
    state.movies = state.movies.filter((movie) => movie.idTmdb !== movieId);
  },
  setSeen(state, payload) {
    const movie = state.movies.find(
      (movie) => movie.idTmdb === payload.movieId
    );
    movie.seen = payload.seen;
  },
  addMovie(state, movie) {
    state.movies.push(movie);
  },
};
