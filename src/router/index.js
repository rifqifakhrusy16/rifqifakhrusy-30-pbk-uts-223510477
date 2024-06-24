import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// Import the components
import Todos from './components/Todos.vue'
import Posts from './components/Posts.vue'
import Albums from './components/Albums.vue'
import DetailAlbum from '../components/DetailAlbum.vue' // Import AlbumDetail.vue component

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/todos', component: Todos },
    { path: '/posts', component: Posts },
    { path: '/albums', component: Albums },
    { path: '/albums/:id', component: DetailAlbum }, // Route for AlbumDetail with dynamic segment
    { path: '/', redirect: '/todos' },
  ],
})

createApp(App).use(router).mount('#app')
