import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUrl";

const defaultAboutData = {
  bannerTitle: "About Us",
  subTitle: "About us",
  heading: "Online Shopping Is Buying Things From Stores On The Internet.",
  description:
    "There are many variations of passages of Lorem Ipsum available, but the our majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable you are going to.",
  experienceYears: "25",
  experienceText: "Year's Experience",
  image1: "assets/images/about/about-1.jpg",
  image2: "assets/images/about/about-2.jpg",
  thumb1: "assets/images/about/about-3.png",
  thumb2: "assets/images/about/about-4.png",
  authorName: "Thomas Alison",
  authorRole: "CEO at PESCO",
  authorImage: "assets/images/about/author.png",
  signatureImage: "assets/images/about/signature.png",
  featuresList: [
    "We are provide 100% best products",
    "Flexible and affordable price",
    "All products is imported",
  ],
  serviceFeatures: [
    { id: "f-1", title: "We are provide 100% best products" },
    { id: "f-2", title: "Flexible and affordable price" },
    { id: "f-3", title: "All products is imported" },
  ],
  teamSubTitle: "Our Team",
  teamTitle: "Meet Management Team",
  teamMembers: [
    {
      id: "team-1",
      name: "Davidthy Phillips",
      role: "Senior Developer",
      image: "assets/images/team/team-1.jpg",
    },
    {
      id: "team-2",
      name: "Sarah Jones",
      role: "Product Manager",
      image: "assets/images/team/team-2.jpg",
    },
    {
      id: "team-3",
      name: "Davis Liam",
      role: "Marketing Specialist",
      image: "assets/images/team/team-3.jpg",
    },
    {
      id: "team-4",
      name: "Michael Davis",
      role: "Digital Marketing Specialist",
      image: "assets/images/team/team-4.jpg",
    },
    {
      id: "team-5",
      name: "Sarah Jones",
      role: "Product Manager",
      image: "assets/images/team/team-5.jpg",
    },
    {
      id: "team-6",
      name: "Emily Garcia",
      role: "Digital Marketing Specialist",
      image: "assets/images/team/team-6.jpg",
    },
  ],
};

function AboutusPage() {
  const [aboutData, setAboutData] = useState(defaultAboutData);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const  API_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch live CMS configuration from backend API
  const fetchAboutData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/website/content/about_page`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setAboutData((prev) => ({
            ...prev,
            ...result.data,
            teamMembers:
              Array.isArray(result.data.teamMembers) && result.data.teamMembers.length > 0
                ? result.data.teamMembers
                : prev.teamMembers,
          }));
        }
      }
    } catch (err) {
      console.warn("[AboutPage] Using cached/default data:", err.message);
      const cached = localStorage.getItem("pesco_about_page");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setAboutData((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    fetchAboutData();

    const handleUpdate = () => fetchAboutData();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pesco_website_updated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pesco_website_updated", handleUpdate);
    };
  }, []);

  const teamList =
    Array.isArray(aboutData?.teamMembers) && aboutData.teamMembers.length > 0
      ? aboutData.teamMembers
      : defaultAboutData.teamMembers;

  const features =
    aboutData.featuresList ||
    aboutData.serviceFeatures?.map((f) => f.title || f.desc) ||
    defaultAboutData.featuresList;

  // Responsive items calculation for Team carousel
  const itemsPerPage = 4;
  const maxSlides = Math.max(1, teamList.length - itemsPerPage + 1);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : teamList.length - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev < teamList.length - 1 ? prev + 1 : 0));
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
            <img src="/assets/images/bg/page-img-1.png" alt="About Banner" />
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
                  <h1>{aboutData.bannerTitle || "About Us"}</h1>
                  <ul className="breadcrumb-link">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <i className="far fa-long-arrow-right" />
                    </li>
                    <li className="active">{aboutData.bannerTitle || "About Us"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Page Banner Section ======*/}

      {/*====== Start About Us Section ======*/}
      <section className="about-us-section pt-120 pb-80">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Column: Overlapping Images & Experience Badge */}
            <div className="col-xl-6">
              <div className="section-image-box style-one mb-50">
                <div className="image-one">
                  <img
                    src={getImageUrl(aboutData.image1, "/assets/images/about/about-1.jpg")}
                    alt="About Us"
                    onError={(e) => {
                      e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                    }}
                  />
                  <div className="img-shape" />
                </div>
                <div className="image-two">
                  <img
                    src={getImageUrl(aboutData.image2, "/assets/images/about/about-2.jpg")}
                    alt="About Us"
                    onError={(e) => {
                      e.target.src = "/assets/images/products/brass-flower-vase-set.jpg";
                    }}
                  />
                  <div className="line" />
                </div>
                <div className="experience-box">
                  <div className="icon">
                    <img src="/assets/images/about/star.svg" alt="star" />
                  </div>
                  <div className="text">
                    <span className="year">{aboutData.experienceYears || "25"}</span>
                    <span className="duration">{aboutData.experienceText || "Year's Experience"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Bullets, Showcase Thumbnails, and Author Signature Card */}
            <div className="col-xl-6">
              <div className="section-content-box style-one mb-50 ps-xl-4">
                <div className="section-title mb-30">
                  <span className="sub-heading">
                    <i className="flaticon-sparkler" />
                    <span className="sub-title">{aboutData.subTitle || "About us"}</span>
                  </span>
                  <h2>{aboutData.heading || "Online Shopping Is Buying Things From Stores On The Internet."}</h2>
                </div>
                <p>
                  {aboutData.description ||
                    "There are many variations of passages of Lorem Ipsum available, but the our majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable you are going to."}
                </p>

                {/* Bullets & Showcase Images Grid */}
                <div className="row mb-30 align-items-center">
                  <div className="col-md-6 col-sm-12">
                    <ul className="list">
                      {features.map((item, idx) => (
                        <li key={idx}>
                          <i className="flaticon-sparkler" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6 col-sm-12 mt-3 mt-md-0">
                    <div className="d-flex gap-3 thumbnail-img justify-content-md-end">
                      <img
                        src={getImageUrl(aboutData.thumb1, "/assets/images/about/about-3.png")}
                        alt="Showcase 1"
                        style={{ maxWidth: "162px", borderRadius: "8px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/assets/images/products/white-moroccan-lanterns.jpg";
                        }}
                      />
                      <img
                        src={getImageUrl(aboutData.thumb2, "/assets/images/about/about-4.png")}
                        alt="Showcase 2"
                        style={{ maxWidth: "162px", borderRadius: "8px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/assets/images/products/black-moroccan-lanterns.jpg";
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Author Signature Box */}
                <div className="content-wrap-box d-flex">
                  <div className="author-item d-flex align-items-center">
                    <div className="author-img me-3">
                      <img
                        src={getImageUrl(aboutData.authorImage, "/assets/images/about/author.png")}
                        alt="Author"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #f0f0f0",
                        }}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100";
                        }}
                      />
                    </div>
                    <div className="author-info">
                      <h5 className="m-0" style={{ fontSize: "16px", fontWeight: 700 }}>
                        {aboutData.authorName || "Thomas Alison"}
                      </h5>
                      <span style={{ fontSize: "12px", color: "#64748B" }}>
                        {aboutData.authorRole || "CEO at PESCO"}
                      </span>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/assets/images/about/divider.png" alt="divider" />
                  </div>
                  <div className="signature">
                    <img
                      src={getImageUrl(aboutData.signatureImage, "/assets/images/about/signature.png")}
                      alt="Signature"
                      style={{ maxHeight: "35px" }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End About Us Section ======*/}

      {/*====== Start Team Section ======*/}
      <section className="team-section pt-50 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center mb-55">
                <span className="sub-heading">
                  <i className="flaticon-sparkler" />
                  <span className="sub-title">{aboutData.teamSubTitle || "Our Team"}</span>
                  <i className="flaticon-sparkler" />
                </span>
                <h2>{aboutData.teamTitle || "Meet Management Team"}</h2>
              </div>
            </div>
          </div>

          {/* Team Cards Centered Container & Slider */}
          <div className="team-slider-wrapper">
            <div
              style={{
                width: "100%",
                overflow: teamList.length > 4 ? "hidden" : "visible",
              }}
            >
              <div
                className="team-slider-track"
                style={{
                  display: "flex",
                  gap: "28px",
                  justifyContent: teamList.length <= 4 ? "center" : "flex-start",
                  flexWrap: teamList.length <= 4 ? "wrap" : "nowrap",
                  transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                  transform: teamList.length > 4 ? `translateX(-${currentSlideIndex * 270}px)` : "none",
                }}
              >
                {teamList.map((member, idx) => (
                  <div
                    key={member.id || idx}
                    style={{
                      flex: "0 0 260px",
                      maxWidth: "280px",
                      width: "100%",
                    }}
                  >
                    <div className="team-item style-one mb-30">
                      <div className="member-info">
                        <h5 className="title mb-1" style={{ fontSize: "17px", fontWeight: 700 }}>
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            {member.name}
                          </a>
                        </h5>
                        <span className="position" style={{ fontSize: "14px", color: "#64748B" }}>
                          {member.role}
                        </span>
                      </div>
                      <div className="member-img">
                        <img
                          src={getImageUrl(member.image, `/assets/images/team/team-${(idx % 6) + 1}.jpg`)}
                          alt={member.name}
                          style={{
                            width: "100%",
                            aspectRatio: "330 / 392",
                            objectFit: "cover",
                            borderRadius: "16px",
                            border: "1px solid #1E293B",
                          }}
                          onError={(e) => {
                            e.target.src = `/assets/images/team/team-${(idx % 6) + 1}.jpg`;
                          }}
                        />
                        <div className="hover-content">
                          <ul className="social-link">
                            <li>
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                <i className="fab fa-facebook-f" />
                              </a>
                            </li>
                            <li>
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                <i className="fab fa-twitter" />
                              </a>
                            </li>
                            <li>
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                <i className="fab fa-linkedin-in" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Dots & Navigation Controls */}
            {teamList.length > 1 && (
              <div className="row align-items-center mt-20">
                <div className="col-6">
                  <div className="team-slider-dots">
                    <ul className="slick-dots d-flex align-items-center m-0 p-0" style={{ listStyle: "none" }}>
                      {teamList.map((_, i) => (
                        <li
                          key={i}
                          className={i === currentSlideIndex ? "slick-active" : ""}
                          onClick={() => setCurrentSlideIndex(i)}
                          style={{ cursor: "pointer" }}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-6">
                  <div className="team-arrows style-one d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="slick-arrow prev"
                      onClick={handlePrev}
                      title="Previous"
                    >
                      <i className="far fa-arrow-left" />
                    </button>
                    <button
                      type="button"
                      className="slick-arrow next"
                      onClick={handleNext}
                      title="Next"
                    >
                      <i className="far fa-arrow-right" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/*====== End Team Section ======*/}
    </main>
  );
}

export default AboutusPage;