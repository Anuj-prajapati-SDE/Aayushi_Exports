import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Shield,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMessage) setErrorMessage('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.email.trim() || !formData.password) {
      setErrorMessage('Please enter both admin email and password.');
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.email.trim(), formData.password);
      setSuccessMessage('Authentication successful! Welcome to Aayushi Export Admin Dashboard.');

      const from = location.state?.from?.pathname || '/dashboard';
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 750);
    } catch (error) {
      console.error('[Login Form Error]:', error);
      setErrorMessage(error.message || 'Invalid email or password. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FBF9F6',
        backgroundImage: `
          radial-gradient(at 10% 15%, rgba(204, 13, 57, 0.08) 0px, transparent 50%),
          radial-gradient(at 90% 85%, rgba(247, 148, 31, 0.08) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(251, 249, 246, 1) 0%, rgba(245, 241, 236, 0.9) 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Subtle Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(19, 23, 43, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 23, 43, 0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }}
      />

      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: 'clamp(28px, 6vw, 42px) clamp(20px, 6vw, 38px)',
          backgroundColor: '#FFFFFF',
          borderRadius: 'clamp(16px, 4vw, 24px)',
          border: '1px solid #EDE8E3',
          boxShadow: '0 20px 45px -10px rgba(19, 23, 43, 0.08), 0 0 0 1px rgba(19, 23, 43, 0.03)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #FEEB9D 0%, #F5DE7A 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 22px rgba(229, 195, 101, 0.45)',
              color: '#CC0D39',
              fontWeight: 900,
              fontSize: '28px',
              border: '2px solid #E5C365',
              marginBottom: '16px',
            }}
          >
            P
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: '#13172B',
              letterSpacing: '-0.4px',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Admin Portal
          </h1>
          <p style={{ fontSize: '13.5px', color: '#5E626F', marginTop: '6px' }}>
            Sign in with authorized administrator credentials
          </p>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              animation: 'fadeIn 0.2s ease forwards',
            }}
            role="alert"
          >
            <AlertCircle size={18} style={{ flexShrink: 0, color: '#DC2626' }} />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Success Notification Banner */}
        {successMessage && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              color: '#16A34A',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              animation: 'fadeIn 0.2s ease forwards',
            }}
            role="status"
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0, color: '#16A34A' }} />
            <div>{successMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="adminEmail"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#13172B',
                marginBottom: '8px',
              }}
            >
              Admin Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#AEB0B6',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="adminEmail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@pesco.com"
                required
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #EDE8E3',
                  borderRadius: '12px',
                  color: '#13172B',
                  fontSize: '14px',
                  paddingLeft: '44px',
                  paddingRight: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E5C365';
                  e.target.style.boxShadow = '0 0 0 4px rgba(254, 235, 157, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#EDE8E3';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <label
                htmlFor="adminPassword"
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#13172B',
                  marginBottom: 0,
                }}
              >
                Password
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#AEB0B6',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="adminPassword"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #EDE8E3',
                  borderRadius: '12px',
                  color: '#13172B',
                  fontSize: '14px',
                  paddingLeft: '44px',
                  paddingRight: '44px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E5C365';
                  e.target.style.boxShadow = '0 0 0 4px rgba(254, 235, 157, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#EDE8E3';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#5E626F',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '26px',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#CC0D39',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '13px', color: '#5E626F', fontWeight: 500 }}>
                Remember this device
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              height: '50px',
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '12px',
              backgroundColor: '#FEEB9D',
              backgroundImage: 'linear-gradient(135deg, #FEEB9D 0%, #F5DC76 100%)',
              color: '#13172B',
              border: '1px solid #E5C365',
              boxShadow: '0 8px 20px rgba(229, 195, 101, 0.35)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.25s ease',
              opacity: isLoading ? 0.75 : 1,
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 26px rgba(229, 195, 101, 0.45)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(229, 195, 101, 0.35)';
              }
            }}
          >
            {isLoading ? (
              <>
                <div className="spinner" />
                <span>Authenticating Admin...</span>
              </>
            ) : (
              <>
                <span>Sign In To Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        {/* Footer Info */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid #EDE8E3',
            textAlign: 'center',
            fontSize: '12px',
            color: '#AEB0B6',
          }}
        >
          <span>E-Commerce Management Platform</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

