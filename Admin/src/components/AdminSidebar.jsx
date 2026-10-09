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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, },
  { path: '/products', label: 'Products', icon: ShoppingBag,  },
  { path: '/categories', label: 'Categories', icon: Layers,},
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
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
            display: 'block',
          }}
          className="d-lg-none"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        style={{
          width: '270px',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'transform 0.3s ease',
          flexShrink: 0,
        }}
        className={`admin-sidebar ${isOpen ? 'open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '22px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #CC0D39 0%, #E61E4D 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(204, 13, 57, 0.3)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              P
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px', fontFamily: "'Outfit', sans-serif" }}>
                  Pesco
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(204, 13, 57, 0.08)',
                    color: '#CC0D39',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid rgba(204, 13, 57, 0.2)',
                  }}
                >
                  Admin
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>Portal v1.0 • E-Commerce</p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div style={{ flex: 1, padding: '20px 14px', overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#94A3B8',
              padding: '0 10px 10px',
            }}
          >
            Management
          </div>

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
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#FFFFFF' : '#475569',
                    backgroundColor: isActive ? '#CC0D39' : 'transparent',
                    boxShadow: isActive ? '0 6px 18px rgba(204, 13, 57, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  })}
                  className="sidebar-link"
                >
                  {({ isActive }) => (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icon size={19} color={isActive ? '#FFFFFF' : '#64748B'} />
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
                                ? 'rgba(255, 255, 255, 0.25)'
                                : item.badgeType === 'primary'
                                ? 'rgba(204, 13, 57, 0.1)'
                                : item.badgeType === 'warning'
                                ? '#FFFBEB'
                                : '#F0FDF4',
                              color: isActive
                                ? '#FFFFFF'
                                : item.badgeType === 'primary'
                                ? '#CC0D39'
                                : item.badgeType === 'warning'
                                ? '#D97706'
                                : '#16A34A',
                              border: isActive ? 'none' : '1px solid currentColor',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.count && !isActive && (
                          <span style={{ fontSize: '12px', color: '#94A3B8' }}>{item.count}</span>
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
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
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
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
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
                    border: '1.5px solid #CC0D39',
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
                    color: '#0F172A',
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
                    color: '#64748B',
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
                color: '#DC2626',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                transition: 'all 0.2s',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DC2626';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FEF2F2';
                e.currentTarget.style.color = '#DC2626';
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

