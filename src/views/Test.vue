<template>
  <v-container grid-list-md :pa-0='$vuetify.breakpoint.smAndDown' fluid>
    <v-layout
      :ma-0='$vuetify.breakpoint.smAndDown'
      :ma-3='$vuetify.breakpoint.mdAndUp'
      :wrap='$vuetify.breakpoint.smAndDown'
      fluid
      justify-space-around
      row
    >
      <v-flex fluid>
        <v-layout justify-center fluid :pa-1='!$vuetify.breakpoint.smAndDown' column no-wrap fixed>
          <!-- MENU -->
          <!-- <navigation-drawer v-if='isAuthenticated' :menu='menu'/> -->
          <!-- <navigation-drawer :defaults='defaults' :menu='menu'/> -->
          <v-navigation-drawer permanent floating relative sticky>
            <v-list class="pt-0">
              <v-list-tile v-for="item in 5" :key="`item${item}`" @click="">
                <v-list-tile-action>
                  <v-icon>mdi-circle</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>item #{{ item }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-layout>
      </v-flex>

      <v-layout
        :ma-0='$vuetify.breakpoint.smAndDown'
        :ma-3='$vuetify.breakpoint.mdAndUp'
        :wrap='$vuetify.breakpoint.smAndDown'
        fluid
        justify-space-around
        column
      >
        <v-flex
          v-for='user in users'
          :key='user.id'
        >
          <v-card
            :class='["primary", !$vuetify.breakpoint.smAndDown ? "card" : ""]'
            :dark='settings.theme.dark'
            :style='`${$vuetify.breakpoint.smAndDown ? "border-radius: 0px;" : ""} ${settings.transparent ? "opacity: 0.9;" : ""}`'
            fluid
          >
            <v-layout row fluid fill-height justify-center align-center ma-0 pa-2>
              <v-avatar
                size='72'
                color='none'
              >
                <v-img :src='getUserImg(user.id)' alt='user avatar'/>
              </v-avatar>
              <v-card-text>
                {{ Math.random() > 0.62 ? tasks[user.id].title : tasks[user.id].body }}
              </v-card-text>
              <v-spacer/>
              <v-btn
                fab
                flat
                small
                v-for='icon in ["mdi-dots-horizontal", "mdi-pencil"]'
                :key='icon'
                @click.stop=''
              >
                <v-icon>
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script scoped>
  import { mapState } from 'vuex';
  export default {
    props: ['menu'],
    data: () => ({
      defaults: { permanent: true, floating: true},
    }),
    created() {
    },
    mounted() {
      this.$store.dispatch('getUsers');
      this.$store.dispatch('getTasks');
    },
    watch: {
    },
    computed: {
      ...mapState('app', ['users', 'tasks']),
      ...mapState(['settings', 'user']),
    },
    methods: {
      getUserImg(id) {
        return `https://randomuser.me/api/portraits/${Math.random() > 0.62 ? "men" : "women"}/${id}.jpg`;
      },
      getPost() {
        return this.tasks[Math.round(Math.random() * this.tasks.length)].title;
      },
    },
  };
</script>

<style scoped>
</style>
