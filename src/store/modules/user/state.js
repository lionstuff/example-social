export default {
  displayName: null,
  edit: null,
  email: null,
  isAuthenticated: null,
  methods: {
    edit: {
      name: null,
      photo: null,
    },
  },
  photoURL: null, // `https://randomuser.me/api/portraits/${Math.random() > 0.62 ? 'men' : 'women'}/${Math.round(Math.random() * 99)}.jpg`,
  uid: null,
  wallpaper: `https://cdn.vuetifyjs.com/images/parallax/material${Math.random() > 0.62 ? '' : '2'}.jpg`,
};
