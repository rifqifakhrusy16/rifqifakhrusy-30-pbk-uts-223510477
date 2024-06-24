// src/main.js

import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Albums from './components/Albums.vue';
import DetailAlbum from './components/DetailAlbum.vue';
import Posts from './components/Posts.vue';
import Todos from './components/Todos.vue';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Import custom styles
import './style.css';

const pinia = createPinia();

const routes = [
  { path: '/albums', component: Albums },
  { path: '/albums/:albumId', component: DetailAlbum, props: route => ({ albumId: parseInt(route.params.albumId) }) },
  { path: '/posts', component: Posts },
  { path: '/todos', component: Todos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {},
});

myApp.use(pinia);
myApp.use(router);

myApp.mount('#app');
