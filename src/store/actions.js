import api from '@/api';
import firebase from '@/utils/firebase';

export default {
  signup({ commit, dispatch }, payload) { // [*][OK]
    commit('setBusy', true);
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(async (response) => { // [OK]
        const name = payload.displayName;
        const notification = {
          title: 'Поздравляем!',
          content: `<strong>${name}</strong>, Вы успешно зарегистрированы!\nТеперь вы можете войти в систему.`,
          confirm: 'Войти',
          timeout: 0,
          onCancel: () => { // [~][*]
            window.location.href = '/signin'; // [?]
          },
        };

        dispatch('notifications/set', {type: 'success', notification}); // [OK]

        const user = await firebase.auth().currentUser;
        user.updateProfile({ // [OK]
          displayName: name,
          photoURL: `https://unsplash.it/300/300?image=${Math.round(Math.random() * 1083)}`,
        // }).then(() => { // [OK]
        //   commit('setBusy', false);
        })
        .catch((error) => {
          const notification = { title: 'Ошибка', content: error.message, cancel: 'Ok' };
          dispatch('notifications/set', {type: 'error', notification});
          // commit('setBusy', false);
        })
        .finally(() => {
          commit('setBusy', false);
        });
      })
      .catch((error) => {
        const notification = { title: 'Ошибка', content: error.message, cancel: 'Ok' };
        dispatch('notifications/set', {type: 'error', notification});
        // commit('setBusy', false);
      })
      .finally(() => {
        commit('setBusy', false);
      });
  },
  signin({ commit, dispatch }, payload) { // [OK]
    commit('setBusy', true);

    // [TODO] Add
    // if (settings.remember) {
    //   const user = firebase.auth().currentUser;
    // }
    // firebase.auth().signInWithEmailAndPassword(user.email, user.password)

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      // .then(() => {
      //   window.location.href = '/dashboard'; // [?]
      // })
      .catch((error) => {
        const notification = { title: 'Ошибка', content: error.message, cancel: 'Ok' };
        dispatch('notifications/set', {type: 'error', notification}); // [OK]
        // commit('setBusy', false);
      })
      .finally(() => {
        commit('setBusy', false);
      });
  },
  signout({ commit, dispatch }) { // [OK]
    commit('setBusy', true);
    firebase.auth().signOut()
      .then(() => {
        window.location.href = '/signin'; // [?]
      })
      .catch((error) => {
        const notification = { title: 'Ошибка', content: error.message, cancel: 'Ok' };
        dispatch('notifications/set', {type: 'error', notification}); // [OK]
        // commit('setBusy', false);
      })
      .finally(() => {
        commit('setBusy', false);
      });
  },
  stateChanged({ commit, dispatch }, payload) { // [OK]
    dispatch('notifications/reset');
    if (payload) {
      if (payload.displayName !== null) {
        // if (this.settings.welcomeMessage) {
          const notification = {
            confirm: 'ok',
            content: `Рады тебя видеть, <strong>${payload.displayName}</strong>!`,
            title: 'С возвращением!',
          };
          dispatch('notifications/set', {type: 'info', notification});
        // }
        commit('setUser', payload);
      }
    } else {
      commit('unsetUser');
    }
  },

  async getUsers({ commit }) {
    commit('setBusy', true);
    const response = await api().get('/users');
    if (response.status === 200) {
      commit('setUsers', response.data);
      commit('setBusy', false);
    }
  },
  async getEvents({ commit }) {
    commit('setBusy', true);
    const response = await api().get('/posts');
    if (response.status === 200) {
      commit('setEvents', response.data);
      commit('setBusy', false);
    }
  },
  async getTasks({ commit }) {
    commit('setBusy', true);
    const response = await api().get('/posts');
    if (response.status === 200) {
      commit('setTasks', response.data);
      commit('setBusy', false);
    }
  },
};
