<template>
  <!-- <v-layout align-center justify-center wrap column fill-height> -->
<!--
  <v-parallax
    src='https://wallpaperaccess.com/full/272287.jpg'
    class='parallax'
    height='100%'
  >
-->
      <!-- :justify-center='!$vuetify.breakpoint.smAndDown' -->
      <!-- :justify-end='$vuetify.breakpoint.smAndDown' -->
    <v-layout
      align-center
      justify-center
      wrap
    >
      <v-flex lg6 md8 sm8 xs12>
        <v-form lazy-validation v-model='isValid'>
          <v-card
            :dark='settings.theme.dark'
            :style='settings.transparent ? `opacity: 0.9;` : ``'
            app
            class='primary card'
            color='success'
            fluid
          >
            <v-toolbar
              :dark='settings.theme.dark'
              :dense='$vuetify.breakpoint.smAndDown'
              :style='settings.transparent ? `opacity: 0.9;` : ``'
              v-if='!$vuetify.breakpoint.smAndDown'
            >
              <v-avatar fluid ma-0 pa-0>
                <v-icon :class='`mdi-36px`/*mdi-48px*/'>mdi-city</v-icon>
              </v-avatar>
              <v-toolbar-title secondary-title class='font-weight-medium title'>
                {{ getTitle }}
              </v-toolbar-title>
              <v-spacer/>
              <v-layout ma-0 pa-0 justify-end v-if='!$vuetify.breakpoint.smAndDown'>
                <v-toolbar-title secondary-title class='font-weight-thin subheading'>
                  пользователей в сети:&nbsp;
                </v-toolbar-title>
                <v-icon v-for='icon in Math.round(Math.random() * 4) + 1' :key='`icon${icon}`'>{{ `mdi-numeric-${Math.round(Math.random() * 9) + 1}` }}</v-icon>
              </v-layout>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                :autofocus='true/*type === "email"*/'
                :class='[$vuetify.breakpoint.smAndDown ? "subheading" : "title"]'
                :id='type'
                :key='`type${i}`'
                :maxlength='-1'
                :name='type'
                :placeholder='["Логин", "Пароль"][i]'
                :prepend-icon='["mdi-at", "mdi-key-variant"][i]'
                :rules='[rules.required, rules[type]]'
                :type='type'
                @keyup.enter='signin'
                background-color='none'
                color='primary'
                fill-width
                flat
                single-line
                solo-inverted
                v-for='(type, i) in ["email", "password"]'
                v-model.lazy='user[type]'
              />
              <v-divider/>
              <v-checkbox label='Запомнить' color='light' v-model='settings.remember'/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn flat @click.prevent.stop='signin' :disabled='(user.email === "" || user.password === "") || (app.busy || !isValid) || (!app.busy && !isValid)'>
                Войти
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  <!-- </v-parallax> -->
  <!-- </v-layout> -->
</template>

<script scoped>
import { mapState } from 'vuex';

export default {
  data: () => ({
    isValid: false,
    // user: {
    //   email: '',
    //   password: '',
    //   isAuthenticated: false,
    // },
    rules: {
      required: v => !!v || 'Обязательное поле',
      email: v => /[!\b-\w|\.\w]+@[!\b-\w]+\.[!\b-\w]+/g.test(v) || 'Введите корректный Email-адрес',
      password: v => v.length !== undefined && v.length >= 8 || 'Минимальная длина пароля 8-мь символов',
    },
  }),
  mounted() {
  },
  computed: {
    ...mapState(['app', 'settings', 'user']),
    isAuthenticated() { // [OK]
      return this.user.isAuthenticated; // [OK]
    },
    getTitle() {
      return window.document.title;
    },
  },
  watch: {
    isAuthenticated(val) {
      if (val) {
        this.$router.replace('/dashboard'); // [*] last activity
      }
    },
  },
  methods: {
    signin() {
      if (this.isValid && !this.app.busy) {
        this.$store.dispatch('signin', { email: this.user.email, password: this.user.password });
      } else if (!this.isValid) {
        const notification = {
          content: 'Введите корректные данные.',
          title: 'Ошибка',
        };
        this.$store.dispatch('notifications/set', {type: 'error', notification});
      }
    },
  },
};
</script>

<style scoped>
.parallax {
  display: flex;
  min-height: 100%;
  min-width: 100%;
  align-items: center;
  align-self: center;
  justify-content: center;
}
.v-input,
.v-text-field__slot,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:active,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:active,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:active,
select:-webkit-autofill:focus,
input:-internal-autofill-previewed,
input:-internal-autofill-selected,
textarea:-internal-autofill-previewed,
textarea:-internal-autofill-selected,
select:-internal-autofill-previewed,
select:-internal-autofill-selected {
  border: none !important;
  -webkit-text-fill-color: none !important;
  color: black;
  background-color: transparent !important;
  -webkit-tap-highlight-color: black !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
</style>
