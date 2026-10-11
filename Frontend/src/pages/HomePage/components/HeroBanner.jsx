import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../utils/imageUrl";
import "./HeroBanner.css";

const defaultBanners = [
  {
    id: 1,
    discountTag: "UP TO 35% OFF",
    title: "Royal Handcrafted Brass Vases & Artefacts",
    buttonText: "Shop Brass Decor",
    buttonLink: "/shops",
    image: "assets/images/products/brass-cylinder-vase-1.jpg",
    shape1: "assets/images/banner/discount.png",
    shape2: "assets/images/banner/line.png",
    badgeBg: "bg-one",
  },
  {
    id: 2,
    discountTag: "UP TO 30% OFF",
    title: "Vintage Moroccan Glass & Metal Lanterns",
    buttonText: "Explore Lanterns",
    buttonLink: "/shops",
    image: "assets/images/products/white-moroccan-lanterns.jpg",
    shape1: "assets/images/banner/discount.png",
    shape2: "assets/images/banner/line.png",
    badgeBg: "bg-two",
  },
];

function HomeBanner({ subTitle = "Special Offers", title = "Popular Deals & Offers" }) {
  const [banners, setBanners] = useState(defaultBanners);

  useEffect(() => {
    let isMounted = true;
    const API_BASE = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || "http://localhost:5000";

    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/website/hero-banners`);
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && Array.isArray(result.data) && result.data.length > 0) {
            setBanners(result.data);
          }
        }
      } catch (err) {
        console.warn("[HeroBanner] Using default banners:", err.message);
      }
    };

    fetchBanners();

    const handleUpdate = () => fetchBanners();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pesco_website_updated", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pesco_website_updated", handleUpdate);
    };
  }, []);

  return (
    <section className="banner-section pt-70 pb-30">
      <div className="container">
        {/*=== Section Title matching category header style ===*/}
        <div className="row mb-35">
          <div className="col-12">
            <div
              className="section-title aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay={10}
              data-aos-duration={800}
            >
              <div className="sub-heading d-inline-flex align-items-center">
                <i className="flaticon-sparkler" />
                <span className="sub-title">{subTitle}</span>
              </div>
              <h2>{title}</h2>
            </div>
          </div>
        </div>

        <div className="row banner-row">
          {banners.map((banner, index) => {
            const bgClass = banner.badgeBg || (index % 2 === 0 ? "bg-one" : "bg-two");
            const discount = banner.discountTag || "SPECIAL OFFER";
            const shape1 = banner.shape1 || "assets/images/banner/discount.png";
            const shape2 = banner.shape2 || "assets/images/banner/line.png";

            return (
              <div key={banner._id || banner.id || index} className="col-lg-6 banner-col">
                {/*=== Banner Item ===*/}
                <div
                  className={`banner-item style-one ${bgClass} mb-40 aos-init aos-animate`}
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 10}
                  data-aos-duration={900 + index * 200}
                >
                  <div className="shape shape-one">
                    <span>
                      <img src={shape1} alt="shape" />
                    </span>
                  </div>
                  <div className="shape shape-two">
                    <span>
                      <img src={shape2} alt="shape" />
                    </span>
                  </div>
                  <div className="banner-img">
                    <div className="banner-img-frame">
                      <img
                        src={getImageUrl(banner.image, "/assets/images/products/brass-cylinder-vase-1.jpg")}
                        alt={banner.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                        }}
                      />
                    </div>
                  </div>
                  <div className="banner-content">
                    <span>
                      {discount.includes("%") ? (
                        <>
                          UP TO <span className="off">{discount.replace(/[^0-9%]/g, "")}</span>
                        </>
                      ) : (
                        <span>{discount}</span>
                      )}
                    </span>
                    <h4 title={banner.title}>{banner.title}</h4>
                    <Link to={banner.buttonLink || "/shops"} className="theme-btn style-one">
                      {banner.buttonText || "Shop Now"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeBanner;