const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// Get vendor analytics
router.get('/vendor', protect, async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total orders
    const totalOrders = await Order.countDocuments({ vendor: req.user._id });
    
    // This month's orders
    const thisMonthOrders = await Order.countDocuments({
      vendor: req.user._id,
      createdAt: { $gte: thisMonth }
    });

    // Total spent
    const totalSpent = await Order.aggregate([
      { $match: { vendor: req.user._id, status: { $in: ['delivered', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // This month's spending
    const thisMonthSpent = await Order.aggregate([
      { 
        $match: { 
          vendor: req.user._id, 
          status: { $in: ['delivered', 'shipped'] },
          createdAt: { $gte: thisMonth }
        } 
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Recent orders
    const recentOrders = await Order.find({ vendor: req.user._id })
      .populate('supplier', 'name')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    // Category breakdown
    const categoryBreakdown = await Order.aggregate([
      { $match: { vendor: req.user._id } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          total: { $sum: '$items.total' },
          count: { $sum: '$items.quantity' }
        }
      }
    ]);

    res.json({
      totalOrders,
      thisMonthOrders,
      totalSpent: totalSpent[0]?.total || 0,
      thisMonthSpent: thisMonthSpent[0]?.total || 0,
      recentOrders,
      categoryBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get supplier analytics
router.get('/supplier', protect, async (req, res) => {
  try {
    if (req.user.role !== 'supplier') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total products
    const totalProducts = await Product.countDocuments({ supplier: req.user._id });
    
    // Active products
    const activeProducts = await Product.countDocuments({ 
      supplier: req.user._id, 
      status: 'active' 
    });

    // Total orders
    const totalOrders = await Order.countDocuments({ supplier: req.user._id });
    
    // This month's orders
    const thisMonthOrders = await Order.countDocuments({
      supplier: req.user._id,
      createdAt: { $gte: thisMonth }
    });

    // Total revenue
    const totalRevenue = await Order.aggregate([
      { $match: { supplier: req.user._id, status: { $in: ['delivered', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // This month's revenue
    const thisMonthRevenue = await Order.aggregate([
      { 
        $match: { 
          supplier: req.user._id, 
          status: { $in: ['delivered', 'shipped'] },
          createdAt: { $gte: thisMonth }
        } 
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Recent orders
    const recentOrders = await Order.find({ supplier: req.user._id })
      .populate('vendor', 'name')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    // Top selling products
    const topProducts = await Order.aggregate([
      { $match: { supplier: req.user._id } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product._id',
          name: { $first: '$product.name' },
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.total' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalProducts,
      activeProducts,
      totalOrders,
      thisMonthOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      thisMonthRevenue: thisMonthRevenue[0]?.total || 0,
      recentOrders,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 