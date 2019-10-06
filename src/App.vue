<template>
  <v-app :dark='settings.theme.dark'>
    <!-- #BEGIN BACKGROUND -->
    <v-img
      :lazy-src='settings.background'
      :src='settings.background'
      class='primary img'
      height='100vh'
      v-once
      width='100vw'
    />
    <!-- #END BACKGROUND -->

    <!-- #BEGIN NAVIGATION -->
    <toolbar :menu='menu' v-if='true/*isAuthenticated*/'/>
    <navigation-drawer v-if='isAuthenticated' :menu='menu' fixed/>
    <!-- #END NAVIGATION -->

    <v-content>
      <v-fade-transition mode='out-in'>
        <keep-alive>
          <router-view :background='settings.background' class='v-responsive__content'/>
        </keep-alive>
      </v-fade-transition>

      <!-- #BEGIN NOTIFICATIONS -->
      <notifications/>
      <!-- #END NOTIFICATION -->
    </v-content>

    <!-- #BEGIN FOOTER -->
    <!-- <ui-footer/> -->
    <!-- #END FOOTER -->

  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    menu: {
      // Struct:
      //   [
      //     [{},{},{},..{}],
      //     [{},{},{},..{}],
      //     ...
      //     [{},{},{},..{}],
      //   ]
      type: Array,
      default() {
        return [
          [
            {
              icon: 'mdi-home',
              title: 'Главная',
              to: 'dashboard',
            },
            {
              icon: 'mdi-card-text',
              title: 'Сообщения',
              to: 'messages',
            },
            {
              icon: 'mdi-calendar-today',
              title: 'События',
              to: 'events',
            },
          ],
          [
            {
              icon: 'mdi-information',
              title: 'Логи',
              to: 'logs',
            },
            {
              icon: 'mdi-settings',
              title: 'Параметры',
              to: 'settings',
            },
          ],
          [
            {
              icon: 'mdi-help-circle',
              title: 'Помощь',
              to: 'help',
            },
          ],
        ];
      },
    },
  },
  data: () => ({
  }),
  created() {
  },
  mounted() { // [OK]
    /** @description
     *  Reset and apply default theme
     */
    // this.$store.dispatch('settings/restoreTheme'); // [OK]
    Object.assign(this.$vuetify.theme, this.themes[this.settings.theme.name][this.settings.theme.dark ? 'dark' : 'light']); // [OK]

    /** @description
     *  Get log
     */
    this.$store.dispatch('log/get'); // [OK]
  },
  watch: {
    isAuthenticated(val) {
      if (val) {
        /** @description Prepare item for add to log
         *  @author https://github.com/lionstuff
         */
        const device = window.navigator.platform.toString().toLowerCase().search('win') > -1 ? 'Windows' : window.navigator.platform.toString().toLowerCase().search('android') ? 'Android' : window.navigator.platform.toString().toLowerCase().search('linux') ? 'Linux' : 'MacOS';
        const logItem = {
          description: `Выполнен вход с устройства ${device}, IP: ${window.location.hostname}`,
          meta: 'login',
          status: 'active', // 'done', 'none'
          tickets: [
            {
              icon: 'mdi-account',
              title: 'Вы',
              type: 'user', // 'admin', 'user', 'action', 'event', 'task', 'text'
              to: 'user',
              params: this.user.uid,
            },
            {
              title: 'Вход',
              type: 'event', // 'admin', 'user', 'action', 'event', 'task', 'text'
            },
          ],
          timestamp: Date.now(),
          type: 'action',
        };
        this.$store.dispatch('log/add', logItem)
          .then(() => {
            this.$store.dispatch('log/set', this.log)
              .then(() => {
                this.$store.dispatch('log/get');
          });
        });
      }
    },
  },
  methods: {
    // function setDarkThemeState({sunset, sunrise}) {
    //   /// suncalc
    //   const now = new Date();
    //   const toMinutes = (d) => {
    //     d.getHours() * 60 + d.getMinutes();
    //     if (toMinutes(now) <= toMinutes(sunrise) || toMinutes(now) >= toMinutes(sunset)) {
    //       setDarkheme();
    //     } else {
    //       setLightTheme();
    //     }
    //   }
    // };
  },
  computed: {
    ...mapState(['log', 'settings', 'themes', 'user']),
    /** @name isAuthenticated
     *  @description Check for user is authenticated
     *  @param none
     */
    isAuthenticated() { // [OK]
      return this.user.uid;
    },
  },
};
</script>

<style>
/* DO NOT EDIT */
html,
body {
  cursor: default !important;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  overscroll-behavior: none;
  scroll-behavior: smooth;
  text-shadow: none;
  width: 100%;
}
/* DO NOT EDIT */
.v-responsive__content {
  /* padding: 0px; */
  position: relative;
  /*scroll-behavior: smooth;*/
  z-index: 1;
}

a {
  text-decoration: none !important;
}
.v-card {
  border-radius: 6px;
}
.img {
  position: fixed;
  object-fit: cover;
  overflow: hidden;
  z-index: 1;
}
</style>
