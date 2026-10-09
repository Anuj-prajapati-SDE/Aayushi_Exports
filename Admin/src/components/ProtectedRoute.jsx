import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0B0E14',
          color: '#F3F4F6',
          gap: '16px',
        }}
      >
        <div className="spinner" style={{ width: '36px', height: '36px', borderWidth: '3px', borderTopColor: '#CC0D39' }} />
        <p style={{ color: '#9CA3AF', fontSize: '14px', fontWeight: 500 }}>Authenticating Admin Portal...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
