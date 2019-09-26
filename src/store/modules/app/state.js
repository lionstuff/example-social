export default {
  busy: false,
  version: {
    main: '0.0.1',
    build: 201907071940,
  },
  drawer: false,
  users: {},
  map: {
    // name: 'yandex-maps',
    name: 'leaflet-maps',
    provider: 'https://api-maps.yandex.ru/',
    options: {
      apiKey: '',
      lang: 'ru_RU',
      version: '2.1.73', // '2.1'
    },
  },
  events: {
    201904252300: {
      coords: [54.335, 48.4932],
      description: 'Description for event #1',
      maxUsers: 10,
      name: 'Событие!',
      radius: 50,
      status: 'active', // 'active' || 'completed' || 'allowed' ||  'n/a'
      users: {},
      // expire: 201904262300,
      expire: 201908262300,
    },
    201904242301: {
      coords: [54.345, 48.4945],
      description: 'Description for event #2',
      maxUsers: 10,
      name: 'Событище!',
      radius: 50,
      status: 'completed',
      users: {},
      expire: 201904282300,
    },
    201904252302: {
      coords: [54.335, 48.4912],
      description: 'Description for event #3',
      maxUsers: 10,
      name: 'Ещё одно событие',
      radius: 50,
      status: 'allowed',
      users: {},
    },
    201904252303: {
      coords: [54.33, 48.4915],
      description: 'Description for event #4',
      maxUsers: 10,
      name: '. . .',
      radius: 50,
      status: 'n/a',
      users: {},
    },
  },
  tasks: {},
};
