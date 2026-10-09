import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const notificationsData = [
  {
    id: 1,
    title: 'New Order Received',
    desc: 'Order #ORD-9842 ($180.00) from Sarah Jenkins',
    time: '5 mins ago',
    type: 'success',
    icon: CheckCircle,
  },
  {
    id: 2,
    title: 'Low Stock Alert',
    desc: 'Athletic leggings with mesh panels (Only 3 left)',
    time: '24 mins ago',
    type: 'warning',
    icon: AlertTriangle,
  },
  {
    id: 3,
    title: 'New Customer Registered',
    desc: 'John Doe created a new buyer account',
    time: '1 hour ago',
    type: 'info',
    icon: Clock,
  },
];

const AdminHeader = ({ onToggleSidebar, onOpenLogout, title = 'Dashboard Overview' }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      style={{
        height: '70px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
      }}
    >
      {/* Left: Sidebar Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
       

        <div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.3px',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {title}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
          
          </div>
        </div>
      </div>

      {/* Right: Search, Notifications, Admin Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Quick Search */}
        <div
          style={{
            position: 'relative',
            width: '260px',
          }}
          className="d-none d-md-block"
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94A3B8',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search orders, items, users..."
            style={{
              width: '100%',
              height: '38px',
              paddingLeft: '38px',
              paddingRight: '14px',
              fontSize: '13px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '10px',
              color: '#0F172A',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.borderColor = '#CC0D39';
              e.target.style.boxShadow = '0 0 0 3px rgba(204, 13, 57, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = '#F8FAFC';
              e.target.style.borderColor = '#E2E8F0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: showNotifications ? '#FEF2F2' : '#F8FAFC',
              border: showNotifications ? '1px solid #FECACA' : '1px solid #E2E8F0',
              color: showNotifications ? '#CC0D39' : '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s',
            }}
          >
            <Bell size={18} />
            <span
              style={{
                position: 'absolute',
                top: '9px',
                right: '9px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#CC0D39',
              }}
            />
          </button>

          {/* Notifications Panel */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                width: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 15px 35px rgba(15, 23, 42, 0.12)',
                zIndex: 100,
                overflow: 'hidden',
                animation: 'fadeIn 0.2s ease forwards',
              }}
            >
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Notifications</span>
                <span className="badge badge-primary">3 New</span>
              </div>

              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notificationsData.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #F8FAFC',
                        display: 'flex',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor:
                            notif.type === 'success'
                              ? '#F0FDF4'
                              : notif.type === 'warning'
                              ? '#FFFBEB'
                              : '#EFF6FF',
                          color:
                            notif.type === 'success'
                              ? '#16A34A'
                              : notif.type === 'warning'
                              ? '#D97706'
                              : '#2563EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{notif.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', lineHeight: 1.4 }}>
                          {notif.desc}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>{notif.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        
      </div>
    </header>
  );
};

export default AdminHeader;

