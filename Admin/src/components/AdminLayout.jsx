import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import LogoutModal from './LogoutModal';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-close sidebar on route change on mobile devices
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard Overview';
      case '/website-management':
        return 'Website & Homepage Management';
      case '/products':
        return 'Products Inventory';
      case '/categories':
        return 'Category Management';
      case '/orders':
        return 'Orders Management';
      case '/customers':
        return 'Customer Directory';
      case '/analytics':
        return 'Performance Analytics';
      case '/settings':
        return 'System Settings';
      default:
        return 'Admin Workspace';
    }
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenLogout={() => setIsLogoutModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        <AdminHeader
          title={getPageTitle(location.pathname)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenLogout={() => setIsLogoutModalOpen(true)}
        />

        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default AdminLayout;
