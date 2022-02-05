import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

export default function ({ app }, inject) {
  inject('cookies', VueCookies);
}
