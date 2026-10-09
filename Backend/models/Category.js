const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    count: {
      type: String,
      trim: true,
      default: '25 items',
    },
    image: {
      type: String,
      trim: true,
      default: 'assets/images/products/brass-cylinder-vase-1.jpg',
    },
    link: {
      type: String,
      trim: true,
      default: '/shops',
    },
    status: {
      type: String,
      enum: ['Active', 'Hidden', 'Archived'],
      default: 'Active',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);
