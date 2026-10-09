import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/Login/AdminLogin';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import WebsiteManagementPage from './pages/Dashboard/WebsiteManagementPage';
import ProductsPage from './pages/Dashboard/ProductsPage';
import CategoriesPage from './pages/Dashboard/CategoriesPage';
import OrdersPage from './pages/Dashboard/OrdersPage';
import CustomersPage from './pages/Dashboard/CustomersPage';
import AnalyticsPage from './pages/Dashboard/AnalyticsPage';
import SettingsPage from './pages/Dashboard/SettingsPage';

function App() {
  return (
    <Routes>
      {/* Public Admin Auth Route */}
      <Route path="/login" element={<AdminLogin />} />

      {/* Protected Admin Management Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="website-management" element={<WebsiteManagementPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;

