// main.js or main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/todos', component: Todos }, // Tentukan path dan komponen sesuai kebutuhan
    { path: '/posts', component: Posts },
    { path: '/albums', component: Albums }, // Path untuk halaman album foto
    { path: '/', redirect: '/todos' }, // Redirect default ke todos atau halaman lainnya
  ],
})

createApp(App).use(router).mount('#app')
