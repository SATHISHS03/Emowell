// store/authState.js
import { atom } from 'recoil';

export const authState = atom({
  key: 'authState', // unique ID (with respect to other atoms/selectors)
  default: {
    isAuthenticated: !!localStorage.getItem('token'), 
  },
});
export const dateState = atom({
  key: 'dateState', // unique ID with respect to other atoms/selectors
  default: [] // default value (aka initial value)
});
export const sleeptimeState = atom({
  key: 'sleeptimeState', // unique ID with respect to other atoms/selectors
  default: [] // default value (aka initial value)
});




export const moodCountState = atom({
  key: 'moodCountState', // unique ID (with respect to other atoms/selectors)
  default: {
    date: new Date().toISOString().split('T')[0],
    counts: {},
    total: 0 // Adding a total field to track the sum of all mood entries
  },
});