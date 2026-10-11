import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import CartDrawer from './CartDrawer'
import WishlistDrawer from './WishlistDrawer'
import { getCartTotalCount } from '../utils/cartUtils'
import { getWishlistCount } from '../utils/wishlistUtils'
import './Navbar.css'


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState("menu");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(getCartTotalCount());
  const [wishlistCount, setWishlistCount] = useState(getWishlistCount());

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Auto-close mobile drawer when viewport resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      setIsMobileMenuOpen(false);
      navigate(`/shops?search=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMobileSearchQuery("");
    }
  };

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(getCartTotalCount());
      setWishlistCount(getWishlistCount());
    };

    const handleOpenCartDrawer = () => {
      setCartCount(getCartTotalCount());
      setIsCartDrawerOpen(true);
    };

    const handleOpenWishlistDrawer = () => {
      setWishlistCount(getWishlistCount());
      setIsWishlistDrawerOpen(true);
    };

    window.addEventListener('pesco_cart_updated', updateCounts);
    window.addEventListener('pesco_wishlist_updated', updateCounts);
    window.addEventListener('pesco_open_cart_drawer', handleOpenCartDrawer);
    window.addEventListener('pesco_open_wishlist_drawer', handleOpenWishlistDrawer);
    window.addEventListener('storage', updateCounts);

    return () => {
      window.removeEventListener('pesco_cart_updated', updateCounts);
      window.removeEventListener('pesco_wishlist_updated', updateCounts);
      window.removeEventListener('pesco_open_cart_drawer', handleOpenCartDrawer);
      window.removeEventListener('pesco_open_wishlist_drawer', handleOpenWishlistDrawer);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  const formattedCount = cartCount < 10 ? `0${cartCount}` : `${cartCount}`;
  const formattedWishlistCount = wishlistCount < 10 ? `0${wishlistCount}` : `${wishlistCount}`;

  return (
    <>
      {/*===  Header Section  ===*/}
      <header className="header-area">
        {/*===  Search Header Main  ===*/}
        <div className="search-header-main">
          <div className="container">
            {/*===  Search Header Inner  ===*/}
            <div className="search-header-inner">
              {/*=== Social Media Links ===*/}
              <div className="header-social-wrap">
                <ul className="header-social-list">
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      title="Follow us on Facebook"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      title="Follow us on Instagram"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      title="Follow us on Twitter / X"
                    >
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      title="Follow us on LinkedIn"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      title="Subscribe on YouTube"
                    >
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                </ul>
              </div>
              {/*===  Product Search Category  ===*/}
              <div className="product-search-category">
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group p-1">
                    <input type="text" placeholder="Enter Search Products..." />
                    <button type="submit" className="search-btn">
                      <i className="far fa-search" />
                    </button>
                  </div>
                </form>
              </div>

              {/*===  Hotline Support  ===*/}
              <div className="hotline-support item-rtl">
                <div className="icon">
                  <i className="flaticon-support" />
                </div>
                <div className="info">
                  <span>24/7 Support</span>
                  <h5>
                    <a href="tel:+941234567894">+94 123 4567 894</a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*===  Header Navigation  ===*/}
        <div className={`header-navigation style-one ${isMobileMenuOpen ? "mobile-drawer-open" : ""}`}>
          <div className="container">
            {/*=== Primary Menu ===*/}
            <div className="primary-menu">
              <div className="site-branding d-lg-none d-block">
                <Link to="/" className="brand-logo">
                  <img
                    src="/assets/images/logo/logo-main.png"
                    alt="Aayushi Exports Logo"
                  />
                </Link>
              </div>

              {/*=== Nav Inner Menu ===*/}
              <div className="nav-inner-menu">
                {/*=== Main Category ===*/}
                {/*=== Site Branding  ===*/}
                <div className="site-branding d-none d-lg-block">
                  <Link to="/" className="brand-logo">
                    <img
                      src="/assets/images/logo/logo-main.png"
                      alt="Aayushi Exports Logo"
                    />
                  </Link>
                </div>

                {/*=== Pesco Nav Main ===*/}
                <div className="pesco-nav-main">
                  {/*=== Pesco Nav Menu (Mobile Drawer on <992px, in-flow container on >=992px) ===*/}
                  <div className={`pesco-nav-menu ${isMobileMenuOpen ? "menu-on" : ""}`}>
                    {/*=== Mobile Drawer Header with Logo & Close Button ===*/}
                    <div className="mobile-drawer-header d-block d-lg-none">
                      <div className="d-flex align-items-center justify-content-between">
                        <Link
                          to="/"
                          className="mobile-drawer-logo"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <img
                            src="/assets/images/logo/logo-main.png"
                            alt="Aayushi Exports Logo"
                            style={{ maxHeight: "38px", width: "auto", objectFit: "contain" }}
                          />
                        </Link>
                        <button
                          type="button"
                          className="mobile-drawer-close"
                          onClick={() => setIsMobileMenuOpen(false)}
                          aria-label="Close Mobile Menu"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>

                    {/*=== Responsive Menu Search ===*/}
                    <div className="nav-search mb-30 d-block d-lg-none">
                      <form onSubmit={handleMobileSearch} className="form-group mb-0">
                        <input
                          type="search"
                          className="form_control"
                          placeholder="Search products..."
                          name="search"
                          value={mobileSearchQuery}
                          onChange={(e) => setMobileSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                          <i className="far fa-search" />
                        </button>
                      </form>
                    </div>

                    {/*=== Responsive Menu Tab for Mobile ===*/}
                    <div className="pesco-tabs style-three d-block d-lg-none">
                      <ul className="nav nav-tabs mb-25" role="tablist">
                        <li>
                          <button
                            type="button"
                            className={`nav-link ${mobileActiveTab === "menu" ? "active" : ""}`}
                            onClick={() => setMobileActiveTab("menu")}
                          >
                            Menu
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className={`nav-link ${mobileActiveTab === "category" ? "active" : ""}`}
                            onClick={() => setMobileActiveTab("category")}
                          >
                            Category
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content">
                        {mobileActiveTab === "menu" ? (
                          <div className="tab-pane fade show active">
                            <nav className="main-menu mobile-main-menu">
                              <ul>
                                <li className="menu-item">
                                  <NavLink
                                    to="/"
                                    end
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>Home</span>
                                    <i className="far fa-angle-right" />
                                  </NavLink>
                                </li>
                                <li className="menu-item">
                                  <NavLink
                                    to="/about-us"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>About Us</span>
                                    <i className="far fa-angle-right" />
                                  </NavLink>
                                </li>
                                <li className="menu-item">
                                  <NavLink
                                    to="/shops"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>Shop Collection</span>
                                    <i className="far fa-angle-right" />
                                  </NavLink>
                                </li>
                                <li className="menu-item">
                                  <NavLink
                                    to="/faq"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>FAQs</span>
                                    <i className="far fa-angle-right" />
                                  </NavLink>
                                </li>
                                <li className="menu-item">
                                  <NavLink
                                    to="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>Contact</span>
                                    <i className="far fa-angle-right" />
                                  </NavLink>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        ) : (
                          <div className="tab-pane fade show active">
                            <div className="categori-dropdown-item mobile-category-list">
                              <ul>
                                <li>
                                  <Link
                                    to="/shops?category=Brass+Vases+%26+Urns"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>Brass Vases & Urns</span>
                                    <i className="far fa-angle-right" />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/shops?category=Decorative+Lanterns"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>Decorative Lanterns</span>
                                    <i className="far fa-angle-right" />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/shops?category=Tabletop+Urli+Bowls"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>Tabletop Urli Bowls</span>
                                    <i className="far fa-angle-right" />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/shops?category=Pooja+%26+Peacock+Diyas"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span>Pooja & Peacock Diyas</span>
                                    <i className="far fa-angle-right" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/*=== Desktop Main Menu ===*/}
                    <nav className="main-menu desktop-main-menu d-none d-lg-block">
                      <ul>
                        <li className="menu-item">
                          <NavLink to="/" end>Home</NavLink>
                        </li>
                        <li className="menu-item">
                          <NavLink to="/about-us">About Us</NavLink>
                        </li>
                        <li className="menu-item">
                          <NavLink to="/shops">
                            Shop Collection
                          </NavLink>
                        </li>
                        <li className="menu-item">
                          <NavLink to="/faq">FAQs</NavLink>
                        </li>
                        <li className="menu-item">
                          <NavLink to="/contact">Contact</NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>

              {/*=== Nav Right Item ===*/}
              <div className="nav-right-item style-one">
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => setIsWishlistDrawerOpen(true)}
                      title="My Wishlist"
                      className="wishlist-btn"
                    >
                      <div className="icon">
                        <i className="far fa-heart" />
                        <span className="pro-count">{formattedWishlistCount}</span>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setIsCartDrawerOpen(true)}
                      title="Shopping Cart"
                      className="cart-button"
                    >
                      <div className="icon">
                        <i className="fas fa-shopping-bag" />
                        <span className="pro-count">{formattedCount}</span>
                      </div>
                    </button>
                  </li>
                </ul>
                <div
                  className={`navbar-toggler d-block d-lg-none ${isMobileMenuOpen ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  role="button"
                  tabIndex={0}
                  aria-label="Toggle Navigation Menu"
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Offcanvas Overlay for Mobile Menu */}
      <div
        className={`offcanvas__overlay ${isMobileMenuOpen ? "overlay-open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Dynamic Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />

      {/* Dynamic Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
      />
    </>
  )
}

export default Navbar