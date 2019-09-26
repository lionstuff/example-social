<template>
  <v-container fluid>
    <v-layout
      :ma-0='$vuetify.breakpoint.smAndDown'
      :ma-3='$vuetify.breakpoint.mdAndUp'
      :style='settings.transparent ? `opacity: 0.9;` : ``'
      :class='["primary", !$vuetify.breakpoint.smAndDown ? "card" : ""]'
      column
      fluid
      pa-3
    >
      <v-flex fluid>
        <v-layout row fluid>
          <v-spacer/>
          <v-btn flat small round class='warning'>Очистить</v-btn>
          <v-btn flat small round @click='expand(false)'>Развернуть все</v-btn>
          <v-btn flat small round @click='expand'>Свернуть все</v-btn>
        </v-layout>
        <v-slide-x-transition
          group
          key='logTransition'
          mode='in-out'
        >
          <timeline
            :dark='settings.theme.dark'
            :items='item'
            :key='`logItem${i}`'
            ref='logItem'
            v-for='(item, i) in getValuesReverse'
          >
          </timeline>
        </v-slide-x-transition>
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
      ...mapState(['settings', 'log']),
      getValuesReverse() {
        return Object.values(this.log).reverse();
      },
    },
    methods: {
      expand(val = true) {
        this.$refs.logItem.forEach(item => {
          item.fold = val;
        });
      },
    },
  };
</script>
