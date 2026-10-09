const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate signed JWT token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'pesco_super_secret_jwt_key_2026_secure',
    { expiresIn: '7d' }
  );
};

// @desc    Admin Login
// @route   POST /api/auth/admin/login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find user by lowercase email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User with this email does not exist.',
      });
    }

    // Check if user has admin privileges
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: This portal is restricted to Admin accounts only.',
      });
    }

    // Verify password using bcrypt method on model
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please check your password and try again.',
      });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate JWT Token
    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error('[Admin Login Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during admin authentication',
      error: error.message,
    });
  }
};

// @desc    Get Current Admin Profile
// @route   GET /api/auth/admin/me
// @access  Private (Admin only)
const getAdminProfile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('[Get Profile Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin profile',
      error: error.message,
    });
  }
};

// @desc    Update Admin Credentials (Email, Name & Password with Current Password Verification)
// @route   PUT /api/auth/admin/update-credentials
// @access  Private (Admin only)
const updateAdminCredentials = async (req, res) => {
  try {
    const { currentPassword, email, newPassword, name } = req.body;

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is required to verify your identity before making changes.',
      });
    }

    // Find the current admin user with password field
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found.',
      });
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect. Verification failed.',
      });
    }

    // If new email is provided and different from current
    if (email && email.trim().toLowerCase() !== user.email.toLowerCase()) {
      const trimmedEmail = email.trim().toLowerCase();
      const existingUser = await User.findOne({
        email: trimmedEmail,
        _id: { $ne: user._id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: `The email address "${trimmedEmail}" is already in use by another account.`,
        });
      }
      user.email = trimmedEmail;
    }

    // If new password is provided
    if (newPassword && newPassword.trim() !== '') {
      if (newPassword.trim().length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long.',
        });
      }
      user.password = newPassword.trim();
    }

    // If name is provided
    if (name && name.trim()) {
      user.name = name.trim();
    }

    await user.save();

    // Generate new updated JWT token
    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: 'Admin credentials updated successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error('[Update Credentials Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating admin credentials',
      error: error.message,
    });
  }
};

// @desc    Get Admin Dashboard Overview Stats
// @route   GET /api/auth/admin/dashboard-stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Summary statistics data
    const stats = {
      revenue: {
        total: 128450.0,
        monthlyGrowth: 18.4,
      },
      orders: {
        total: 1420,
        pending: 34,
        completed: 1358,
        growth: 12.5,
      },
      customers: {
        total: totalUsers > 0 ? totalUsers : 842,
        growth: 9.2,
      },
      products: {
        total: 156,
        lowStock: 8,
      },
    };

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('[Dashboard Stats Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard stats',
      error: error.message,
    });
  }
};

module.exports = {
  adminLogin,
  getAdminProfile,
  updateAdminCredentials,
  getDashboardStats,
};
