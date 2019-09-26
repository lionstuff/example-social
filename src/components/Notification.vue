<!-- [!][9] -->

<template>
  <transition group :name='__transition' mode='in-out' :key='`notification${__transition}`' v-if='show'>
  <!-- <transition name='__transition' mode='in-out' :key='`notification${__title}`' v-if='show'> -->
<!--     <v-layout
      :class='[`notification`,/*`blur`,*/ __position, __inset/* [OK] */]'
      column
      fluid
    >
 -->
      <v-card
        :class='[`card notification`,/*`blur`,*/ __position, __inset, __background ? `transparent` : __color, `notification-content elevation-5`/* [OK] */]'
        :dark='__dark'
        :dense='__small'
        :style='`border: 0px solid transparent;`/* [T] */'
        :width='__small ? 256 : 300'
        @click.stop=''
        @mouseenter='time(0);'
        @mouseleave='time(timeout);'
        @mouseout='time(timeout);'
        @mouseover='time(0);'
        flat
        fluid
        hover
        ma-0
        pa-0
        tile
      >
        <v-layout
          :aspect-ratio='16/9'
          :class='[`card`]'
          :style='`border: ${__background ? __border : 0}px solid ${$vuetify.theme[__color] || __color}; background-color: ${$vuetify.theme[__color] + "60" || __color};`'
          column
          fluid
        >
          <v-list :dark='__dark' class='transparent ma-0' :dense='__small'>
            <v-layout column @click.stop='miniChange(!__mini);' fluid>

              <v-list-tile :avatar='!__app ? __avatar : false'>
                <v-list-tile-avatar v-if='!__app' :class='[__small ? `heading font-weight-medium` : `title font-weight-bold`, `text-uppercase`]'>

                <v-avatar
                  :class='[__avatar ? `transparent` : `${__color} lighten-2 ${__color}--text`]'
                  :height='__small ? 48 : 52'
                  :size='__small ? 48 : 52'
                  :width='__small ? 48 : 52'
                  v-if='__avatar && !__app'
                >
                  <v-img
                    :height='(__avatar ? (__small ? 48 : 52) : 0)'
                    :src='__avatar'
                    :width='(__avatar ? (__small ? 48 : 52) : 0)'
                    v-if='__avatar'
                  />
                  <span v-else-if='!__avatar'>
                    {{ placeholder(__title) }}
                  </span>
                </v-avatar>
                <span v-else-if='!__avatar'>
                  {{ placeholder(__title) }}
                </span>

              </v-list-tile-avatar>
              <v-list-tile-content :class='[`text-truncate`]'>
                <v-list-tile-title :class='[`font-weight-medium`, __title === `` && __subtitle === `` ? `${__color} lighten-1` : ``]' :title='!__app ? __title : ``'>
                  {{ __title }}
                </v-list-tile-title>
                <v-list-tile-sub-title :class='[__title === `` || __subtitle === `` ? `${__color} lighten-1` : ``]' :title='__subtitle' v-if='!__app'>
                  {{ __subtitle }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-spacer v-if='__icon'/>
              <v-list-tile-avatar v-if='__icon'>
                <v-btn
                  :small='__small'
                  icon
                  flat
                  @click.native='__mini ? showChange(false) : ``'
                >
                  <v-icon
                    :color='`${__background ? __color : "transparent"}` + `${__background ? "" : __color + " text--lighten-1"}`'
                    :class='[__small ? `mdi-24px` : `mdi-36px`, __background ? `transparent` : __color, `${!__background ? "" : " lighten-2"}`]'
                  >
                    {{ __icon }}
                  </v-icon>
                </v-btn>
              </v-list-tile-avatar>
            </v-list-tile>

            </v-layout>
          </v-list>

          <v-divider :class='[__color, __dark ? `lighten-1` : `darken-1`, __small ? `mx-2` : `mx-3`]' v-if='!__mini && !__background'/>
          <!-- <transition group :name='__transition' :key='`layout${__transition}`' mode='out-in'> -->
            <v-layout v-if='!__mini' class='card-text font-weight-light align-center text-xs-justify'>
              <v-card-text v-html='__content' :class='[`text ma-1 pa-2`, __small ? `px-1` : `px-3`, !__content ? `${__color} lighten-1` : ``]'/>
            </v-layout>
          <!-- </transition> -->
          <v-card-actions v-if='!__mini' :dark='__dark' ripple>
            <v-menu v-if='!__app'>
              <v-btn v-if='!__onMenu' slot='activator' :fab='!__small' :icon='__small' small flat @click.native='__onMenu'>
                <v-icon :small='__small'>mdi-dots-vertical</v-icon>
              </v-btn>
              <v-list :dense='__small' class='__color' :dark='__dark'> <!-- [!][9] [Todo] Add support for custom menu component (v-html='' ???) -->
                <v-list-tile
                  :key='index'
                  @click='/**/'
                  v-for='index in 3'
                >
                  <v-list-tile-title>Element {{ index }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-spacer/>
            <v-btn v-if='/*__onCancel*/$listeners["onCancel"] || __cancel' flat :small='__small' @click.native='$listeners["onCancel"](showChange(false));'>
              {{ !__app ? __cancel : __confirm}}
            </v-btn>
            <v-btn v-if='!__app && (/*__onConfirm*/$listeners["onConfirm"] || __confirm)' flat :small='__small' :class='[__color]' @click.native='$listeners["onConfirm"](showChange(false));'>
              {{ __confirm }}
            </v-btn>
          </v-card-actions>

          <!-- :style='__padding' -->
        <v-img
          :class='[`blur`, __position]'
          :src='__background'
          v-if='__background'
        />

        <svg version='1.1' height='0'>
          <defs>
            <filter id='blurfilter' height='100vh' width='100vw'>
              <feGaussianBlur stdDeviation='7' result='BLUR'/>
              <feMerge>
                <feMergeNode in="BLUR"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        </v-layout>

      </v-card>

    <!-- </v-layout> -->

  </transition>
</template>

<script scoped>
// 'use strict';
export default {
  props: {
    app: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'right-bottom',
    },
    transition: {
      type: String,
      default: 'slide-x-reverse-transition',
    },
    timeout: {
      type: Number,
      default: 0,
    },
    background: {
      type: [String, Boolean],
      default: false,
    },
    border: {
      type: [Number, Boolean],
      default: 1, // true
    },
    color: {
      type: String,
      default: 'primary',
    },
    dark: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: [String, Boolean],
      default: false,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    content: {
      type: [String, Function],
      default: () => {''},
    },
    icon: {
      type: String,
      // default: `mdi-information`,
    },
    cancel: {
      type: String,
      default: 'cancel',
    },
    confirm: {
      type: String,
      default: 'ok',
    },
    // iconInverted: { // [*]
    //   type: Boolean,
    //   default: false,
    // },
    inset: {
      type: Boolean,
      default: true,
      // default() {
      //   return `position: ${this.__inset ? 'absolute' : 'fixed'}`;
      // },
    },
    onMenu: {
      type: Function,
      // default() {
      //   alert('Hello from Menu!');
      // },
    },
    onCancel: {
      type: Function,
      default() {
        // this.showChange(false);
        return this.onCancel();
      },
    },
    onConfirm: {
      type: Function,
      default() {
        // this.showChange(false);
        return this.onCancel();
      },
    },
  },
  data: () => ({
    show: false,
    minTime: 5000,
    timerId: 0,
  }),
  created() { // [OK]
    this.positionChange(this.position);
  },
  mounted() {
    this.show = true;
    this.time(this.timeout);
  },
  computed: {
    __app() {
      return this.app;
    },
    __position() {
      return this.position;
    },
    __transition() {
      return this.transition;
    },
    __color() {
      return this.color;
    },
    __dark() {
      return this.dark;
    },
    __background() {
      return this.background;
    },
    __border() {
      return this.border > 5 ? 5 : this.border;
    },
    __title() {
      return this.title;
    },
    __subtitle() {
      return this.subtitle;
    },
    __content() {
      return this.content;
    },
    __small() {
      return this.small;
    },
    __avatar() {
      return this.avatar;
    },
    __icon() {
      return this.icon;
    },
    // __iconInverted() { // [*]
    //   return this.iconInverted;
    // },
    __cancel() {
      return this.cancel;
    },
    __confirm() {
      return this.confirm;
    },
    __onMenu() {
      return this.onMenu;
    },
    __onCancel() {
      return this.onCancel;
    },
    __onConfirm() {
      return this.onConfirm;
    },
    __mini() {
      return this.mini;
    },
    __inset() {
      return this.inset;
    },
  },
  methods: {
    appChange(app) {
      this.app = app;
    },
    positionChange(position) {
      this.transitionChange(position === 'left-top' || position === 'left-bottom' ? 'slide-x-transition' : 'slide-x-reverse-transition');
      this.position = position;
    },
    transitionChange(transition) {
      this.transition = transition;
    },
    colorChange(color) {
      this.color = color;
    },
    darkChange(dark) {
      this.dark = dark;
    },
    backgroundChange(background) {
      this.background = background;
    },
    borderChange(border) {
      this.border = Number(border);
    },
    titleChange(title) {
      this.title = title.trim();
    },
    subtitleChange(subtitle) {
      this.subtitle = subtitle.trim();
    },
    contentChange(content) {
      this.content = content.trim();
    },
    smallChange(small) {
      this.small = small;
    },
    avatarChange(avatar) {
      this.avatar = avatar;
    },
    iconChange(icon) {
      this.icon = icon;
    },
    // iconInvertedChange(iconInverted) { // [*]
    //   this.iconInverted = iconInverted;
    // },
    cancelChange(cancel) {
      this.cancel = cancel;
    },
    confirmChange(confirm) {
      this.confirm = confirm;
    },
    onMenuChange(onMenu) {
      this.onMenu = onMenu;
    },
    onCancelChange(onCancel) {
      this.onCancel = onCancel;
    },
    onConfirmChange(onConfirm) {
      this.onConfirm = onConfirm;
    },
    miniChange(mini) {
      this.mini = mini;
    },
    showChange(show) {
      this.show = show;
    },
    time(value) { // [OK]
      clearTimeout(this.timerId);
      if (value > 0) {
        this.timerId = setTimeout(() => {
          this.showChange(false);
        }, value > this.minTime ? value : this.minTime);
      }
    },
    placeholder(name) { // [OK]
      if (name) {
        const data = name.split(' ');
        return data.length > 1 ? `${data[0][0]}${data[1][0]}` : `${name[0]}`;
      }
    },
    onCancel() { // move to __onCancel.default
      this.showChange(false);
    },
  },
  beforeDestroyed() {
    this.onCancel();
  },
};
</script>

<style scoped>
.slide-x-reverse-transition-enter-active,
.slide-x-transition-enter-active,
.slide-y-reverse-transition-enter-active,
.slide-y-transition-enter-active {
  opacity: 1;
  transition: all .25s ease;
}

.slide-x-reverse-transition-leave-active,
.slide-x-transition-leave-active,
.slide-y-reverse-transition-leave-active,
.slide-y-transition-leave-active {
  opacity: 1;
  transition: all .25s ease;
}

.slide-x-reverse-transition-enter,
.slide-x-reverse-transition-leave-to,
.slide-x-transition-enter,
.slide-x-transition-leave-to,
.slide-y-reverse-transition-enter,
.slide-y-reverse-transition-leave-to,
.slide-y-transition-enter,
.slide-y-transition-leave-to {
  opacity: 0;
  transition: all .3s ease;
}
.notification {
/* [*] */  position: fixed; /*__inset ? 'absolute' : 'fixed';*/ /* [OK] */
  z-index: 10000;
  margin: 1.25em;
}
.notification .card {
  /* border: 1px solid black; */
  /*border-radius: 6px;*/

  background: inherit;
  text-shadow: 0 0 5px black, 0 0 3px black, 0 0 1px black;
  /*text-align: justify;*/
  box-sizing: border-box;

  overflow: hidden;

  z-index: 10050;
}
.notification-content {
  border: 1px solid transparent;
  /*border-radius: 6px;*/

  background-repeat: no-repeat;
  background: inherit;
  background-size: cover;
  overflow: hidden;
  z-index: 10000;
}
.notification-content .card-text {
  height: calc(1.85em * 3);
  line-height: 1.5em;
  margin: -0.4em;
}
.card-text .text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.notification .blur {
  position: absolute;
  height: 100vh !important;
  width: 100vw !important;
  /*filter: blur(0.9em);*/
  filter: url('#blurfilter');
  z-index: -1;
  margin: -1.25em;
  margin-right: -2.5em;
  object-fit: cover; /* [*] */
}

.left-top {
  /*position: fixed;*/
  left: 0px;
  top: 0px;
  /*padding-left: 1.5%;*/
  /*padding-top: 1.5%;*/
  /*float: left;*/
}
.left-bottom {
  /*position: fixed;*/
  left: 0px;
  bottom: 0px;
  /*padding-left: 1.5%;*/
  /*padding-bottom: 1.5%;*/
  /*float: left;*/
}
.right-top {
  /*position: fixed;*/
  right: 0px;
  top: 0px;
  /*padding-right: 1.5%;*/
  /*padding-top: 1.5%;*/
  /*float: right;*/
}
.right-bottom {
  /*position: fixed;*/
  right: 0px;
  bottom: 0px;
  /*padding-right: -1.25em;*/
  /*padding-bottom: 1.5%;*/
  /*float: right;*/
}
</style>
