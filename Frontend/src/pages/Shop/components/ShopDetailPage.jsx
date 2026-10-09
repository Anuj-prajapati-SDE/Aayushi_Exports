import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/imageUrl";
import { getCurrencySymbol } from "../../../utils/currency";
import { addToCart } from "../../../utils/cartUtils";
import { toggleWishlist, isInWishlist } from "../../../utils/wishlistUtils";

const defaultShopDetailSettings = {
  bannerTitle: "Shop Details",
  zoomEnabled: true,
  tabTitles: {
    desc: "Artisan Craftsmanship & Description",
    info: "Product Specifications & Metal Purity",
    reviews: "Customer Reviews & Feedback",
    shipping: "Shipping & Delivery Terms",
  },
  shippingPolicyText:
    "Free insured standard shipping across India on orders over ₹999 / $50. Fragile metalware packed in 5-ply shockproof packaging with tamper-evident seal.",
  relatedTitle: "Related Handcrafted Artefacts You May Like",
  maxRelatedItems: 4,
};

const fallbackProduct = {
  id: "RB-VS-101",
  sku: "RB-VS-101",
  title: "Handcrafted Antique Brass Cylindrical Jali Pillar Vase",
  name: "Handcrafted Antique Brass Cylindrical Jali Pillar Vase",
  price: "120.00",
  prevPrice: "185.00",
  discount: "34% Off",
  rating: 5,
  reviews: 48,
  category: "Brass Vases & Urns",
  brand: "Ratan Brass",
  material: "100% Solid Virgin Cast Brass",
  fabricType: "100% Solid Virgin Cast Brass",
  finish: "Antique Brushed Gold",
  occasion: "Luxury Living Room, Console Decor & Grand Entryways",
  description:
    "Masterpiece hand-carved cylindrical pillar vase crafted in pure solid brass with exquisite geometric floral jali fretwork and a slender fluted neck. Finished in antique brushed gold with clear lacquer protection.",
  careInstructions: "Wipe with soft dry cotton cloth; avoid chemical cleaners.",
  stock: 25,
  status: "In Stock",
  sizes: ['18 Inch Tall', 'Large (16")', 'Medium (12")'],
  colors: ["Antique Gold", "Polished Brass"],
  image: "assets/images/products/brass-cylinder-vase-1.jpg",
  gallery: [
    "assets/images/products/brass-cylinder-vase-1.jpg",
    "assets/images/products/brass-flower-vase-set.jpg",
    "assets/images/products/white-moroccan-lanterns.jpg",
    "assets/images/products/black-moroccan-lanterns.jpg",
  ],
};

function ShopDetails() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  // Extract ID from query params (?id=...) or path params (/:id)
  const searchParams = new URLSearchParams(location.search);
  const targetId = params.id || searchParams.get("id");

  const [product, setProduct] = useState(location.state?.product || null);
  const [detailSettings, setDetailSettings] = useState(defaultShopDetailSettings);
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(!location.state?.product);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("desc");

  // 1. Fetch Dynamic CMS Settings
  const fetchSettings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/website/content/shop_detail_page");
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setDetailSettings((prev) => ({ ...prev, ...result.data }));
        }
      }
    } catch (e) {
      console.warn("[ShopDetails] Settings fetch fallback:", e.message);
    }
  };

  // 2. Fetch Single Product by ID / SKU
  const fetchProductData = async (idToFetch) => {
    if (!idToFetch) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/website/products/${idToFetch}`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setProduct(result.data);
          return;
        }
      }
    } catch (err) {
      console.warn("[ShopDetails] Product API error, checking cache:", err.message);
    } finally {
      setLoading(false);
    }

    // Try finding in local cache
    const cached = localStorage.getItem("pesco_products_cache");
    if (cached) {
      try {
        const list = JSON.parse(cached);
        const match = list.find(
          (p) =>
            p._id === idToFetch ||
            p.id === idToFetch ||
            p.sku === idToFetch ||
            (p.name && p.name.toLowerCase() === idToFetch.toLowerCase())
        );
        if (match) {
          setProduct(match);
        }
      } catch (e) {}
    }
  };

  // 3. Fetch Related Products
  const fetchRelatedProducts = async (catName) => {
    try {
      const url = catName
        ? `http://localhost:5000/api/website/products?category=${encodeURIComponent(catName)}`
        : "http://localhost:5000/api/website/products";
      const res = await fetch(url);
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          const currentKey = product?._id || product?.id || product?.sku;
          const filtered = result.data.filter(
            (p) => (p._id || p.id || p.sku) !== currentKey
          );
          setRelatedProducts(filtered.slice(0, 4));
        }
      }
    } catch (err) {
      console.warn("[ShopDetails] Related fetch fallback:", err.message);
    }
  };

  useEffect(() => {
    fetchSettings();

    if (location.state?.product) {
      setProduct(location.state.product);
      setLoading(false);
    } else if (targetId) {
      fetchProductData(targetId);
    } else {
      setProduct(fallbackProduct);
      setLoading(false);
    }

    const handleSync = () => {
      fetchSettings();
      setCurrencySymbol(getCurrencySymbol());
      if (targetId) fetchProductData(targetId);
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("pesco_website_updated", handleSync);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("pesco_website_updated", handleSync);
    };
  }, [targetId, location.state]);

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }
      fetchRelatedProducts(product.category);
    }
  }, [product]);

  const activeProduct = product || fallbackProduct;

  const productTitle = activeProduct.name || activeProduct.title || "Handcrafted Brass Artefact";
  const regularPrice = activeProduct.price
    ? parseFloat(activeProduct.price).toFixed(2)
    : "185.00";
  const salePrice = activeProduct.salePrice
    ? parseFloat(activeProduct.salePrice).toFixed(2)
    : regularPrice;
  const hasDiscount = parseFloat(regularPrice) > parseFloat(salePrice);

  const galleryImages =
    Array.isArray(activeProduct.gallery) && activeProduct.gallery.length > 0
      ? activeProduct.gallery
      : activeProduct.image
      ? [activeProduct.image]
      : activeProduct.img
      ? [activeProduct.img]
      : fallbackProduct.gallery;

  const handleQuantityDown = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleQuantityUp = () => setQuantity((prev) => prev + 1);

  const handleRelatedClick = (relProd) => {
    setProduct(relProd);
    setSelectedImageIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/shop-details?id=${relProd._id || relProd.id || relProd.sku}`, {
      state: { product: relProd },
    });
  };

  return (
    <main className="main-bg">
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
            <img src="/assets/images/bg/page-img-1.png" alt="Banner Graphic" />
          </div>
          <svg className="page-svg" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.1742 33.0065C14.029 35.2507 7.5486 39.0636 0 40.7339V86H1937V64.9942C1933.1 60.1623 1912.65 65.1777 1904.51 62.6581C1894.22 59.4678 1884.93 55.0079 1873.77 52.7742C1861.2 50.2585 1823.41 36.3854 1811.99 39.9252C1805.05 42.0727 1796.94 37.6189 1789.36 36.6007C1769.18 33.8879 1747.19 31.1848 1726.71 29.7718C1703.81 28.1919 1678.28 27.0012 1657.53 34.4442C1636.45 42.005 1606.07 60.856 1579.5 55.9191C1561.6 52.5906 1543.41 47.0959 1528.45 56.9075C1510.85 68.4592 1485.74 74.2518 1460.44 76.136C1432.32 78.2297 1408.53 70.6879 1384.73 62.2987C1339.52 46.361 1298.19 27.1677 1255.08 9.28534C1242.58 4.10111 1214.68 15.4762 1200.55 16.6533C1189.77 17.5509 1181.74 15.4508 1172.12 12.8795C1152.74 7.70033 1133.23 2.88525 1111.79 2.63621C1088.85 2.36971 1073.94 7.88289 1056.53 15.8446C1040.01 23.3996 1027.48 26.1777 1007.8 26.1777C993.757 26.1777 975.854 25.6887 962.844 28.9632C941.935 34.2258 932.059 38.7874 914.839 28.6037C901.654 20.8061 866.261 -2.56499 844.356 7.12886C831.264 12.9222 820.932 21.5146 807.663 27.5255C798.74 31.5679 779.299 42.0561 766.33 39.1166C758.156 37.2637 751.815 31.6349 745.591 28.2443C730.967 20.2774 715.218 13.2948 695.846 10.723C676.168 8.11038 658.554 23.1787 641.606 27.4357C617.564 33.4742 602.283 27.7951 579.244 27.7951C568.142 27.7951 548.414 30.4002 541.681 23.6618C535.297 17.2722 530.162 9.74921 523.263 3.71444C517.855 -1.01577 505.798 -0.852017 498.318 2.09709C479.032 9.7007 453.07 10.0516 431.025 9.64475C407.556 9.21163 368.679 1.61612 346.618 10.3636C319.648 21.0575 291.717 53.8338 254.67 45.2266C236.134 40.9201 225.134 37.5813 204.78 40.7339C186.008 43.6415 171.665 50.7785 156.051 57.3567C146.567 61.3523 152.335 52.6281 151.12 47.9222C149.535 41.7853 139.994 34.5585 132.991 30.4008C120.206 22.8098 90.2848 24.3246 74.2546 24.6502C55.5552 25.0301 37.9201 27.747 21.1742 33.0065Z"
              fill="#FFFAF3"
            />
          </svg>
          <div className="shape shape-one"><span /></div>
          <div className="shape shape-two"><span /></div>
          <div className="shape shape-three">
            <span><img src="/assets/images/shape/curved-arrow.png" alt="" /></span>
          </div>
          <div className="shape shape-four">
            <span><img src="/assets/images/shape/stars.png" alt="" /></span>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="page-banner-content">
                  <h1>{detailSettings.bannerTitle || "Shop Details"}</h1>
                  <ul className="breadcrumb-link">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <i className="far fa-long-arrow-right" />
                    </li>
                    <li>
                      <Link to="/shops">Shop</Link>
                    </li>
                    <li>
                      <i className="far fa-long-arrow-right" />
                    </li>
                    <li className="active">{productTitle}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Page Banner Section ======*/}

      {/*====== Start Shop Details Section ======*/}
      <section className="shop-details-section pt-120 pb-80">
        <div className="container">
          <div className="shop-details-wrapper">
            <div className="row">
              {/* Left Column: Image Gallery */}
              <div className="col-xl-6">
                <div className="product-gallery-area mb-50">
                  {/* Main Active Image Display */}
                  <div
                    className="product-big-slider mb-30"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      background: "#F8FAFC",
                    }}
                  >
                    <div
                      style={{
                        padding: "30px",
                        minHeight: "420px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={getImageUrl(
                          galleryImages[selectedImageIndex] || galleryImages[0],
                          "/assets/images/products/brass-cylinder-vase-1.jpg"
                        )}
                        alt={productTitle}
                        style={{
                          maxHeight: "380px",
                          maxWidth: "100%",
                          objectFit: "contain",
                          transition: "all 0.3s ease",
                        }}
                        onError={(e) => {
                          e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Thumbnail Selector */}
                  <div className="product-thumb-slider d-flex gap-3 justify-content-center flex-wrap">
                    {galleryImages.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        style={{
                          width: "80px",
                          height: "80px",
                          padding: "6px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          border:
                            selectedImageIndex === idx
                              ? "2px solid #CC0D39"
                              : "1px solid #E2E8F0",
                          background: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                          transform: selectedImageIndex === idx ? "scale(1.05)" : "scale(1)",
                        }}
                      >
                        <img
                          src={getImageUrl(imgSrc, "/assets/images/products/brass-cylinder-vase-1.jpg")}
                          alt={`Thumbnail ${idx + 1}`}
                          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                          onError={(e) => {
                            e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Ordering */}
              <div className="col-xl-6">
                <div className="product-info mb-50 ps-xl-3">
                  {/* Badge & Title */}
                  {activeProduct.discount && (
                    <span className="sale mb-2">
                      <i className="fas fa-tags" />
                      {activeProduct.discount}
                    </span>
                  )}
                  <h4 className="title mb-3" style={{ fontSize: "24px", fontWeight: 800 }}>
                    {productTitle}
                  </h4>

                  {/* Rating Stars */}
                  <ul className="ratings rating5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <i className={`fas fa-star ${i < (activeProduct.rating || 5) ? "" : "text-muted"}`} />
                      </li>
                    ))}
                    <li>
                      <a href="#reviews" onClick={(e) => { e.preventDefault(); setActiveTab("reviews"); }}>
                        ({activeProduct.reviews || 48} Customer Reviews)
                      </a>
                    </li>
                  </ul>

                  {/* Short Description */}
                  <p className="mb-4">
                    {activeProduct.description ||
                      "Exquisite hand-embossed luxury brass metalware and decor crafted by master Moradabad artisans with intricate detailing, protective lacquer finish, and authentic antique heritage appeal."}
                  </p>

                  {/* Price */}
                  <div className="product-price mb-4">
                    {hasDiscount && (
                      <span className="price prev-price me-2">
                        <span className="currency">{currencySymbol}</span>
                        {regularPrice}
                      </span>
                    )}
                    <span className="price new-price" style={{ fontSize: "26px", fontWeight: 800, color: "#CC0D39" }}>
                      <span className="currency">{currencySymbol}</span>
                      {salePrice}
                    </span>
                  </div>

                  {/* Variants: Available Sizes */}
                  {activeProduct.sizes && activeProduct.sizes.length > 0 && (
                    <div className="mb-4">
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 700, marginBottom: "8px", color: "#0F172A" }}>
                        Available Size / Dimension:
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {activeProduct.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedSize(sz)}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "8px",
                              fontSize: "13px",
                              fontWeight: 600,
                              border: selectedSize === sz ? "2px solid #CC0D39" : "1px solid #CBD5E1",
                              backgroundColor: selectedSize === sz ? "#FEF2F2" : "#FFFFFF",
                              color: selectedSize === sz ? "#CC0D39" : "#334155",
                              cursor: "pointer",
                            }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Variants: Available Finishes / Colors */}
                  {activeProduct.colors && activeProduct.colors.length > 0 && (
                    <div className="mb-4">
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 700, marginBottom: "8px", color: "#0F172A" }}>
                        Finish / Coating:
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {activeProduct.colors.map((col) => (
                          <button
                            key={col}
                            type="button"
                            onClick={() => setSelectedColor(col)}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "8px",
                              fontSize: "13px",
                              fontWeight: 600,
                              border: selectedColor === col ? "2px solid #CC0D39" : "1px solid #CBD5E1",
                              backgroundColor: selectedColor === col ? "#FEF2F2" : "#FFFFFF",
                              color: selectedColor === col ? "#CC0D39" : "#334155",
                              cursor: "pointer",
                            }}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity & Add to Cart */}
                  <div className="product-cart-variation mb-4">
                    <ul className="d-flex align-items-center gap-3 flex-wrap">
                      <li>
                        <div className="quantity-input">
                          <button
                            type="button"
                            className="quantity-down"
                            onClick={handleQuantityDown}
                          >
                            <i className="far fa-minus" />
                          </button>
                          <input
                            className="quantity"
                            type="text"
                            value={quantity}
                            readOnly
                            name="quantity"
                          />
                          <button
                            type="button"
                            className="quantity-up"
                            onClick={handleQuantityUp}
                          >
                            <i className="far fa-plus" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(
                              {
                                ...activeProduct,
                                price: activeProduct.price,
                                image: activeProduct.img || activeProduct.image,
                              },
                              quantity,
                              selectedSize,
                              selectedColor
                            );
                          }}
                          className="theme-btn style-one"
                          style={{ cursor: "pointer", border: "none" }}
                        >
                          Add To Cart
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="icon-btn border-0"
                          aria-label="Wishlist"
                          title={isInWishlist(activeProduct.id || activeProduct._id || activeProduct.sku) ? "Saved in Wishlist" : "Add to Wishlist"}
                          onClick={() => toggleWishlist(activeProduct)}
                          style={{
                            backgroundColor: isInWishlist(activeProduct.id || activeProduct._id || activeProduct.sku) ? "#CC0D39" : "#F8FAFC",
                            color: isInWishlist(activeProduct.id || activeProduct._id || activeProduct.sku) ? "#FFFFFF" : "#1E293B",
                            border: "1px solid #E2E8F0",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <i className={`fa${isInWishlist(activeProduct.id || activeProduct._id || activeProduct.sku) ? 's' : 'r'} fa-heart`} />
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Product Metadata */}
                  <div className="product-meta mb-4">
                    <ul>
                      <li>
                        <span>SKU :</span>
                        {activeProduct.sku || `RB-VS-101`}
                      </li>
                      <li>
                        <span>Category :</span>
                        {activeProduct.category}
                      </li>
                      <li>
                        <span>Brand :</span>
                        {activeProduct.brand || "Ratan Brass"}
                      </li>
                      <li>
                        <span>Stock Status :</span>
                        <strong style={{ color: activeProduct.stock > 0 ? "#16A34A" : "#DC2626" }}>
                          {activeProduct.status || (activeProduct.stock > 0 ? "In Stock" : "Out of Stock")} ({activeProduct.stock || 20} units)
                        </strong>
                      </li>
                    </ul>
                  </div>

                  {/* Trust Badges */}
                  {/* <div className="special-features">
                    <span>
                      <i className="far fa-shipping-fast" />
                      Insured Shockproof Wooden Packaging
                    </span>
                    <span>
                      <i className="far fa-badge-check" />
                      100% Genuine Artisan Brass Certification
                    </span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Additional Information & Tabs */}
            <div className="additional-information-wrapper mt-40">
              <div className="row">
                {/* Specifications Sidebar Box */}
                <div className="col-lg-5">
                  <div className="additional-info-box mb-40">
                    <h3>Product Specifications:</h3>
                    <ul>
                      <li>
                        Material & Purity: <span>{activeProduct.material || activeProduct.fabricType || "100% Solid Cast Brass"}</span>
                      </li>
                      <li>
                        Finish / Polish: <span>{activeProduct.finish || "Antique Brushed Gold"}</span>
                      </li>
                      <li>
                        Craftsmanship: <span>Hand-Engraved Jaali &amp; Filigree</span>
                      </li>
                      <li>
                        Placement / Occasion: <span>{activeProduct.occasion || "Living Room & Entryway"}</span>
                      </li>
                      <li>
                        Care Instructions: <span>{activeProduct.careInstructions || "Dry Cotton Cloth Wipe"}</span>
                      </li>
                      <li>
                        Origin / Workshop: <span>Moradabad, Uttar Pradesh, India</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Tabs: Description & Reviews */}
                <div className="col-lg-7">
                  <div className="description-wrapper mb-40">
                    <div className="pesco-tabs style-two mb-40">
                      <ul className="nav nav-tabs" role="tablist">
                        <li>
                          <button
                            className={`nav-link ${activeTab === "desc" ? "active" : ""}`}
                            onClick={() => setActiveTab("desc")}
                            type="button"
                          >
                            Description &amp; Heritage
                          </button>
                        </li>
                        <li>
                          <button
                            className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
                            onClick={() => setActiveTab("reviews")}
                            type="button"
                          >
                            Customer Reviews ({activeProduct.reviews || 48})
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="tab-content">
                      {activeTab === "desc" && (
                        <div className="tab-pane fade active show">
                          <h4>Artisan Craftsmanship &amp; Details</h4>
                          <p>
                            {activeProduct.description ||
                              "Each artefact is sculpted individually by master brass craftsmen in Moradabad using traditional lost-wax casting, hand-hammered fluting, and fine jaali perforation. The piece is finished with a protective antioxidant lacquer layer to preserve its majestic golden luster for decades."}
                          </p>
                          <h4>Key Highlights</h4>
                          <ul className="list">
                            <li>Handcrafted from heavy gauge solid virgin brass</li>
                            <li>Antioxidant clear lacquer coat prevents tarnishing</li>
                            <li>Ideal luxury gift for weddings, housewarmings, and festive occasions</li>
                            <li>Authentic heirloom-grade decorative artefact</li>
                          </ul>
                        </div>
                      )}

                      {activeTab === "reviews" && (
                        <div className="tab-pane fade active show">
                          <div className="pesco-comment-area mb-40">
                            <h4>Customer Feedback &amp; Ratings</h4>
                            <ul>
                              <li className="comment">
                                <div className="pesco-reviews-item">
                                  <div className="author-thumb-info">
                                    <div className="author-thumb">
                                      <img
                                        src="/assets/images/about/author.png"
                                        alt="Author"
                                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                      />
                                    </div>
                                    <div className="author-info">
                                      <h5>Ananya Deshmukh</h5>
                                      <div className="author-meta">
                                        <ul className="ratings">
                                          {[...Array(5)].map((_, i) => (
                                            <li key={i}><i className="fas fa-star" /></li>
                                          ))}
                                        </ul>
                                        <span>Verified Buyer • 2 weeks ago</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="author-review-content">
                                    <p>
                                      The craftsmanship on this piece is breathtaking! The weight and solid brass feel are top-notch. Arrived packed in solid shockproof box without a scratch.
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* Write Review Form */}
                          <div className="reviews-contact-area">
                            <h4>Write a Review</h4>
                            <form
                              className="pesco-contact-form"
                              onSubmit={(e) => {
                                e.preventDefault();
                                alert("Thank you! Your review has been submitted for moderation.");
                              }}
                            >
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="form-group mb-3">
                                    <input
                                      type="text"
                                      placeholder="Your Full Name"
                                      className="form_control"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group mb-3">
                                    <input
                                      type="email"
                                      placeholder="Your Email"
                                      className="form_control"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-group mb-3">
                                    <textarea
                                      className="form_control"
                                      placeholder="Write your review here..."
                                      rows={4}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <button type="submit" className="theme-btn style-one">
                                    Submit Review
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="related-products-section mt-50 pt-40" style={{ borderTop: "1px solid #E2E8F0" }}>
                <div className="section-title mb-40">
                  <span className="sub-heading">
                    <i className="flaticon-sparkler" />
                    <span className="sub-title">You May Also Like</span>
                  </span>
                  <h2>Related Handcrafted Artefacts</h2>
                </div>

                <div className="row g-4">
                  {relatedProducts.map((rel) => (
                    <div key={rel._id || rel.id || rel.sku} className="col-xl-3 col-lg-4 col-md-6 col-12">
                      <div className="product-item style-one mb-30 w-100">
                        <div className="product-thumbnail">
                          <img
                            src={getImageUrl(rel.image || rel.img, "/assets/images/products/brass-cylinder-vase-1.jpg")}
                            alt={rel.name || rel.title}
                            onClick={() => handleRelatedClick(rel)}
                            style={{ cursor: "pointer", height: "240px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                            }}
                          />
                          {rel.discount && <div className="discount">{rel.discount}</div>}
                          <div className="cart-button">
                            <button
                              type="button"
                              onClick={() => handleRelatedClick(rel)}
                              className="cart-btn border-0"
                            >
                              <i className="far fa-eye" /> <span className="text">View Details</span>
                            </button>
                          </div>
                        </div>
                        <div className="product-info-wrap">
                          <div className="product-info">
                            <h4 className="title">
                              <a href="#" onClick={(e) => { e.preventDefault(); handleRelatedClick(rel); }}>
                                {rel.name || rel.title}
                              </a>
                            </h4>
                          </div>
                          <div className="product-price">
                            <span className="price new-price">
                              <span className="currency">{currencySymbol}</span>
                              {rel.salePrice ? parseFloat(rel.salePrice).toFixed(2) : parseFloat(rel.price || 120).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/*====== End Shop Details Section ======*/}
    </main>
  );
}

export default ShopDetails;
