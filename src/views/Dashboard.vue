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
      <v-flex fluid :pa-0='$vuetify.breakpoint.smAndDown'>
        <v-layout justify-space-between fluid pa-1 column>
          <v-layout
            justify-space-between
            fluid
            :pa-1='!$vuetify.breakpoint.smAndDown'
            v-for='card in 3'
            :key='`card${card}`'
            fill-height
          >
            <v-card
              :class='["primary", !$vuetify.breakpoint.smAndDown ? "card" : ""]'
              :dark='settings.theme.dark'
              :style='`${$vuetify.breakpoint.smAndDown ? "border-radius: 0px;" : ""} ${settings.transparent ? "opacity: 0.9;" : ""}`'
              tile
            >
              <v-card-text fluid v-for='text in 3' :key='`cardtext${text}`'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>
            </v-card>
          </v-layout>
        </v-layout>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script scoped>
import { mapState } from 'vuex';

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
    ...mapState(['settings', 'user']),
  },
  methods: {
  },
};
</script>

<style scoped>
html, body {
  height: 100% !important;
  width: 100% !important;
}
</style>
