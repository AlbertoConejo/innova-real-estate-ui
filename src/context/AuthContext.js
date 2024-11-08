import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role }
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load user from local storage
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
      // Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://localhost:44345/api/Auth/Login', {
        username,
        password,
      });
      const { token, username: userName, roles } = response.data;
      setUser({ username: userName, role: roles[0] }); // Assuming one role
      setToken(token);
      // Save to local storage
      localStorage.setItem('user', JSON.stringify({ username: userName, role: roles[0] }));
      localStorage.setItem('token', token);
      // Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const register = async (username, email, password, role) => {
    try {
      await axios.post('https://localhost:44345/api/Auth/Register', {
        username,
        email,
        password,
        role,
      });
      // Optionally log the user in after registration
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
