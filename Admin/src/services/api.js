const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Universal API Request Fetch Helper
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('pesco_admin_token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to backend server. Make sure the backend is running on http://localhost:5000.');
    }
    throw error;
  }
}

/**
 * Admin Auth API Services
 */
export const adminLoginApi = async (email, password) => {
  return await request('/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const getAdminProfileApi = async () => {
  return await request('/auth/admin/me', {
    method: 'GET',
  });
};

export const updateAdminCredentialsApi = async ({ currentPassword, email, newPassword, name }) => {
  return await request('/auth/admin/update-credentials', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, email, newPassword, name }),
  });
};

export const getDashboardStatsApi = async () => {
  return await request('/auth/admin/dashboard-stats', {
    method: 'GET',
  });
};

export default {
  adminLoginApi,
  getAdminProfileApi,
  updateAdminCredentialsApi,
  getDashboardStatsApi,
};
