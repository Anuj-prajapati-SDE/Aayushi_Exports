import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../utils/imageUrl";
import { getCurrencySymbol } from "../../../utils/currency";
import { addToCart } from "../../../utils/cartUtils";
import { toggleWishlist, isInWishlist } from "../../../utils/wishlistUtils";

const collectionProducts = {
  cat1: [
    {
      id: 1,
      name: "Handcrafted Antique Brass Cylindrical Jali Vase",
      sku: "RB-VS-101",
      category: "Brass Vases & Urns",
      price: 145.00,
      originalPrice: 185.00,
      discount: "22% Off",
      rating: 5,
      reviews: 64,
      image: "assets/images/products/brass-cylinder-vase-1.jpg",
      material: "Solid Brass (High Grade)",
      finish: "Antique Golden Finish",
      dimensions: "6\"D x 18\"H",
      description: "Exquisite hand-carved cylindrical pillar vase with intricate jaali mesh pattern and polished tapered neck.",
    },
    {
      id: 2,
      name: "Vintage Moroccan Glass & Metal Fairy Lanterns (Set of 3 - White)",
      sku: "RB-LT-201",
      category: "Decorative Lanterns",
      price: 89.00,
      originalPrice: 120.00,
      discount: "25% Off",
      rating: 5,
      reviews: 98,
      image: "assets/images/products/white-moroccan-lanterns.jpg",
      material: "Cast Metal & Tempered Glass",
      finish: "Pearl White Powder Coat",
      dimensions: "Small 10\", Med 14\", Lrg 18\"",
      description: "Set of 3 hexagonal Moroccan lanterns with internal micro-fairy string lights and floral glass panels.",
    },
    {
      id: 3,
      name: "Royal Floral Embossed Brass Flower Vases (Set of 3)",
      sku: "RB-VS-301",
      category: "Brass Vases & Urns",
      price: 195.00,
      originalPrice: 249.00,
      discount: "21% Off",
      rating: 5,
      reviews: 42,
      image: "assets/images/products/brass-flower-vase-set.jpg",
      material: "Hammered & Embossed Brass",
      finish: "High-Gloss Mirror Brass",
      dimensions: "Set of 12\", 16\", 20\" Height",
      description: "Trio of luxury embossed floor & tabletop vases with delicate botanical engravings and polished luster.",
    },
    {
      id: 4,
      name: "Matte Black Vintage Moroccan Fairy Light Lanterns (Set of 3)",
      sku: "RB-LT-401",
      category: "Decorative Lanterns",
      price: 92.00,
      originalPrice: 125.00,
      discount: "26% Off",
      rating: 5,
      reviews: 87,
      image: "assets/images/products/black-moroccan-lanterns.jpg",
      material: "Forged Metal & Clear Glass",
      finish: "Matte Midnight Black",
      dimensions: "Set of 10\", 14\", 18\" Height",
      description: "Gothic and contemporary blend matte black lanterns with hanging hoops and illuminated flower displays.",
    },
    {
      id: 5,
      name: "Traditional Royal Brass Floral Urli with Diya Holders",
      sku: "RB-UB-501",
      category: "Tabletop Urli & Bowls",
      price: 120.00,
      originalPrice: 160.00,
      discount: "25% Off",
      rating: 5,
      reviews: 55,
      image: "assets/images/products/brass-urli-bowl.jpg",
      material: "Pure Brass Casting",
      finish: "Traditional Antique Gold",
      dimensions: "14\" Diameter x 5\" Height",
      description: "Grand peacock & floral embossed urli bowl designed for floating flower petals, aromatic oils, and diyas.",
    },
    {
      id: 6,
      name: "Grand Royal Brass Mayur Peacock Diya & Oil Lamp",
      sku: "RB-SP-601",
      category: "Pooja & Spiritual Artefacts",
      price: 165.00,
      originalPrice: 210.00,
      discount: "21% Off",
      rating: 5,
      reviews: 38,
      image: "assets/images/products/brass-peacock-diya.jpg",
      material: "Heavy Gauge Cast Brass",
      finish: "Rich Patina Brass",
      dimensions: "8\" Base x 22\" Height",
      description: "Majestic brass peacock standing oil lamp crafted with multi-tier oil wick holders and intricate feathers.",
    },
    {
      id: 7,
      name: "Handcrafted Moradabad Brass Jali Pillar Artefact",
      sku: "RB-VS-102",
      category: "Handcrafted Brass Decor",
      price: 155.00,
      originalPrice: 199.00,
      discount: "22% Off",
      rating: 5,
      reviews: 29,
      image: "assets/images/products/brass-cylinder-vase-1.jpg",
      material: "100% Solid Brass",
      finish: "Brushed Satin Gold",
      dimensions: "7\"D x 20\"H",
      description: "Architectural masterpiece handcrafted by master artisans of Moradabad featuring lattice geometric carving.",
    },
    {
      id: 8,
      name: "Pearl White Fairy Decorative Tabletop Lantern Large",
      sku: "RB-LT-202",
      category: "Decorative Lanterns",
      price: 48.00,
      originalPrice: 65.00,
      discount: "26% Off",
      rating: 5,
      reviews: 51,
      image: "assets/images/products/white-moroccan-lanterns.jpg",
      material: "Rust-proof Metal & Glass",
      finish: "Pearl White",
      dimensions: "7\" x 7\" x 18\"H",
      description: "Standalone large decorative lantern with floral internal arrangement and warm LED glow.",
    },
  ],
  cat2: [
    {
      id: 3,
      name: "Royal Floral Embossed Brass Flower Vases (Set of 3)",
      sku: "RB-VS-301",
      category: "Brass Vases & Urns",
      price: 195.00,
      originalPrice: 249.00,
      discount: "21% Off",
      rating: 5,
      reviews: 42,
      image: "assets/images/products/brass-flower-vase-set.jpg",
      material: "Hammered & Embossed Brass",
      finish: "High-Gloss Mirror Brass",
      dimensions: "Set of 12\", 16\", 20\" Height",
      description: "Trio of luxury embossed floor & tabletop vases with delicate botanical engravings and polished luster.",
    },
    {
      id: 1,
      name: "Handcrafted Antique Brass Cylindrical Jali Vase",
      sku: "RB-VS-101",
      category: "Brass Vases & Urns",
      price: 145.00,
      originalPrice: 185.00,
      discount: "22% Off",
      rating: 5,
      reviews: 64,
      image: "assets/images/products/brass-cylinder-vase-1.jpg",
      material: "Solid Brass (High Grade)",
      finish: "Antique Golden Finish",
      dimensions: "6\"D x 18\"H",
      description: "Exquisite hand-carved cylindrical pillar vase with intricate jaali mesh pattern and polished tapered neck.",
    },
    {
      id: 6,
      name: "Grand Royal Brass Mayur Peacock Diya & Oil Lamp",
      sku: "RB-SP-601",
      category: "Pooja & Spiritual Artefacts",
      price: 165.00,
      originalPrice: 210.00,
      discount: "21% Off",
      rating: 5,
      reviews: 38,
      image: "assets/images/products/brass-peacock-diya.jpg",
      material: "Heavy Gauge Cast Brass",
      finish: "Rich Patina Brass",
      dimensions: "8\" Base x 22\" Height",
      description: "Majestic brass peacock standing oil lamp crafted with multi-tier oil wick holders and intricate feathers.",
    },
    {
      id: 4,
      name: "Matte Black Vintage Moroccan Fairy Light Lanterns (Set of 3)",
      sku: "RB-LT-401",
      category: "Decorative Lanterns",
      price: 92.00,
      originalPrice: 125.00,
      discount: "26% Off",
      rating: 5,
      reviews: 87,
      image: "assets/images/products/black-moroccan-lanterns.jpg",
      material: "Forged Metal & Clear Glass",
      finish: "Matte Midnight Black",
      dimensions: "Set of 10\", 14\", 18\" Height",
      description: "Gothic and contemporary blend matte black lanterns with hanging hoops and illuminated flower displays.",
    },
  ],
  cat3: [
    {
      id: 2,
      name: "Vintage Moroccan Glass & Metal Fairy Lanterns (Set of 3 - White)",
      sku: "RB-LT-201",
      category: "Decorative Lanterns",
      price: 89.00,
      originalPrice: 120.00,
      discount: "25% Off",
      rating: 5,
      reviews: 98,
      image: "assets/images/products/white-moroccan-lanterns.jpg",
      material: "Cast Metal & Tempered Glass",
      finish: "Pearl White Powder Coat",
      dimensions: "Small 10\", Med 14\", Lrg 18\"",
      description: "Set of 3 hexagonal Moroccan lanterns with internal micro-fairy string lights and floral glass panels.",
    },
    {
      id: 5,
      name: "Traditional Royal Brass Floral Urli with Diya Holders",
      sku: "RB-UB-501",
      category: "Tabletop Urli & Bowls",
      price: 120.00,
      originalPrice: 160.00,
      discount: "25% Off",
      rating: 5,
      reviews: 55,
      image: "assets/images/products/brass-urli-bowl.jpg",
      material: "Pure Brass Casting",
      finish: "Traditional Antique Gold",
      dimensions: "14\" Diameter x 5\" Height",
      description: "Grand peacock & floral embossed urli bowl designed for floating flower petals, aromatic oils, and diyas.",
    },
    {
      id: 1,
      name: "Handcrafted Antique Brass Cylindrical Jali Vase",
      sku: "RB-VS-101",
      category: "Brass Vases & Urns",
      price: 145.00,
      originalPrice: 185.00,
      discount: "22% Off",
      rating: 5,
      reviews: 64,
      image: "assets/images/products/brass-cylinder-vase-1.jpg",
      material: "Solid Brass (High Grade)",
      finish: "Antique Golden Finish",
      dimensions: "6\"D x 18\"H",
      description: "Exquisite hand-carved cylindrical pillar vase with intricate jaali mesh pattern and polished tapered neck.",
    },
    {
      id: 4,
      name: "Matte Black Vintage Moroccan Fairy Light Lanterns (Set of 3)",
      sku: "RB-LT-401",
      category: "Decorative Lanterns",
      price: 92.00,
      originalPrice: 125.00,
      discount: "26% Off",
      rating: 5,
      reviews: 87,
      image: "assets/images/products/black-moroccan-lanterns.jpg",
      material: "Forged Metal & Clear Glass",
      finish: "Matte Midnight Black",
      dimensions: "Set of 10\", 14\", 18\" Height",
      description: "Gothic and contemporary blend matte black lanterns with hanging hoops and illuminated flower displays.",
    },
  ]
};

function HomeCollection() {
  const [activeTab, setActiveTab] = useState("cat1");
  const [productsMap, setProductsMap] = useState(collectionProducts);
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const API_BASE = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || "http://localhost:5000";
  
  React.useEffect(() => {
    let isMounted = true;
    const fetchCollections = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/website/content/collections`);
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && result.data) {
            const d = result.data;
            const normalize = (items) => {
              if (!Array.isArray(items)) return [];
              return items.map((item, idx) => ({
                id: item.id || idx + 1,
                name: item.title || item.name,
                price: Number(item.price) || 99,
                originalPrice: Number(item.prevPrice || item.originalPrice) || 129,
                discount: item.discount || "20% Off",
                rating: item.rating || 5,
                reviews: item.reviews || 45,
                image: item.image || "assets/images/products/brass-cylinder-vase-1.jpg",
                sku: item.sku || `RB-COL-${idx + 1}`,
                category: item.category || "Brass Decor",
              }));
            };

            setProductsMap({
              cat1: d.bestSellers && d.bestSellers.length > 0 ? normalize(d.bestSellers) : collectionProducts.cat1,
              cat2: d.newProducts && d.newProducts.length > 0 ? normalize(d.newProducts) : collectionProducts.cat2,
              cat3: d.saleProducts && d.saleProducts.length > 0 ? normalize(d.saleProducts) : collectionProducts.cat3,
            });
          }
        }
      } catch (err) {
        console.warn("[HomeCollection] Using default collections:", err.message);
      }
    };

    fetchCollections();

    const handleUpdate = () => {
      fetchCollections();
      setCurrencySymbol(getCurrencySymbol());
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("pesco_website_updated", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("pesco_website_updated", handleUpdate);
    };
  }, []);

  const currentList = productsMap[activeTab] || productsMap.cat1 || [];

  return (
    <section className="features-products pt-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="section-title mb-50 text-center text-lg-start aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay={10}
              data-aos-duration={1000}
            >
              <div className="sub-heading d-inline-flex align-items-center">
                <i className="flaticon-sparkler" />
                <span className="sub-title">Artisan Metalware</span>
              </div>
              <h2>Our Featured Collection</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="pesco-tabs style-one mb-50 aos-init aos-animate"
              data-aos="fade-left"
              data-aos-delay={15}
              data-aos-duration={1200}
            >
              <ul className="nav nav-tabs" role="tablist">
                <li>
                  <button
                    className={`nav-link ${activeTab === "cat1" ? "active" : ""}`}
                    onClick={() => setActiveTab("cat1")}
                    type="button"
                  >
                    Best Sellers
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link ${activeTab === "cat2" ? "active" : ""}`}
                    onClick={() => setActiveTab("cat2")}
                    type="button"
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link ${activeTab === "cat3" ? "active" : ""}`}
                    onClick={() => setActiveTab("cat3")}
                    type="button"
                  >
                    Special Offers
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div
              className="tab-content aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1200}
            >
              <div className="tab-pane fade show active">
                <div className="row justify-content-center">
                  {currentList.map((item) => (
                    <div key={item.id + item.name} className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="product-item style-one mb-40">
                        <div className="product-thumbnail">
                          <img
                            src={getImageUrl(item.image, "/assets/images/products/brass-cylinder-vase-1.jpg")}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "280px",
                              objectFit: "cover",
                              borderRadius: "12px 12px 0 0",
                            }}
                            onError={(e) => {
                              e.target.src = "/assets/images/products/brass-cylinder-vase-1.jpg";
                            }}
                          />
                          <div className="discount">{item.discount}</div>
                          <div className="hover-content">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(item);
                              }}
                              className="icon-btn border-0"
                              title={isInWishlist(item.id || item.sku) ? "Saved in Wishlist" : "Add to Wishlist"}
                              style={{
                                backgroundColor: isInWishlist(item.id || item.sku) ? "#CC0D39" : "#FFFFFF",
                                color: isInWishlist(item.id || item.sku) ? "#FFFFFF" : "#1E293B",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <i className={`fa${isInWishlist(item.id || item.sku) ? 's' : 'r'} fa-heart`} />
                            </button>
                            <Link
                              to="/shop-details"
                              state={{ product: item }}
                              className="icon-btn"
                              title="View Details"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                          </div>
                          <div className="cart-button">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(item, 1);
                              }}
                              className="cart-btn border-0"
                              style={{ cursor: "pointer", width: "100%" }}
                            >
                              <i className="far fa-shopping-basket" />{" "}
                              <span className="text">Add To Cart</span>
                            </button>
                          </div>
                        </div>
                        <div className="product-info-wrap">
                          <div className="product-info">
                            <ul className="ratings rating5">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <li key={i}>
                                  <i className="fas fa-star" />
                                </li>
                              ))}
                              <li>
                                <span>({item.reviews || 50})</span>
                              </li>
                            </ul>
                            <h4 className="title">
                              <Link to="/shop-details" state={{ product: item }}>
                                {item.name}
                              </Link>
                            </h4>
                          </div>
                          <div className="product-price">
                            <span className="price">
                              {currencySymbol}{item.price.toFixed(2)}{" "}
                              <span className="prev-price">
                                {item.originalPrice ? `${currencySymbol}${item.originalPrice.toFixed(2)}` : ""}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCollection;