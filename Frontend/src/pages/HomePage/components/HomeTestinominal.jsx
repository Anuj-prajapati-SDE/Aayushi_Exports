import React, { useState, useEffect, useRef, useCallback } from "react";
import { getImageUrl } from "../../../utils/imageUrl";
import "./HomeTestinominal.css";

const defaultTestimonialsData = {
  subTitle: "Client Testimonials",
  title: "What Our Clients Say About Us",
  description: "Real feedback from luxury homeowners, interior designers, and boutique hospitality clients worldwide.",
  testimonials: [
    {
      id: "testi-1",
      name: "Rhodes Jhon",
      role: "Verified Homeowner",
      location: "California, USA",
      rating: 5,
      review: "The antique cylindrical jali vase is an absolute masterpiece! The hand-carved fretwork and heavy solid brass craftsmanship exceeded my expectations. Delivered in impeccable shockproof packaging.",
      image: "assets/images/testimonial/author-1.png",
      productName: "Antique Brass Cylindrical Jali Vase",
      isActive: true,
    },
    {
      id: "testi-2",
      name: "Eleanor Vance",
      role: "Interior Architecture Director",
      location: "London, UK",
      rating: 5,
      review: "We ordered the Moroccan fairy lanterns and royal floral urlis for a boutique hotel lobby project. The ambient candlelight glow and authentic brass patina are simply breathtaking.",
      image: "assets/images/testimonial/author-2.png",
      productName: "Vintage Moroccan Glass & Metal Lanterns",
      isActive: true,
    },
    {
      id: "testi-3",
      name: "Rajesh & Sunita Mehra",
      role: "Luxury Decor Enthusiasts",
      location: "New Delhi, India",
      rating: 5,
      review: "The royal peacock diya lamp and embossed vase set became the centerpiece of our festive celebrations. Genuine virgin brass with protective clear lacquer that stays gleaming without tarnish.",
      image: "assets/images/testimonial/author-1.png",
      productName: "Royal Mayur Peacock Diya & Urli Bowl",
      isActive: true,
    },
    {
      id: "testi-4",
      name: "Sophia Laurent",
      role: "Commercial Staging Specialist",
      location: "Paris, France",
      rating: 5,
      review: "Exceptional Moradabad artisan heritage quality! Seamless international courier delivery with full tracking. Our clients constantly ask where we sourced these exquisite brass vessels.",
      image: "assets/images/testimonial/author-2.png",
      productName: "Handcrafted Moradabad Brass Artefacts",
      isActive: true,
    },
  ],
};

function HomeTestinominal() {
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem("pesco_testimonials_data");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && (parsed.testimonials?.length || parsed.items?.length)) {
          return {
            subTitle: parsed.subTitle || defaultTestimonialsData.subTitle,
            title: parsed.title || defaultTestimonialsData.title,
            description: parsed.description || defaultTestimonialsData.description,
            testimonials: parsed.testimonials || parsed.items || defaultTestimonialsData.testimonials,
          };
        }
      } catch (e) { }
    }
    return defaultTestimonialsData;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);
  const API_BASE = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || "http://localhost:5000";

  // Fetch dynamic testimonials from backend API
  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/website/content/testimonials`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          const d = result.data;
          const list = Array.isArray(d.testimonials)
            ? d.testimonials
            : Array.isArray(d.items)
              ? d.items
              : Array.isArray(d)
                ? d
                : defaultTestimonialsData.testimonials;

          const updated = {
            subTitle: d.subTitle || defaultTestimonialsData.subTitle,
            title: d.title || defaultTestimonialsData.title,
            description: d.description || defaultTestimonialsData.description,
            testimonials: list.length > 0 ? list : defaultTestimonialsData.testimonials,
          };

          setData(updated);
          localStorage.setItem("pesco_testimonials_data", JSON.stringify(updated));
        }
      }
    } catch (err) {
      console.warn("[HomeTestimonial] Using cached/default testimonials:", err.message);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchTestimonials();

    const handleSync = () => {
      fetchTestimonials();
    };
    window.addEventListener("storage", handleSync);
    window.addEventListener("pesco_website_updated", handleSync);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("pesco_website_updated", handleSync);
    };
  }, [fetchTestimonials]);

  // Responsive items-to-show calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setItemsToShow(1);
      } else {
        setItemsToShow(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeTestimonials = (data.testimonials || []).filter((t) => t.isActive !== false);
  const totalItems = activeTestimonials.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay with hover pause
  useEffect(() => {
    if (isHovered || totalItems <= itemsToShow) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered, totalItems, itemsToShow, handleNext]);

  // Touch swipe support
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

  if (activeTestimonials.length === 0) return null;

  return (
    <section className="testimonial-section">
      <div className="testimonial-wrapper overflow-x-hidden pt-70 pb-60">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Column: Section Heading & Navigation Controls */}
            <div className="col-lg-4">
              <div
                className="section-content-box mb-40 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-delay={30}
                data-aos-duration={800}
              >
                <div className="section-title mb-30">
                  <div className="sub-heading d-inline-flex align-items-center mb-10">
                    <i className="flaticon-sparkler" />
                    <span className="sub-title" style={{ fontSize: "14px", fontWeight: 700, color: "#CC0D39" }}>
                      {data.subTitle || "Client Testimonials"}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "34px", fontWeight: 800, color: "#0F172A", lineHeight: 1.25 }}>
                    {data.title || "What Our Clients Say About Us"}
                  </h2>
                  {data.description && (
                    <p style={{ fontSize: "14px", color: "#64748B", marginTop: "12px", lineHeight: 1.6 }}>
                      {data.description}
                    </p>
                  )}
                </div>

                {/* Styled Navigation Arrow Buttons */}
                <div className="testimonial-arrows">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="testimonial-nav-btn prev-btn"
                    aria-label="Previous Testimonials"
                    title="Previous"
                  >
                    <i className="flaticon-arrow-left" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="testimonial-nav-btn next-btn"
                    aria-label="Next Testimonials"
                    title="Next"
                  >
                    <i className="flaticon-arrow-right" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Pure React Dynamic Slider Track */}
            <div className="col-lg-8">
              <div
                className="testimonial-slider-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="testimonial-track"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                  }}
                >
                  {activeTestimonials.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="testimonial-slide-item"
                      style={{
                        width: `${100 / itemsToShow}%`,
                      }}
                    >
                      <div className="testimonial-item style-one mb-40">
                        <div className="testimonial-content">
                          <p title={item.review}>
                            "{item.review}"
                          </p>
                          <div className="author-quote-item">
                            <div className="author-item">
                              <div className="author-thumb">
                                <img
                                  src={getImageUrl(item.image, "/assets/images/testimonial/author-1.png")}
                                  alt={item.name}
                                  onError={(e) => {
                                    e.target.src = "/assets/images/testimonial/author-1.png";
                                  }}
                                />
                              </div>
                              <div className="author-info">
                                <h5 title={item.name}>{item.name}</h5>
                                <span className="position">
                                  {item.role || "Verified Buyer"}
                                  {item.location ? ` • ${item.location}` : ""}
                                </span>
                                <ul className="ratings">
                                  {[...Array(item.rating || 5)].map((_, i) => (
                                    <li key={i}>
                                      <i className="fas fa-star" />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="quote-icon" title="Verified Feedback">
                              <i className="flaticon flaticon-right-quote" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeTestinominal;