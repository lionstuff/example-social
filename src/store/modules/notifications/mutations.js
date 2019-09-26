const defaultState = () => ({ // [OK]
  default: [],
  info: [],
  success: [],
  warning: [],
  error: [],
});

export default { // [OK]
  set(state, payload) { // [OK]
    // state[payload.type].push(Object.assign({ id: state[payload.type].length }, payload.notification));
    state[payload.type].push({...payload.notification, id: state[payload.type].length});
  },
  reset(state, payload) { // [OK][~]
    if (payload) { // [Fix] Check
      state[payload.type].splice(state[payload.type].indexOf(state[payload.type].filter(item => item.id === payload.id)), 1);
    } else {
      Object.assign(state, defaultState()); // [OK]
    }
  },
};
