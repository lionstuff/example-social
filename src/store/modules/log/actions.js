export default {
  get({ commit }, payload = JSON.parse(localStorage.getItem('log'))) { // [OK]
    commit('set', payload);
  },
  set({ commit }, payload) { // [OK]
    localStorage.setItem('log', JSON.stringify(payload));
  },
  reset({ commit }) { // [OK]
    commit('reset');
  },

  add({ commit }, payload) { // [OK]
    commit('add', payload);
  },
};
