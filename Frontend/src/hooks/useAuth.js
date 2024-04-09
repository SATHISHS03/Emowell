// hooks/useAuth.js
import { useRecoilState } from 'recoil';
import { authState } from '../store/atoms/state';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false});
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    login,
    logout,
  };
};
