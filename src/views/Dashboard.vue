<template>
  <!-- <v-container grid-list-md :pa-0='$vuetify.breakpoint.smAndDown' fluid> -->
    <!-- <v-layout
      :ma-0='$vuetify.breakpoint.smAndDown'
      :ma-3='$vuetify.breakpoint.mdAndUp'
      :wrap='$vuetify.breakpoint.smAndDown'
      fluid
      justify-space-around
      row
    > -->
      <!-- <v-flex fluid :pa-0='$vuetify.breakpoint.smAndDown' xs12 sm12 md12 lg12 xl12> -->
        <!-- <v-layout justify-space-between fluid pa-0 column> -->
            <!-- v-once -->
      <v-layout
        :ma-0='$vuetify.breakpoint.smAndDown'
        :ma-3='$vuetify.breakpoint.mdAndUp'
        :wrap='$vuetify.breakpoint.smAndDown'
        fluid
        justify-space-around
        column
        pa-0
        ma-1
        :pa-1='!$vuetify.breakpoint.smAndDown'
      >
        <v-flex
          v-for='post in posts'
          :key='`post${post.id}`'
        >
          <!-- <v-layout
            fluid
            fill-height
            ma-0
          > -->
            <v-card
              :class='["primary", !$vuetify.breakpoint.smAndDown ? "card" : ""]'
              :dark='settings.theme.dark'
              :style='`${$vuetify.breakpoint.smAndDown ? "border-radius: 0px;" : ""} ${settings.transparent ? "opacity: 0.9;" : ""}`'
              tile
            >
              <v-layout column fluid fill-height ma-0 pa-2>
                <v-list dense shrink>
                  <v-list-tile avatar @click="">
                    <v-list-tile-avatar>
                      <v-avatar
                        size='54'
                        color='none'
                        pa-1
                      >
                        <v-img :src='getUserImg(Math.round(Math.random() * users.length))' alt='user avatar'/>
                      </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="getPost('title')"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer/>
                    <v-list-tile-action>
                      <v-btn fab flat small>
                        <v-icon color="primary">mdi-plus</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-card-text fluid>
                  {{ getPost('body') }}
                </v-card-text>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <!-- </v-layout> -->

      <!-- </v-flex> -->
    <!-- </v-layout> -->
  <!-- </v-container> -->
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
