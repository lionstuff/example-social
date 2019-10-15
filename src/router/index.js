import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

const included = ['signin', 'signup'];

router.beforeEach((to, from, next) => {
  const uid = JSON.parse(localStorage.getItem('user')).uid || null;
  if (!uid && included.includes(to.name)) {
    next(); // [OK]
  } else if (uid) {
    next(); // [OK]
  } else {
    next('/signin'); // [OK]
  }
});

export default router;
