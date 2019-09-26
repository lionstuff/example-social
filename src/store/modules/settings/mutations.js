const defaultState = () => ({
  animation: true,
  background: `https://unsplash.it/1500/1000?image=${Math.round(Math.random() * 1000)}`,
  transparent: true,
  notifications: {
    // inset: false, // [*]
    background: false,
    border: 1,
    excluded: {},
    mini: false,
    position: 'right-bottom',
    small: false,
    timeout: 5000,
  },
  theme: {
    dark: true,
    name: 'Default',
  },
  remember: true,
  welcomeMessage: true,
  default: {
    animation: true,
    background: `https://unsplash.it/1500/1000?image=${Math.round(Math.random() * 1000)}`,
    transparent: true,
    notifications: {
      // inset: false, // [*]
      background: false,
      border: 1,
      excluded: {},
      mini: false,
      position: 'right-bottom',
      small: false,
      timeout: 5000,
    },
    theme: {
      dark: true,
      name: 'Default',
    },
    remember: true,
    welcomeMessage: true,
  },
});

export default {
  setNotificationsPosition(state, payload) {
    state.notifications.position = payload;
  },
  setNotificationsMini(state, payload) {
    state.notifications.mini = payload;
  },
  setNotificationsSmall(state, payload) {
    state.notifications.small = payload;
  },
  setTheme(state, payload) {
    state.theme.name = payload;
  },
  setRemember(state, payload) {
    state.remember = payload;
  },
  setNotificationsExcluded(state, payload) {
    state.excluded.push(payload);
  },
  setSettings(state, payload) {
    Object.assign(state. payload);
  },
  setNotificationsSettings(state, payload) {
    state.notifications = payload;
  },
  reset(state, payload) { // [?]
    Object.assign(state, defaultState());
  },
};
