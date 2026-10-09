import React, { useState, useEffect } from 'react';
import {
  Save,
  Shield,
  Store,
  CheckCircle2,
  AlertCircle,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  RefreshCw,
  Mail,
  User,
  DollarSign,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { updateAdminCredentialsApi } from '../../services/api';

const API_BASE_URL = 'http://localhost:5000/api/website';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();

  // General Store Settings State
  const [storeName, setStoreName] = useState('Pesco Handicrafts');
  const [contactEmail, setContactEmail] = useState('contact@pescostore.com');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [currency, setCurrency] = useState('USD ($)');
  const [isSavingStore, setIsSavingStore] = useState(false);
  const [storeSuccessMsg, setStoreSuccessMsg] = useState(null);
  const [storeErrorMsg, setStoreErrorMsg] = useState(null);

  // Admin Account & Security State
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [isUpdatingAuth, setIsUpdatingAuth] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState(null);
  const [authErrorMsg, setAuthErrorMsg] = useState(null);

  // Load existing store settings and admin profile
  useEffect(() => {
    if (user) {
      setAdminName(user.name || 'Super Administrator');
      setAdminEmail(user.email || 'admin@pesco.com');
    }

    // Load store settings from backend or local cache
    const fetchStoreSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/content/store_settings`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            const settings = data.data;
            if (settings.storeName) setStoreName(settings.storeName);
            if (settings.contactEmail) setContactEmail(settings.contactEmail);
            if (settings.contactPhone) setContactPhone(settings.contactPhone);
            if (settings.currency) setCurrency(settings.currency);
            localStorage.setItem('pesco_store_settings', JSON.stringify(settings));
            return;
          }
        }
      } catch (err) {
        console.warn('[SettingsPage] Fetch store settings fallback:', err.message);
      }

      // Check localStorage fallback
      const cached = localStorage.getItem('pesco_store_settings');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.storeName) setStoreName(parsed.storeName);
          if (parsed.contactEmail) setContactEmail(parsed.contactEmail);
          if (parsed.contactPhone) setContactPhone(parsed.contactPhone);
          if (parsed.currency) setCurrency(parsed.currency);
        } catch (e) {}
      }
    };

    fetchStoreSettings();
  }, [user]);

  // 1. Save Store Settings (Currency, Name, Contact)
  const handleSaveStoreSettings = async (e) => {
    e.preventDefault();
    setIsSavingStore(true);
    setStoreSuccessMsg(null);
    setStoreErrorMsg(null);

    const payload = {
      storeName: storeName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      currency: currency, // 'USD ($)' or 'INR (₹)'
    };

    try {
      const res = await fetch(`${API_BASE_URL}/content/store_settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload }),
      });

      if (res.ok) {
        localStorage.setItem('pesco_store_settings', JSON.stringify(payload));
        window.dispatchEvent(new Event('pesco_website_updated'));
        window.dispatchEvent(new Event('storage'));
        setStoreSuccessMsg(`Store preferences and currency (${currency}) updated successfully!`);
        setTimeout(() => setStoreSuccessMsg(null), 4000);
      } else {
        throw new Error('Failed to update store settings in database.');
      }
    } catch (err) {
      localStorage.setItem('pesco_store_settings', JSON.stringify(payload));
      window.dispatchEvent(new Event('pesco_website_updated'));
      window.dispatchEvent(new Event('storage'));
      setStoreSuccessMsg(`Store settings saved locally.`);
      setTimeout(() => setStoreSuccessMsg(null), 4000);
    } finally {
      setIsSavingStore(false);
    }
  };

  // 2. Update Admin Email, Name & Password with Current Password Verification
  const handleUpdateAdminAccount = async (e) => {
    e.preventDefault();
    setAuthSuccessMsg(null);
    setAuthErrorMsg(null);

    if (!currentPassword) {
      setAuthErrorMsg('Please enter your current password to verify your identity.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setAuthErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setAuthErrorMsg('New password and confirmation password do not match.');
      return;
    }

    setIsUpdatingAuth(true);

    try {
      const res = await updateAdminCredentialsApi({
        currentPassword: currentPassword,
        name: adminName.trim(),
        email: adminEmail.trim(),
        newPassword: newPassword.trim() || undefined,
      });

      if (res.success) {
        setAuthSuccessMsg(res.message || 'Admin account credentials updated successfully!');
        if (res.user) {
          updateUser(res.user, res.token);
        }
        // Clear password fields on success
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setAuthSuccessMsg(null), 4500);
      } else {
        setAuthErrorMsg(res.message || 'Failed to update credentials.');
      }
    } catch (err) {
      setAuthErrorMsg(err.message || 'Incorrect current password or server error.');
    } finally {
      setIsUpdatingAuth(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '850px' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
          Store & Security Settings
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', marginTop: '3px', margin: 0 }}>
          Manage your storefront currency, store information, and administrator account credentials.
        </p>
      </div>

      {/* SECTION 1: General Store Profile & Currency */}
      <div
        className="glass-card"
        style={{
          padding: '22px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#F1F5F9',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Store size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              General Store Profile
            </h2>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
              Public store details and storefront currency display
            </p>
          </div>
        </div>

        {storeSuccessMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              backgroundColor: '#DCFCE7',
              border: '1px solid #BBF7D0',
              color: '#15803D',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{storeSuccessMsg}</span>
          </div>
        )}

        {storeErrorMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <AlertCircle size={16} />
            <span>{storeErrorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSaveStoreSettings} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Store Brand Name
              </label>
              <input
                type="text"
                className="input-field"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                style={{ height: '36px', fontSize: '13px' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Public Support Email
              </label>
              <input
                type="email"
                className="input-field"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                style={{ height: '36px', fontSize: '13px' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Store Currency
              </label>
              <select
                className="input-field"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ height: '36px', fontSize: '13px', backgroundColor: '#FFFFFF' }}
              >
                <option value="USD ($)">USD — United States Dollar ($)</option>
                <option value="INR (₹)">INR — Indian Rupee (₹)</option>
              </select>
              <span style={{ display: 'block', fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                Updates product pricing symbols across catalog and product detail pages.
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Public Contact / WhatsApp
              </label>
              <input
                type="text"
                className="input-field"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                style={{ height: '36px', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSavingStore}
              style={{ fontSize: '13px', padding: '7px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {isSavingStore ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{isSavingStore ? 'Saving...' : 'Save Store Settings'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: Admin Security & Account Management */}
      <div
        className="glass-card"
        style={{
          padding: '22px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Administrator Credentials & Security
            </h2>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
              Change your login email and password by confirming your current password
            </p>
          </div>
        </div>

        {authSuccessMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              backgroundColor: '#DCFCE7',
              border: '1px solid #BBF7D0',
              color: '#15803D',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{authSuccessMsg}</span>
          </div>
        )}

        {authErrorMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <AlertCircle size={16} />
            <span>{authErrorMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpdateAdminAccount} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Admin Name & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Admin Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input-field"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Super Administrator"
                  style={{ height: '36px', fontSize: '13px', paddingLeft: '32px' }}
                  required
                />
                <User size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Admin Email Address (Login Email) <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="input-field"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@pesco.com"
                  style={{ height: '36px', fontSize: '13px', paddingLeft: '32px' }}
                  required
                />
                <Mail size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              </div>
            </div>
          </div>

          {/* Verification: Current Password */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              marginTop: '4px',
            }}
          >
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
              Current Password <span style={{ color: '#DC2626' }}>* (Required to verify and save changes)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showCurrentPass ? 'text' : 'password'}
                className="input-field"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current active password"
                style={{ height: '36px', fontSize: '13px', paddingLeft: '32px', paddingRight: '36px', backgroundColor: '#FFFFFF' }}
                required
              />
              <KeyRound size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                }}
              >
                {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* New Password & Confirm Password */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
              Change Password (Leave blank if keeping current password)
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    className="input-field"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    style={{ height: '36px', fontSize: '13px', paddingLeft: '32px', paddingRight: '36px' }}
                  />
                  <Lock size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748B',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                    }}
                  >
                    {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    style={{ height: '36px', fontSize: '13px', paddingLeft: '32px', paddingRight: '36px' }}
                  />
                  <Lock size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748B',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                    }}
                  >
                    {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isUpdatingAuth}
              style={{ fontSize: '13px', padding: '7px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {isUpdatingAuth ? <RefreshCw size={14} className="animate-spin" /> : <Shield size={14} />}
              <span>{isUpdatingAuth ? 'Verifying & Saving...' : 'Update Admin Credentials'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
