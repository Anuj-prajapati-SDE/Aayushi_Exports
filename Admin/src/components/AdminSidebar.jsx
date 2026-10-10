import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  LayoutTemplate,
  ShoppingBag,
  Layers,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
  Sparkles,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/products', label: 'Products', icon: ShoppingBag },
  { path: '/categories', label: 'Categories', icon: Layers },
  { path: '/orders', label: 'Orders', icon: ShoppingCart, badgeType: 'warning' },
  // { path: '/customers', label: 'Customers', icon: Users, count: '842' },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/website-management', label: 'Website Management', icon: LayoutTemplate, badgeType: 'primary' },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const AdminSidebar = ({ isOpen, onClose, onOpenLogout }) => {
  const { user } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FEEB9D 0%, #F5DE7A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(229, 195, 101, 0.4)',
                color: '#CC0D39',
                fontWeight: 900,
                fontSize: '20px',
                letterSpacing: '-0.5px',
                border: '1.5px solid #E5C365',
                flexShrink: 0,
              }}
            >
              P
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#13172B', letterSpacing: '-0.3px', fontFamily: "'Outfit', sans-serif" }}>
                  Pesco
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: '#FFF1F3',
                    color: '#CC0D39',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    border: '1px solid #FFE4E8',
                    letterSpacing: '0.4px',
                  }}
                >
                  Admin
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#5E626F', marginTop: '1px' }}>Portal v1.0 • E-Commerce</p>
            </div>
          </div>

          {/* Close button on mobile & tablets */}
          <button
            type="button"
            className="admin-sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
            title="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <div style={{ flex: 1, padding: '20px 14px', overflowY: 'auto' }}>
          

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#13172B' : '#5E626F',
                    backgroundColor: isActive ? '#FEEB9D' : 'transparent',
                    border: isActive ? '1px solid #E5C365' : '1px solid transparent',
                    boxShadow: isActive ? '0 4px 14px rgba(254, 235, 157, 0.55)' : 'none',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  })}
                  className="sidebar-link"
                >
                  {({ isActive }) => (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icon size={19} color={isActive ? '#CC0D39' : '#8E929D'} />
                        <span>{item.label}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {item.badge && (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: '999px',
                              backgroundColor: isActive
                                ? '#CC0D39'
                                : item.badgeType === 'primary'
                                ? '#FEEB9D'
                                : item.badgeType === 'warning'
                                ? '#FFF1F3'
                                : '#F0FDF4',
                              color: isActive
                                ? '#FFFFFF'
                                : item.badgeType === 'primary'
                                ? '#13172B'
                                : item.badgeType === 'warning'
                                ? '#CC0D39'
                                : '#16A34A',
                              border: isActive
                                ? 'none'
                                : item.badgeType === 'primary'
                                ? '1px solid #E5C365'
                                : item.badgeType === 'warning'
                                ? '1px solid #FFE4E8'
                                : '1px solid currentColor',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.count && !isActive && (
                          <span style={{ fontSize: '12px', color: '#8E929D' }}>{item.count}</span>
                        )}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

         
        </div>

        {/* User Card & Logout Footer */}
        <div
          style={{
            padding: '16px 14px',
            borderTop: '1px solid #EDE8E3',
            backgroundColor: '#FAF8F5',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EDE8E3',
              boxShadow: '0 1px 3px rgba(19, 23, 43, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                  alt={user?.name || 'Admin'}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #FEEB9D',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#16A34A',
                    border: '2px solid #FFFFFF',
                  }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#13172B',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user?.name || 'Administrator'}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#5E626F',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user?.email || 'admin@pesco.com'}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenLogout}
              title="Logout"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CC0D39',
                backgroundColor: '#FFF1F3',
                border: '1px solid #FFE4E8',
                transition: 'all 0.2s',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#CC0D39';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFF1F3';
                e.currentTarget.style.color = '#CC0D39';
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

