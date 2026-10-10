import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CartDrawer from './CartDrawer'
import WishlistDrawer from './WishlistDrawer'
import { getCartTotalCount } from '../utils/cartUtils'
import { getWishlistCount } from '../utils/wishlistUtils'
import './Navbar.css'


const Navbar = () => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartTotalCount());
  const [wishlistCount, setWishlistCount] = useState(getWishlistCount());

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
        <div className="header-navigation style-one">
          <div className="container">
            {/*=== Primary Menu ===*/}
            <div className="primary-menu">
              <div className="site-branding d-lg-none d-block">
                <Link to="/" className="brand-logo">
                  <img src="assets/images/logo/logo-main.png" alt="Pesco Logo" />
                </Link>
              </div>

              {/*=== Nav Inner Menu ===*/}
              <div className="nav-inner-menu">
                {/*=== Main Category ===*/}
                {/*=== Site Branding  ===*/}
                <div className="site-branding">
                  <Link to="/" className="brand-logo">
                    <img src="assets/images/logo/logo-main.png" alt="Pesco Logo" />
                  </Link>
                </div>

                {/*=== Pesco Nav Main ===*/}
                <div className="pesco-nav-main">
                  {/*=== Pesco Nav Menu ===*/}
                  <div className="pesco-nav-menu">
                    {/*=== Responsive Menu Search ===*/}
                    <div className="nav-search mb-40 d-block d-lg-none">
                      <div className="form-group">
                        <input
                          type="search"
                          className="form_control"
                          placeholder="Search Here..."
                          name="search"
                        />
                        <button className="search-btn">
                          <i className="far fa-search" />
                        </button>
                      </div>
                    </div>

                    {/*=== Responsive Menu Tab for Mobile ===*/}
                    <div className="pesco-tabs style-three d-block d-lg-none">
                      <ul className="nav nav-tabs mb-30" role="tablist">
                        <li>
                          <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#nav1"
                            role="tab"
                            aria-selected="true"
                          >
                            Menu
                          </button>
                        </li>
                        <li>
                          <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#nav2"
                            role="tab"
                            aria-selected="false"
                            tabIndex={-1}
                          >
                            Category
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="nav1"
                          role="tabpanel"
                        >
                          <nav className="main-menu">
                            <ul>
                              <li className="menu-item">
                                <Link to="/">Home</Link>
                              </li>
                              <li className="menu-item has-children">
                                <Link to="/shops">Shop</Link>
                                <ul className="sub-menu">
                                  <li>
                                    <Link to="/shops">Shop Products</Link>
                                  </li>
                                  <li>
                                    <Link to="/shop-details">Product Details</Link>
                                  </li>
                                  <li>
                                    <Link to="/carts">Cart</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="menu-item has-children">
                                <a href="#pages">Pages</a>
                                <ul className="sub-menu">
                                  <li>
                                    <Link to="/about-us">About Us</Link>
                                  </li>
                                  <li>
                                    <Link to="/faq">FAQs</Link>
                                  </li>
                                  <li>
                                    <Link to="/login">Login</Link>
                                  </li>
                                  <li>
                                    <Link to="/signup">Register</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="menu-item">
                                <Link to="/contact">Contact</Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                        <div className="tab-pane fade" id="nav2" role="tabpanel">
                          <div className="categori-dropdown-item">
                            <ul>
                              <li>
                                <Link to="/shops">
                                  Brass Vases & Urns
                                </Link>
                              </li>
                              <li>
                                <Link to="/shops">
                                  Decorative Lanterns
                                </Link>
                              </li>
                              <li>
                                <Link to="/shops">
                                  Tabletop Urli Bowls
                                </Link>
                              </li>
                              <li>
                                <Link to="/shops">
                                  Pooja & Peacock Diyas
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*=== Desktop Main Menu ===*/}
                    <nav className="main-menu d-none d-lg-block">
                      <ul>
                        <li className="menu-item">
                          <NavLink to="/" end>Home</NavLink>
                        </li>
                        <li className="menu-item">
                          <Link to="/about-us">About Us</Link>
                        </li>
                        <li className="menu-item">
                          <NavLink to="/shops">
                            Shop Collection
                          </NavLink>
                        </li>
                        <li className="menu-item">
                          <Link to="/faq">FAQs</Link>
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
                      className="wishlist-btn d-flex align-items-center"
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      <div className="icon" style={{ position: "relative" }}>
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
                      className="cart-button d-flex align-items-center"
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      <div className="icon" style={{ position: "relative" }}>
                        <i className="fas fa-shopping-bag" />
                        <span className="pro-count">{formattedCount}</span>
                      </div>
                    </button>
                  </li>
                </ul>
                <div className="navbar-toggler d-block d-lg-none">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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