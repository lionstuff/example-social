<template>
  <v-layout row wrap :ma-0='$vuetify.breakpoint.smAndDown'>
    <v-flex lg12 md12 sm12 xs12>

      <v-container
        :pa-0='$vuetify.breakpoint.smAndDown'
        fluid
      >

        <v-card
          :dark='settings.theme.dark'
          :style='`${$vuetify.breakpoint.smAndDown ? "border-radius: 0px;" : ""} ${settings.transparent ? "opacity: 0.9;" : ""}`'
          class='primary'
          flat
          fluid
        >
          <v-card-title secondary-title class='subheading'>
            Приложение
            <v-spacer/>
            <v-btn small :icon='$vuetify.breakpoint.smAndDown' flat @click.native='restoreSettings'>
              {{ $vuetify.breakpoint.smAndDown ? '' : 'Сбросить' }}
              <v-icon :right='!$vuetify.breakpoint.smAndDown'>mdi-backup-restore</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout row mb-2>
              <v-flex lg4 md4 sm4 xs4 xl4>
                <v-checkbox
                  :color='settings[setting] ? `light` : `primary`'
                  :key='`setting${s}`'
                  :label='["Анимация", "Прозрачность", "Отображать приветственное сообщение"][s]'
                  :value='settings[setting]'
                  v-for='(setting, s) in ["animation", "transparent", "welcomeMessage"]'
                  v-model='settings[setting]'
                />
              </v-flex>
            </v-layout>
            <v-divider/>
          </v-card-text>

          <v-card-title secondary-title class='subheading'>
            Уведомления
            <v-spacer/>
            <v-btn
              :icon='$vuetify.breakpoint.smAndDown'
              @click.native='restoreNotificationsSettings'
              flat
              small
            >
              {{ $vuetify.breakpoint.smAndDown ? '' : 'Сбросить' }}
              <v-icon :right='!$vuetify.breakpoint.smAndDown'>mdi-backup-restore</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout row mb-2>
              <v-flex lg4 md4 sm4 xs4 xl4>
                <v-checkbox
                  :color='settings.notifications[notificationSetting] ? `light` : `primary`'
                  :key='`notificationSetting${ns}`'
                  :label='["Уменьшенный размер", "Свёрнуто"][ns]'
                  :value='settings.notifications[notificationSetting]'
                  v-for='(notificationSetting, ns) in ["small", "mini"]'
                  v-model='settings.notifications[notificationSetting]'
                />
                <v-select
                  :items='[`left-top`, `right-top`, `right-bottom`, `left-bottom`]'
                  :value='settings.notifications.position'
                  @change='setPosition'
                  background-color='none'
                  class='primary'
                  color='info'
                  flat
                  hide-selected
                  label='Позиция'
                />
              </v-flex>

              <v-flex grid-list-xs>
                <v-layout
                  :align-end='settings.notifications.position === `left-bottom` || settings.notifications.position === `right-bottom`'
                  :align-start='settings.notifications.position === `left-top` || settings.notifications.position === `right-top`'
                  :justify-end='settings.notifications.position === `right-top` || settings.notifications.position === `right-bottom`'
                  :justify-start='settings.notifications.position === `left-top` || settings.notifications.position === `left-bottom`'
                  class='primary lighten-2'
                  fill-height
                  ma-1
                  pa-2
                >
                  <v-responsive
                    :height='settings.notifications.small ? settings.notifications.mini ? 20 : 46 : settings.notifications.mini ? 22 : 54'
                    :max-width='settings.notifications.small ? 56 : 72'
                    class='primary'
                  />
                </v-layout>
              </v-flex>
            </v-layout>
            <v-divider/>
          </v-card-text>

          <v-card-title secondary-title class='subheading'>
            Тема
            <v-spacer/>
            <v-btn
              :icon='$vuetify.breakpoint.smAndDown'
              @click.native='restoreTheme'
              flat
              small
            >
              {{ $vuetify.breakpoint.smAndDown ? '' : 'Сбросить' }}
              <v-icon :right='!$vuetify.breakpoint.smAndDown'>mdi-backup-restore</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout column wrap mb-2>
              <v-flex lg2 md2 sm2 xs2 xl4>
                <v-layout row>
                  <v-select
                    :items='Object.keys(themes)'
                    :value='settings.theme.name'
                    @change='setTheme'
                    background-color='none'
                    class='primary'
                    color='info'
                    flat
                    hide-selected
                    label='Название'
                  />
                  <v-checkbox
                    :color='settings.theme.dark ? `light` : `primary`'
                    :value='settings.theme.dark'
                    @change='switchTheme'
                    label='Тёмная'
                    v-model='settings.theme.dark'
                  />
                  <v-btn
                    @click.native='theme.edit = !theme.edit'
                    flat
                    icon
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-layout>
                <v-list v-if='theme.edit' class='primary'>
                  <v-list-tile
                    :key='color'
                    v-for='(color, i) in Object.keys(themes[settings.theme.name][settings.theme.dark ? "dark" : "light"])'
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ color }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action :color='color'>
                      <v-btn :color='Object.values(themes[settings.theme.name][settings.theme.dark ? "dark" : "light"])[i]'>{{ Object.values(themes[settings.theme.name][settings.theme.dark ? "dark" : "light"])[i] }}</v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
            <v-divider/>
          </v-card-text>
        </v-card>

      </v-container>
    </v-flex>
  </v-layout>
</template>

<script scoped>
import { mapState } from 'vuex';

export default {
  data: () => ({
    theme: {
      edit: false,
    },
  }),
  created() {
  },
  mounted() {
  },
  watch: {
  },
  computed: {
    ...mapState(['settings', 'themes']),
  },
  methods: {
    restoreSettings() {
      this.$store.dispatch('settings/restoreSettings');
    },
    restoreWelcomeMessageSettings() {
      this.$store.dispatch('settings/restoreWelcomeMessageSettings');
    },
    restoreNotificationsSettings() { // [OK]
      this.$store.dispatch('settings/restoreNotificationsSettings');
    },
    restoreTheme() { // [OK]
      this.$store.dispatch('settings/restoreTheme');
      this.switchTheme();
    },
    setPosition(value) { // [OK]
      this.$store.commit('settings/setNotificationsPosition', value);
    },
    setTheme(value) { // [OK]
      this.$store.commit('settings/setTheme', value);
      Object.assign(this.$vuetify.theme, this.themes[value][this.settings.theme.dark ? 'dark' : 'light']);
    },
    switchTheme() { // [OK]
      Object.assign(this.$vuetify.theme, this.themes[this.settings.theme.name][this.settings.theme.dark ? 'dark' : 'light']);
    },
  },
};
</script>
