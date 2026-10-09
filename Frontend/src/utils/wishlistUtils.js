/**
 * Universal Wishlist State & Utilities for Pesco Handicrafts
 */

export const getWishlistItems = () => {
  try {
    const raw = localStorage.getItem('pesco_wishlist');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}

  // Fallback demo wishlist item if freshly initialized
  const defaultWishlist = [
    {
      id: 'prod-1',
      title: 'Handcrafted Antique Brass Cylindrical Jali Pillar Vase',
      name: 'Handcrafted Antique Brass Cylindrical Jali Pillar Vase',
      price: 79.0,
      originalPrice: 120.0,
      image: 'assets/images/products/brass-cylinder-vase-1.jpg',
      category: 'Vases & Urns',
      inStock: true,
    },
  ];

  localStorage.setItem('pesco_wishlist', JSON.stringify(defaultWishlist));
  return defaultWishlist;
};

export const saveWishlistItems = (items) => {
  localStorage.setItem('pesco_wishlist', JSON.stringify(items));
  window.dispatchEvent(new Event('pesco_wishlist_updated'));
  window.dispatchEvent(new Event('storage'));
};

export const isInWishlist = (productId) => {
  if (!productId) return false;
  const items = getWishlistItems();
  const idStr = String(productId);
  return items.some((item) => String(item.id || item._id || item.sku) === idStr);
};

export const toggleWishlist = (product) => {
  if (!product) return false;
  const items = getWishlistItems();
  const pId = String(product._id || product.id || product.sku || `prod-${Date.now()}`);

  const exists = items.some((item) => String(item.id || item._id || item.sku) === pId);

  let updated;
  if (exists) {
    // Remove from wishlist
    updated = items.filter((item) => String(item.id || item._id || item.sku) !== pId);
    saveWishlistItems(updated);
    return false; // Not in wishlist anymore
  } else {
    // Add to wishlist
    const pPrice = Number(product.salePrice || product.price || 79.0);
    const pOrigPrice = Number(product.price || pPrice);
    const pImage =
      product.image ||
      product.img ||
      (product.gallery && product.gallery[0]) ||
      'assets/images/products/brass-cylinder-vase-1.jpg';

    const newItem = {
      id: pId,
      sku: product.sku || 'RB-PRD-101',
      title: product.name || product.title || 'Handcrafted Brass Artefact',
      price: pPrice,
      originalPrice: pOrigPrice,
      image: pImage,
      category: product.category || 'Handcrafted Brass',
      inStock: true,
      addedAt: new Date().toISOString(),
    };

    updated = [newItem, ...items];
    saveWishlistItems(updated);
    // Trigger open drawer on first like for clear feedback
    window.dispatchEvent(new CustomEvent('pesco_open_wishlist_drawer'));
    return true; // Added to wishlist
  }
};

export const removeWishlistItem = (productId) => {
  const items = getWishlistItems();
  const idStr = String(productId);
  const updated = items.filter((item) => String(item.id || item._id || item.sku) !== idStr);
  saveWishlistItems(updated);
  return updated;
};

export const clearWishlist = () => {
  saveWishlistItems([]);
  return [];
};

export const getWishlistCount = () => {
  const items = getWishlistItems();
  return items.length;
};

export default {
  getWishlistItems,
  saveWishlistItems,
  isInWishlist,
  toggleWishlist,
  removeWishlistItem,
  clearWishlist,
  getWishlistCount,
};
