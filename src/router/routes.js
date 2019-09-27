const routes = [
  {
    path: '/signin',
    name: 'signin',
    // component: SignIn,
    component() {
      return import(/* webpackChunkName: "signin" */ '@/views/SignIn.vue');
    },
  },
  {
    path: '/signup',
    name: 'signup',
    // component: SignUp,
    component() {
      return import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue');
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // component: Dashboard,
    component() {
      return import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue');
    },
  },
  // {
  //   path: '/user',
  //   name: 'user',
  //   props: (rout) => ({uid: route.query.uid}),
  //   // component: User,
  //   component() {
  //     return import(/* webpackChunkName: "user" */ '@/views/User.vue');
  //   },
  // },
  {
    path: '/messages',
    name: 'messages',
    // component: Test,
    component() {
      return import(/* webpackChunkName: "test" */ '@/views/Messages.vue');
    },
  },
  {
    path: '/logs',
    name: 'logs',
    // component: Logs,
    component() {
      return import(/* webpackChunkName: "logs" */ '@/views/Logs.vue');
    },
  },
  {
    path: '/settings',
    name: 'settings',
    // component: settings,
    component() {
      return import(/* webpackChunkName: "settings" */ '@/views/Settings.vue');
    },
  },
];

export default routes;
