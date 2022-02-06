export default function ({ app, route, redirect }) {
  const loggedIn = app.$cookies.get('loggedIn') === 'true';
  if (route?.meta[0]?.notLoggedIn && loggedIn) {
    return redirect('/');
  }
  if (!loggedIn && route.path !== '/login' && route.path !== '/register') {
    return redirect('/login');
  }
}
