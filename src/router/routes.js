const routes = [
  {
    path: '/signin',
    name: 'signin',
    // component: SignIn,
    component: () => import(/* webpackChunkName: "signin" */ '@/views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    // component: SignUp,
    component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // component: Dashboard,
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
  },
  {
    path: '/messages',
    name: 'messages',
    // component: Messages,
    component: () => import(/* webpackChunkName: "Messages" */ '@/views/Messages.vue'),
  },
  {
    path: '/logs',
    name: 'logs',
    // component: Logs,
    component: () => import(/* webpackChunkName: "logs" */ '@/views/Logs.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    // component: settings,
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
  },
];

export default routes;
