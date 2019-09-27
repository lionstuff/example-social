import { set, toggle } from '@/utils/vuex';

export default {
  setDrawer: set('drawer'),
  setPosts: set('posts'),
  setSettings: set('settings'),
  setComments: set('comments'),
  setTheme: set('theme'),
  // setUser: set('user'),
  setUsers: set('users'),
  setWallpaper: set('wallpaper'),

  toggleDrawer: toggle('drawer'),
  toggleTheme: toggle('theme'),
  toggleWallpaper: toggle('wallpaper'),
};
