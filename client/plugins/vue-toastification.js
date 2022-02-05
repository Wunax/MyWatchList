import Vue from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
  timeout: 2000,
};

Vue.use(Toast, options);
