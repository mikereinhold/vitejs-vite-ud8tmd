import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';

const routes = [
  {
    path: '/:path(.*)*',
    component: Main,
    name: 'Main',
    props: route => ({
      path: route.path,
      videoId: route.query.id,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
