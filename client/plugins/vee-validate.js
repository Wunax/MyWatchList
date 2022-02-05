import Vue from 'vue';
import {
  ValidationProvider,
  ValidationObserver,
  localize,
} from 'vee-validate/dist/vee-validate.full.esm';
import fr from 'vee-validate/dist/locale/fr.json';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

localize('fr', fr);
