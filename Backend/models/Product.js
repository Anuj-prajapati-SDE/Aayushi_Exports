const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Brass Vases & Urns',
    },
    brand: {
      type: String,
      trim: true,
      default: 'Ratan Brass',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    prevPrice: {
      type: String,
      trim: true,
      default: '',
    },
    discount: {
      type: String,
      trim: true,
      default: '',
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 10,
    },
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5.0,
    },
    reviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      required: true,
      default: 'assets/images/products/brass-cylinder-vase-1.jpg',
    },
    gallery: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    fabricType: {
      type: String,
      trim: true,
      default: '100% Solid Virgin Cast Brass',
    },
    material: {
      type: String,
      trim: true,
      default: '100% Solid Virgin Cast Brass',
    },
    finish: {
      type: String,
      trim: true,
      default: 'Antique Brushed Gold',
    },
    craftsmanship: {
      type: String,
      trim: true,
      default: 'Hand-Engraved Jaali & Filigree',
    },
    origin: {
      type: String,
      trim: true,
      default: 'Moradabad, Uttar Pradesh, India',
    },
    careInstructions: {
      type: String,
      trim: true,
      default: 'Wipe with soft dry cotton cloth; avoid harsh chemicals.',
    },
    occasion: {
      type: String,
      trim: true,
      default: 'Luxury Home Decor & Gifting',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    artisanDetails: {
      type: String,
      trim: true,
      default: '',
    },
    highlights: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    specifications: [
      {
        label: { type: String, trim: true },
        value: { type: String, trim: true },
      },
    ],
    reviewsList: [
      {
        name: { type: String, trim: true },
        email: { type: String, trim: true },
        rating: { type: Number, min: 1, max: 5, default: 5 },
        comment: { type: String, trim: true },
        date: { type: Date, default: Date.now },
      },
    ],
    featured: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to keep name and title in sync
productSchema.pre('save', function (next) {
  if (this.name && !this.title) {
    this.title = this.name;
  } else if (this.title && !this.name) {
    this.name = this.title;
  }
  if (this.fabricType && !this.material) {
    this.material = this.fabricType;
  }
  if (this.material && !this.fabricType) {
    this.fabricType = this.material;
  }
  if (typeof next === 'function') {
    next();
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
