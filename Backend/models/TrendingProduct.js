const mongoose = require('mongoose');

const trendingProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    prevPrice: {
      type: String,
      trim: true,
      default: '185.00',
    },
    newPrice: {
      type: String,
      required: [true, 'Product price is required'],
      trim: true,
      default: '145.00',
    },
    rating: {
      type: Number,
      default: 5,
    },
    reviews: {
      type: Number,
      default: 80,
    },
    image: {
      type: String,
      trim: true,
      default: 'assets/images/products/brass-cylinder-vase-1.jpg',
    },
    tag: {
      type: String,
      trim: true,
      default: 'Hot Item',
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

module.exports = mongoose.model('TrendingProduct', trendingProductSchema);
