import { set, toggle } from '@/utils/vuex';

export default {
  setDrawer: set('drawer'),
  setEvents: set('events'),
  setSettings: set('settings'),
  setTasks: set('tasks'),
  setTheme: set('theme'),
  // setUser: set('user'),
  setUsers: set('users'),
  setWallpaper: set('wallpaper'),

  toggleDrawer: toggle('drawer'),
  toggleTheme: toggle('theme'),
  toggleWallpaper: toggle('wallpaper'),
};
