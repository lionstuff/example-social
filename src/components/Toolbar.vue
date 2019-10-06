<template>
    <!-- :scroll-threshold='50' -->
    <!-- scroll-off-screen -->
  <v-toolbar
    :dark='settings.theme.dark'
    :flat='$vuetify.breakpoint.smAndDown'
    :style='settings.transparent ? `opacity: 0.9;` : ``'
    :clipped-left='true'
    fixed
    app
    class='primary'
    fluid
  >
    <!-- <v-toolbar-side-icon @click.stop='toggleDrawer' v-if='isAuthenticated'/> -->
    <v-btn
      :class='`${settings.theme.dark ? "light" : "dark"}--text`'
      :large='!$vuetify.breakpoint.smAndDown'
      @click.stop='toggleDrawer'
      icon
      v-if='isAuthenticated && $vuetify.breakpoint.smAndDown'
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title
      :class='[$vuetify.breakpoint.smAndDown ? "subheading" : "title"]'
      v-if='isAuthenticated'
    >
      {{ title }}
    </v-toolbar-title>
    <v-layout
      align-center
      fluid
      justify-end
      row
      v-if='isAuthenticated'
    >
      <v-flex fluid xl8 lg6 md6 sm6 xs5 mt-2>
        <v-text-field
          :background-color='color === "accent" ? "none" : color'
          :class='[$vuetify.breakpoint.smAndDown ? "subheading" : "title"]'
          :color='color'
          @input='hasResult'
          id='search'
          name='search'
          placeholder='Найти...'
          fill-width
          ref='search'
          flat
          solo
          type='text'
          v-model='search'
        >
          <template #append>
            <v-btn
              :class='`${settings.theme.dark ? "light" : "dark"}--text`'
              :dark='settings.theme.dark'
              @click='hasResult'
              icon
            >
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-flex>
      <v-flex fluid shrink>
        <v-menu offset-y transition='slide-y-transition'>
          <template #activator='{ on }'>
            <v-btn
              :class='`${settings.theme.dark ? "light" : "dark"}--text`'
              :dark='settings.theme.dark'
              :large='!$vuetify.breakpoint.smAndDown'
              icon
              v-on='on'
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list
            class='primary v-card tile card'
            :style='settings.transparent ? `opacity: 0.9;` : ``'
          >
            <v-list-tile
              v-for='item in 5'
              :key='`item${item}`'
            >
              <v-list-tile-title>Menu item {{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout fluid v-else row justify-end align-center>
      <v-btn
        :class='`${settings.theme.dark ? "light" : "dark"}--text`'
        :key='`btn${b}`'
        :to='["signin", "signup"][b]'
        flat
        v-for='(btn, b) in ["Войти", "Регистрация"]'
      >
        {{ btn }}
      </v-btn>
    </v-layout>
  </v-toolbar>
</template>

<script scoped>
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['menu'],
  data: () => ({
    color: 'accent', // 'info lighten-2',
    search: '',
    result: null,
    title: '',
  }),
  watch: {
    '$route' (to, from, next) {
      this.getPageTitle;
    },
  },
  mounted() {
    this.getPageTitle;
  },
  computed: {
    ...mapState(['settings', 'user']),
    isAuthenticated() { // [OK]
      return this.user.uid;
    },
    getPageTitle() {
      Object.values(this.menu).forEach((key, i) => {
        Object.values(this.menu[i]).forEach((item, n) => {
          if (item.to === this.$route.name) {
            this.title = item.title;
          }
        });
      });
    },
  },
  methods: {
    ...mapMutations('app', ['toggleDrawer']),
    hasResult() {
      this.color = (this.search !== '' ? (/[!\b-\w|\.\w]+@[!\b-\w]+\.[!\b-\w]+/g.test(this.search) ? 'success' : 'error') : 'accent');
      // return this.color;
    },
  },
};
</script>
