import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getCurrencySymbol } from "../../../utils/currency";
import { addToCart } from "../../../utils/cartUtils";
import { toggleWishlist, isInWishlist } from "../../../utils/wishlistUtils";
import "./HomeProducts.css";

const productsData = [
  {
    id: 1,
    title: "Antique Handcrafted Brass Cylindrical Jali Vase",
    price: "145.00",
    prevPrice: "185.00",
    discount: "22% Off",
    rating: 5,
    reviews: 64,
    img: "assets/images/products/brass-cylinder-vase-1.jpg",
    link: "/shops",
  },
  {
    id: 2,
    title: "Vintage Moroccan Glass & Metal Lanterns (Set of 3 - White)",
    price: "89.00",
    prevPrice: "120.00",
    discount: "25% Off",
    rating: 5,
    reviews: 98,
    img: "assets/images/products/white-moroccan-lanterns.jpg",
    link: "/shops",
  },
  {
    id: 3,
    title: "Royal Floral Embossed Brass Flower Vases (Set of 3)",
    price: "195.00",
    prevPrice: "249.00",
    discount: "21% Off",
    rating: 5,
    reviews: 42,
    img: "assets/images/products/brass-flower-vase-set.jpg",
    link: "/shops",
  },
  {
    id: 4,
    title: "Matte Black Moroccan Metal Fairy Light Lanterns (Set of 3)",
    price: "92.00",
    prevPrice: "125.00",
    discount: "26% Off",
    rating: 5,
    reviews: 87,
    img: "assets/images/products/black-moroccan-lanterns.jpg",
    link: "/shops",
  },
  {
    id: 5,
    title: "Traditional Royal Brass Floral Urli with Diya Holders",
    price: "120.00",
    prevPrice: "160.00",
    discount: "25% Off",
    rating: 5,
    reviews: 55,
    img: "assets/images/products/brass-urli-bowl.jpg",
    link: "/shops",
  },
  {
    id: 6,
    title: "Grand Royal Brass Mayur Peacock Diya & Oil Lamp",
    price: "165.00",
    prevPrice: "210.00",
    discount: "21% Off",
    rating: 5,
    reviews: 38,
    img: "assets/images/products/brass-peacock-diya.jpg",
    link: "/shops",
  },
  {
    id: 7,
    title: "Engraved Brass Artisan Table Vase 18-Inch",
    price: "135.00",
    prevPrice: "175.00",
    discount: "23% Off",
    rating: 5,
    reviews: 29,
    img: "assets/images/products/brass-cylinder-vase-1.jpg",
    link: "/shops",
  },
  {
    id: 8,
    title: "Pearl White Fairy Decorative Tabletop Lantern Large",
    price: "48.00",
    prevPrice: "65.00",
    discount: "26% Off",
    rating: 5,
    reviews: 51,
    img: "assets/images/products/white-moroccan-lanterns.jpg",
    link: "/shops",
  },
];

function HomeProducts() {
  const [productsList, setProductsList] = useState(productsData);
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [itemsToShow, setItemsToShow] = useState(4); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);
 const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/website/content/collections`);
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && result.data && result.data.bestSellers && result.data.bestSellers.length > 0) {
            const mapped = result.data.bestSellers.map((item, idx) => ({
              id: item.id || idx + 1,
              title: item.title || item.name,
              price: item.price || "145.00",
              prevPrice: item.prevPrice || item.originalPrice || "185.00",
              discount: item.discount || "20% Off",
              rating: item.rating || 5,
              reviews: item.reviews || 64,
              img: item.image || item.img || "assets/images/products/brass-cylinder-vase-1.jpg",
              link: "/shops",
            }));
            setProductsList(mapped);
          }
        }
      } catch (err) {
        console.warn("[HomeProducts] Using default products:", err.message);
      }
    };

    fetchProducts();

    const handleUpdate = () => {
      fetchProducts();
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
    }, 3500);

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
    <section className="features-products-section pt-85 pb-60">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            {/*=== Section Title ===*/}
            <div
              className="section-title mb-50 aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay={10}
              data-aos-duration={1000}
            >
              <div className="sub-heading d-inline-flex align-items-center">
                <i className="flaticon-sparkler" />
                <span className="sub-title">Feature Products</span>
              </div>
              <h2>Our Features Collection</h2>
            </div>
          </div>
          <div className="col-md-4">
            {/*=== Navigation Arrows matching image ===*/}
            <div
              className="feature-arrows style-one mb-60 aos-init aos-animate"
              data-aos="fade-left"
              data-aos-delay={15}
              data-aos-duration={1200}
            >
              {/* Previous Arrow Button */}
              <button
                type="button"
                className="feature-nav-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous Products"
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
                className="feature-nav-btn next-btn"
                onClick={handleNext}
                aria-label="Next Products"
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

        {/*=== Feature Slider Wrapper ===*/}
        <div
          className="aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay={20}
          data-aos-duration={1400}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="feature-slider-wrapper"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="feature-track"
              style={{
                transform: `translate3d(-${currentIndex * (100 / itemsToShow)}%, 0px, 0px)`,
              }}
            >
              {productsList.map((product) => (
                <div
                  key={product.id}
                  className="feature-slide-item"
                  style={{
                    width: `${100 / itemsToShow}%`,
                  }}
                >
                  <div className="product-item style-one mb-40">
                    <div className="product-thumbnail">
                      <img src={product.img} alt={product.title} />
                      {product.discount && (
                        <div className="discount">{product.discount}</div>
                      )}
                      <div className="hover-content">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="icon-btn border-0"
                          title={isInWishlist(product.id) ? "Saved in Wishlist" : "Add to Wishlist"}
                          style={{
                            backgroundColor: isInWishlist(product.id) ? "#CC0D39" : "#FFFFFF",
                            color: isInWishlist(product.id) ? "#FFFFFF" : "#1E293B",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <i className={`fa${isInWishlist(product.id) ? 's' : 'r'} fa-heart`} />
                        </button>
                        <Link
                          to="/shops"
                          className="img-popup icon-btn"
                          aria-label="Quick View"
                        >
                          <i className="fa fa-eye" />
                        </Link>
                      </div>
                      <div className="cart-button">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="cart-btn border-0"
                          style={{ cursor: "pointer", width: "100%" }}
                        >
                          <i className="far fa-shopping-basket" />{" "}
                          <span className="text">Add To Cart</span>
                        </button>
                      </div>
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
                          <Link to={product.link}>{product.title}</Link>
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

export default HomeProducts;