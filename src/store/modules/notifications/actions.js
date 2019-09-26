export default {
  set({ commit }, payload) { // [OK]
    commit('set', {type: payload.type, notification: payload.notification});
  },
  reset({ commit }, payload = false) {
    commit('reset', payload);
  },
};
