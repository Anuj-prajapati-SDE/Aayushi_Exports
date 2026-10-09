/**
 * Store Currency Utility
 * Handles dynamic store currency (USD $ vs INR ₹) across all storefront pages
 */

export const getStoredCurrency = () => {
  try {
    const raw = localStorage.getItem('pesco_store_settings');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.currency) return parsed.currency;
    }
  } catch (e) {}
  return 'USD ($)';
};

export const getCurrencySymbol = (currencyStr) => {
  const cur = currencyStr || getStoredCurrency();
  if (cur && (cur.includes('INR') || cur.includes('₹') || cur.includes('Rupee'))) {
    return '₹';
  }
  return '$';
};

export const formatPrice = (amount, currencyStr) => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  const symbol = getCurrencySymbol(currencyStr);
  return `${symbol}${num.toFixed(2)}`;
};

export default {
  getStoredCurrency,
  getCurrencySymbol,
  formatPrice,
};
