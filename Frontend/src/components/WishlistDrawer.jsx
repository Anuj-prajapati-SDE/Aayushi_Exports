import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getWishlistItems,
  removeWishlistItem,
  clearWishlist,
} from '../utils/wishlistUtils';
import { addToCart } from '../utils/cartUtils';
import { getCurrencySymbol } from '../utils/currency';
import { getImageUrl } from '../utils/imageUrl';

const WishlistDrawer = ({ isOpen, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState(getWishlistItems());
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [addedNotification, setAddedNotification] = useState('');
  const navigate = useNavigate();

  const syncWishlist = () => {
    setWishlistItems(getWishlistItems());
    setCurrencySymbol(getCurrencySymbol());
  };

  useEffect(() => {
    syncWishlist();

    const handleUpdate = () => syncWishlist();
    window.addEventListener('pesco_wishlist_updated', handleUpdate);
    window.addEventListener('pesco_website_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('pesco_wishlist_updated', handleUpdate);
      window.removeEventListener('pesco_website_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item, 1, 'Standard', 'Antique Gold');
    setAddedNotification(`"${item.title || item.name}" added to cart!`);
    setTimeout(() => {
      setAddedNotification('');
    }, 2500);
  };

  const handleMoveAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((item) => {
      addToCart(item, 1, 'Standard', 'Antique Gold');
    });
    setAddedNotification('All wishlist items added to cart!');
    setTimeout(() => {
      setAddedNotification('');
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(3px)',
          zIndex: 99998,
          transition: 'opacity 0.3s ease',
        }}
        className="animate-fade-in"
      />

      {/* Slide-out Drawer Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '390px',
          maxWidth: '92vw',
          backgroundColor: '#FFFFFF',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.18)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'slideLeft 0.3s ease-out forwards',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFAF3',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#0F172A',
                margin: 0,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              My Wishlist
            </h3>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#CC0D39',
                backgroundColor: 'rgba(204, 13, 57, 0.1)',
                padding: '2px 8px',
                borderRadius: '12px',
              }}
            >
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 700,
              transition: 'all 0.2s',
            }}
            title="Close Wishlist"
          >
            <i className="far fa-times" />
          </button>
        </div>

        {/* Notification Toast */}
        {addedNotification && (
          <div
            style={{
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              padding: '10px 16px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <span>
              <i className="fas fa-check-circle me-2" />
              {addedNotification}
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                window.dispatchEvent(new CustomEvent('pesco_open_cart_drawer'));
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFF',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              View Cart
            </button>
          </div>
        )}

        {/* Wishlist Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {wishlistItems.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                margin: 'auto',
                color: '#64748B',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#F8FAFC',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  margin: '0 auto 16px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <i className="far fa-heart" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                Your wishlist is empty
              </h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                Click the heart icon on any brass artefact or lantern to save it to your wishlist.
              </p>
              <button
                type="button"
                className="theme-btn style-one"
                onClick={() => {
                  onClose();
                  navigate('/shops');
                }}
                style={{ padding: '8px 20px', fontSize: '13px' }}
              >
                Browse Shop Collection
              </button>
            </div>
          ) : (
            wishlistItems.map((item, idx) => {
              const itemImg = getImageUrl(
                item.image,
                '/assets/images/products/brass-cylinder-vase-1.jpg'
              );

              return (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #F1F5F9',
                    position: 'relative',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={itemImg}
                      alt={item.title || item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = '/assets/images/products/brass-cylinder-vase-1.jpg';
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0F172A',
                        margin: 0,
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        onClose();
                        navigate(`/shop-details?id=${item.id || item.sku}`);
                      }}
                      title={item.title || item.name}
                    >
                      {item.title || item.name}
                    </h5>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#CC0D39' }}>
                        {currencySymbol}
                        {Number(item.price || 0).toFixed(2)}
                      </span>
                      {item.originalPrice && Number(item.originalPrice) > Number(item.price) && (
                        <span style={{ fontSize: '11px', color: '#94A3B8', textDecoration: 'line-through' }}>
                          {currencySymbol}
                          {Number(item.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Quick Button */}
                    <div style={{ marginTop: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: '#CC0D39',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <i className="far fa-shopping-basket" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeWishlistItem(item.id || item._id || item.sku)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '4px',
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontSize: '13px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#DC2626')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                    title="Remove from wishlist"
                  >
                    <i className="far fa-trash-alt" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {wishlistItems.length > 0 && (
          <div
            style={{
              padding: '18px 24px',
              borderTop: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <button
              type="button"
              className="theme-btn style-one"
              onClick={handleMoveAllToCart}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '13px',
                fontWeight: 700,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <i className="fas fa-shopping-bag" />
              <span>Move All to Cart</span>
            </button>

            <button
              type="button"
              onClick={() => clearWishlist()}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                fontSize: '12px',
                fontWeight: 600,
                textAlign: 'center',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Clear Entire Wishlist
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;
