<template>
  <v-layout
    :ma-0='$vuetify.breakpoint.smAndDown'
    :ma-3='$vuetify.breakpoint.mdAndUp'
    :wrap='$vuetify.breakpoint.smAndDown'
    fluid
    justify-space-around
    column
    pa-0
    ma-1
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
            {{ Math.random() > 0.62 ? posts[user.id].title : posts[user.id].body }}
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
</template>

<script scoped>
  import { mapState } from 'vuex';
  export default {
    beforeRouteEnter(to, from, next) {
      next(async vm => {
        await !vm.users.length ? vm.$store.dispatch('getUsers') : null;
        await !vm.posts.length ? vm.$store.dispatch('getPosts') : null;
      });
    },
    data: () => ({
    }),
    created() {
    },
    mounted() {
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
      getPost() {
        return this.posts[Math.round(Math.random() * this.posts.length)].title;
      },
    },
  };
</script>

<style scoped>
</style>
