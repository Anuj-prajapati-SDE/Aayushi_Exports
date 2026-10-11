import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../utils/imageUrl";
import { getCurrencySymbol } from "../../../utils/currency";
import "./HomeTrendingProducts.css";

const trendingProductsData = [
  {
    id: 1,
    title: "Handcrafted Antique Brass Cylindrical Jali Vase",
    price: "145.00",
    prevPrice: "185.00",
    rating: 5,
    reviews: 80,
    img: "assets/images/products/brass-cylinder-vase-1.jpg",
    link: "/shops",
  },
  {
    id: 2,
    title: "Moroccan Fairy Light Lanterns (Set of 3 - White)",
    price: "89.00",
    prevPrice: "120.00",
    rating: 5,
    reviews: 95,
    img: "assets/images/products/white-moroccan-lanterns.jpg",
    link: "/shops",
  },
  {
    id: 3,
    title: "Royal Floral Embossed Brass Flower Vases (Set of 3)",
    price: "195.00",
    prevPrice: "249.00",
    rating: 5,
    reviews: 62,
    img: "assets/images/products/brass-flower-vase-set.jpg",
    link: "/shops",
  },
  {
    id: 4,
    title: "Matte Black Moroccan Metal Lanterns (Set of 3)",
    price: "92.00",
    prevPrice: "125.00",
    rating: 5,
    reviews: 88,
    img: "assets/images/products/black-moroccan-lanterns.jpg",
    link: "/shops",
  },
  {
    id: 5,
    title: "Traditional Royal Brass Floral Urli with Diya Holders",
    price: "120.00",
    prevPrice: "160.00",
    rating: 5,
    reviews: 74,
    img: "assets/images/products/brass-urli-bowl.jpg",
    link: "/shops",
  },
  {
    id: 6,
    title: "Grand Royal Brass Mayur Peacock Diya Lamp",
    price: "165.00",
    prevPrice: "210.00",
    rating: 5,
    reviews: 58,
    img: "assets/images/products/brass-peacock-diya.jpg",
    link: "/shops",
  },
  {
    id: 7,
    title: "Handcrafted Moradabad Brass Jali Pillar Artefact",
    price: "155.00",
    prevPrice: "199.00",
    rating: 5,
    reviews: 43,
    img: "assets/images/products/brass-cylinder-vase-1.jpg",
    link: "/shops",
  },
  {
    id: 8,
    title: "Vintage Royal Wedding Decor Glass Lantern",
    price: "55.00",
    prevPrice: "75.00",
    rating: 5,
    reviews: 69,
    img: "assets/images/products/white-moroccan-lanterns.jpg",
    link: "/shops",
  },
];

function HomeTrendingProducts() {
  const [productsList, setProductsList] = useState(trendingProductsData);
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [itemsToShow, setItemsToShow] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const API_BASE = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || "http://localhost:5000";

    const fetchTrending = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/website/content/trending_products`);
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && Array.isArray(result.data) && result.data.length > 0) {
            const mapped = result.data.map((item, idx) => ({
              id: item.id || idx + 1,
              title: item.title || item.name,
              price: item.newPrice || item.price || "145.00",
              prevPrice: item.prevPrice || item.originalPrice || "185.00",
              rating: item.rating || 5,
              reviews: item.reviews || 80,
              img: item.image || item.img || "assets/images/products/brass-cylinder-vase-1.jpg",
              tag: item.tag || item.badge || "",
              link: "/shops",
            }));
            setProductsList(mapped);
          }
        }
      } catch (err) {
        console.warn("[HomeTrendingProducts] Using default trending items:", err.message);
      }
    };

    fetchTrending();

    const handleUpdate = () => {
      fetchTrending();
      setCurrencySymbol(getCurrencySymbol());
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pesco_website_updated", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pesco_website_updated", handleUpdate);
    };
  }, []);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsToShow(4);
      } else if (width >= 992) {
        setItemsToShow(3);
      } else if (width >= 576) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const maxIndex = Math.max(0, productsList.length - itemsToShow);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="trending-products-section pb-40 pb-40">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            {/*=== Section Title  ===*/}
            <div
              className="section-title mb-50 aos-init aos-animate"
              data-aos="fade-right"
              data-aos-duration={1000}
            >
              <div className="sub-heading d-inline-flex align-items-center">
                <i className="flaticon-sparkler" />
                <span className="sub-title">Trending Products</span>
              </div>
              <h2>What's Trending Now</h2>
            </div>
          </div>
          <div className="col-md-4">
            {/*=== Navigation Arrows matching image ===*/}
            <div
              className="trending-product-arrows style-one mb-60 aos-init aos-animate"
              data-aos="fade-left"
              data-aos-duration={1200}
            >
              {/* Previous Arrow Button */}
              <button
                type="button"
                className="trending-nav-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous Trending Products"
              >
                <span className="dot-indicator" />
                <span className="arrow-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </span>
              </button>

              {/* Next Arrow Button */}
              <button
                type="button"
                className="trending-nav-btn next-btn"
                onClick={handleNext}
                aria-label="Next Trending Products"
              >
                <span className="dot-indicator" />
                <span className="arrow-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-lg-4">
        {/*=== Trending Slider Wrapper ===*/}
        <div
          className="aos-init aos-animate"
          data-aos="fade-up"
          data-aos-duration={1400}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="trending-slider-wrapper"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="trending-track"
              style={{
                transform: `translate3d(-${currentIndex * (100 / itemsToShow)}%, 0px, 0px)`,
              }}
            >
              {productsList.map((product) => (
                <div
                  key={product.id}
                  className="trending-slide-item"
                  style={{
                    width: `${100 / itemsToShow}%`,
                  }}
                >
                  <div className="product-item style-two">
                    <div className="product-thumbnail">
                      {product.tag && (
                        <span className="trending-badge">{product.tag}</span>
                      )}
                      <Link to={product.link} className="thumbnail-link" aria-label={product.title}>
                        <img
                          src={getImageUrl(product.img, "/assets/images/products/brass-cylinder-vase-1.jpg")}
                          alt={product.title}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                          }}
                        />
                      </Link>
                    </div>
                    <div className="product-info-wrap">
                      <div className="product-info">
                        <ul className={`ratings rating${product.rating}`}>
                          {[...Array(5)].map((_, i) => (
                            <li key={i}>
                              <i className="fas fa-star" />
                            </li>
                          ))}
                          <li>
                            <Link to={product.link}>({product.reviews})</Link>
                          </li>
                        </ul>
                        <h4 className="title">
                          <Link to={product.link} title={product.title}>{product.title}</Link>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeTrendingProducts;
