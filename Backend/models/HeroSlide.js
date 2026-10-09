const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema(
  {
    subHeading: {
      type: String,
      required: [true, 'Subheading is required'],
      trim: true,
      default: 'Handcrafted Luxury Metalware',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      default: 'Authentic Ratan Brass & Royal Artefacts',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      default: 'Elevate your living space with heirloom-quality antique brass pillar vases, intricate jali cutouts, and Moradabad artisan craftsmanship.',
    },
    price: {
      type: String,
      trim: true,
      default: '145.00',
    },
    buttonText: {
      type: String,
      trim: true,
      default: 'Shop Now',
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
    shape: {
      type: String,
      trim: true,
      default: 'assets/images/hero/hero-one-shape1.png',
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

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
