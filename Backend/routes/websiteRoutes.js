const express = require('express');
const router = express.Router();
const {
  getHeroSlides,
  getAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  bulkSaveHeroSlides,
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkSaveCategories,
  getHeroBanners,
  getAllHeroBanners,
  bulkSaveHeroBanners,
  getAllWebsiteContent,
  getWebsiteContentByKey,
  saveWebsiteContentByKey,
  saveAllWebsiteContent,
  getProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkSaveProducts,
  addProductReview,
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  sendOrderEmailNotification,
} = require('../controllers/websiteController');

// 1. Hero Slides
router.route('/hero-slides')
  .get(getHeroSlides)
  .post(createHeroSlide);

router.get('/hero-slides/all', getAllHeroSlides);
router.post('/hero-slides/bulk', bulkSaveHeroSlides);

router.route('/hero-slides/:id')
  .put(updateHeroSlide)
  .delete(deleteHeroSlide);

// 2. Categories
router.route('/categories')
  .get(getCategories)
  .post(createCategory);

router.get('/categories/all', getAllCategories);
router.post('/categories/bulk', bulkSaveCategories);

router.route('/categories/:id')
  .put(updateCategory)
  .delete(deleteCategory);

// 3. Products
router.route('/products')
  .get(getProducts)
  .post(createProduct);

router.get('/products/all', getAllProducts);
router.post('/products/bulk', bulkSaveProducts);

router.route('/products/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.post('/products/:id/reviews', addProductReview);

// 4. Hero Banners
router.route('/hero-banners')
  .get(getHeroBanners);

router.get('/hero-banners/all', getAllHeroBanners);
router.post('/hero-banners/bulk', bulkSaveHeroBanners);

// 5. Universal CMS Content
router.route('/content')
  .get(getAllWebsiteContent);

router.post('/content/save-all', saveAllWebsiteContent);

router.route('/content/:key')
  .get(getWebsiteContentByKey)
  .put(saveWebsiteContentByKey);

// 6. Orders
router.route('/orders')
  .get(getOrders)
  .post(createOrder);

router.route('/orders/:id')
  .put(updateOrderStatus)
  .delete(deleteOrder);

router.post('/orders/:id/send-email', sendOrderEmailNotification);

module.exports = router;

