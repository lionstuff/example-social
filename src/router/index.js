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
  if (included.includes(to.name)) {
    next();
  } else if (JSON.parse(localStorage.getItem('user')).isAuthenticated) { // [OK]
    next();
  } else if (!JSON.parse(localStorage.getItem('user')).isAuthenticated || JSON.parse(localStorage.getItem('user')).isAuthenticated === null) {
    next('signin');
  }
});

export default router;
