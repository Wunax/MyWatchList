export default async function ({ app, store }) {
  const loggedIn = app.$cookies.get('loggedIn') === 'true';
  if (loggedIn) {
    await store.dispatch('user/fetchMovies');
  }
}
