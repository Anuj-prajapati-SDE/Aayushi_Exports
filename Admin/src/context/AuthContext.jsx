import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLoginApi, getAdminProfileApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('pesco_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('pesco_admin_token') || null;
  });

  const [loading, setLoading] = useState(true);

  // Validate active token on initial mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('pesco_admin_token');
      if (storedToken) {
        try {
          const res = await getAdminProfileApi();
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem('pesco_admin_user', JSON.stringify(res.user));
          }
        } catch (error) {
          console.warn('[Session Expired or Invalid]:', error.message);
          logout();
        }
      }
      setLoading(false);
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    const data = await adminLoginApi(email, password);
    if (data.success && data.token && data.user) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('pesco_admin_token', data.token);
      localStorage.setItem('pesco_admin_user', JSON.stringify(data.user));
      return data;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  };

  const updateUser = (updatedUser, newToken) => {
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem('pesco_admin_user', JSON.stringify(updatedUser));
    }
    if (newToken) {
      setToken(newToken);
      localStorage.setItem('pesco_admin_token', newToken);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('pesco_admin_token');
    localStorage.removeItem('pesco_admin_user');
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    loading,
    login,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
