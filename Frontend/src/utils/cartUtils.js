/**
 * Universal Cart State & Utilities for Pesco Handicrafts
 */

export const getCartItems = () => {
  try {
    const raw = localStorage.getItem('pesco_cart');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}

  // Fallback initial demo items if cart is freshly empty
  const defaultItems = [
    {
      id: 'prod-1',
      title: 'Handcrafted Antique Brass Cylindrical Jali Pillar Vase',
      price: 79.0,
      originalPrice: 120.0,
      quantity: 1,
      image: 'assets/images/products/brass-cylinder-vase-1.jpg',
      finish: 'Antique Gold',
      size: 'Medium (12")',
    },
    {
      id: 'prod-2',
      title: 'Vintage Moroccan Glass & Metal Fairy Lanterns (Set of 3 - White)',
      price: 59.0,
      originalPrice: 95.0,
      quantity: 1,
      image: 'assets/images/products/white-moroccan-lanterns.jpg',
      finish: 'Pearl White',
      size: 'Set of 3',
    },
  ];

  localStorage.setItem('pesco_cart', JSON.stringify(defaultItems));
  return defaultItems;
};

export const saveCartItems = (items) => {
  localStorage.setItem('pesco_cart', JSON.stringify(items));
  window.dispatchEvent(new Event('pesco_cart_updated'));
  window.dispatchEvent(new Event('storage'));
};

export const addToCart = (product, quantity = 1, size = '', color = '') => {
  const currentItems = getCartItems();
  const pId = product._id || product.id || `prod-${Date.now()}`;
  const pSize = size || (product.sizes && product.sizes[0]) || 'Standard';
  const pFinish = color || (product.colors && product.colors[0]) || 'Antique Gold';

  // Check if same item + variant exists
  const existingIndex = currentItems.findIndex(
    (item) => item.id === pId && item.size === pSize && item.finish === pFinish
  );

  let updated;
  if (existingIndex > -1) {
    updated = currentItems.map((item, idx) =>
      idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
    );
  } else {
    const pPrice = Number(product.salePrice || product.price || 79.0);
    const pOrigPrice = Number(product.price || pPrice);
    const pImage = product.image || product.img || (product.gallery && product.gallery[0]) || 'assets/images/products/brass-cylinder-vase-1.jpg';

    const newItem = {
      id: pId,
      sku: product.sku || 'RB-PRD-101',
      title: product.name || product.title || 'Handcrafted Brass Artefact',
      price: pPrice,
      originalPrice: pOrigPrice,
      quantity: quantity > 0 ? quantity : 1,
      image: pImage,
      finish: pFinish,
      size: pSize,
    };
    updated = [newItem, ...currentItems];
  }

  saveCartItems(updated);

  // Trigger cart drawer open
  window.dispatchEvent(new CustomEvent('pesco_open_cart_drawer'));
  return updated;
};

export const updateCartItemQuantity = (id, delta, size = '', finish = '') => {
  const currentItems = getCartItems();
  const updated = currentItems.map((item) => {
    const matchesId = item.id === id;
    const matchesSize = size ? item.size === size : true;
    const matchesFinish = finish ? item.finish === finish : true;

    if (matchesId && matchesSize && matchesFinish) {
      const newQ = item.quantity + delta;
      return { ...item, quantity: newQ > 1 ? newQ : 1 };
    }
    return item;
  });

  saveCartItems(updated);
  return updated;
};

export const removeCartItem = (id, size = '', finish = '') => {
  const currentItems = getCartItems();
  const updated = currentItems.filter((item) => {
    if (item.id === id) {
      if (size && item.size !== size) return true;
      if (finish && item.finish !== finish) return true;
      return false;
    }
    return true;
  });

  saveCartItems(updated);
  return updated;
};

export const clearAllCart = () => {
  saveCartItems([]);
  return [];
};

export const getCartTotalCount = () => {
  const items = getCartItems();
  return items.reduce((acc, i) => acc + (i.quantity || 1), 0);
};

export default {
  getCartItems,
  saveCartItems,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearAllCart,
  getCartTotalCount,
};
