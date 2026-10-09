import React from "react";
import HeroPage from "./components/HeroPage";
import HomeCategory from "./components/HomeCategory";
import HeroBanner from "./components/HeroBanner";
import HomeCollection from "./components/HomeCollection";
import HomeTrendingProducts from "./components/HomeTrendingProducts";
import HomeProducts from "./components/HomeProducts";

function HomePage() {

  return (
 <>
  {/*====== Main Bg  ======*/}
  <main className="main-bg">
    <HeroPage/>
    {/*====== Start Animated-headline Section ======*/}
    <section className="animated-headline-area primary-dark-bg pt-25 pb-25">
      <div className="headline-wrap style-one">
        <span className="marquee-wrap">
          <span className="marquee-inner left">
            <span className="marquee-item">
              <b>Brass Vases</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Moroccan Lanterns</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Floral Urli Bowls</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Peacock Diyas</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Moradabad Artefacts</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Handcrafted Metalware</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Fairy Lamps</b>
              <i className="fas fa-bahai" />
            </span>
          </span>
          <span className="marquee-inner left">
            <span className="marquee-item">
              <b>Brass Vases</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Moroccan Lanterns</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Floral Urli Bowls</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Peacock Diyas</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Moradabad Artefacts</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Handcrafted Metalware</b>
              <i className="fas fa-bahai" />
            </span>
            <span className="marquee-item">
              <b>Fairy Lamps</b>
              <i className="fas fa-bahai" />
            </span>
          </span>
        </span>
      </div>
    </section>
    {/*====== End Animated-headline Section ======*/}
    {/*====== Start Features Section ======*/}
    <section className="features-section pt-130">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/*=== Features Wrapper ===*/}
            <div
              className="features-wrapper aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={10}
              data-aos-duration={1000}
            >
              {/*=== Iconic Box Item ===*/}
              <div className="iconic-box-item icon-left-box mb-25">
                <div className="icon">
                  <i className="fas fa-shipping-fast" />
                </div>
                <div className="content">
                  <h5>Free Shipping</h5>
                  <p>You get your items delivered without any extra cost.</p>
                </div>
              </div>
              {/*=== Divider ===*/}
              <div className="divider mb-25">
                <img src="assets/images/divider.png" alt="divider" />
              </div>
              {/*=== Iconic Box Item ===*/}
              <div className="iconic-box-item icon-left-box mb-25">
                <div className="icon">
                  <i className="fas fa-microphone" />
                </div>
                <div className="content">
                  <h5>Great Support 24/7</h5>
                  <p>
                    Our customer support team is available around the clock{" "}
                  </p>
                </div>
              </div>
              {/*=== Divider ===*/}
              <div className="divider mb-25">
                <img src="assets/images/divider.png" alt="divider" />
              </div>
              {/*=== Iconic Box Item ===*/}
              <div className="iconic-box-item icon-left-box mb-25">
                <div className="icon">
                  <i className="far fa-handshake" />
                </div>
                <div className="content">
                  <h5>Return Available</h5>
                  <p>
                    Making it easy to return any items if you're not satisfied.
                  </p>
                </div>
              </div>
              {/*=== Divider ===*/}
              <div className="divider mb-25">
                <img src="assets/images/divider.png" alt="divider" />
              </div>
              {/*=== Iconic Box Item ===*/}
              <div className="iconic-box-item icon-left-box mb-25">
                <div className="icon">
                  <i className="fas fa-sack-dollar" />
                </div>
                <div className="content">
                  <h5>Secure Payment</h5>
                  <p>Shop with confidence knowing that our secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*====== End Features Section ======*/}
    {/*====== Start Category Section ======*/}
    <HomeCategory/>
    {/*====== End Category Section ======*/}
    
    {/*====== Start Banner Section ======*/}
    <HeroBanner/>
    {/*====== End Banner Section ======*/}
    {/*====== Start Features Section ======*/}
   <HomeCollection/>
    {/*====== End Features Section ======*/}
    {/*====== Start Features Products Section  ======*/}
    <HomeProducts/>
    {/*====== End Features Products Section  ======*/}
    {/*====== Start Working Section  ======*/}
    <section className="work-processing-section pt-30 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/*=== Section Title  ===*/}
            <div
              className="section-title text-center mb-60 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={10}
              data-aos-duration={800}
            >
              <div className="sub-heading d-inline-flex align-items-center">
                <i className="flaticon-sparkler" />
                <span className="sub-title">Work Processing</span>
                <i className="flaticon-sparkler" />
              </div>
              <h2>How it Work processing</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-sm-6">
            {/*=== Iconic Box Item  ===*/}
            <div
              className="iconic-box-item style-two mb-40 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1000}
            >
              <div className="sn-number">01</div>
              <div className="icon">
                <i className="flaticon-searching" />
              </div>
              <div className="content">
                <h6>Browsing &amp; Choosing</h6>
                <p>
                  This is where customers visit your online store, browse your
                  products.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            {/*=== Iconic Box Item  ===*/}
            <div
              className="iconic-box-item style-two mb-40 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1200}
            >
              <div className="sn-number">02</div>
              <div className="icon">
                <i className="flaticon-payment-method" />
              </div>
              <div className="content">
                <h6>Checkout &amp; Payment</h6>
                <p>
                  Once they have picked their items, customers proceed to
                  checkout.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            {/*=== Iconic Box Item  ===*/}
            <div
              className="iconic-box-item style-two mb-40 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1400}
            >
              <div className="sn-number">03</div>
              <div className="icon">
                <i className="flaticon-currency" />
              </div>
              <div className="content">
                <h6>Order Fulfillment</h6>
                <p>
                  After the order is placed, it's sent to your fulfillment team.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            {/*=== Iconic Box Item  ===*/}
            <div
              className="iconic-box-item style-two mb-40 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1600}
            >
              <div className="sn-number">04</div>
              <div className="icon">
                <i className="flaticon-delivery" />
              </div>
              <div className="content">
                <h6>Delivery to Customer</h6>
                <p>The packed order is then sent off with a shipping carrier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*====== End Working Section  ======*/}
    {/*====== Start Trending Products Sections  ======*/}
  <HomeTrendingProducts/>
    {/*====== End Trending Products Sections  ======*/}
    {/*====== Start Blog Sections  ======*/}
    <section className="best-deal-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="offer-deal-wrapper bg_cover aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1400}
              style={{ backgroundImage: "url(assets/images/bg/deal-bg-1.png)" }}
            >
              <div className="deal-img">
                <span>
                  <img src="assets/images/banner/deal-1.png" alt="Image" />
                </span>
              </div>
              <div className="deal-content">
                <span className="sub-heading">
                  <i className="fas fa-tags" />
                  Deal of the Week
                </span>
                <h2>
                  Hurry Up! Offer ends in. Get <span>UP TO 80% OFF</span>
                </h2>
                <div className="simply-countdown mb-60">
                  <div className="simply-section simply-days-section">
                    <div>
                      <span className="simply-amount">0</span>
                      <span className="simply-word">day</span>
                    </div>
                  </div>
                  <div className="simply-section simply-hours-section">
                    <div>
                      <span className="simply-amount">0</span>
                      <span className="simply-word">hour</span>
                    </div>
                  </div>
                  <div className="simply-section simply-minutes-section">
                    <div>
                      <span className="simply-amount">0</span>
                      <span className="simply-word">minute</span>
                    </div>
                  </div>
                  <div className="simply-section simply-seconds-section">
                    <div>
                      <span className="simply-amount">0</span>
                      <span className="simply-word">second</span>
                    </div>
                  </div>
                </div>
                <div className="shop-button">
                  <a href="shops.html" className="theme-btn style-one">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*====== End Blog Sections  ======*/}
    {/*====== Start Testimonial Sections  ======*/}
    <section className="testimonial-section">
      <div className="testimonial-wrapper overflow-x-hidden pt-190 pb-90 white-bg">
        <div className="shape svg-shape1">
          <img src="assets/images/testimonial/tl-svgTop.svg" alt="svg shape" />
        </div>
        <div className="shape svg-shape2">
          <img
            src="assets/images/testimonial/tl-svgBottom.svg"
            alt="svg shape"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              {/*=== Section Content Box ===*/}
              <div
                className="section-content-box mb-40 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-delay={30}
                data-aos-duration={800}
              >
                <div className="section-title mb-50">
                  <h2>What Our Clients Say About Us</h2>
                </div>
                <div className="testimonial-arrows style-one">
                  <div className="prev slick-arrow" style={{}}>
                    <i className="flaticon-arrow-left" />
                  </div>
                  <div className="next slick-arrow" style={{}}>
                    <i className="flaticon-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              {/*=== Testimonial Slider ===*/}
              <div
                className="testimonial-slider-one aos-init slick-initialized slick-slider aos-animate"
                data-aos="fade-left"
                data-aos-delay={50}
                data-aos-duration={1000}
              >
                {/*=== Testimonial Item ===*/}
                {/*=== Testimonial Item ===*/}
                {/*=== Testimonial Item ===*/}
                {/*=== Testimonial Item ===*/}
                <div className="slick-list draggable">
                  <div
                    className="slick-track"
                    style={{
                      opacity: 1,
                      width: 20000,
                      transform: "translate3d(-1110px, 0px, 0px)"
                    }}
                  >
                    <div
                      className="testimonial-item style-one mb-40 slick-slide slick-cloned"
                      tabIndex={-1}
                      style={{}}
                      data-slick-index={-1}
                      id=""
                      aria-hidden="true"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-2.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonial-item style-one mb-40 slick-slide"
                      tabIndex={-1}
                      style={{}}
                      data-slick-index={0}
                      aria-hidden="true"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-1.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonial-item style-one mb-40 slick-slide slick-current slick-active"
                      tabIndex={0}
                      style={{}}
                      data-slick-index={1}
                      aria-hidden="false"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-2.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonial-item style-one mb-40 slick-slide"
                      tabIndex={-1}
                      style={{}}
                      data-slick-index={2}
                      aria-hidden="true"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-1.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonial-item style-one mb-40 slick-slide"
                      tabIndex={-1}
                      style={{}}
                      data-slick-index={3}
                      aria-hidden="true"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-2.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonial-item style-one mb-40 slick-slide slick-cloned"
                      tabIndex={-1}
                      style={{}}
                      data-slick-index={4}
                      id=""
                      aria-hidden="true"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-1.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonial-item style-one mb-40 slick-slide slick-cloned"
                      tabIndex={-1}
                      style={{}}
                      data-slick-index={5}
                      id=""
                      aria-hidden="true"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-2.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonial-item style-one mb-40 slick-slide slick-cloned"
                      tabIndex={-1}
                      style={{}}
                      data-slick-index={6}
                      id=""
                      aria-hidden="true"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-1.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="testimonial-item style-one mb-40 slick-slide slick-cloned"
                      tabIndex={-1}
                      style={{}}
                      data-slick-index={7}
                      id=""
                      aria-hidden="true"
                    >
                      <div className="testimonial-content">
                        <p>
                          This inflatable dragon costume seemed perfect for
                          Halloween! But upon inflating, it became clear the
                          wings were uneven, causing me to spin uncontrollably
                          like a rogue pool float.{" "}
                        </p>
                        <div className="author-quote-item d-flex justify-content-between align-items-center">
                          <div className="author-item">
                            <div className="author-thumb">
                              <img
                                src="assets/images/testimonial/author-2.png"
                                alt="author image"
                              />
                            </div>
                            <div className="author-info">
                              <h5>Rhodes Jhon</h5>
                              <ul className="ratings rating5">
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                                <li>
                                  <i className="fas fa-star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="quote-icon">
                            <i className="flaticon flaticon-right-quote" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*====== End Testimonial Sections  ======*/}
    {/*====== Start Blog Sections  ======*/}
    <section className="blogs-section pt-125 pb-95">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/*=== Section Title  ===*/}
            <div
              className="section-title text-center mb-60 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1000}
            >
              <div className="sub-heading d-inline-flex align-items-center">
                <i className="flaticon-sparkler" />
                <span className="sub-title">Our Blogs</span>
                <i className="flaticon-sparkler" />
              </div>
              <h2>Explore our Articles</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            {/*=== Blog Post Item  ===*/}
            <div
              className="blog-post-item style-one mb-25 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1200}
            >
              <div className="post-thumbnail">
                <img
                  src="assets/images/blog/blog-big-1.png"
                  alt="Post Thumbnail"
                />
              </div>
              <div className="post-content">
                <h3 className="title">
                  <a href="blog-details.html">
                    From Clicks to Closets: Mastering the Art of Fashion
                    E-commerce Marketing
                  </a>
                </h3>
                <p>
                  dives into the world of fashion e-commerce marketing, guiding
                  readers on how to turn online interest into sales. It likely
                  explores strategies to attract potential customers, showcase
                  products effectively, and create a smooth buying journey that
                  converts clicks into clothes hanging in closets
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-sm-6">
                {/*=== Blog Post Item  ===*/}
                <div
                  className="blog-post-item style-two mb-25 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={1400}
                >
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blog-sm-1.png"
                      alt="Post Thumbnail"
                    />
                  </div>
                  <div className="post-content">
                    <h3 className="title">
                      <a href="blog-details.html">
                        Slay the Summer Style Game Must-Have Trends You Can Shop
                        Online
                      </a>
                    </h3>
                    <div className="post-meta">
                      <span>
                        <a href="#">WordPress</a>
                      </span>
                      <span>
                        <a href="#">Jan 12, 2024</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                {/*=== Blog Post Item  ===*/}
                <div
                  className="blog-post-item style-two mb-25 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={1600}
                >
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blog-sm-2.png"
                      alt="Post Thumbnail"
                    />
                  </div>
                  <div className="post-content">
                    <h3 className="title">
                      <a href="blog-details.html">
                        Insider Tips on Finding Affordable Fashion Gems Online
                      </a>
                    </h3>
                    <div className="post-meta">
                      <span>
                        <a href="#">WordPress</a>
                      </span>
                      <span>
                        <a href="#">May 4, 2024</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                {/*=== Blog Post Item  ===*/}
                <div
                  className="blog-post-item style-two mb-25 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={1800}
                >
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blog-sm-3.png"
                      alt="Post Thumbnail"
                    />
                  </div>
                  <div className="post-content">
                    <h3 className="title">
                      <a href="blog-details.html">
                        Eco-Friendly Fashion E-commerce You Can Feel Good About
                      </a>
                    </h3>
                    <div className="post-meta">
                      <span>
                        <a href="#">WordPress</a>
                      </span>
                      <span>
                        <a href="#">Feb 10, 2024</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div
                  className="blog-post-item style-two mb-25 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={2000}
                >
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blog-sm-4.png"
                      alt="Post Thumbnail"
                    />
                  </div>
                  <div className="post-content">
                    <h3 className="title">
                      <a href="blog-details.html">
                        A Guide to Streamlining the Online Fashion Shopping
                        Experience
                      </a>
                    </h3>
                    <div className="post-meta">
                      <span>
                        <a href="#">WordPress</a>
                      </span>
                      <span>
                        <a href="#">Aug 29, 2024</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*====== End Blog Sections  ======*/}
    {/*====== Start Newsletter Sections  ======*/}
    <section className="newsletter-section pb-95">
      <div className="container">
        {/*=== Newsletter Wrapper  ===*/}
        <div
          className="newsletter-wrapper white-bg p-r z-1 aos-init aos-animate"
          data-aos="fade-up"
          data-aos-duration={1000}
        >
          <div className="newsletter-shape pattern-one">
            <span>
              <img
                src="assets/images/newsletter/pattern-1.png"
                alt="Pattern Shape"
              />
            </span>
          </div>
          <div className="newsletter-shape pattern-two">
            <span>
              <img
                src="assets/images/newsletter/pattern-2.png"
                alt="Pattern Shape"
              />
            </span>
          </div>
          <div className="newsletter-shape shape-one">
            <span>
              <img src="assets/images/newsletter/shape-1.png" alt="Shape" />
            </span>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter-content-box">
                <span className="sub-text">Our Newsletter</span>
                <h3>
                  Get weekly update. Sign up and get up to <span>20% off</span>{" "}
                  your first purchase
                </h3>
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Write your Email Address"
                      name="email"
                    />
                    <button className="theme-btn style-one">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="newsletter-image">
                <img
                  src="assets/images/newsletter/newsletter-1.png"
                  alt="Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*====== End Newsletter Sections  ======*/}
  </main>
</>

  )
}

export default HomePage