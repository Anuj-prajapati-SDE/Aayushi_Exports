import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearAllCart,
} from "../../utils/cartUtils";
import { getCurrencySymbol } from "../../utils/currency";
import { getImageUrl } from "../../utils/imageUrl";

const defaultCartSettings = {
  bannerTitle: "Your Shopping Cart",
  freeShippingThreshold: "100.00",
  flatShippingFee: "15.00",
  expressShippingFee: "25.00",
  taxRate: "5.0%",
  coupons: [
    { id: "c-1", code: "ROYAL15", discount: "15% Off", type: "Percentage", minSpend: "$50.00", isActive: true },
    { id: "c-2", code: "BRASS30", discount: "30% Off", type: "Percentage", minSpend: "$150.00", isActive: true },
    { id: "c-3", code: "FREESHIP", discount: "Free Delivery", type: "Shipping", minSpend: "$30.00", isActive: true },
  ],
};

function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation steps: 1 = 'cart', 2 = 'checkout_form', 3 = 'order_preview'
  const [activeStep, setActiveStep] = useState(1);

  const [cartSettings, setCartSettings] = useState(defaultCartSettings);
  const [cartItems, setCartItems] = useState(getCartItems());
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [shippingType, setShippingType] = useState("flat"); // 'free' | 'flat' | 'express'

  // Customer registration & delivery information state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    orderNotes: "",
    paymentMethod: "Cash on Delivery",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Sync cart and currency state
  const syncCartState = () => {
    setCartItems(getCartItems());
    setCurrencySymbol(getCurrencySymbol());
  };

  const fetchCartSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/website/content/cart_page`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setCartSettings(result.data);
        }
      }
    } catch (e) {
      console.warn("[CartPage] Using fallback settings:", e.message);
    }
  };

  useEffect(() => {
    syncCartState();
    fetchCartSettings();

    // Check if query params ask to go direct to checkout
    const params = new URLSearchParams(location.search);
    if (params.get("checkout") === "true") {
      setActiveStep(2);
    }

    const handleUpdate = () => {
      syncCartState();
      fetchCartSettings();
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pesco_cart_updated", handleUpdate);
    window.addEventListener("pesco_website_updated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pesco_cart_updated", handleUpdate);
      window.removeEventListener("pesco_website_updated", handleUpdate);
    };
  }, [location.search]);

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const freeThreshold = Number(cartSettings.freeShippingThreshold) || 100;
  const flatFee = Number(cartSettings.flatShippingFee) || 15;
  const expressFee = Number(cartSettings.expressShippingFee) || 25;

  let shippingCost = 0;
  if (shippingType === "free" || (subtotal >= freeThreshold && shippingType !== "express")) {
    shippingCost = 0;
  } else if (shippingType === "express") {
    shippingCost = expressFee;
  } else {
    shippingCost = flatFee;
  }

  const taxPercentage = parseFloat(cartSettings.taxRate) || 5;
  const taxAmount = (subtotal * taxPercentage) / 100;
  const total = Math.max(0, subtotal - appliedDiscount + shippingCost + taxAmount);

  // Cart actions
  const handleQuantityChange = (id, delta, size, finish) => {
    updateCartItemQuantity(id, delta, size, finish);
    syncCartState();
  };

  const handleRemoveItem = (id, size, finish) => {
    removeCartItem(id, size, finish);
    syncCartState();
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      clearAllCart();
      syncCartState();
      setActiveStep(1);
    }
  };

  // Coupon application
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const availableCoupons = cartSettings.coupons || defaultCartSettings.coupons;
    const found = availableCoupons.find(
      (c) => c.code.toUpperCase() === code && c.isActive !== false
    );

    if (found) {
      if (found.type === "Percentage") {
        const percent = parseFloat(found.discount) || 15;
        const discountAmount = (subtotal * percent) / 100;
        setAppliedDiscount(discountAmount);
        setCouponMessage(`Coupon "${found.code}" applied! Saved ${currencySymbol}${discountAmount.toFixed(2)} (${found.discount})`);
      } else if (found.type === "Shipping") {
        setShippingType("free");
        setAppliedDiscount(flatFee);
        setCouponMessage(`Coupon "${found.code}" applied! Free Delivery activated.`);
      } else {
        const flatDiscount = parseFloat(found.discount) || 10;
        setAppliedDiscount(flatDiscount);
        setCouponMessage(`Coupon "${found.code}" applied! Saved ${currencySymbol}${flatDiscount.toFixed(2)}`);
      }
    } else {
      setCouponMessage("Invalid or expired coupon code.");
    }
  };

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Contact phone number is required";
    } else if (formData.phone.trim().length < 8) {
      errors.phone = "Please enter a valid contact number";
    }
    if (!formData.address.trim()) errors.address = "Delivery street address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State / Province is required";
    if (!formData.postalCode.trim()) errors.postalCode = "PIN / Postal code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPreview = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setActiveStep(3);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  // Place order submission
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderPayload = {
      id: generatedOrderId,
      customer: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      shippingAddress: {
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      orderNotes: formData.orderNotes,
      paymentMethod: formData.paymentMethod,
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title || item.name,
        price: Number(item.price),
        quantity: item.quantity,
        size: item.size || "",
        finish: item.finish || "",
        image: item.image,
      })),
      pricing: {
        currency: currencySymbol,
        subtotal: subtotal,
        discount: appliedDiscount,
        shippingFee: shippingCost,
        shippingType: shippingType,
        taxAmount: taxAmount,
        totalAmount: total,
      },
      status: "Processing",
      paymentStatus: formData.paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      const response = await fetch(`${API_URL}/api/website/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setOrderSuccessData(data.data || orderPayload);
      } else {
        // Even if offline or mock, generate friendly response
        setOrderSuccessData(orderPayload);
      }
    } catch (err) {
      console.warn("Order endpoint warning, continuing with client confirmation:", err);
      setOrderSuccessData(orderPayload);
    } finally {
      setIsSubmitting(false);
      clearAllCart();
      syncCartState();
      setShowThankYouModal(true);
    }
  };

  return (
    <main className="main-bg" style={{ minHeight: "100vh" }}>
      {/*====== Start Page Banner Section ======*/}
      <section className="page-banner">
        <div className="page-banner-wrapper p-r z-1">
          <svg
            className="lineanm"
            viewBox="0 0 1920 347"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="line"
              d="M-39 345.187C70 308.353 397.628 293.477 436 145.186C490 -63.5 572 -57.8156 688 255.186C757.071 441.559 989.5 -121.315 1389 98.6856C1708.6 274.686 1940.33 156.519 1964.5 98.6856"
              stroke="white"
              strokeWidth={3}
              strokeDasharray="2 2"
            />
          </svg>
          <div className="page-image">
            <img src="assets/images/bg/page-img-1.png" alt="Handcrafted Metal Banner" />
          </div>
          <svg className="page-svg" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.1742 33.0065C14.029 35.2507 7.5486 39.0636 0 40.7339V86H1937V64.9942C1933.1 60.1623 1912.65 65.1777 1904.51 62.6581C1894.22 59.4678 1884.93 55.0079 1873.77 52.7742C1861.2 50.2585 1823.41 36.3854 1811.99 39.9252C1805.05 42.0727 1796.94 37.6189 1789.36 36.6007C1769.18 33.8879 1747.19 31.1848 1726.71 29.7718C1703.81 28.1919 1678.28 27.0012 1657.53 34.4442C1636.45 42.005 1606.07 60.856 1579.5 55.9191C1561.6 52.5906 1543.41 47.0959 1528.45 56.9075C1510.85 68.4592 1485.74 74.2518 1460.44 76.136C1432.32 78.2297 1408.53 70.6879 1384.73 62.2987C1339.52 46.361 1298.19 27.1677 1255.08 9.28534C1242.58 4.10111 1214.68 15.4762 1200.55 16.6533C1189.77 17.5509 1181.74 15.4508 1172.12 12.8795C1152.74 7.70033 1133.23 2.88525 1111.79 2.63621C1088.85 2.36971 1073.94 7.88289 1056.53 15.8446C1040.01 23.3996 1027.48 26.1777 1007.8 26.1777C993.757 26.1777 975.854 25.6887 962.844 28.9632C941.935 34.2258 932.059 38.7874 914.839 28.6037C901.654 20.8061 866.261 -2.56499 844.356 7.12886C831.264 12.9222 820.932 21.5146 807.663 27.5255C798.74 31.5679 779.299 42.0561 766.33 39.1166C758.156 37.2637 751.815 31.6349 745.591 28.2443C730.967 20.2774 715.218 13.2948 695.846 10.723C676.168 8.11038 658.554 23.1787 641.606 27.4357C617.564 33.4742 602.283 27.7951 579.244 27.7951C568.142 27.7951 548.414 30.4002 541.681 23.6618C535.297 17.2722 530.162 9.74921 523.263 3.71444C517.855 -1.01577 505.798 -0.852017 498.318 2.09709C479.032 9.7007 453.07 10.0516 431.025 9.64475C407.556 9.21163 368.679 1.61612 346.618 10.3636C319.648 21.0575 291.717 53.8338 254.67 45.2266C236.134 40.9201 225.134 37.5813 204.78 40.7339C186.008 43.6415 171.665 50.7785 156.051 57.3567C146.567 61.3523 152.335 52.6281 151.12 47.9222C149.535 41.7853 139.994 34.5585 132.991 30.4008C120.206 22.8098 90.2848 24.3246 74.2546 24.6502C55.5552 25.0301 37.9201 27.747 21.1742 33.0065Z"
              fill="#FFFAF3"
            />
          </svg>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="page-banner-content">
                  <h1>
                    {activeStep === 1
                      ? cartSettings.bannerTitle || "Your Shopping Cart"
                      : activeStep === 2
                      ? "Checkout & Shipping"
                      : "Order Verification & Preview"}
                  </h1>
                  <ul className="breadcrumb-link">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <i className="far fa-long-arrow-right" />
                    </li>
                    <li className="active">
                      {activeStep === 1 ? "Cart" : activeStep === 2 ? "Checkout" : "Preview"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Page Banner Section ======*/}

      {/*====== Start Cart & Checkout Section ======*/}
      <section className="cart-page-section pt-80 pb-100">
        <div className="container">
          {/* Stepper Header Navigation */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "14px",
              padding: "20px 28px",
              marginBottom: "40px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {/* Step 1 */}
            <div
              onClick={() => setActiveStep(1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                opacity: activeStep >= 1 ? 1 : 0.6,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: activeStep === 1 ? "#CC0D39" : "#10B981",
                  color: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                {activeStep > 1 ? <i className="fas fa-check" /> : "1"}
              </div>
              <div>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748B", fontWeight: 700 }}>
                  Step 01
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>
                  Shopping Cart ({cartItems.length})
                </div>
              </div>
            </div>

            <div style={{ flex: 1, height: "1px", backgroundColor: "#E2E8F0", minWidth: "30px", margin: "0 10px" }} />

            {/* Step 2 */}
            <div
              onClick={() => {
                if (cartItems.length > 0) setActiveStep(2);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: cartItems.length > 0 ? "pointer" : "not-allowed",
                opacity: activeStep >= 2 ? 1 : 0.6,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: activeStep === 2 ? "#CC0D39" : activeStep > 2 ? "#10B981" : "#E2E8F0",
                  color: activeStep >= 2 ? "#FFF" : "#64748B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                {activeStep > 2 ? <i className="fas fa-check" /> : "2"}
              </div>
              <div>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748B", fontWeight: 700 }}>
                  Step 02
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>
                  Customer & Shipping Form
                </div>
              </div>
            </div>

            <div style={{ flex: 1, height: "1px", backgroundColor: "#E2E8F0", minWidth: "30px", margin: "0 10px" }} />

            {/* Step 3 */}
            <div
              onClick={() => {
                if (cartItems.length > 0 && validateForm()) setActiveStep(3);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: cartItems.length > 0 ? "pointer" : "not-allowed",
                opacity: activeStep >= 3 ? 1 : 0.6,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: activeStep === 3 ? "#CC0D39" : "#E2E8F0",
                  color: activeStep === 3 ? "#FFF" : "#64748B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                3
              </div>
              <div>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748B", fontWeight: 700 }}>
                  Step 03
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>
                  Order Preview & Confirm
                </div>
              </div>
            </div>
          </div>

          {/* Empty Cart State */}
          {cartItems.length === 0 && !showThankYouModal ? (
            <div
              className="text-center py-5"
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "80px 20px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 25px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(204, 13, 57, 0.08)",
                  color: "#CC0D39",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  margin: "0 auto 20px",
                }}
              >
                <i className="fas fa-shopping-bag" />
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", marginBottom: "8px" }}>
                Your Shopping Cart is Empty
              </h3>
              <p className="text-muted" style={{ maxWidth: "460px", margin: "0 auto 24px" }}>
                Explore our authentic handcrafted Moradabad brass artefacts, antique lanterns, and royal decor.
              </p>
              <Link to="/shops" className="theme-btn style-one">
                Explore Shop Collection
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {/* Left Column Content Based on Active Step */}
              <div className="col-xl-8">
                {/* ================= STEP 1: CART ITEMS TABLE ================= */}
                {activeStep === 1 && (
                  <div
                    className="cart-wrapper"
                    style={{
                      backgroundColor: "#FFF",
                      borderRadius: "14px",
                      padding: "28px",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-24 pb-3" style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <h4 className="m-0" style={{ fontSize: "20px", fontWeight: 800 }}>
                        Cart Products ({cartItems.length})
                      </h4>
                      {subtotal >= freeThreshold && (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            color: "#10B981",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: 700,
                            borderRadius: "20px",
                          }}
                        >
                          <i className="fas fa-truck me-1" /> Eligible for Free Shipping!
                        </span>
                      )}
                    </div>

                    <div className="cart-list table-responsive">
                      <table className="table align-middle" style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
                        <thead>
                          <tr style={{ color: "#64748B", fontSize: "13px", borderBottom: "1px solid #E2E8F0" }}>
                            <th style={{ paddingBottom: "12px" }}>Product Item</th>
                            <th style={{ paddingBottom: "12px" }}>Unit Price</th>
                            <th style={{ paddingBottom: "12px", textAlign: "center" }}>Quantity</th>
                            <th style={{ paddingBottom: "12px", textAlign: "right" }}>Subtotal</th>
                            <th style={{ paddingBottom: "12px", width: "40px" }} />
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, idx) => {
                            const itemImage = getImageUrl(
                              item.image,
                              "/assets/images/products/brass-cylinder-vase-1.jpg"
                            );

                            return (
                              <tr
                                key={`${item.id}-${item.size}-${item.finish}-${idx}`}
                                style={{
                                  backgroundColor: "#FAFAFA",
                                  borderRadius: "8px",
                                }}
                              >
                                <td style={{ padding: "14px 16px", borderRadius: "8px 0 0 8px" }}>
                                  <div className="product-thumb-item d-flex align-items-center">
                                    <div
                                      style={{
                                        width: "64px",
                                        height: "64px",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        flexShrink: 0,
                                        backgroundColor: "#FFF",
                                        border: "1px solid #E2E8F0",
                                        marginRight: "16px",
                                      }}
                                    >
                                      <img
                                        src={itemImage}
                                        alt={item.title || item.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        onError={(e) => {
                                          e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                                        }}
                                      />
                                    </div>
                                    <div className="product-info">
                                      <h5 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px", color: "#0F172A" }}>
                                        <Link to="/shops" style={{ color: "#0F172A" }}>
                                          {item.title || item.name}
                                        </Link>
                                      </h5>
                                      <div style={{ fontSize: "12px", color: "#64748B" }}>
                                        {item.finish && <span>{item.finish}</span>}
                                        {item.finish && item.size && <span> • </span>}
                                        {item.size && <span>{item.size}</span>}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td style={{ padding: "14px 16px", fontWeight: 700, color: "#334155" }}>
                                  {currencySymbol}
                                  {Number(item.price || 0).toFixed(2)}
                                </td>

                                <td style={{ padding: "14px 16px" }}>
                                  <div className="d-flex justify-content-center align-items-center">
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #CBD5E1",
                                        borderRadius: "6px",
                                        backgroundColor: "#FFFFFF",
                                      }}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => handleQuantityChange(item.id, -1, item.size, item.finish)}
                                        style={{
                                          padding: "4px 8px",
                                          border: "none",
                                          background: "none",
                                          cursor: "pointer",
                                          color: "#475569",
                                        }}
                                      >
                                        <i className="far fa-minus" />
                                      </button>
                                      <span style={{ minWidth: "28px", textAlign: "center", fontWeight: 700, fontSize: "13px" }}>
                                        {item.quantity}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleQuantityChange(item.id, 1, item.size, item.finish)}
                                        style={{
                                          padding: "4px 8px",
                                          border: "none",
                                          background: "none",
                                          cursor: "pointer",
                                          color: "#475569",
                                        }}
                                      >
                                        <i className="far fa-plus" />
                                      </button>
                                    </div>
                                  </div>
                                </td>

                                <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 800, color: "#CC0D39" }}>
                                  {currencySymbol}
                                  {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                                </td>

                                <td style={{ padding: "14px 16px", borderRadius: "0 8px 8px 0", textAlign: "center" }}>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(item.id, item.size, item.finish)}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#94A3B8",
                                      cursor: "pointer",
                                      padding: "6px",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
                                    title="Remove item"
                                  >
                                    <i className="far fa-trash-alt" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom Cart Action Controls */}
                    <div
                      className="d-flex align-items-center justify-content-between mt-30 pt-3"
                      style={{ borderTop: "1px solid #F1F5F9", flexWrap: "wrap", gap: "12px" }}
                    >
                      <Link to="/shops" className="theme-btn" style={{ backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", color: "#334155" }}>
                        <i className="far fa-arrow-left me-2" /> Continue Shopping
                      </Link>

                      <button
                        type="button"
                        onClick={handleClearCart}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#64748B",
                          fontWeight: 600,
                          fontSize: "13px",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Clear Shopping Cart
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STEP 2: CUSTOMER & DELIVERY REGISTRATION FORM ================= */}
                {activeStep === 2 && (
                  <div
                    style={{
                      backgroundColor: "#FFF",
                      borderRadius: "14px",
                      padding: "32px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                    }}
                  >
                    <div className="mb-28 pb-3" style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
                        Delivery & Customer Information
                      </h4>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
                        Please provide your contact and delivery address to ensure secure delivery of your brass artefact.
                      </p>
                    </div>

                    <form onSubmit={handleProceedToPreview}>
                      <div className="row g-3">
                        {/* Full Name */}
                        <div className="col-md-6">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            Full Name <span style={{ color: "#CC0D39" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. Ramesh Sharma"
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: formErrors.fullName ? "1px solid #DC2626" : "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                            }}
                          />
                          {formErrors.fullName && (
                            <span style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                              {formErrors.fullName}
                            </span>
                          )}
                        </div>

                        {/* Email Address */}
                        <div className="col-md-6">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            Email Address <span style={{ color: "#CC0D39" }}>*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="name@domain.com"
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: formErrors.email ? "1px solid #DC2626" : "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                            }}
                          />
                          {formErrors.email && (
                            <span style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                              {formErrors.email}
                            </span>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div className="col-md-6">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            Phone Number <span style={{ color: "#CC0D39" }}>*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: formErrors.phone ? "1px solid #DC2626" : "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                            }}
                          />
                          {formErrors.phone && (
                            <span style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                              {formErrors.phone}
                            </span>
                          )}
                        </div>

                        {/* Country */}
                        <div className="col-md-6">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            Country / Region <span style={{ color: "#CC0D39" }}>*</span>
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                              height: "48px",
                            }}
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>

                        {/* Street Address */}
                        <div className="col-12">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            Street / Delivery Address <span style={{ color: "#CC0D39" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="House / Flat No., Building Name, Street Name, Landmark"
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: formErrors.address ? "1px solid #DC2626" : "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                            }}
                          />
                          {formErrors.address && (
                            <span style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                              {formErrors.address}
                            </span>
                          )}
                        </div>

                        {/* City */}
                        <div className="col-md-4">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            City <span style={{ color: "#CC0D39" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g. Moradabad / Delhi"
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: formErrors.city ? "1px solid #DC2626" : "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                            }}
                          />
                          {formErrors.city && (
                            <span style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                              {formErrors.city}
                            </span>
                          )}
                        </div>

                        {/* State */}
                        <div className="col-md-4">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            State / Province <span style={{ color: "#CC0D39" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="e.g. Uttar Pradesh"
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: formErrors.state ? "1px solid #DC2626" : "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                            }}
                          />
                          {formErrors.state && (
                            <span style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                              {formErrors.state}
                            </span>
                          )}
                        </div>

                        {/* PIN Code */}
                        <div className="col-md-4">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            PIN / Postal Code <span style={{ color: "#CC0D39" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="e.g. 244001"
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: formErrors.postalCode ? "1px solid #DC2626" : "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                            }}
                          />
                          {formErrors.postalCode && (
                            <span style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                              {formErrors.postalCode}
                            </span>
                          )}
                        </div>

                        {/* Payment Method Selector */}
                        <div className="col-12 mt-3">
                          <label style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A", marginBottom: "10px", display: "block" }}>
                            Select Payment Method
                          </label>
                          <div className="row g-2">
                            {[
                              { id: "cod", name: "Cash on Delivery", icon: "fas fa-money-bill-wave", desc: "Pay upon safe doorstep delivery" },
                             
                            ].map((pm) => (
                              <div className="col-md-4" key={pm.id}>
                                <div
                                  onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: pm.name }))}
                                  style={{
                                    border: formData.paymentMethod === pm.name ? "2px solid #CC0D39" : "1px solid #E2E8F0",
                                    backgroundColor: formData.paymentMethod === pm.name ? "#FFF9FA" : "#FAFAFA",
                                    borderRadius: "10px",
                                    padding: "14px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    height: "100%",
                                  }}
                                >
                                  <div className="d-flex align-items-center gap-2 mb-1">
                                    <i className={`${pm.icon} ${formData.paymentMethod === pm.name ? "text-danger" : "text-muted"}`} />
                                    <strong style={{ fontSize: "13px", color: "#0F172A" }}>{pm.name}</strong>
                                  </div>
                                  <div style={{ fontSize: "11px", color: "#64748B" }}>{pm.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Notes */}
                        <div className="col-12 mt-3">
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px", display: "block" }}>
                            Special Delivery Instructions / Artisan Notes (Optional)
                          </label>
                          <textarea
                            name="orderNotes"
                            value={formData.orderNotes}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Any specific instructions for packaging, gift notes, or delivery timing..."
                            className="form_control"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              border: "1px solid #CBD5E1",
                              backgroundColor: "#FAFAFA",
                            }}
                          />
                        </div>

                        {/* Navigation Actions */}
                        <div className="col-12 d-flex justify-content-between align-items-center mt-4 pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
                          <button
                            type="button"
                            onClick={() => setActiveStep(1)}
                            className="theme-btn"
                            style={{ backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", color: "#334155" }}
                          >
                            <i className="far fa-arrow-left me-2" /> Back to Cart
                          </button>

                          <button type="submit" className="theme-btn style-one">
                            Continue to Order Preview <i className="far fa-arrow-right ms-2" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* ================= STEP 3: ORDER PREVIEW TAB ================= */}
                {activeStep === 3 && (
                  <div
                    style={{
                      backgroundColor: "#FFF",
                      borderRadius: "14px",
                      padding: "32px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                    }}
                  >
                    <div className="mb-28 pb-3" style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
                        Review & Confirm Your Order
                      </h4>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
                        Please review all details before confirming your order.
                      </p>
                    </div>

                    {/* Customer & Shipping Details Preview Box */}
                    <div
                      style={{
                        backgroundColor: "#FFFAF3",
                        border: "1px solid #FDE68A",
                        borderRadius: "10px",
                        padding: "18px 20px",
                        marginBottom: "24px",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong style={{ fontSize: "14px", color: "#92400E" }}>
                          <i className="fas fa-map-marker-alt me-2" /> Delivery Address & Contact
                        </strong>
                        <button
                          type="button"
                          onClick={() => setActiveStep(2)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#CC0D39",
                            fontSize: "12px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          <i className="far fa-edit me-1" /> Edit Information
                        </button>
                      </div>

                      <div className="row g-2" style={{ fontSize: "13px", color: "#451A03" }}>
                        <div className="col-md-6">
                          <strong>Customer Name:</strong> {formData.fullName}
                        </div>
                        <div className="col-md-6">
                          <strong>Contact Phone:</strong> {formData.phone}
                        </div>
                        <div className="col-md-6">
                          <strong>Email:</strong> {formData.email}
                        </div>
                        <div className="col-md-6">
                          <strong>Payment Method:</strong> {formData.paymentMethod}
                        </div>
                        <div className="col-12 mt-2 pt-2" style={{ borderTop: "1px dashed rgba(217, 119, 6, 0.3)" }}>
                          <strong>Shipping Destination:</strong> {formData.address}, {formData.city},{" "}
                          {formData.state} - {formData.postalCode}, {formData.country}
                        </div>
                        {formData.orderNotes && (
                          <div className="col-12 mt-1">
                            <strong>Order Notes:</strong> {formData.orderNotes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items Preview List */}
                    <h5 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "12px", color: "#0F172A" }}>
                      Ordered Handcrafted Artefacts ({cartItems.length})
                    </h5>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                      {cartItems.map((item, idx) => {
                        const itemImg = getImageUrl(
                          item.image,
                          "/assets/images/products/brass-cylinder-vase-1.jpg"
                        );

                        return (
                          <div
                            key={`preview-${item.id}-${idx}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "12px 16px",
                              backgroundColor: "#FAFAFA",
                              borderRadius: "8px",
                              border: "1px solid #F1F5F9",
                            }}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={itemImg}
                                alt={item.title || item.name}
                                style={{ width: "48px", height: "48px", borderRadius: "6px", objectFit: "cover" }}
                              />
                              <div>
                                <h6 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 2px", color: "#0F172A" }}>
                                  {item.title || item.name}
                                </h6>
                                <div style={{ fontSize: "11px", color: "#64748B" }}>
                                  Qty: <b>{item.quantity}</b>
                                  {item.finish && <span> • {item.finish}</span>}
                                  {item.size && <span> • {item.size}</span>}
                                </div>
                              </div>
                            </div>

                            <div style={{ fontSize: "14px", fontWeight: 800, color: "#CC0D39" }}>
                              {currencySymbol}
                              {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit Order Action Button */}
                    <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="theme-btn"
                        style={{ backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", color: "#334155" }}
                        disabled={isSubmitting}
                      >
                        <i className="far fa-arrow-left me-2" /> Back
                      </button>

                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        className="theme-btn style-one"
                        disabled={isSubmitting}
                        style={{
                          padding: "14px 28px",
                          fontSize: "15px",
                          fontWeight: 800,
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin me-2" /> Submitting Order...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-lock me-2" /> Complete & Confirm Order ({currencySymbol}
                            {total.toFixed(2)})
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Order Summary & Coupon Card */}
              <div className="col-xl-4">
                <div className="cart-sidebar-area">
                  {/* Coupon Code Widget */}
                  {activeStep === 1 && (
                    <div
                      className="cart-widget mb-30 p-4"
                      style={{ background: "#fff", borderRadius: "14px", border: "1px solid #E2E8F0" }}
                    >
                      <h5 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px" }}>Have a Coupon Code?</h5>
                      <form onSubmit={handleApplyCoupon}>
                        <div className="d-flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. ROYAL15, FREESHIP"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            style={{
                              flex: 1,
                              padding: "10px 14px",
                              borderRadius: "6px",
                              border: "1px solid #CBD5E1",
                              fontSize: "13px",
                            }}
                          />
                          <button
                            type="submit"
                            className="theme-btn style-one"
                            style={{ padding: "8px 16px", fontSize: "13px" }}
                          >
                            Apply
                          </button>
                        </div>
                      </form>
                      {couponMessage && (
                        <div
                          style={{
                            marginTop: "10px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: couponMessage.includes("applied") ? "#10B981" : "#DC2626",
                          }}
                        >
                          {couponMessage}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Order Financial Summary Card */}
                  <div
                    className="cart-widget cart-total-widget p-4"
                    style={{ background: "#fff", borderRadius: "14px", border: "1px solid #E2E8F0" }}
                  >
                    <h4 style={{ fontSize: "18px", fontWeight: 800, borderBottom: "1px solid #F1F5F9", paddingBottom: "14px", margin: "0 0 16px" }}>
                      Order Summary
                    </h4>

                    <div className="d-flex justify-content-between my-2" style={{ fontSize: "14px" }}>
                      <span className="text-muted">Subtotal</span>
                      <strong style={{ color: "#0F172A" }}>
                        {currencySymbol}
                        {subtotal.toFixed(2)}
                      </strong>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="d-flex justify-content-between my-2" style={{ fontSize: "14px", color: "#10B981" }}>
                        <span>Discount Applied</span>
                        <strong>
                          -{currencySymbol}
                          {appliedDiscount.toFixed(2)}
                        </strong>
                      </div>
                    )}

                    {/* Shipping selector */}
                    <div className="shipping-cart mt-3 pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
                      <h6 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px", color: "#334155" }}>
                        Shipping Method
                      </h6>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="shippingRadio"
                          id="shipFlat"
                          checked={shippingType === "flat"}
                          onChange={() => setShippingType("flat")}
                        />
                        <label className="form-check-label d-flex justify-content-between w-100" htmlFor="shipFlat" style={{ fontSize: "13px" }}>
                          <span>Standard Ground</span>
                          <b>{subtotal >= freeThreshold ? "FREE" : `${currencySymbol}${flatFee.toFixed(2)}`}</b>
                        </label>
                      </div>

                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="shippingRadio"
                          id="shipExpress"
                          checked={shippingType === "express"}
                          onChange={() => setShippingType("express")}
                        />
                        <label className="form-check-label d-flex justify-content-between w-100" htmlFor="shipExpress" style={{ fontSize: "13px" }}>
                          <span>Express Air Delivery</span>
                          <b>
                            {currencySymbol}
                            {expressFee.toFixed(2)}
                          </b>
                        </label>
                      </div>
                    </div>

                    {/* Taxes */}
                    <div className="d-flex justify-content-between my-2 text-muted" style={{ fontSize: "12px" }}>
                      <span>Estimated GST / Tax ({taxPercentage}%)</span>
                      <span>
                        {currencySymbol}
                        {taxAmount.toFixed(2)}
                      </span>
                    </div>

                    {/* Total Amount */}
                    <div
                      className="price-total d-flex justify-content-between pt-3 mt-3"
                      style={{ borderTop: "2px solid #0F172A" }}
                    >
                      <h5 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>Total Payable</h5>
                      <h5 style={{ color: "#CC0D39", fontSize: "20px", fontWeight: 800, margin: 0 }}>
                        {currencySymbol}
                        {total.toFixed(2)}
                      </h5>
                    </div>

                    {/* Primary Button */}
                    {activeStep === 1 && (
                      <div className="mt-4">
                        <button
                          type="button"
                          className="theme-btn style-one w-100 text-center"
                          onClick={() => {
                            setActiveStep(2);
                            window.scrollTo({ top: 300, behavior: "smooth" });
                          }}
                          style={{ padding: "14px", fontSize: "14px", fontWeight: 700 }}
                        >
                          Proceed to Checkout <i className="far fa-arrow-right ms-2" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/*====== End Cart & Checkout Section ======*/}

      {/* ================= THANK YOU POPUP MODAL ================= */}
      {showThankYouModal && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 999998,
              animation: "fadeIn 0.25s ease-out",
            }}
          />

          {/* Modal Container */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "560px",
              maxWidth: "92vw",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "18px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              zIndex: 999999,
              padding: "36px 32px",
              textAlign: "center",
              animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Success Icon */}
            <div
              style={{
                width: "76px",
                height: "76px",
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                color: "#10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                margin: "0 auto 20px",
              }}
            >
              <i className="fas fa-check-circle" />
            </div>

            {/* Heading */}
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", marginBottom: "8px" }}>
              Thank You For Your Order!
            </h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "24px", lineHeight: "1.5" }}>
              Your order has been received and is now being handcrafted & prepared by our authentic Moradabad brass
              artisans.
            </p>

            {/* Order Details Receipt Box */}
            {orderSuccessData && (
              <div
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "left",
                  marginBottom: "24px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center pb-2 mb-2" style={{ borderBottom: "1px solid #E2E8F0" }}>
                  <span style={{ fontSize: "13px", color: "#64748B" }}>Order Number:</span>
                  <strong style={{ fontSize: "15px", color: "#CC0D39" }}>
                    #{orderSuccessData.id || "ORD-9421"}
                  </strong>
                </div>

                <div className="d-flex justify-content-between align-items-center py-1" style={{ fontSize: "13px" }}>
                  <span style={{ color: "#64748B" }}>Customer Name:</span>
                  <strong>{orderSuccessData.customer || formData.fullName}</strong>
                </div>

                <div className="d-flex justify-content-between align-items-center py-1" style={{ fontSize: "13px" }}>
                  <span style={{ color: "#64748B" }}>Email Confirmation:</span>
                  <strong>{orderSuccessData.email || formData.email}</strong>
                </div>

                <div className="d-flex justify-content-between align-items-center py-1" style={{ fontSize: "13px" }}>
                  <span style={{ color: "#64748B" }}>Payment Method:</span>
                  <span className="badge bg-secondary" style={{ fontSize: "11px" }}>
                    {orderSuccessData.paymentMethod || formData.paymentMethod}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 mt-2" style={{ borderTop: "1px solid #E2E8F0", fontSize: "15px" }}>
                  <span style={{ fontWeight: 700, color: "#0F172A" }}>Total Amount:</span>
                  <strong style={{ color: "#CC0D39", fontSize: "17px" }}>
                    {currencySymbol}
                    {Number(orderSuccessData.pricing?.totalAmount || total).toFixed(2)}
                  </strong>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                type="button"
                className="theme-btn style-one"
                onClick={() => {
                  setShowThankYouModal(false);
                  navigate("/shops");
                }}
                style={{ padding: "12px 24px", fontSize: "14px", fontWeight: 700 }}
              >
                Continue Shopping
              </button>

              <button
                type="button"
                className="theme-btn"
                onClick={() => {
                  setShowThankYouModal(false);
                  navigate("/");
                }}
                style={{
                  padding: "12px 20px",
                  fontSize: "14px",
                  backgroundColor: "#F1F5F9",
                  color: "#334155",
                  border: "1px solid #CBD5E1",
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default CartPage;