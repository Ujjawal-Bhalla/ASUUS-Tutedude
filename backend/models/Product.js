const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    enum: ['street-food', 'beverages', 'snacks', 'desserts', 'ingredients'],
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  unit: {
    type: String,
    enum: ['kg', 'g', 'l', 'ml', 'piece', 'pack'],
    required: true
  },
  image: {
    type: String,
    default: 'https://placehold.co/300x200/4F46E5/FFF?text=Product'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'out-of-stock'],
    default: 'active'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  minOrderQuantity: {
    type: Number,
    default: 1
  },
  bulkDiscount: {
    enabled: {
      type: Boolean,
      default: false
    },
    tiers: [{
      minQuantity: Number,
      discountPercentage: Number
    }]
  },
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
productSchema.index({ supplier: 1, category: 1, status: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema); 