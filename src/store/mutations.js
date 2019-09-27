export default {
  setUser(state, payload) {
    state.user.displayName = payload.displayName;
    state.user.email = payload.email;
    state.user.photoURL = payload.photoURL;
    state.user.uid = payload.uid;
    state.user.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify(state.user));
  },
  unsetUser(state, payload) { // v1 [OK]
    state.user.edit = false;
    state.user.methods.edit.name = false;
    state.user.isAuthenticated = false;
    localStorage.setItem('user', JSON.stringify(state.user));
  },
  setSettings(state) {
    localStorage.setItem('settings', JSON.stringify(state.settings));
  },
  setBusy(state, payload) {
    state.app.busy = payload;
  },
  setUsers(state, payload) {
    state.app.users = payload;
  },
  setPosts(state, payload) {
    Object.assign(state.app.posts, payload);
  },
  setComments(state, payload) {
    state.app.comments = payload;
  },
};
