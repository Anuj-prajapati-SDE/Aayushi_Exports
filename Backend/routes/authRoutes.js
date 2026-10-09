const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAdminProfile,
  updateAdminCredentials,
  getDashboardStats,
} = require('../controllers/authController');
const { protectAdmin } = require('../middlewares/authMiddleware');

// Public admin authentication route
router.post('/admin/login', adminLogin);

// Protected admin routes
router.get('/admin/me', protectAdmin, getAdminProfile);
router.put('/admin/update-credentials', protectAdmin, updateAdminCredentials);
router.get('/admin/dashboard-stats', protectAdmin, getDashboardStats);

module.exports = router;
