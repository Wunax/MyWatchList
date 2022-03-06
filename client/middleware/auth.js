export default function ({ app, route, redirect }) {
  const loggedIn = app.$cookies.get('loggedIn') === 'true';
  if (route?.meta[0]?.notLoggedIn && loggedIn) {
    return redirect('/');
  }
  if (!loggedIn && route.name !== 'login' && route.name !== 'register') {
    return redirect('/login');
  }
}
