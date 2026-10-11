import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUrl";
import { getCurrencySymbol } from "../../utils/currency";
import { toggleWishlist, isInWishlist } from "../../utils/wishlistUtils";
import "./ShopPage.css";

const initialShopProducts = [
  {
    id: 1,
    sku: "RB-VS-101",
    title: "Handcrafted Antique Brass Cylindrical Jali Pillar Vase",
    price: "145.00",
    prevPrice: "185.00",
    discount: "22% Off",
    rating: 5,
    reviews: 64,
    img: "/assets/images/products/brass-cylinder-vase-1.jpg",
    category: "Brass Vases & Urns",
    brand: "Ratan Brass",
    material: "100% Solid Virgin Cast Brass",
    finish: "Antique Brushed Gold",
    occasion: "Luxury Living Room & Entryway Decor",
    description: "Masterpiece cylindrical vase with hand-carved jaali lattice mesh, finished in protective antique golden lacquer.",
  },
  {
    id: 2,
    sku: "RB-VS-102",
    title: "Royal Floral Embossed Brass Flower Vases (Set of 3)",
    price: "195.00",
    prevPrice: "249.00",
    discount: "21% Off",
    rating: 5,
    reviews: 42,
    img: "/assets/images/products/brass-flower-vase-set.jpg",
    category: "Brass Vases & Urns",
    brand: "Ratan Brass",
    material: "Pure Hand-Hammered Heavy Brass",
    finish: "High-Gloss Polished Brass",
    occasion: "Centerpiece & Wedding Gifting",
    description: "Trio of engraved brass flower vases in small, medium, and large heights featuring blooming floral motifs.",
  },
  {
    id: 3,
    sku: "RB-LT-201",
    title: "Vintage Moroccan Glass & Metal Fairy Lanterns (Set of 3 - Pearl White)",
    price: "89.00",
    prevPrice: "120.00",
    discount: "25% Off",
    rating: 5,
    reviews: 98,
    img: "/assets/images/products/white-moroccan-lanterns.jpg",
    category: "Decorative Lanterns",
    brand: "Ratan Crafts",
    material: "Wrought Iron & Tempered Glass",
    finish: "Matte Pearl White",
    occasion: "Balcony, Patio & Festivity Lighting",
    description: "Exquisite hexagonal Moroccan lanterns with internal micro-fairy LED string lights creating warm ambient glow.",
  },
  {
    id: 4,
    sku: "RB-LT-202",
    title: "Matte Black Vintage Moroccan Fairy Light Lanterns (Set of 3)",
    price: "92.00",
    prevPrice: "125.00",
    discount: "26% Off",
    rating: 5,
    reviews: 87,
    img: "/assets/images/products/black-moroccan-lanterns.jpg",
    category: "Decorative Lanterns",
    brand: "Ratan Crafts",
    material: "Galvanized Metal & Clear Glass",
    finish: "Matte Midnight Black",
    occasion: "Contemporary & Gothic Accent Decor",
    description: "Matte black Moroccan lanterns with intricate filigree canopy and hanging hoops, equipped with LED lights.",
  },
  {
    id: 5,
    sku: "RB-UB-501",
    title: "Traditional Royal Brass Floral Urli with Diya Holders",
    price: "120.00",
    prevPrice: "160.00",
    discount: "25% Off",
    rating: 5,
    reviews: 55,
    img: "/assets/images/products/brass-urli-bowl.jpg",
    category: "Tabletop Urli & Bowls",
    brand: "Ratan Brass",
    material: "Pure Solid Brass Casting",
    finish: "Traditional Antique Gold",
    occasion: "Festive Pooja, Floating Petals & Table Centerpieces",
    description: "Grand brass urli bowl designed for floating flower petals and aromatic tea lights with peacock motif rim.",
  },
  {
    id: 6,
    sku: "RB-SP-601",
    title: "Grand Royal Brass Mayur Peacock Diya & Standing Oil Lamp",
    price: "165.00",
    prevPrice: "210.00",
    discount: "21% Off",
    rating: 5,
    reviews: 38,
    img: "/assets/images/products/brass-peacock-diya.jpg",
    category: "Pooja & Spiritual Artefacts",
    brand: "Ratan Brass",
    material: "Heavy Gauge Solid Brass",
    finish: "Rich Temple Patina Gold",
    occasion: "Spiritual Altar, Diwali & Auspicious Ceremonies",
    description: "Majestic brass standing oil lamp featuring hand-carved peacock crest and multi-tier oil wick holders.",
  },
];

const defaultShopSettings = {
  bannerTitle: "Shop Page",
  itemsPerPage: "12",
  defaultSort: "Featured",
  categories: [
    { id: "sc-1", name: "Brass Vases & Urns", count: "28", isActive: true },
    { id: "sc-2", name: "Decorative Lanterns", count: "34", isActive: true },
    { id: "sc-3", name: "Tabletop Urli & Bowls", count: "22", isActive: true },
    { id: "sc-4", name: "Pooja & Spiritual Artefacts", count: "18", isActive: true },
    { id: "sc-5", name: "Royal Brass Artefacts", count: "25", isActive: true },
    { id: "sc-6", name: "Moroccan Fairy Lanterns", count: "15", isActive: true },
  ],
  priceFilter: { min: "10", max: "500", defaultRange: "$10 - $500" },
  sidebarBanner: { title: "Festive Season Clearance", discount: "35% OFF", link: "/shops" },
};

function ShopPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to read category from URL search params or location state
  const getInitialCategory = () => {
    try {
      const params = new URLSearchParams(location.search);
      const cat = params.get("category") || location.state?.category;
      return cat ? decodeURIComponent(cat).trim() : "All";
    } catch (e) {
      return "All";
    }
  };

  const [products, setProducts] = useState(initialShopProducts);
  const [shopSettings, setShopSettings] = useState(defaultShopSettings);
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [wishlistVersion, setWishlistVersion] = useState(0);

  // Sync selectedCategory whenever URL query params or navigation state change
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const cat = params.get("category") || location.state?.category;
      if (cat) {
        setSelectedCategory(decodeURIComponent(cat).trim());
      } else {
        setSelectedCategory("All");
      }
    } catch (e) {
      setSelectedCategory("All");
    }
  }, [location.search, location.state]);

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    if (!catName || catName === "All") {
      navigate("/shops", { replace: true });
    } else {
      navigate(`/shops?category=${encodeURIComponent(catName)}`, { replace: true });
    }
  };

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch live products from backend MongoDB API
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/website/products`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const mapped = result.data.map((p, idx) => ({
            id: p._id || p.id || `prod-${idx + 1}`,
            _id: p._id,
            sku: p.sku || `RB-PRD-${100 + idx}`,
            title: p.name || p.title || "Handcrafted Brass Artefact",
            name: p.name || p.title,
            price: p.salePrice ? p.salePrice.toString() : p.price ? p.price.toString() : "120.00",
            prevPrice:
              p.price && p.salePrice && Number(p.price) > Number(p.salePrice)
                ? p.price.toString()
                : p.prevPrice || "",
            discount: p.discount || "",
            rating: Number(p.rating) || 5,
            reviews: Number(p.reviews) || 0,
            img: p.image || "/assets/images/products/brass-cylinder-vase-1.jpg",
            image: p.image || "/assets/images/products/brass-cylinder-vase-1.jpg",
            gallery: Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : [p.image],
            category: p.category || "Brass Vases & Urns",
            brand: p.brand || "Ratan Brass",
            material: p.material || p.fabricType || "100% Solid Virgin Cast Brass",
            finish: p.finish || "Antique Brushed Gold",
            occasion: p.occasion || "Luxury Living Room & Entryway Decor",
            description: p.description || "",
            stock: p.stock || 20,
            status: p.status || "In Stock",
            sizes: p.sizes || [],
            colors: p.colors || [],
          }));
          setProducts(mapped);
          localStorage.setItem("pesco_products_cache", JSON.stringify(mapped));
        }
      }
    } catch (err) {
      console.warn("[ShopPage] Products fetch fallback:", err.message);
      const cached = localStorage.getItem("pesco_products_cache");
      if (cached) {
        try {
          setProducts(JSON.parse(cached));
        } catch (e) { }
      }
    }
  };

  // Fetch dynamic CMS configuration from Backend API
  const fetchShopSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/website/content/shop_page`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setShopSettings(result.data);
          if (result.data.priceFilter?.max) {
            setMaxPrice(Number(result.data.priceFilter.max) || 500);
          }
        }
      }
    } catch (err) {
      console.warn("[ShopPage] Using default/cached settings:", err.message);
      const cached = localStorage.getItem("pesco_shop_page");
      if (cached) {
        try {
          setShopSettings(JSON.parse(cached));
        } catch (e) { }
      }
    }
  };

  // Fetch live categories from backend if available
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/website/categories`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const mappedCategories = result.data.map((c, i) => ({
            id: c._id || `cat-${i}`,
            name: c.name,
            count: c.count || "20 items",
            isActive: c.isActive !== false,
          }));
          setShopSettings((prev) => ({ ...prev, categories: mappedCategories }));
        }
      }
    } catch (err) {
      console.warn("[ShopPage] Categories fetch fallback:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchShopSettings();
    fetchCategories();

    const handleUpdate = () => {
      fetchProducts();
      fetchShopSettings();
      fetchCategories();
      setCurrencySymbol(getCurrencySymbol());
    };

    const handleWishlistUpdate = () => {
      setWishlistVersion((v) => v + 1);
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pesco_website_updated", handleUpdate);
    window.addEventListener("pesco_wishlist_updated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pesco_website_updated", handleUpdate);
      window.removeEventListener("pesco_wishlist_updated", handleWishlistUpdate);
    };
  }, []);

  // Helper to check if product matches the selected category
  const matchesCategoryFilter = (prod, targetCategory) => {
    if (!targetCategory || targetCategory === "All") return true;

    const target = targetCategory.trim().toLowerCase();
    const prodCat = (prod.category || "").trim().toLowerCase();
    const prodTitle = (prod.title || prod.name || "").trim().toLowerCase();

    // 1. Direct exact match
    if (prodCat === target) return true;

    // 2. Either contains the other (e.g. "Vases" in "Brass Vases & Urns")
    if (prodCat && (prodCat.includes(target) || target.includes(prodCat))) return true;

    // 3. Category match in product title or name
    if (prodTitle.includes(target)) return true;

    // 4. Word-level token matching (e.g. "Moroccan", "Lanterns", "Urli", "Diya", "Vases")
    const words = target
      .replace(/[&,]/g, " ")
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter((w) => w.length >= 3 && !["and", "the", "for", "set"].includes(w));

    if (words.length > 0) {
      return words.some((w) => prodCat.includes(w) || prodTitle.includes(w));
    }

    return false;
  };

  // Filter & Sort products dynamically
  const filteredProducts = products
    .filter((prod) => {
      const matchesCategory = matchesCategoryFilter(prod, selectedCategory);
      const matchesSearch =
        (prod.title || prod.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prod.sku || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prod.brand && prod.brand.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = parseFloat(prod.price) <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (selectedSort === "Price Low To High") return parseFloat(a.price) - parseFloat(b.price);
      if (selectedSort === "Price High To Low") return parseFloat(b.price) - parseFloat(a.price);
      if (selectedSort === "Highest Rated") return (b.rating || 5) - (a.rating || 5);
      return 0; // Default featured
    });

  const handleProductClick = (product) => {
    const prodId = product._id || product.id || product.sku;
    navigate(`/shop-details?id=${prodId}`, { state: { product } });
  };

  const activeCategories = shopSettings.categories?.filter((c) => c.isActive !== false) || defaultShopSettings.categories;

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
            <img src="/assets/images/bg/page-img-1.png" alt="Shop Banner Graphic" />
          </div>
          <svg className="page-svg" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.1742 33.0065C14.029 35.2507 7.5486 39.0636 0 40.7339V86H1937V64.9942C1933.1 60.1623 1912.65 65.1777 1904.51 62.6581C1894.22 59.4678 1884.93 55.0079 1873.77 52.7742C1861.2 50.2585 1823.41 36.3854 1811.99 39.9252C1805.05 42.0727 1796.94 37.6189 1789.36 36.6007C1769.18 33.8879 1747.19 31.1848 1726.71 29.7718C1703.81 28.1919 1678.28 27.0012 1657.53 34.4442C1636.45 42.005 1606.07 60.856 1579.5 55.9191C1561.6 52.5906 1543.41 47.0959 1528.45 56.9075C1510.85 68.4592 1485.74 74.2518 1460.44 76.136C1432.32 78.2297 1408.53 70.6879 1384.73 62.2987C1339.52 46.361 1298.19 27.1677 1255.08 9.28534C1242.58 4.10111 1214.68 15.4762 1200.55 16.6533C1189.77 17.5509 1181.74 15.4508 1172.12 12.8795C1152.74 7.70033 1133.23 2.88525 1111.79 2.63621C1088.85 2.36971 1073.94 7.88289 1056.53 15.8446C1040.01 23.3996 1027.48 26.1777 1007.8 26.1777C993.757 26.1777 975.854 25.6887 962.844 28.9632C941.935 34.2258 932.059 38.7874 914.839 28.6037C901.654 20.8061 866.261 -2.56499 844.356 7.12886C831.264 12.9222 820.932 21.5146 807.663 27.5255C798.74 31.5679 779.299 42.0561 766.33 39.1166C758.156 37.2637 751.815 31.6349 745.591 28.2443C730.967 20.2774 715.218 13.2948 695.846 10.723C676.168 8.11038 658.554 23.1787 641.606 27.4357C617.564 33.4742 602.283 27.7951 579.244 27.7951C568.142 27.7951 548.414 30.4002 541.681 23.6618C535.297 17.2722 530.162 9.74921 523.263 3.71444C517.855 -1.01577 505.798 -0.852017 498.318 2.09709C479.032 9.7007 453.07 10.0516 431.025 9.64475C407.556 9.21163 368.679 1.61612 346.618 10.3636C319.648 21.0575 291.717 53.8338 254.67 45.2266C236.134 40.9201 225.134 37.5813 204.78 40.7339C186.008 43.6415 171.665 50.7785 156.051 57.3567C146.567 61.3523 152.335 52.6281 151.12 47.9222C149.535 41.7853 139.994 34.5585 132.991 30.4008C120.206 22.8098 90.2848 24.3246 74.2546 24.6502C55.5552 25.0301 37.9201 27.747 21.1742 33.0065Z"
              fill="#FFFAF3"
            />
          </svg>
          <div className="shape shape-one">
            <span />
          </div>
          <div className="shape shape-two">
            <span />
          </div>
          <div className="shape shape-three">
            <span>
              <img src="/assets/images/shape/curved-arrow.png" alt="Curved Arrow" />
            </span>
          </div>
          <div className="shape shape-four">
            <span>
              <img src="/assets/images/shape/stars.png" alt="Stars" />
            </span>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="page-banner-content">
                  <h1>{shopSettings.bannerTitle || "Shop Page"}</h1>
                  <ul className="breadcrumb-link">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <i className="far fa-long-arrow-right" />
                    </li>
                    <li className="active">{shopSettings.bannerTitle || "Shop"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Page Banner Section ======*/}

      {/*====== Start Shop page Section ======*/}
      <section className="shop-page-section pt-120 pb-80">
        <div className="container">
          <div className="row">
            {/* Sidebar Filter Area */}
            <div className="col-xl-3 col-lg-4">
              <div className="shop-sidebar-area">
                {/* Search Widget */}
                <div className="product-widget mb-40">
                  <h4 className="widget-title">Search Products</h4>
                  <div className="search-box position-relative">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search artefacts, vases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </div>

                {/* Product Categories Widget */}
                <div className="product-widget product-categories-widget mb-40">
                  <div className="widget-content">
                    <h4 className="widget-title">Product Categories</h4>
                    <ul className="categories-list">
                      <li>
                        <div
                          className="form-check d-flex align-items-center justify-content-between p-2 rounded"
                          style={{
                            cursor: "pointer",
                            background: selectedCategory === "All" ? "#fff2f4" : "transparent",
                            fontWeight: selectedCategory === "All" ? "700" : "500",
                            color: selectedCategory === "All" ? "#cc0d39" : "#333",
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => handleSelectCategory("All")}
                        >
                          <span>All Categories</span>
                          <span className="badge bg-light text-dark">{products.length}</span>
                        </div>
                      </li>
                      {activeCategories.map((cat, idx) => {
                        const isSelected =
                          selectedCategory.toLowerCase() === (cat.name || "").toLowerCase() ||
                          (selectedCategory !== "All" &&
                            cat.name &&
                            (cat.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                              selectedCategory.toLowerCase().includes(cat.name.toLowerCase())));
                        return (
                          <li key={cat.id || idx}>
                            <div
                              className="form-check d-flex align-items-center justify-content-between p-2 rounded"
                              style={{
                                cursor: "pointer",
                                background: isSelected ? "#fff2f4" : "transparent",
                                fontWeight: isSelected ? "700" : "500",
                                color: isSelected ? "#cc0d39" : "#333",
                                transition: "all 0.2s ease",
                              }}
                              onClick={() => handleSelectCategory(cat.name)}
                            >
                              <span>{cat.name}</span>
                              <span className={`badge ${isSelected ? "bg-danger text-white" : "bg-light text-dark"}`}>
                                {cat.count || "20"}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Price Filter Widget */}
                <div className="product-widget price-filter-widget mb-40">
                  <div className="widget-content">
                    <h4 className="widget-title">Filter By Price</h4>
                    <div className="price-number mb-2">
                      <input
                        type="text"
                        readOnly
                        value={`Price: $${shopSettings.priceFilter?.min || 10} — $${maxPrice}`}
                        style={{ border: "none", fontWeight: "600", color: "#cc0d39" }}
                      />
                    </div>
                    <input
                      type="range"
                      min={shopSettings.priceFilter?.min || 10}
                      max={shopSettings.priceFilter?.max || 500}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="form-range w-100"
                    />
                    <div className="d-flex justify-content-between text-muted mt-1" style={{ fontSize: "12px" }}>
                      <span>${shopSettings.priceFilter?.min || 10}</span>
                      <span>${shopSettings.priceFilter?.max || 500}</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Promo Banner */}
                {/* {shopSettings.sidebarBanner && (
                  <div
                    className="sidebar-promo-card p-4 text-center rounded-3 text-white mb-40"
                    style={{
                      background: "linear-gradient(135deg, #1e293b, #0f172a)",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                    }}
                  >
                    <span className="badge bg-danger mb-2">{shopSettings.sidebarBanner.discount || "35% OFF"}</span>
                    <h5 className="text-white mb-2">{shopSettings.sidebarBanner.title || "Festive Season Clearance"}</h5>
                    <p className="text-light small mb-3">Authentic Moradabad brassware at special holiday prices.</p>
                    <Link to="/shops" className="btn btn-sm btn-outline-light">
                      Shop Clearance
                    </Link>
                  </div>
                )} */}
              </div>
            </div>

            {/* Main Product Catalog Grid */}
            <div className="col-xl-9 col-lg-8">
              <div className="shop-page-content">
                {/* Shop Filter Top Header */}
                <div className="shop-filter mb-40">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="show-text">
                        <p>
                          Showing <span>1–{filteredProducts.length}</span> of <span>{products.length}</span> items
                          {selectedCategory !== "All" && (
                            <span className="ms-1 fw-bold" style={{ color: "#cc0d39" }}>
                              {" "}in &quot;{selectedCategory}&quot;
                            </span>
                          )}
                        </p>
                        {selectedCategory !== "All" && (
                          <div className="mt-2 d-flex align-items-center gap-2">
                            <span
                              className="badge"
                              style={{
                                backgroundColor: "#fff2f4",
                                color: "#cc0d39",
                                border: "1px solid #ffd1d8",
                                padding: "6px 12px",
                                fontSize: "12px",
                                fontWeight: "600",
                                borderRadius: "20px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              Filtered: {selectedCategory}
                              <button
                                type="button"
                                onClick={() => handleSelectCategory("All")}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#cc0d39",
                                  cursor: "pointer",
                                  padding: "0 0 0 4px",
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  lineHeight: 1,
                                }}
                                title="Clear filter"
                              >
                                &times;
                              </button>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="filter-product-category d-flex align-items-center justify-content-md-end">
                        <h5 className="d-none d-sm-inline-block me-3">Sort By:</h5>
                        <div className="nice-select" onClick={() => setSortDropdownOpen(!sortDropdownOpen)}>
                          <span className="current">{selectedSort}</span>
                          {sortDropdownOpen && (
                            <ul className="list">
                              <li
                                className={`option ${selectedSort === "Featured" ? "selected" : ""}`}
                                onClick={() => {
                                  setSelectedSort("Featured");
                                  setSortDropdownOpen(false);
                                }}
                              >
                                Featured
                              </li>
                              <li
                                className={`option ${selectedSort === "Price Low To High" ? "selected" : ""}`}
                                onClick={() => {
                                  setSelectedSort("Price Low To High");
                                  setSortDropdownOpen(false);
                                }}
                              >
                                Price Low To High
                              </li>
                              <li
                                className={`option ${selectedSort === "Price High To Low" ? "selected" : ""}`}
                                onClick={() => {
                                  setSelectedSort("Price High To Low");
                                  setSortDropdownOpen(false);
                                }}
                              >
                                Price High To Low
                              </li>
                              <li
                                className={`option ${selectedSort === "Highest Rated" ? "selected" : ""}`}
                                onClick={() => {
                                  setSelectedSort("Highest Rated");
                                  setSortDropdownOpen(false);
                                }}
                              >
                                Highest Rated
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">No products found matching your filter criteria.</p>
                    <button
                      className="theme-btn style-one mt-3"
                      onClick={() => {
                        handleSelectCategory("All");
                        setSearchQuery("");
                        setMaxPrice(500);
                      }}
                    >
                      Reset Filters & View All
                    </button>
                  </div>
                ) : (
                  <div className="row">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="col-xl-4 col-md-6 col-sm-12 shop-product-col">
                        <div className="product-item style-one mb-40 w-100">
                          <div className="product-thumbnail">
                            <img
                              src={getImageUrl(product.img, "/assets/images/products/brass-cylinder-vase-1.jpg")}
                              alt={product.title}
                              onClick={() => handleProductClick(product)}
                              style={{ cursor: "pointer" }}
                              onError={(e) => {
                                e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                              }}
                            />
                            {product.discount && <div className="discount">{product.discount}</div>}
                            <div className="hover-content">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleWishlist(product);
                                }}
                                className="icon-btn border-0"
                                title={isInWishlist(product._id || product.id || product.sku) ? "Saved in Wishlist" : "Add to Wishlist"}
                                style={{
                                  backgroundColor: isInWishlist(product._id || product.id || product.sku) ? "#CC0D39" : "#FFFFFF",
                                  color: isInWishlist(product._id || product.id || product.sku) ? "#FFFFFF" : "#1E293B",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <i className={`fa${isInWishlist(product._id || product.id || product.sku) ? 's' : 'r'} fa-heart`} />
                              </button>
                              <Link
                                to={`/shop-details?id=${product._id || product.id || product.sku}`}
                                state={{ product }}
                                className="icon-btn"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                            <div className="cart-button">
                              <Link
                                to={`/shop-details?id=${product._id || product.id || product.sku}`}
                                state={{ product }}
                                className="cart-btn"
                              >
                                <i className="far fa-eye" /> <span className="text">View Product Details</span>
                              </Link>
                            </div>
                          </div>
                          <div className="product-info-wrap">
                            <div className="product-info">
                              <ul className="ratings rating5">
                                {[...Array(5)].map((_, i) => (
                                  <li key={i}>
                                    <i className={`fas fa-star ${i < (product.rating || 5) ? "" : "text-muted"}`} />
                                  </li>
                                ))}
                                <li>
                                  <span style={{ fontSize: "13px", color: "#777", marginLeft: "4px" }}>
                                    ({product.reviews || 50})
                                  </span>
                                </li>
                              </ul>
                              <h4 className="title">
                                <Link
                                  to={`/shop-details?id=${product._id || product.id || product.sku}`}
                                  state={{ product }}
                                >
                                  {product.title}
                                </Link>
                              </h4>
                            </div>
                            <div className="product-price">
                              {product.prevPrice && (
                                <span className="price prev-price">
                                  <span className="currency">{currencySymbol}</span>
                                  {product.prevPrice}
                                </span>
                              )}
                              <span className="price new-price">
                                <span className="currency">{currencySymbol}</span>
                                {product.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Shop page Section ======*/}
    </main>
  );
}

export default ShopPage;
