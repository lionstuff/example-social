export default {
  restoreNotificationsExcluded({ commit }, payload) {
    commit('setNotificationsExcluded', JSON.parse(localStorage.getItem('settings')).default.notifications.excluded);
  },
  // restoreWelcomeMessageSettings({ commit }, payload) {
  //   commit('setSettings')
  // },
  restoreNotificationsSettings({ commit }, payload) {
    commit('setNotificationsSettings', JSON.parse(localStorage.getItem('settings')).default.notifications);
  },
  restoreTheme({ commit }, payload) {
    commit('setTheme', JSON.parse(localStorage.getItem('settings')).default.theme.name);
  },
  restoreRemember({ commit }, payload) {
    commit('setRemember', JSON.parse(localStorage.getItem('settings')).default.remember);
  },
  restoreSettings({ commit }, payload) {
    commit('setSettings', JSON.parse(localStorage.getItem('settings'))["default"]);
  },
  reset({ commit }) {
    commit('reset');
  },
  getNotificationsExcluded({ commit }, payload) {
    commit('setNotificationsExcluded', JSON.parse(localStorage.getItem('settings')).notifications.excluded);
  },
  getNotificationsSettings({ commit }, payload) {
    commit('setNotificationsSettings', JSON.parse(localStorage.getItem('settings')).notifications);
  },
  getTheme({ commit }, payload) {
    commit('setTheme', JSON.parse(localStorage.getItem('settings')).theme.name);
  },
  getRemember({ commit }, payload) {
    commit('setRemember', JSON.parse(localStorage.getItem('settings')).remember);
  },
  getSettings({ commit }, payload) {
    commit('setSettings', JSON.parse(localStorage.getItem('settings')));
  },
};
