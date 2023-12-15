import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // You may initialize this with the user data from your authentication system

  const login = (userData) => {
    // Your login logic here
    // For example, set the user data in the state
    setUser(userData);
  };

  const logout = () => {
    // Your logout logic here
    // For example, clear the user data from the state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
