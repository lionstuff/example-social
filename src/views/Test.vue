<template>
  <v-layout row fluid fill-height justify-end align-end>
    <!-- <v-flex xs12 sm12 md12 lg12 xl12 fluid/> -->
    <v-spacer/>
    <v-speed-dial
      :bottom='true'
      :direction='`left`'
      :open-on-hover='!$vuetify.breakpoint.smAndDown'
      :right='true'
      transition='slide-x-reverse-transition'
      v-model='fabPrime'
    >
      <template #activator>
        <v-btn
          :class='`primary`/*fabPrime ? color : `transparent`*/'
          dark
          fab
          flat
          v-model='fabPrime'
        >
          <v-icon>mdi-menu</v-icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <speed-dial
        v-for='fabItem in 4'
        :key='`sd${fabItem}`'
        :color='[`success`, `warning`, `error`, `info`][fabItem-1]'
        :icon='[`mdi-map`,`mdi-alarm`,`mdi-calendar`,`mdi-account`][fabItem-1]'
      />
    </v-speed-dial>
<!--
    <notification
      :background='settings.background'
      title=' '
      content=' '
      color='transparent'
      app
    />
 -->
  </v-layout>
</template>

<script scoped>
  import { mapState } from 'vuex';
  export default {
    data: () => ({
      fabPrime: false,
    }),
    created() {
    },
    mounted() {
    },

    watch: {
    },
    computed: {
      ...mapState(['settings']),
    },
    methods: {
    },
  };
</script>

<style scoped>
</style>
