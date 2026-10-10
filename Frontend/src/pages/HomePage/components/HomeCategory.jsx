import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../utils/imageUrl";
import "./HomeCategory.css";

const defaultCategoriesData = [
  {
    id: 1,
    title: "Brass Vases & Urns",
    name: "Brass Vases & Urns",
    sku: "RB-VS-101",
    price: "145.00",
    prevPrice: "185.00",
    discount: "22% Off",
    rating: 5,
    reviews: 64,
    category: "Brass Vases & Urns",
    brand: "Ratan Brass",
    material: "Solid Brass (High Grade)",
    finish: "Antique Golden Finish",
    img: "assets/images/products/brass-cylinder-vase-1.jpg",
    link: "/shop-details",
  },
  {
    id: 2,
    title: "Moroccan Lanterns",
    name: "Moroccan Lanterns",
    sku: "RB-LT-201",
    price: "89.00",
    prevPrice: "120.00",
    discount: "25% Off",
    rating: 5,
    reviews: 98,
    category: "Moroccan Lanterns",
    brand: "Ratan Crafts",
    material: "Cast Metal & Tempered Glass",
    finish: "Pearl White Powder Coat",
    img: "assets/images/products/white-moroccan-lanterns.jpg",
    link: "/shop-details",
  },
  {
    id: 3,
    title: "Brass Flower Vases",
    name: "Brass Flower Vases",
    sku: "RB-VS-301",
    price: "195.00",
    prevPrice: "249.00",
    discount: "21% Off",
    rating: 5,
    reviews: 42,
    category: "Brass Flower Vases",
    brand: "Ratan Brass",
    material: "Hammered & Embossed Brass",
    finish: "High-Gloss Mirror Brass",
    img: "assets/images/products/brass-flower-vase-set.jpg",
    link: "/shop-details",
  },
  {
    id: 4,
    title: "Vintage Black Lanterns",
    name: "Vintage Black Lanterns",
    sku: "RB-LT-401",
    price: "92.00",
    prevPrice: "125.00",
    discount: "26% Off",
    rating: 5,
    reviews: 87,
    category: "Vintage Black Lanterns",
    brand: "Ratan Crafts",
    material: "Galvanized Metal & Glass",
    finish: "Matte Midnight Black",
    img: "assets/images/products/black-moroccan-lanterns.jpg",
    link: "/shop-details",
  },
  {
    id: 5,
    title: "Floral Urli Bowls",
    name: "Floral Urli Bowls",
    sku: "RB-UR-301",
    price: "120.00",
    prevPrice: "160.00",
    discount: "25% Off",
    rating: 5,
    reviews: 74,
    category: "Floral Urli Bowls",
    brand: "Ratan Brass",
    material: "Heavy Cast Solid Brass",
    finish: "Antique Vintage Brass",
    img: "assets/images/products/brass-urli-bowl.jpg",
    link: "/shop-details",
  },
  {
    id: 6,
    title: "Peacock Diya Lamps",
    name: "Peacock Diya Lamps",
    sku: "RB-DY-401",
    price: "165.00",
    prevPrice: "210.00",
    discount: "21% Off",
    rating: 5,
    reviews: 58,
    category: "Peacock Diya Lamps",
    brand: "Ratan Brass",
    material: "Pure Moradabad Brass",
    finish: "Royal Gold Polish",
    img: "assets/images/products/brass-peacock-diya.jpg",
    link: "/shop-details",
  },
  {
    id: 7,
    title: "Royal Brass Artefacts",
    name: "Royal Brass Artefacts",
    sku: "RB-AR-501",
    price: "155.00",
    prevPrice: "199.00",
    discount: "22% Off",
    rating: 5,
    reviews: 51,
    category: "Royal Brass Artefacts",
    brand: "Ratan Brass",
    material: "Handcrafted Solid Brass",
    finish: "Antique Brushed Gold",
    img: "assets/images/products/brass-cylinder-vase-1.jpg",
    link: "/shop-details",
  },
  {
    id: 8,
    title: "Artisan Fairy Lanterns",
    name: "Artisan Fairy Lanterns",
    sku: "RB-LT-502",
    price: "95.00",
    prevPrice: "130.00",
    discount: "27% Off",
    rating: 5,
    reviews: 63,
    category: "Artisan Fairy Lanterns",
    brand: "Ratan Crafts",
    material: "Cast Metal & Glass",
    finish: "Ivory Pearl White",
    img: "assets/images/products/white-moroccan-lanterns.jpg",
    link: "/shop-details",
  },
];

function HomeCategory() {
  const [categoriesData, setCategoriesData] = useState(defaultCategoriesData);
  const [itemsToShow, setItemsToShow] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch live dynamic categories from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/website/categories`);
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && Array.isArray(result.data) && result.data.length > 0) {
            const mapped = result.data.map((item, idx) => ({
              id: item._id || item.id || idx + 1,
              title: item.name || item.title,
              name: item.name || item.title,
              img: item.image || item.img || "assets/images/products/brass-cylinder-vase-1.jpg",
              link: item.link || "/shop-details",
              price: item.price || "145.00",
              category: item.name || item.title,
            }));
            setCategoriesData(mapped);
          }
        }
      } catch (err) {
        console.warn("[HomeCategory] Using default categories:", err.message);
      }
    };

    fetchCategories();

    const handleUpdate = () => fetchCategories();
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
      let count = 6;
      if (width >= 1400) {
        count = 6;
      } else if (width >= 1100) {
        count = 5;
      } else if (width >= 880) {
        count = 4;
      } else if (width >= 640) {
        count = 3;
      } else if (width >= 420) {
        count = 2;
      } else {
        count = 1;
      }
      setItemsToShow(count);
      setCurrentIndex((prev) => {
        const newMax = Math.max(0, categoriesData.length - count);
        return Math.min(prev, newMax);
      });
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const maxIndex = Math.max(0, categoriesData.length - itemsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

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
    <section className="category-section pt-100 pb-40 overflow-hidden">
      <div className="container">
        <div className="row align-items-center mb-35">
          <div className="col-8 col-sm-8 col-md-8 col-lg-6">
            {/*=== Section Title ===*/}
            <div
              className="section-title aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay={10}
              data-aos-duration={800}
            >
              <div className="sub-heading d-inline-flex align-items-center">
                <i className="flaticon-sparkler" />
                <span className="sub-title">Categories</span>
              </div>
              <h2>Browse Top Category</h2>
            </div>
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-6">
            {/*=== Navigation Arrows ===*/}
            <div
              className="category-arrows style-one aos-init aos-animate"
              data-aos="fade-left"
              data-aos-delay={15}
              data-aos-duration={1000}
            >
              {/* Previous Arrow Button */}
              <button
                type="button"
                className="category-nav-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous Categories"
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
                className="category-nav-btn next-btn"
                onClick={handleNext}
                aria-label="Next Categories"
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

      {/*=== Category Slider ===*/}
      <div
        className="container-fluid px-lg-4 px-3 aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay={20}
        data-aos-duration={1200}
      >
        <div
          className="category-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="category-track"
            style={{
              transform: `translate3d(-${currentIndex * (100 / itemsToShow)}%, 0px, 0px)`,
            }}
          >
            {categoriesData.map((category) => (
              <div
                key={category.id}
                className="category-slide-item"
                style={{
                  width: `${100 / itemsToShow}%`,
                }}
              >
                <div className="category-item style-one text-center">
                  <Link
                    to="/shop-details"
                    state={{ product: category }}
                    className="category-img"
                    title={`View ${category.title}`}
                  >
                    <img
                      src={getImageUrl(category.img, "/assets/images/products/brass-cylinder-vase-1.jpg")}
                      alt={category.title}
                      onError={(e) => {
                        e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                      }}
                    />
                  </Link>
                  <div className="category-content">
                    <Link
                      to="/shop-details"
                      state={{ product: category }}
                      className="category-btn"
                      title={category.title}
                    >
                      {category.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCategory;