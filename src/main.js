import Vue from 'vue';

import '@/components';
import '@/plugins';

// Sync router with store
import { sync } from 'vuex-router-sync';

import firebase from '@/utils/firebase';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Sync store with router
sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable */

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const vm = this;
    // Set default settings for first time
    vm.$store.dispatch('settings/reset');

    firebase.auth().onAuthStateChanged((user) => { // [OK]
      vm.$store.dispatch('stateChanged', user);
    });
  },
}).$mount('#app');
