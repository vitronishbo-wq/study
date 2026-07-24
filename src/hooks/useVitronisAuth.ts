import { useState, useEffect } from 'react';
import {
  getVitronisToken,
  getVitronisUser,
  redirectToVitronisSSO,
  logoutVitronis,
  VitronisUser
} from '../lib/vitronisAuth';

export function useVitronisAuth() {
  const [user, setUser] = useState<VitronisUser | null>(() => getVitronisUser());
  const [token, setToken] = useState<string | null>(() => getVitronisToken());

  useEffect(() => {
    // Check token and user on mount or URL params change
    const currentToken = getVitronisToken();
    const currentUser = getVitronisUser();

    setToken(currentToken);
    setUser(currentUser);
  }, []);

  const login = (targetReturnPath?: string) => {
    redirectToVitronisSSO(targetReturnPath);
  };

  const logout = () => {
    logoutVitronis();
    setToken(null);
    setUser(null);
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout
  };
}
