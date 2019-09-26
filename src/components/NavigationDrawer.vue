<template>
  <!-- <v-layout class='fluid column fill-height ma-0 pa-0'> -->
    <v-navigation-drawer
      :style='settings.transparent ? `opacity: 0.9;` : ``'
      :app='main'
      :dark='settings.theme.dark'
      :absolute='getDefaults.absolute || false'
      :floating='getDefaults.floating || false'
      :permanent='getDefaults.permanent || false/*!$vuetify.breakpoint.smAndDown*/'
      :temporary='getDefaults.temporary || true/*$vuetify.breakpoint.smAndDoown*/'
      class='primary v-navigation-drawer'
      v-model='drawer'
    >
      <!-- #BEGIN USER PROFILE SECTION -->
        <!-- app -->
      <v-card
        :dark='settings.theme.dark'
        class='primary'
        flat
        fluid
        height='38vh'
        style='border-radius: 0px;'
        tile
      >

        <v-img
          :lazy-src='user.photoURL || user.wallpaper'
          :src='user.photoURL || user.wallpaper'
          @click.stop='user.edit = !user.edit'
          class='primary lighten-1 light--text'
          height='100%'
          v-if='user.photoURL || user.wallpaper'
          width='100%'
        >
          <v-layout
            column
            fill-height
            fluid
            ma-0
            pa-0
          >
            <v-spacer v-if='!user.edit'/>

            <!-- /* #END ACCOUNT EDIT SECTION */ -->
            <v-slide-y-reverse-transition mode='out-in' key='userCard'>
              <v-layout v-if='!user.edit' shrink column wrap fluid>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title class='title'>
                      {{ user.displayName }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title
                      class='body-2 font-condensed text-truncate primary--text text--lighten-3'
                    >
                      {{ user.email }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-layout>
            </v-slide-y-reverse-transition>

            <!-- DIALOG -->

            <!-- /* #BEGIN ACCOUNT EDIT SECTION */ -->
            <v-slide-y-reverse-transition
              key='tooltip'
              mode='in-out'
            >
              <v-layout
                :style='`background-color: ${themes[settings.theme.name][settings.theme.dark ? "dark" : "light"].primary}80`'
                align-end
                fill-height
                fluid
                justify-center
                row
                v-if='user.edit'
              >
                <v-tooltip
                  :absolute='false'
                  :class='`${settings.theme.dark ? "light" : "dark"}--text ma-0 pa-0`'
                  :dark='settings.theme.dark'
                  :fixed='true'
                  :key='`tooltip${i}`'
                  :lazy='true'
                  :top='true'
                  :transition='`slide-y-transition`'
                  mode='in-out'
                  v-for='(btn, i) in [
                    { icon: `mdi-pencil`, tooltip: `Переименовать`, click: () => {user.methods.edit.name = true; user.edit = false; drawer = false;}, },
                    { icon: `mdi-camera`, tooltip: `Фото` },
                    { icon: `mdi-logout`, tooltip: `Выйти`, click: () => {user.edit = false; drawer = false; signout();} },
                  ]'
                  v-model='tooltip'
                >

                  <template #activator='{ on }'>
                      <!-- :large='btn.icon === `mdi-camera`' -->
                      <!-- v-on='on' -->
                    <v-btn
                      :class='`${settings.theme.dark ? "light" : "dark"}--text`'
                      :dark='settings.theme.dark'
                      :small='btn.icon !== `mdi-camera`'
                      @click.stop='btn.click'
                      fab
                    >
                      <v-icon>{{ btn.icon }}</v-icon>
                    </v-btn>
                  </template>

                  <span>{{ btn.tooltip }}</span>

                </v-tooltip>
              </v-layout>
            </v-slide-y-reverse-transition>

          </v-layout>
        </v-img>

        <v-dialog
          :fullscreen='$vuetify.breakpoint.smAndDown'
          v-if='user.methods.edit.name'
          v-model='user.methods.edit.name'
          width='62vw'
        >
          <v-card
            :class='["primary", !$vuetify.breakpoint.smAndDown ? "card" : ""]'
            :dark='settings.theme.dark'
            :style='`${$vuetify.breakpoint.smAndDown ? "border-radius: 0px;" : ""} ${settings.transparent ? "opacity: 0.9;" : ""}`'
            @keyup.enter='updateUserInfo()/*user.methods.edit.name = false; user.edit = false;*/'
            @keyup.escape='updateUserInfo()/*user.methods.edit.name = false; user.edit = false;*/'
            fluid
          >
            <v-layout column justify-space-around>
              <v-card-title
                secondary-title
                class='subheading text--lighten-2'
              >
                Переименовать
              </v-card-title>
              <v-card-text>
                <v-text-field
                  :autofocus='user.methods.edit.name || true'
                  :label='user.email'
                  :maxlength='20'
                  :rules='nameRules'
                  @change='nameOnChange'
                  background-color='none'
                  class='title'
                  color='accent'
                  fill-width
                  prepend-icon='mdi-account'
                  v-model.lazy='user.displayName'
                >
                  <template #append>
                    <v-btn
                      :dark='settings.theme.dark'
                      @click='updateUserInfo()/*user.methods.edit.name = false; user.edit = false; drawer = false;*/'
                      ma-0
                      flat
                    >
                      Готово
                    </v-btn>
                  </template>
                </v-text-field>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-dialog>

      </v-card>
      <!-- #END USER PROFILE SECTION -->

      <!-- #BEGIN MENU ITEMS SECTION -->
      <v-list
        :class='[settings.transparent ? "transparent" : "", "pa-0 ma-0"]'
        :dark='settings.theme.dark'
        :dense='$vuetify.breakpoint.smAndDown'
        :key='`menuItem${i}`'
        :style='settings.transparent ? `opacity: 0.9;` : ``'
        v-for='(items, i) in Object.values(menu)'
      >
          <!-- :to='element.to' -->
        <v-list-tile
          :key='`element${z}`'
          @click='navigateTo(element.to);'
          active-class='primary lighten-1'
          ripple
          v-for='(element, z) in Object.values(menu[i])'
        >
          <v-list-tile-avatar
            :size='$vuetify.breakpoint.smAndDown ? 32 : 42'
          >
            <v-icon
              :small='$vuetify.breakpoint.smAndDown'
              class='primary'
              color='primary lighten-4'
            >
              {{ element.icon }}
            </v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title
              :class='[
                $vuetify.breakpoint.smAndDown ? "caption" : "subheading",
                `${settings.theme.dark ? "light" : "dark"}--text`
              ]'
            >
              {{ element.title }}
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action v-once>
            <v-chip
              :dark='settings.theme.dark'
              :style='`filter: drop-shadow(0 0 2px ${themes[settings.theme.name][settings.theme.dark ? "dark" : "light"].info})`'
              class='primary--text'
              color='accent'
              disabled
              small
              v-if='element.title !== `События` && element.title !== `Логи` ? Math.random() > 0.62 : element.title === `События` ? getLength(events) ? getLength(events) : element.title === `Логи` ? getLength(log) ? getLength(log) : false : false : true'
            >
              {{ getCount(element.title) }}
            </v-chip>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider
          :class='[`primary`, settings.theme.dark ? `lighten-1` : `darken-1`]'
          v-if='i < getLength(menu) - 1'
        />
        <!-- #END MENU ITEMS SECTION -->
        <section
          v-if='i === getLength(menu) - 1'
        >
          <v-spacer/>
            <!-- class='footer title transparent font-weight-regular' -->
          <v-layout
            align-center
            class='footer overline transparent font-weight-regular'
            column
            fill-height
            fluid
            justify-center
            wrap
          >
            <!-- <v-chip
              :class='active'
              :disabled='true/*hasUpdate*/'
              :small='$vuetify.breakpoint.smAndDown'
            >
              {{ version.main }}.{{ version.build }}
            </v-chip> -->
            <v-chip
              :small='$vuetify.breakpoint.smAndDown'
              class='transparent text-no-wrap text-xs-center text-md-center'
              disabled
              label
            >
              &copy; {{ new Date().getFullYear() }} Company<br>
              Все права защищены
              {{ Object.keys(defaults) }}
            </v-chip>
          </v-layout>
        </section>
      </v-list>
    </v-navigation-drawer>
  <!-- </v-layout> -->
</template>

<script scoped>
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['defaults', 'menu'],
  data: () => ({
    main: true,
    tooltip: true,
    timer: 0,
    active: 'default',
    netStatus: {
      default: 'default',
      fast: 'success',
      normal: 'info',
      low: 'warning',
      offline: 'primary',
      error: 'primary error--text',
    },
  }),
  watch: {
  },

  created() {
  },
  mounted() {
  },

  computed: {
    ...mapState('app', ['version', 'events', 'tasks']),
    ...mapState(['settings', 'themes', 'user', 'log']),
    drawer: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      },
    },
    // menuLastItem() { // [OK][-]
    //   return Object.keys(this.menu).length - 1;
    // },
    nameRules: () => {
      // const regexp = /^((\w+)(\s{0,1})(\w+)){1,2}$/; // v1
      const regexp = /^((\w+|[А-Яа-я]+)\s{0,1}){1,5}$/; // v2 [OK]
      return [
        v => !!v || 'Обязательное поле',
        v => regexp.test(v) || 'Доступные символы: буквы, цифры и пробел',
        v => (v && v.length < 21) || 'Максимальная длина строки: 20 символов',
      ];
    },
  },
  methods: {
    ...mapMutations('app', ['setDrawer']),
    getDefaults() {
      return Object.keys(this.defaults);
    },
    nameOnChange(v) {
      // v1 [~OK]
      // const regexp = /^\w+$/;
      // if (regexp.test(v)) {
        //   this.user.first = v; // ~ ???
      // }
    },
    navigateTo(rout) { // [OK]
      this.setDrawer(false);
      this.$router.push(rout);
    },
    signout() { // [OK]
      this.$store.dispatch('signout');
    },
    namePlaceholder(name) { // [OK]
      if (name) {
        const data = name.split(' ');
        return data.length > 1 ? `${data[0][0]}${data[1][0]}` : `${name[0]}`;
      }
    },
    getCount(title) { // [*]
      const result = title === `События` ? Object.keys(this.events).length > 0 ? Object.keys(this.events).length : '' : title === `Логи` ? Object.keys(this.log).length > 0 ? Object.keys(this.log).length : '' : Math.round(Math.random() * 1e3) + 1;
      return result > 99 ? '99+' : result;
    },
    getLength(value) {
      return Object.keys(value).length;
    },
    updateUserInfo() {
      this.user.methods.edit.name = false;
      this.user.edit = false;
    },
  },
};
</script>

<style scoped>
.v-navigation-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  /* overflow: auto; */
  overscroll-behavior: none; /* [*] */
  scroll-behavior: smooth;
}
/* .text {
  text-align: center;
  align-self: end;
  justify-content: center;
} */
</style>
