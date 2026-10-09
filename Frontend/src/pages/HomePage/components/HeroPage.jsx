import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../../utils/imageUrl';
import { getCurrencySymbol } from '../../../utils/currency';
import './HeroPage.css';

const defaultSlides = [
  {
    _id: 'default-0',
    id: 0,
    subHeading: 'Handcrafted Luxury Metalware',
    title: 'Authentic Ratan Brass & Royal Artefacts',
    description: 'Elevate your living space with heirloom-quality antique brass pillar vases, intricate jali cutouts, and Moradabad artisan craftsmanship.',
    price: '145.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/brass-cylinder-vase-1.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
  },
  {
    _id: 'default-1',
    id: 1,
    subHeading: 'Ambient Illuminations',
    title: 'Vintage Moroccan Lanterns & Fairy Lamps',
    description: 'Transform celebrations, balconies, and living rooms with our exquisite metal & tempered glass fairy light lanterns in Pearl White & Matte Black.',
    price: '89.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/white-moroccan-lanterns.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
  },
  {
    _id: 'default-2',
    id: 2,
    subHeading: 'Traditional Spiritual Elegance',
    title: 'Embossed Brass Flower Vases & Peacock Diyas',
    description: 'Hand-engraved floral embossing and solid cast brass artefacts designed to bring timeless grandeur and warmth into your home.',
    price: '195.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/brass-flower-vase-set.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
  },
];

// Smart title formatter to style highlighted keywords elegantly
const renderHeroTitle = (title) => {
  if (!title) return null;
  if (React.isValidElement(title)) return title;

  if (typeof title === 'string') {
    // If title contains HTML tags like <span> or <br>
    if (title.includes('<') && title.includes('>')) {
      return <span dangerouslySetInnerHTML={{ __html: title }} />;
    }

    // If title has '&', split into two lines and highlight key words
    if (title.includes('&')) {
      const parts = title.split('&');
      const firstPart = parts[0].trim();
      const secondPart = '& ' + parts.slice(1).join('&').trim();

      // Highlight middle or special words in the first part if present
      const words = firstPart.split(' ');
      if (words.length >= 3) {
        const prefix = words[0];
        const highlight = words.slice(1).join(' ');
        return (
          <>
            {prefix} <span>{highlight}</span> <br />{secondPart}
          </>
        );
      }
      return (
        <>
          <span>{firstPart}</span> <br />{secondPart}
        </>
      );
    }
  }

  return title;
};

const HeroPage = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());

  // Fetch dynamic hero slides from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchHeroSlides = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/website/hero-slides');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted && result.success && Array.isArray(result.data) && result.data.length > 0) {
          setSlides(result.data);
        }
      } catch (error) {
        console.warn('[HeroPage] Using default fallback slides:', error.message);
      }
    };

    fetchHeroSlides();

    const handleUpdate = () => {
      fetchHeroSlides();
      setCurrencySymbol(getCurrencySymbol());
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('pesco_website_updated', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('pesco_website_updated', handleUpdate);
    };
  }, []);

  // Auto-slide carousel timer
  useEffect(() => {
    if (!slides || slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-section">
      {/*=== Hero Wrapper ===*/}
      <div className="hero-wrapper-one">
        <div className="container position-relative">
          {/*=== Hero Slider Main ===*/}
          <div className="hero-slider-one slick-initialized slick-slider slick-dotted">
            <div className="slick-list draggable">
              <div
                className="slick-track"
                style={{
                  transform: `translate3d(-${activeSlide * 100}%, 0px, 0px)`,
                }}
              >
                {slides.map((slide, index) => {
                  const slideKey = slide._id || slide.id || index;
                  const buttonLink = slide.buttonLink || '/shops';
                  const buttonText = slide.buttonText || 'Shop Now';
                  const shapeImg = slide.shape || 'assets/images/hero/hero-one-shape1.png';

                  return (
                    <div
                      key={slideKey}
                      className={`single-hero-slider slick-slide ${activeSlide === index ? 'slick-current slick-active' : ''}`}
                      tabIndex={activeSlide === index ? 0 : -1}
                      role="tabpanel"
                      id={`slick-slide0${index}`}
                      aria-describedby={`slick-slide-control0${index}`}
                      aria-hidden={activeSlide !== index}
                    >
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          {/*=== Hero Content ===*/}
                          <div className="hero-content style-one mb-50">
                            <span className="sub-heading">
                              {slide.subHeading}
                            </span>
                            <h1>
                              {renderHeroTitle(slide.title)}
                            </h1>
                            <p>
                              {slide.description}
                            </p>
                            <ul>
                              <li>
                                <div className="price-box">
                                  <div className="currency">{currencySymbol}</div>
                                  <div className="text">
                                    <span className="discount">Discount Price</span>
                                    <h3>{slide.price}</h3>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <img src="assets/images/hero/line-1.png" alt="" />
                              </li>
                              <li>
                                <Link
                                  to={buttonLink}
                                  className="theme-btn style-one"
                                  tabIndex={activeSlide === index ? 0 : -1}
                                >
                                  {buttonText}
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          {/*=== Hero Image ===*/}
                          <div className="hero-image-box">
                            <div className="hero-image">
                              <img
                                src={getImageUrl(slide.image, '/assets/images/products/brass-cylinder-vase-1.jpg')}
                                alt={typeof slide.title === 'string' ? slide.title : 'Hero Item'}
                                onError={(e) => {
                                  e.target.src = '/assets/images/products/brass-cylinder-vase-1.jpg';
                                }}
                              />
                              <div
                                className="hero-shape bg_cover"
                                style={{
                                  backgroundImage: `url(${getImageUrl(shapeImg, '/assets/images/hero/hero-one-shape1.png')})`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/*=== Hero Dots (Positioned on right in Desktop, at the bottom below image in Mobile) ===*/}
          {slides.length > 1 && (
            <div className="hero-dots">
              <ul className="slick-dots" role="tablist">
                {slides.map((_, index) => (
                  <li
                    key={index}
                    className={activeSlide === index ? 'slick-active' : ''}
                    role="presentation"
                  >
                    <button
                      type="button"
                      role="tab"
                      id={`slick-slide-control0${index}`}
                      aria-controls={`slick-slide0${index}`}
                      aria-label={`${index + 1} of ${slides.length}`}
                      tabIndex={activeSlide === index ? 0 : -1}
                      aria-selected={activeSlide === index}
                      onClick={() => setActiveSlide(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
