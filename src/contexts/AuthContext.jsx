import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('perkstack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType = 'customer') => {
    // Mock login - in real app, this would call your API
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      type: userType,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem('perkstack_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = async (email, password, name, userType = 'customer') => {
    // Mock signup
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      type: userType,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem('perkstack_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('perkstack_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    isBusiness: user?.type === 'business',
    isCustomer: user?.type === 'customer',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};