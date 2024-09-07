// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
  });

  useEffect(() => {
    // Load tokens from local storage or some other source if needed
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    if (storedAccessToken && storedRefreshToken) {
      setAuthState({
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
      });
    }
  }, []);

  const setAuthTokens = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    setAuthState({ accessToken, refreshToken });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthState({ accessToken: null, refreshToken: null });
  };

  return (
      <AuthContext.Provider value={{ ...authState, setAuthTokens, logout }}>
        {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
