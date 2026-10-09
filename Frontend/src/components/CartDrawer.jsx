import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from '../utils/cartUtils';
import { getCurrencySymbol } from '../utils/currency';
import { getImageUrl } from '../utils/imageUrl';

const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState(getCartItems());
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const navigate = useNavigate();

  const syncCart = () => {
    setCartItems(getCartItems());
    setCurrencySymbol(getCurrencySymbol());
  };

  useEffect(() => {
    syncCart();

    const handleUpdate = () => syncCart();
    window.addEventListener('pesco_cart_updated', handleUpdate);
    window.addEventListener('pesco_website_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('pesco_cart_updated', handleUpdate);
      window.removeEventListener('pesco_website_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const totalCount = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 1),
    0
  );

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
          width: '380px',
          maxWidth: '90vw',
          backgroundColor: '#FFFFFF',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.18)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'slideLeft 0.3s ease-out forwards',
        }}
      >
        {/* Drawer Header */}
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
              My cart
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
              {totalCount} {totalCount === 1 ? 'item' : 'items'}
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
            title="Close cart"
          >
            <i className="far fa-times" />
          </button>
        </div>

        {/* Drawer Items Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {cartItems.length === 0 ? (
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
                  fontSize: '28px',
                  margin: '0 auto 16px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <i className="fas fa-shopping-bag" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                Discover our luxury brass vases, lanterns & royal artefacts.
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
                Explore Collection
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => {
              const itemImg = getImageUrl(
                item.image,
                '/assets/images/products/brass-cylinder-vase-1.jpg'
              );

              return (
                <div
                  key={`${item.id}-${item.size}-${item.finish}-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      }}
                      title={item.title || item.name}
                    >
                      {item.title || item.name}
                    </h5>

                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      {item.finish && <span>{item.finish}</span>}
                      {item.finish && item.size && <span> • </span>}
                      {item.size && <span>{item.size}</span>}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '8px',
                      }}
                    >
                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #CBD5E1',
                          borderRadius: '4px',
                          backgroundColor: '#FFFFFF',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateCartItemQuantity(item.id, -1, item.size, item.finish)}
                          style={{
                            padding: '2px 7px',
                            border: 'none',
                            background: 'none',
                            color: '#475569',
                            cursor: 'pointer',
                            fontSize: '11px',
                          }}
                        >
                          <i className="far fa-minus" />
                        </button>
                        <span
                          style={{
                            padding: '2px 8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#0F172A',
                            minWidth: '22px',
                            textAlign: 'center',
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartItemQuantity(item.id, 1, item.size, item.finish)}
                          style={{
                            padding: '2px 7px',
                            border: 'none',
                            background: 'none',
                            color: '#475569',
                            cursor: 'pointer',
                            fontSize: '11px',
                          }}
                        >
                          <i className="far fa-plus" />
                        </button>
                      </div>

                      {/* Price */}
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#CC0D39' }}>
                        {currencySymbol}
                        {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    type="button"
                    onClick={() => removeCartItem(item.id, item.size, item.finish)}
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
                    title="Remove item"
                  >
                    <i className="far fa-trash-alt" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer / Checkout Actions */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '18px 24px',
              borderTop: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: 700,
                color: '#0F172A',
              }}
            >
              <span>Subtotal:</span>
              <span style={{ fontSize: '18px', color: '#CC0D39', fontWeight: 800 }}>
                {currencySymbol}
                {subtotal.toFixed(2)}
              </span>
            </div>

            <p style={{ fontSize: '11px', color: '#64748B', margin: 0, textAlign: 'center' }}>
              Taxes and shipping calculated at checkout
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                className="theme-btn style-one"
                onClick={() => {
                  onClose();
                  navigate('/carts?checkout=true');
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>Complete Order & Checkout</span>
                <i className="far fa-arrow-right" />
              </button>

              <button
                type="button"
                className="theme-btn"
                onClick={() => {
                  onClose();
                  navigate('/carts');
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  backgroundColor: '#F8FAFC',
                  color: '#334155',
                  border: '1px solid #CBD5E1',
                  textAlign: 'center',
                }}
              >
                View Full Cart ({totalCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
