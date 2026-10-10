import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const defaultContactData = {
  bannerTitle: "Contact Us",
  marqueeText: "ROYAL ARTISAN WORKSHOPS & GLOBAL GALLERIES",
  offices: [
    {
      id: "off-1",
      title: "Moradabad Artisan Workshop",
      address: "Brass Craft Complex, Station Road, Moradabad, Uttar Pradesh, 244001, India",
      phone1: "+91 98765 43210",
      phone2: "+91 98765 43211",
      email: "crafts@ratanbrass.com",
      isActive: true,
    },
    {
      id: "off-2",
      title: "New Delhi Design Studio",
      address: "42 Hauz Khas Heritage Enclave, South Delhi, New Delhi 110016, India",
      phone1: "+91 11 2685 4321",
      phone2: "+91 98111 22334",
      email: "delhi@ratanbrass.com",
      isActive: true,
    },
    {
      id: "off-3",
      title: "International Export Desk",
      address: "Suite 404, Port View Tower, Jebel Ali Free Zone, Dubai, UAE",
      phone1: "+971 4 881 2345",
      phone2: "+971 50 123 4567",
      email: "exports@ratanbrass.com",
      isActive: true,
    },
  ],
  formSettings: {
    formTitle: "Get In Touch With Us",
    recipientEmail: "support@ratanbrass.com",
    responseTime: "Replies within 12 hours",
  },
};

function ContactPages() {
  const [contactData, setContactData] = useState(defaultContactData);
  const [formStatus, setFormStatus] = useState("");
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchContactData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/website/content/contact_page`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setContactData(result.data);
        }
      }
    } catch (err) {
      console.warn("[ContactPage] Using cached/default data:", err.message);
      const cached = localStorage.getItem("pesco_contact_page");
      if (cached) {
        try {
          setContactData(JSON.parse(cached));
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    fetchContactData();

    const handleUpdate = () => fetchContactData();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pesco_website_updated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pesco_website_updated", handleUpdate);
    };
  }, []);

  const activeOffices = (contactData?.offices || defaultContactData.offices).filter(
    (off) => off.isActive !== false
  );

  const marqueeText = contactData?.marqueeText || defaultContactData.marqueeText;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Thank you! Your message has been sent successfully. We will reply shortly.");
    setTimeout(() => setFormStatus(""), 5000);
    e.target.reset();
  };

  return (
    <main className="main-bg">
      {/*====== Start Page Banner ======*/}
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
            <img src="assets/images/bg/page-img-1.png" alt="image" />
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
                  <h1>{contactData.bannerTitle || "Contact Us"}</h1>
                  <ul className="breadcrumb-link">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <i className="far fa-long-arrow-right" />
                    </li>
                    <li className="active">{contactData.bannerTitle || "Contact Us"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Page Banner ======*/}

      {/*====== Start Animated-headline Section ======*/}
      <section className="animated-headline-area pt-90 pb-95">
        <div className="headline-wrap style-two pt-25 pb-25 white-bg">
          <span className="marquee-wrap">
            <span className="marquee-inner left">
              <span className="marquee-item">
                <b>{marqueeText}</b>
                <i className="flaticon-star-2" />
              </span>
              <span className="marquee-item">
                <b>{marqueeText}</b>
                <i className="flaticon-star-2" />
              </span>
              <span className="marquee-item">
                <b>{marqueeText}</b>
                <i className="flaticon-star-2" />
              </span>
            </span>
          </span>
        </div>
      </section>
      {/*====== End Animated-headline Section ======*/}

      {/*====== Start Contact Information Section ======*/}
      <section className="contact-information-section pt-10 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="information-wrapper">
                {activeOffices.map((office, idx) => (
                  <div
                    key={office.id || idx}
                    className="single-information-item d-flex flex-wrap justify-content-between mb-25 p-4"
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <div className="content mb-20" style={{ flex: "1 1 300px", paddingRight: "20px" }}>
                      <h4 style={{ color: "#cc0d39", fontSize: "18px", marginBottom: "8px" }}>
                        <i className="far fa-map-marker-alt me-2" />
                        {office.title}
                      </h4>
                      <p style={{ color: "#555", fontSize: "15px", lineHeight: "1.6" }}>{office.address}</p>
                    </div>
                    <div className="content mb-20" style={{ flex: "1 1 200px" }}>
                      <h4 style={{ fontSize: "16px", marginBottom: "8px" }}>
                        <i className="far fa-phone me-2" />
                        Phone Contacts
                      </h4>
                      {office.phone1 && (
                        <p className="m-0">
                          <a href={`tel:${office.phone1.replace(/\s+/g, "")}`} style={{ color: "#333" }}>
                            {office.phone1}
                          </a>
                        </p>
                      )}
                      {office.phone2 && (
                        <p className="m-0">
                          <a href={`tel:${office.phone2.replace(/\s+/g, "")}`} style={{ color: "#333" }}>
                            {office.phone2}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="content mb-20" style={{ flex: "1 1 200px" }}>
                      <h4 style={{ fontSize: "16px", marginBottom: "8px" }}>
                        <i className="far fa-envelope me-2" />
                        Direct Email
                      </h4>
                      {office.email && (
                        <p className="m-0">
                          <a href={`mailto:${office.email}`} style={{ color: "#cc0d39", fontWeight: "500" }}>
                            {office.email}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Contact Information Section ======*/}

      {/*====== Start Contact Section ======*/}
      <section className="contact-section pt-40 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="contact-wrapper p-r z-1 mb-50" style={{ background: "#fff", padding: "40px", borderRadius: "16px", border: "1px solid #eee" }}>
                <div className="shape shape-one">
                  <span>
                    <img src="assets/images/shape/cl-line.png" alt="Line Shape" />
                  </span>
                </div>
                <h3 className="mb-2">{contactData.formSettings?.formTitle || "Get in touch"}</h3>
                <p className="text-muted mb-4">
                  {contactData.formSettings?.responseTime ? `Typical response time: ${contactData.formSettings.responseTime}` : "We typically reply within 12-24 hours."}
                </p>

                {formStatus && (
                  <div className="alert alert-success mb-4" role="alert">
                    {formStatus}
                  </div>
                )}

                <form className="pesco-contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        <input type="text" placeholder="Your Name" className="form_control" name="name" required />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        <input type="email" placeholder="Your Email Address" className="form_control" name="Email" required />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <input type="text" placeholder="Subject / Custom Order Reference" className="form_control" name="subject" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-4">
                        <textarea className="form_control" placeholder="Write your message or custom requirement..." name="message" rows={5} required />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form_group">
                        <button className="theme-btn style-one" type="submit">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-img-text text-center mb-50 d-none d-lg-block">
                <img src="assets/images/contact/text-img.png" alt="Text" style={{ maxWidth: "100%", borderRadius: "16px" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Contact Section ======*/}
    </main>
  );
}

export default ContactPages;