const mongoose = require('mongoose');

const heroBannerSchema = new mongoose.Schema(
  {
    discountTag: {
      type: String,
      trim: true,
      default: 'UP TO 35% OFF',
    },
    title: {
      type: String,
      required: [true, 'Banner title is required'],
      trim: true,
      default: 'Royal Handcrafted Brass Vases & Artefacts',
    },
    buttonText: {
      type: String,
      trim: true,
      default: 'Shop Brass Decor',
    },
    buttonLink: {
      type: String,
      trim: true,
      default: '/shops',
    },
    image: {
      type: String,
      trim: true,
      default: 'assets/images/products/brass-cylinder-vase-1.jpg',
    },
    shape1: {
      type: String,
      trim: true,
      default: 'assets/images/banner/discount.png',
    },
    shape2: {
      type: String,
      trim: true,
      default: 'assets/images/banner/line.png',
    },
    badgeBg: {
      type: String,
      trim: true,
      default: 'bg-one',
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

module.exports = mongoose.model('HeroBanner', heroBannerSchema);
