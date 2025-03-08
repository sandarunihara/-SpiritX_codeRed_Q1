import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
    // Get the token and user data from localStorage if available
    const savedToken = localStorage.getItem('access_token');
    const savedUser = JSON.parse(localStorage.getItem('user_data'));
    if (savedToken && savedUser) {
      setAuthState({
        token: savedToken,
        user: savedUser,
      });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    setAuthState({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
