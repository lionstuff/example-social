<template>
  <v-layout
    :ma-0='$vuetify.breakpoint.smAndDown'
    :ma-3='$vuetify.breakpoint.mdAndUp'
    :pa-1='!$vuetify.breakpoint.smAndDown'
    :wrap='$vuetify.breakpoint.smAndDown'
    column
    fluid
    justify-space-around
    v-if='posts.length'
  >
    <v-flex
      xs12
      fluid
      v-for='post in posts'
      :key='`post${post.id}`'
      :ma-1='true'
    >
      <v-card
        :class='["primary", !$vuetify.breakpoint.smAndDown ? "card" : ""]'
        :dark='settings.theme.dark'
        :style='`${$vuetify.breakpoint.smAndDown ? "border-radius: 0px;" : ""} ${settings.transparent ? "opacity: 0.9;" : ""}`'
        tile
        ma-0
        pa-0
      >
        <v-layout column fluid fill-height ma-0 pa-2>
          <v-list dense>
            <v-list-tile avatar @click="">
              <v-list-tile-avatar ma-0 pa-2>
                <v-avatar
                  size='54'
                  color='none'
                >
                  <v-img :src='getUserImg(Math.round(Math.random() * users.length))' alt='user avatar'/>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-text="getPost('title')"></v-list-tile-title>
              </v-list-tile-content>
              <v-spacer/>
              <v-list-tile-action>
                <v-btn fab flat small :dark='settings.theme.dark'>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-card-text fluid>
            {{ getPost('body') }}
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
              <v-btn
                :dark='settings.theme.dark'
                :key='`postbtn ${btn}`'
                fab
                flat
                small
                v-for='btn in ["mdi-reply", "mdi-heart"]'
              >
                <v-icon>{{ btn }}</v-icon>
              </v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script scoped>
import { mapState } from 'vuex';

export default {
  data: () => ({
  }),
  created() {
  },
  async mounted() {
    await this.$store.dispatch('getUsers');
    await this.$store.dispatch('getPosts');
  },
  watch: {
  },
  computed: {
    ...mapState('app', ['users', 'posts']),
    ...mapState(['settings', 'user']),
  },
  methods: {
    getUserImg(id) {
      return `https://randomuser.me/api/portraits/${Math.random() > 0.62 ? "men" : "women"}/${id}.jpg`;
    },
    getPost(value) {
      return this.posts[Math.round(Math.random() * this.posts.length)][value];
    },
  },
};
</script>

<style scoped>
html, body {
  height: 100% !important;
  width: 100% !important;
}
</style>
