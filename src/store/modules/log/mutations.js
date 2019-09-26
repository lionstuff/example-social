const defaultState = () => ({});

const getLast = (state) => {
  const result = Object.keys(state).length - 1;
  return result > -1 ? result : 0;
};

const checkDateEquals = (first, second) => {
  const date1 = new Date(first);
  const y1 = date1.getFullYear();
  const m1 = date1.getMonth();
  const d1 = date1.getDate();

  const date2 = new Date(second);
  const y2 = date2.getFullYear();
  const m2 = date2.getMonth();
  const d2 = date2.getDate();

  return d1 === d2 ? m1 === m2 ? y1 === y2 : false : false;
};

export default {
  set(state, payload) { // [OK]
    Object.assign(state, payload);
  },
  add(state, payload) { // [OK]
    const last = parseInt(state === null ? payload.timestamp : Object.keys(state)[getLast(state)]);
    const payloadRefObject = Object.fromEntries([[payload.timestamp, payload]]);
    if (state === null) {
      Object.assign(state, payloadRefObject);
    } else {
      if (checkDateEquals(last, payload.timestamp)) {
        Object.assign(state[last], payloadRefObject);
      } else {
        Object.assign(state, Object.fromEntries([[payload.timestamp, payloadRefObject]]));
      }
    }
  },

  reset(state) { // [OK]
    Object.assign(state, defaultState());
  },
};
