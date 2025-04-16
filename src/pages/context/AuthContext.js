import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [email, setEmail] = useState('');

  const login = (userData) => {
    setUser(userData);
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const loginT = (email) => {
    setEmail(email);
  };

  const logout = () => {
    axios.post('https://serverbarbaropersonal.pagekite.me/session/logout', 0, {withCredentials: true})
      .then(response => {
        setUser(null);
        localStorage.removeItem('user');
      })
      .catch(error => {
        console.error('Errore durante il logout:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, email, login, logout, loginT }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};