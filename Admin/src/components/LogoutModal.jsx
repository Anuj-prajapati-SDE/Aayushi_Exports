import React from 'react';
import { LogOut, X, AlertTriangle } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(19, 23, 43, 0.5)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease forwards',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: 'clamp(24px, 5vw, 32px) clamp(18px, 5vw, 28px)',
          position: 'relative',
          background: '#FFFFFF',
          borderRadius: 'clamp(14px, 3vw, 20px)',
          border: '1px solid #EDE8E3',
          boxShadow: '0 25px 60px -15px rgba(19, 23, 43, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: '#AEB0B6',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#FAF8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#13172B';
            e.currentTarget.style.backgroundColor = '#EDE8E3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#AEB0B6';
            e.currentTarget.style.backgroundColor = '#FAF8F5';
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#CC0D39',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#13172B', fontFamily: "'Outfit', sans-serif" }}>
              Sign Out
            </h3>
            <p style={{ fontSize: '13px', color: '#5E626F' }}>Confirm session termination</p>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#5E626F', marginBottom: '24px', lineHeight: 1.6 }}>
          Are you sure you want to sign out of the Aayushi Export Admin Portal? You will need to log in again to access the management dashboard.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
            style={{ padding: '10px 18px', fontSize: '14px' }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              background: 'linear-gradient(135deg, #CC0D39 0%, #A30A2E 100%)',
              boxShadow: '0 4px 14px rgba(204, 13, 57, 0.35)',
            }}
          >
            <LogOut size={16} />
            Sign Out Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

