/**
 * Universal Image URL Helper for Frontend
 * Resolves images whether they are:
 * 1. Full absolute URLs (e.g. http://localhost:5000/uploads/hero/xyz.png, https://images.unsplash.com/...)
 * 2. Backend relative uploads (e.g. /uploads/categories/xyz.png or uploads/categories/xyz.png)
 * 3. Storefront static assets (e.g. assets/images/products/... or /assets/images/...)
 * 4. Empty/null fallbacks
 */

const BACKEND_URL = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || 'http://localhost:5000';

export const getImageUrl = (url, fallback = '/assets/images/products/brass-cylinder-vase-1.jpg') => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback.startsWith('http') || fallback.startsWith('/') ? fallback : `/${fallback}`;
  }

  const cleanUrl = url.trim();

  // Full absolute URLs (http, https, data URI)
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') || cleanUrl.startsWith('data:')) {
    return cleanUrl;
  }

  // Backend uploads folder path
  if (cleanUrl.startsWith('/uploads/') || cleanUrl.startsWith('uploads/')) {
    const relativePath = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
    return `${BACKEND_URL}${relativePath}`;
  }

  // Frontend public assets (ensure leading slash for nested routes like /shop-details)
  if (cleanUrl.startsWith('/assets/') || cleanUrl.startsWith('assets/')) {
    return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
  }

  // Generic relative path
  if (cleanUrl.startsWith('/')) {
    return cleanUrl;
  }

  return `/${cleanUrl}`;
};

export default getImageUrl;
