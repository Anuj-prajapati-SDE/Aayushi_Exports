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
    <header className="admin-header">
      {/* Left: Sidebar Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          className="admin-sidebar-toggle-btn"
          aria-label="Toggle navigation menu"
          title="Open menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2
            className="admin-header-title"
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#13172B',
              letterSpacing: '-0.3px',
              fontFamily: "'Outfit', sans-serif",
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Right: Search, Notifications, Admin Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Quick Search */}
        <div className="admin-header-search">
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#8E929D',
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
              backgroundColor: '#FAF8F5',
              border: '1.5px solid #EDE8E3',
              borderRadius: '10px',
              color: '#13172B',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.borderColor = '#E5C365';
              e.target.style.boxShadow = '0 0 0 3px rgba(254, 235, 157, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = '#FAF8F5';
              e.target.style.borderColor = '#EDE8E3';
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
              backgroundColor: showNotifications ? '#FEEB9D' : '#FAF8F5',
              border: showNotifications ? '1px solid #E5C365' : '1px solid #EDE8E3',
              color: showNotifications ? '#13172B' : '#5E626F',
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
                width: 'min(340px, calc(100vw - 32px))',
                maxWidth: 'calc(100vw - 24px)',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #EDE8E3',
                boxShadow: '0 15px 35px rgba(19, 23, 43, 0.12)',
                zIndex: 100,
                overflow: 'hidden',
                animation: 'fadeIn 0.2s ease forwards',
              }}
            >
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid #EDE8E3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#13172B' }}>Notifications</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: '#FEEB9D',
                    color: '#13172B',
                    border: '1px solid #E5C365',
                  }}
                >
                  3 New
                </span>
              </div>

              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notificationsData.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #FAF8F5',
                        display: 'flex',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF8F5')}
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
                              ? '#FEEB9D'
                              : '#EFF6FF',
                          color:
                            notif.type === 'success'
                              ? '#16A34A'
                              : notif.type === 'warning'
                              ? '#13172B'
                              : '#2563EB',
                          border:
                            notif.type === 'warning'
                              ? '1px solid #F7941F'
                              : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#13172B' }}>{notif.title}</div>
                        <div style={{ fontSize: '12px', color: '#5E626F', marginTop: '2px', lineHeight: 1.4 }}>
                          {notif.desc}
                        </div>
                        <div style={{ fontSize: '11px', color: '#8E929D', marginTop: '4px' }}>{notif.time}</div>
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

