import React from "react";
function HeroAnimationHeading (){
    return(
        <>
    
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
</>
    )
} 
export default HeroAnimationHeading;