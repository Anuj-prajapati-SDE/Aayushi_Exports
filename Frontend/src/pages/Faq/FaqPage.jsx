import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const defaultFaqData = {
  bannerTitle: "Frequently Asked Questions",
  subTitle: "FAQs",
  sectionTitle: "How Can We Help You?",
  searchPlaceholder: "Search Faqs",
  faqList: [
    {
      id: "faq-1",
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return unworn and unwashed items within 5 days of purchase for a full refund or exchange. Please see our return policy page for full details and instructions.",
      category: "Returns",
      isActive: true,
    },
    {
      id: "faq-2",
      question: "How long does delivery take?",
      answer:
        "Delivery times depend on your location. Standard shipping takes 3-5 business days, while express air delivery options arrive within 1-2 business days with full door-to-door tracking.",
      category: "Shipping",
      isActive: true,
    },
    {
      id: "faq-3",
      question: "Do you offer any discounts or coupons?",
      answer:
        "Yes, we regularly offer seasonal festive discounts and promotional coupon codes. Sign up for our newsletter to receive exclusive discounts directly in your inbox.",
      category: "Discounts",
      isActive: true,
    },
    {
      id: "faq-4",
      question: "How can I be sure of the quality of your products?",
      answer:
        "All our products are crafted from 100% solid virgin brass and premium materials by master Moradabad artisans. Every artefact undergoes rigorous purity testing and quality inspections before dispatch.",
      category: "Quality",
      isActive: true,
    },
    {
      id: "faq-5",
      question: "How do I care for and clean handcrafted brass artefacts?",
      answer:
        "Our brass artefacts are coated with a protective lacquer. Simply wipe gently with a soft dry cotton or microfiber cloth. Avoid harsh chemical cleaners or abrasive metal scrubbers.",
      category: "Care",
      isActive: true,
    },
    {
      id: "faq-6",
      question: "Do you accept customized or bulk bespoke orders?",
      answer:
        "Yes! We specialize in custom hotel decor, corporate luxury gifting, and personalized engravings. Feel free to contact our support team using the form below.",
      category: "Custom Orders",
      isActive: true,
    },
  ],
  contactTitle: "Have Any Question?",
  contactSubtitle:
    "Our customer support team is available to assist you with any questions regarding product details, sizing, custom orders, shipping, or returns.",
};

function FaqPage() {
  const [faqData, setFaqData] = useState(defaultFaqData);
  const [activeAccordion, setActiveAccordion] = useState(0); // 1st item open by default like screenshot
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch dynamic CMS data from Backend API
  const fetchFaqData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/website/content/faq_page");
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setFaqData((prev) => ({
            ...prev,
            ...result.data,
            faqList:
              Array.isArray(result.data.faqList) && result.data.faqList.length > 0
                ? result.data.faqList
                : prev.faqList,
          }));
        }
      }
    } catch (err) {
      console.warn("[FaqPage] Using cached/default FAQs:", err.message);
      const cached = localStorage.getItem("pesco_faq_page");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setFaqData((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    fetchFaqData();

    const handleUpdate = () => fetchFaqData();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pesco_website_updated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pesco_website_updated", handleUpdate);
    };
  }, []);

  const rawList = Array.isArray(faqData?.faqList) ? faqData.faqList : defaultFaqData.faqList;
  const activeList = rawList.filter((item) => item.isActive !== false);

  // Filtered by Search query
  const filteredFaqs = activeList.filter((item) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      (item.question && item.question.toLowerCase().includes(query)) ||
      (item.answer && item.answer.toLowerCase().includes(query)) ||
      (item.category && item.category.toLowerCase().includes(query))
    );
  });

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
            <img src="/assets/images/bg/page-img-1.png" alt="banner" />
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
                  <h1>{faqData.bannerTitle || "Frequently Asked Questions"}</h1>
                  <ul className="breadcrumb-link">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <i className="far fa-long-arrow-right" />
                    </li>
                    <li className="active">{faqData.bannerTitle || "FAQs"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Page Banner Section ======*/}

      {/*====== Start Faqs Section ======*/}
      <section className="faqs-section pt-120 pb-115">
        <div className="container">
          {/* Section Header with Subtitle, Title and Search */}
          <div className="row align-items-center mb-40">
            <div className="col-lg-7">
              <div className="section-title">
                <span className="sub-heading">
                  <i className="flaticon-sparkler" />
                  <span className="sub-title">{faqData.subTitle || "FAQs"}</span>
                </span>
                <h2>{faqData.sectionTitle || "How Can We Help You?"}</h2>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="faqs-search float-lg-end">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="search"
                    className="form_control"
                    placeholder={faqData.searchPlaceholder || "Search Faqs"}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="search-btn" type="submit">
                    <i className="far fa-search" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Accordion List Matching Exact Template UI */}
          <div className="row">
            <div className="col-lg-12">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No FAQs found matching "{searchTerm}".</p>
                  <button
                    className="theme-btn style-one mt-2"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="accordion" id="accordionOne">
                  {filteredFaqs.map((faq, idx) => {
                    const isOpen = activeAccordion === idx;
                    return (
                      <div
                        className="accordion-item style-one mb-20"
                        key={faq.id || idx}
                      >
                        <div
                          className="accordion-title"
                          aria-expanded={isOpen}
                          onClick={() => setActiveAccordion(isOpen ? -1 : idx)}
                        >
                          <h4>{faq.question}</h4>
                        </div>
                        {isOpen && (
                          <div className="accordion-content">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/*====== End Faqs Section ======*/}

      {/*====== Start Faqs Contact Section ======*/}
      <section className="faq-contact-section pb-90">
        <div className="faq-contact-wrapper overflow-hidden pt-130 pb-85 white-bg">
          <div className="shape svg-shape1">
            <img src="/assets/images/bg/faq-top.svg" alt="svg shape" />
          </div>
          <div className="shape svg-shape2">
            <img src="/assets/images/bg/faq-bottom.svg" alt="svg shape" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="section-content-box mb-40">
                  <h2 className="mb-20">
                    {faqData.contactTitle || "Have Any Question?"} <br />
                    <span>Contact Us</span>
                  </h2>
                  <p>
                    {faqData.contactSubtitle ||
                      "Our customer support team is available to assist you with any questions regarding product details, sizing, custom orders, shipping, or returns."}
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-form-wrapper mb-40">
                  <form
                    className="pesco-contact-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Thank you! Your inquiry has been received. We will respond promptly.");
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form_group mb-3">
                          <input
                            type="text"
                            className="form_control"
                            placeholder="Your Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group mb-3">
                          <input
                            type="email"
                            className="form_control"
                            placeholder="Email Address"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group mb-3">
                          <textarea
                            className="form_control"
                            placeholder="Write Message"
                            rows={5}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <button className="theme-btn style-one" type="submit">
                            Submit Inquiry
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Faqs Contact Section ======*/}
    </main>
  );
}

export default FaqPage;
