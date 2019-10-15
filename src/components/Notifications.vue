<template>
  <v-layout fluid>
    <v-layout v-for='(type, n) in Object.keys(notifications)' :key='type' column wrap fluid>
      <notification
        :app='notification.app || true'
        :avatar='notification.avatar || false'
        :background='notification.background || settings.notifications.background ? settings.background : false'
        :border='notification.border || settings.notifications.border'
        :cancel='notification.cancel'
        :color='notification.color || [`primary`, `info`, `success`, `warning`, `error`][n]'
        :confirm='notification.confirm'
        :content='notification.content'
        :dark='settings.theme.dark'
        :icon='notification.icon || [`mdi-information-outline`, `mdi-information`, `mdi-check-circle`, `mdi-alert-circle`, `mdi-alert`][n]'
        :key='`${type}${i}`'
        :mini='notification.mini || settings.notifications.mini'
        :position='notification.position || settings.notifications.position'
        :small='notification.small || settings.notifications.small'
        :subtitle='notification.subtitle'
        :timeout='notification.timeout === 0 ? notification.timeout : notification.timeout || settings.notifications.timeout'
        :title='notification.title'
        @onCancel='!!notification.onCancel ? notification.onCancel() : () => {``}; onClick({type: type, id: notification.id});'
        @onConfirm='!!notification.onConfirm ? notification.onConfirm() : () => {``}; onClick({type: type, id: notification.id});'
        v-for='(notification, i) in notifications[type]'
      />
    </v-layout>
  </v-layout>
</template>

<script scoped>
import { mapState } from 'vuex';

export default {
  // watch: {
  //   isAuthenticated(val) { // [OK]
  //     if (val) {
  //       if (this.settings.welcomeMessage) {
  //         //
  //       }
  //     }
  //   },
  // },
  computed: {
    ...mapState(['settings', /*'user', */'notifications']),
    // isAuthenticated() { // [OK]
    //   return this.user.uid;
    // },
  },
  methods: {
    onClick(payload) { // [OK]
      this.$store.dispatch('notifications/reset', payload);
    },
  },
};
</script>
