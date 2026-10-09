import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertMessage({ type: "", text: "" });

    if (!formData.email || !formData.password) {
      setAlertMessage({
        type: "error",
        text: "Please enter both email and password.",
      });
      return;
    }

    setIsLoading(true);

    // Simulate authentication processing
    setTimeout(() => {
      setIsLoading(false);
      setAlertMessage({
        type: "success",
        text: "Login successful! Redirecting to home...",
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);
    }, 1000);
  };

  return (
    <>
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
              <img src="assets/images/bg/page-img-1.png" alt="banner" />
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
                <img src="assets/images/shape/curved-arrow.png" alt="" />
              </span>
            </div>
            <div className="shape shape-four">
              <span>
                <img src="assets/images/shape/stars.png" alt="" />
              </span>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="page-banner-content">
                    <h1>My Account</h1>
                    <ul className="breadcrumb-link">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <i className="far fa-long-arrow-right" />
                      </li>
                      <li className="active">Login</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Page Banner Section ======*/}

        {/*====== Start Login Section ======*/}
        <section className="login-section pt-100 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="contact-wrapper p-r z-1 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={20}
                  data-aos-duration={1000}
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 15px 45px rgba(19, 23, 43, 0.07)",
                    border: "1px solid rgba(247, 148, 31, 0.15)",
                  }}
                >
                  <div className="shape shape-one">
                    <span>
                      <img
                        src="assets/images/shape/cl-line.png"
                        alt="Line Shape"
                      />
                    </span>
                  </div>

                  {/* Section Title */}
                  <div className="section-title text-center mb-40">
                    <div className="sub-heading d-inline-flex align-items-center mb-10">
                      <i className="flaticon-sparkler" />
                      <span className="sub-title">Welcome Back</span>
                      <i className="flaticon-sparkler" />
                    </div>
                    <h2>
                      Sign In To <span>Pesco</span>
                    </h2>
                    <p className="mt-15" style={{ color: "#5E626F" }}>
                      Access your orders, wishlist, personalized recommendations,
                      and exclusive member discounts.
                    </p>
                  </div>

                  {/* Alert Notification */}
                  {alertMessage.text && (
                    <div
                      className={`alert ${
                        alertMessage.type === "success"
                          ? "alert-success"
                          : "alert-danger"
                      } d-flex align-items-center mb-30`}
                      style={{
                        borderRadius: "10px",
                        padding: "14px 20px",
                        fontSize: "15px",
                        border: "none",
                        backgroundColor:
                          alertMessage.type === "success"
                            ? "#E8F8F0"
                            : "#FDECEF",
                        color:
                          alertMessage.type === "success"
                            ? "#0E7C46"
                            : "#CC0D39",
                      }}
                      role="alert"
                    >
                      <i
                        className={`fas ${
                          alertMessage.type === "success"
                            ? "fa-check-circle"
                            : "fa-exclamation-triangle"
                        } me-2`}
                        style={{ fontSize: "18px" }}
                      />
                      <div>{alertMessage.text}</div>
                    </div>
                  )}

                  {/* Form Area */}
                  <form onSubmit={handleSubmit} className="pesco-contact-form">
                    {/* Email / Username Field */}
                    <div className="form-group mb-25">
                      <label
                        htmlFor="email"
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 500,
                          fontSize: "15px",
                          color: "#13172B",
                        }}
                      >
                        Email Address <span style={{ color: "#CC0D39" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="form_control"
                          required
                          style={{
                            paddingLeft: "45px",
                            height: "58px",
                            backgroundColor: "#fff",
                            borderColor: "#E1E1E1",
                            fontSize: "15px",
                          }}
                        />
                        <i
                          className="far fa-envelope"
                          style={{
                            position: "absolute",
                            left: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#AEB0B6",
                            fontSize: "16px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="form-group mb-20">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label
                          htmlFor="password"
                          style={{
                            fontWeight: 500,
                            fontSize: "15px",
                            color: "#13172B",
                            marginBottom: 0,
                          }}
                        >
                          Password <span style={{ color: "#CC0D39" }}>*</span>
                        </label>
                        <a
                          href="#forgot"
                          onClick={(e) => {
                            e.preventDefault();
                            setAlertMessage({
                              type: "error",
                              text: "Password reset link sent to your registered email.",
                            });
                          }}
                          style={{
                            fontSize: "14px",
                            color: "#CC0D39",
                            fontWeight: 500,
                            textDecoration: "none",
                            transition: "all 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.textDecoration = "underline")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.textDecoration = "none")
                          }
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <div style={{ position: "relative" }}>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="form_control"
                          required
                          style={{
                            paddingLeft: "45px",
                            paddingRight: "45px",
                            height: "58px",
                            backgroundColor: "#fff",
                            borderColor: "#E1E1E1",
                            fontSize: "15px",
                          }}
                        />
                        <i
                          className="far fa-lock-alt"
                          style={{
                            position: "absolute",
                            left: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#AEB0B6",
                            fontSize: "16px",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Toggle password visibility"
                          style={{
                            position: "absolute",
                            right: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "transparent",
                            border: "none",
                            color: "#5E626F",
                            cursor: "pointer",
                            padding: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i
                            className={
                              showPassword ? "far fa-eye-slash" : "far fa-eye"
                            }
                            style={{ fontSize: "16px" }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="d-flex align-items-center justify-content-between mb-30">
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          id="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="form-check-input me-2"
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer",
                            borderColor: "#CC0D39",
                          }}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="form-check-label"
                          style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            color: "#5E626F",
                            userSelect: "none",
                          }}
                        >
                          Remember me on this device
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form_group mb-30 text-center">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="theme-btn style-one w-100"
                        style={{
                          cursor: isLoading ? "not-allowed" : "pointer",
                          opacity: isLoading ? 0.8 : 1,
                          fontSize: "17px",
                          padding: "18px 30px",
                          letterSpacing: "0.5px",
                          boxShadow: "0 8px 20px rgba(204, 13, 57, 0.2)",
                        }}
                      >
                        {isLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            />
                            Signing In...
                          </>
                        ) : (
                          <>
                            Sign In to Account
                            <i className="far fa-arrow-right ms-2" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Divider */}
                    <div
                      className="d-flex align-items-center text-center my-30"
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: "1px",
                          backgroundColor: "#E5E7EB",
                        }}
                      />
                      <span
                        style={{
                          padding: "0 15px",
                          fontSize: "14px",
                          color: "#8C909A",
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Or Continue With
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: "1px",
                          backgroundColor: "#E5E7EB",
                        }}
                      />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="row g-2 mb-30">
                      <div className="col-6">
                        <button
                          type="button"
                          className="w-100 d-flex align-items-center justify-content-center"
                          style={{
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: "1px solid #E5E7EB",
                            backgroundColor: "#fff",
                            color: "#13172B",
                            fontWeight: 500,
                            fontSize: "14px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#CC0D39";
                            e.currentTarget.style.boxShadow =
                              "0 4px 12px rgba(204, 13, 57, 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#E5E7EB";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <i
                            className="fab fa-google me-2"
                            style={{ color: "#EA4335" }}
                          />
                          Google
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          className="w-100 d-flex align-items-center justify-content-center"
                          style={{
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: "1px solid #E5E7EB",
                            backgroundColor: "#fff",
                            color: "#13172B",
                            fontWeight: 500,
                            fontSize: "14px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#CC0D39";
                            e.currentTarget.style.boxShadow =
                              "0 4px 12px rgba(204, 13, 57, 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#E5E7EB";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <i
                            className="fab fa-facebook-f me-2"
                            style={{ color: "#1877F2" }}
                          />
                          Facebook
                        </button>
                      </div>
                    </div>

                    {/* Don't have an account link */}
                    <div className="text-center">
                      <p style={{ fontSize: "15px", color: "#5E626F" }}>
                        Don't have an account yet?{" "}
                        <Link
                          to="/signup"
                          style={{
                            color: "#CC0D39",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.textDecoration = "underline")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.textDecoration = "none")
                          }
                        >
                          Create an Account
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Login Section ======*/}
      </main>
    </>
  );
}

export default LoginPage;
