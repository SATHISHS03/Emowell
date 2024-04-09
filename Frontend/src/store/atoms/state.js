// store/authState.js
import { atom } from 'recoil';

export const authState = atom({
  key: 'authState', // unique ID (with respect to other atoms/selectors)
  default: {
    isAuthenticated: !!localStorage.getItem('token'), 
  },
});
