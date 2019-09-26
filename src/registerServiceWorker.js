/* eslint-disable */

import { register } from 'register-service-worker';

const info = text => console.info(text);

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      info(
`App is being served from cache by a service worker.
For more details, visit https://goo.gl/AFskqB`
      );
    },
    registered () {
      info(`Service worker has been registered.`);
    },
    cached () {
      info(`Content has been cached for offline use.`);
    },
    updatefound () {
      info(`New content is downloading.`);
    },
    updated () {
      info(`New content is available; please refresh.`);
    },
    offline () {
      info(`No internet connection found. App is running in offline mode.`);
    },
    error (error) {
      console.error(`Error during service worker registration: ${error}`);
    }
  });
}
