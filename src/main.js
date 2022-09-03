import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCryptojs from 'vue-cryptojs'

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

// createApp(App).use(BootstrapVue);

createApp(App).use(router).use(store).use(VueCryptojs).mount('#app')

import 'bootstrap/dist/js/bootstrap.js';
