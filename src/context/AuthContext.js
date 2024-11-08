import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username: 'admin', role: 'admin' }

  const login = async (username, password) => {
    // Simulate external authentication service
    // For now, we'll hardcode users
    const users = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' },
    ];

    // Simulate an asynchronous request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(
          (u) => u.username === username && u.password === password
        );
        if (foundUser) {
          setUser({ username: foundUser.username, role: foundUser.role });
          resolve(foundUser);
        } else {
          reject('Invalid username or password');
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
