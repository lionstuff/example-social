/* eslint-disable */

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  options: {
    customProperties: true,
  },
});
