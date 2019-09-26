<template>
  <v-footer class="primary" app height="auto">
    <v-layout row wrap justify-center>
      <v-btn>Home</v-btn>
      <v-btn>About Us</v-btn>
      <v-btn>Team</v-btn>
      <v-btn>Services</v-btn>
      <v-btn>Blog</v-btn>
      <v-btn>Contact Us</v-btn>
      <v-flex xs12 py-3 text-xs-center accent--text>
        &copy; {{ new Date().getFullYear() }} Company
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script scoped>
  'use strict';
  export default {
    data: () => ({
    }),
    created() {
    },
    mounted() {
    },
    watch: {
    },
    computed: {
    },
    methods: {
    },
  };
</script>

<style scoped>
</style>
