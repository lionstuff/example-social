<template>
  <v-list
    :dark='settings.theme.dark'
    :style='settings.transparent ? `opacity: 0.9;` : ``'
    class='primary'
    dense
    ma-0
    pa-0
  >
    <v-list-tile dense :avatar='user.avatar' ma-0 pa-0>
      <v-list-tile-avatar>
        <!-- <v-avatar size=56 tile> -->
          <!-- v-if='settings.showAvatars' -->
          <!-- <v-icon v-if='settings.showAvatars'>mdi-account</v-icon> -->
          <!-- Math.round(Math.random() * 1083) -->

          <!-- <v-img :src='`https://unsplash.it/50/50?image=${user.id + 100}`'/> -->
          <v-img v-if='imgsrc' :src='imgsrc' :lazy-src='imgsrc'/>
        <!-- </v-avatar> -->
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ user.name }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script scoped>
import { mapState } from 'vuex';
export default {
  props: ['user'],
  data: () => ({
    imgsrc: '',
  }),
  computed: {
    ...mapState(['settings']),
  },
  mounted() {
    this.getUserImg(this.user);
  },
  methods: {
    getUserImg(user) {
      this.imgsrc = `https://randomuser.me/api/portraits/${Math.random() > 0.62 ? "men" : "women"}/${user.id}.jpg`;
    },
  },
};
</script>
