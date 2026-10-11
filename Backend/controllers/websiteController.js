const HeroSlide = require('../models/HeroSlide');
const Category = require('../models/Category');
const HeroBanner = require('../models/HeroBanner');
const TrendingProduct = require('../models/TrendingProduct');
const WebsiteContent = require('../models/WebsiteContent');
const Product = require('../models/Product');

// Default initial Hero Slides
const defaultHeroSlides = [
  {
    subHeading: 'Handcrafted Luxury Metalware',
    title: 'Authentic Ratan Brass & Royal Artefacts',
    description: 'Elevate your living space with heirloom-quality antique brass pillar vases, intricate jali cutouts, and Moradabad artisan craftsmanship.',
    price: '145.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/brass-cylinder-vase-1.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
    order: 0,
    isActive: true,
  },
  {
    subHeading: 'Ambient Illuminations',
    title: 'Vintage Moroccan Lanterns & Fairy Lamps',
    description: 'Transform celebrations, balconies, and living rooms with our exquisite metal & tempered glass fairy light lanterns in Pearl White & Matte Black.',
    price: '89.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/white-moroccan-lanterns.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
    order: 1,
    isActive: true,
  },
  {
    subHeading: 'Traditional Spiritual Elegance',
    title: 'Embossed Brass Flower Vases & Peacock Diyas',
    description: 'Hand-engraved floral embossing and solid cast brass artefacts designed to bring timeless grandeur and warmth into your home.',
    price: '195.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/brass-flower-vase-set.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
    order: 2,
    isActive: true,
  },
];

// Default initial Categories
const defaultCategories = [
  { name: 'Brass Vases & Urns', count: '28 items', image: 'assets/images/products/brass-cylinder-vase-1.jpg', link: '/shops', order: 0, isActive: true },
  { name: 'Moroccan Lanterns', count: '34 items', image: 'assets/images/products/white-moroccan-lanterns.jpg', link: '/shops', order: 1, isActive: true },
  { name: 'Brass Flower Vases', count: '42 items', image: 'assets/images/products/brass-flower-vase-set.jpg', link: '/shops', order: 2, isActive: true },
  { name: 'Vintage Black Lanterns', count: '39 items', image: 'assets/images/products/black-moroccan-lanterns.jpg', link: '/shops', order: 3, isActive: true },
  { name: 'Floral Urli Bowls', count: '22 items', image: 'assets/images/products/brass-urli-bowl.jpg', link: '/shops', order: 4, isActive: true },
  { name: 'Peacock Diya Lamps', count: '18 items', image: 'assets/images/products/brass-peacock-diya.jpg', link: '/shops', order: 5, isActive: true },
  { name: 'Royal Brass Artefacts', count: '25 items', image: 'assets/images/products/brass-cylinder-vase-1.jpg', link: '/shops', order: 6, isActive: true },
  { name: 'Artisan Fairy Lanterns', count: '15 items', image: 'assets/images/products/white-moroccan-lanterns.jpg', link: '/shops', order: 7, isActive: true },
];

// Default initial Hero Banners
const defaultHeroBanners = [
  {
    discountTag: 'UP TO 35% OFF',
    title: 'Royal Handcrafted Brass Vases & Artefacts',
    buttonText: 'Shop Brass Decor',
    buttonLink: '/shops',
    image: 'assets/images/products/brass-cylinder-vase-1.jpg',
    shape1: 'assets/images/banner/discount.png',
    shape2: 'assets/images/banner/line.png',
    badgeBg: 'bg-one',
    order: 0,
    isActive: true,
  },
  {
    discountTag: 'UP TO 30% OFF',
    title: 'Vintage Moroccan Glass & Metal Lanterns',
    buttonText: 'Explore Lanterns',
    buttonLink: '/shops',
    image: 'assets/images/products/white-moroccan-lanterns.jpg',
    shape1: 'assets/images/banner/discount.png',
    shape2: 'assets/images/banner/line.png',
    badgeBg: 'bg-two',
    order: 1,
    isActive: true,
  },
];

// Universal Default Sections Data
const defaultWebsiteSections = {
  hero_banners: defaultHeroBanners,
  categories: defaultCategories,
  collections: {
    subTitle: 'Artisan Metalware',
    title: 'Our Featured Collection',
    tab1Name: 'Best Sellers',
    tab2Name: 'New Arrivals',
    tab3Name: 'Special Offers',
    bestSellers: [
      {
        id: 'col-1',
        title: 'Handcrafted Antique Brass Cylindrical Jali Vase',
        price: '145.00',
        prevPrice: '185.00',
        discount: '22% Off',
        rating: 5,
        reviews: 64,
        image: 'assets/images/products/brass-cylinder-vase-1.jpg',
        badge: 'Best Seller',
        stock: 'In Stock (45)',
        category: 'Brass Vases & Urns',
      },
      {
        id: 'col-2',
        title: 'Vintage Moroccan Glass & Metal Fairy Lanterns (Set of 3 - White)',
        price: '89.00',
        prevPrice: '120.00',
        discount: '25% Off',
        rating: 5,
        reviews: 98,
        image: 'assets/images/products/white-moroccan-lanterns.jpg',
        badge: 'Trending',
        stock: 'In Stock (30)',
        category: 'Decorative Lanterns',
      },
      {
        id: 'col-3',
        title: 'Royal Floral Embossed Brass Flower Vases (Set of 3)',
        price: '195.00',
        prevPrice: '249.00',
        discount: '21% Off',
        rating: 5,
        reviews: 42,
        image: 'assets/images/products/brass-flower-vase-set.jpg',
        badge: 'Luxury',
        stock: 'In Stock (12)',
        category: 'Brass Vases & Urns',
      },
      {
        id: 'col-4',
        title: 'Matte Black Vintage Moroccan Fairy Light Lanterns (Set of 3)',
        price: '92.00',
        prevPrice: '125.00',
        discount: '26% Off',
        rating: 5,
        reviews: 87,
        image: 'assets/images/products/black-moroccan-lanterns.jpg',
        badge: 'Hot',
        stock: 'In Stock (64)',
        category: 'Decorative Lanterns',
      },
    ],
    newProducts: [
      {
        id: 'col-5',
        title: 'Traditional Royal Brass Floral Urli with Diya Holders',
        price: '120.00',
        prevPrice: '160.00',
        discount: '25% Off',
        rating: 5,
        reviews: 55,
        image: 'assets/images/products/brass-urli-bowl.jpg',
        badge: 'New Arrival',
        stock: 'In Stock (25)',
        category: 'Tabletop Urli & Bowls',
      },
      {
        id: 'col-6',
        title: 'Grand Royal Brass Mayur Peacock Diya & Oil Lamp',
        price: '165.00',
        prevPrice: '210.00',
        discount: '21% Off',
        rating: 5,
        reviews: 38,
        image: 'assets/images/products/brass-peacock-diya.jpg',
        badge: 'New Arrival',
        stock: 'In Stock (18)',
        category: 'Pooja & Spiritual Artefacts',
      },
    ],
    saleProducts: [
      {
        id: 'col-7',
        title: 'Engraved Brass Artisan Table Vase 18-Inch',
        price: '135.00',
        prevPrice: '175.00',
        discount: '23% Off',
        rating: 5,
        reviews: 29,
        image: 'assets/images/products/brass-cylinder-vase-1.jpg',
        badge: 'Mega Sale',
        stock: 'In Stock (100+)',
        category: 'Brass Vases & Urns',
      },
      {
        id: 'col-8',
        title: 'Pearl White Fairy Decorative Tabletop Lantern Large',
        price: '48.00',
        prevPrice: '65.00',
        discount: '26% Off',
        rating: 5,
        reviews: 51,
        image: 'assets/images/products/white-moroccan-lanterns.jpg',
        badge: 'Sale',
        stock: 'In Stock (15)',
        category: 'Decorative Lanterns',
      },
    ],
  },
  trending_products: [
    {
      id: 'trend-1',
      title: 'Handcrafted Antique Brass Cylindrical Jali Vase',
      prevPrice: '185.00',
      newPrice: '145.00',
      rating: 5,
      reviews: 80,
      image: 'assets/images/products/brass-cylinder-vase-1.jpg',
      tag: 'Hot Item',
      isActive: true,
    },
    {
      id: 'trend-2',
      title: 'Moroccan Fairy Light Lanterns (Set of 3 - White)',
      prevPrice: '120.00',
      newPrice: '89.00',
      rating: 5,
      reviews: 95,
      image: 'assets/images/products/white-moroccan-lanterns.jpg',
      tag: 'Popular',
      isActive: true,
    },
    {
      id: 'trend-3',
      title: 'Royal Floral Embossed Brass Flower Vases (Set of 3)',
      prevPrice: '249.00',
      newPrice: '195.00',
      rating: 5,
      reviews: 62,
      image: 'assets/images/products/brass-flower-vase-set.jpg',
      tag: 'Top Pick',
      isActive: true,
    },
    {
      id: 'trend-4',
      title: 'Matte Black Moroccan Metal Lanterns (Set of 3)',
      prevPrice: '125.00',
      newPrice: '92.00',
      rating: 5,
      reviews: 88,
      image: 'assets/images/products/black-moroccan-lanterns.jpg',
      tag: 'Trending',
      isActive: true,
    },
  ],
  testimonials: {
    subTitle: 'Client Testimonials',
    title: 'What Our Clients Say About Us',
    description: 'Real feedback from luxury homeowners, interior designers, and boutique hospitality clients worldwide.',
    testimonials: [
      {
        id: 'testi-1',
        name: 'Rhodes Jhon',
        role: 'Verified Homeowner',
        location: 'California, USA',
        rating: 5,
        review: 'The antique cylindrical jali vase is an absolute masterpiece! The hand-carved fretwork and heavy solid brass craftsmanship exceeded my expectations. Delivered in impeccable shockproof packaging.',
        image: 'assets/images/testimonial/author-1.png',
        productName: 'Antique Brass Cylindrical Jali Vase',
        isActive: true,
      },
      {
        id: 'testi-2',
        name: 'Eleanor Vance',
        role: 'Interior Architecture Director',
        location: 'London, UK',
        rating: 5,
        review: 'We ordered the Moroccan fairy lanterns and royal floral urlis for a boutique hotel lobby project. The ambient candlelight glow and authentic brass patina are simply breathtaking.',
        image: 'assets/images/testimonial/author-2.png',
        productName: 'Vintage Moroccan Glass & Metal Lanterns',
        isActive: true,
      },
      {
        id: 'testi-3',
        name: 'Rajesh & Sunita Mehra',
        role: 'Luxury Decor Enthusiasts',
        location: 'New Delhi, India',
        rating: 5,
        review: 'The royal peacock diya lamp and embossed vase set became the centerpiece of our festive celebrations. Genuine virgin brass with protective clear lacquer that stays gleaming without tarnish.',
        image: 'assets/images/testimonial/author-1.png',
        productName: 'Royal Mayur Peacock Diya & Urli Bowl',
        isActive: true,
      },
      {
        id: 'testi-4',
        name: 'Sophia Laurent',
        role: 'Commercial Staging Specialist',
        location: 'Paris, France',
        rating: 5,
        review: 'Exceptional Moradabad artisan heritage quality! Seamless international courier delivery with full tracking. Our clients constantly ask where we sourced these exquisite brass vessels.',
        image: 'assets/images/testimonial/author-2.png',
        productName: 'Handcrafted Moradabad Brass Artefacts',
        isActive: true,
      },
    ],
  },
  shop_page: {
    bannerTitle: 'Shop Handcrafted Metalware',
    itemsPerPage: '12',
    defaultSort: 'Featured',
    categories: [
      { id: 'sc-1', name: 'Brass Vases & Urns', count: '28', isActive: true },
      { id: 'sc-2', name: 'Decorative Lanterns', count: '34', isActive: true },
      { id: 'sc-3', name: 'Tabletop Urli & Bowls', count: '22', isActive: true },
      { id: 'sc-4', name: 'Pooja & Spiritual Artefacts', count: '18', isActive: true },
      { id: 'sc-5', name: 'Royal Brass Artefacts', count: '25', isActive: true },
      { id: 'sc-6', name: 'Moroccan Fairy Lanterns', count: '15', isActive: true },
    ],
    priceFilter: { min: '10', max: '500', defaultRange: '$40 - $350' },
    sidebarBanner: { title: 'Festive Season Clearance', discount: '35% OFF', link: '/shops' },
  },
  shop_detail_page: {
    bannerTitle: 'Product Details',
    zoomEnabled: true,
    tabTitles: {
      desc: 'Artisan Craftsmanship & Description',
      info: 'Product Specifications & Metal Purity',
      reviews: 'Customer Reviews & Feedback',
      shipping: 'Shipping & Delivery Terms',
    },
    shippingPolicyText: 'Free insured standard shipping across India on orders over ₹999 / $50. Fragile metalware packed in 5-ply shockproof packaging with tamper-evident seal.',
    relatedTitle: 'Related Handcrafted Artefacts You May Like',
    maxRelatedItems: 4,
  },
  cart_page: {
    bannerTitle: 'Your Shopping Cart',
    freeShippingThreshold: '100.00',
    flatShippingFee: '15.00',
    expressShippingFee: '25.00',
    taxRate: '5.0%',
    coupons: [
      { id: 'c-1', code: 'ROYAL15', discount: '15% Off', type: 'Percentage', minSpend: '$50.00', isActive: true },
      { id: 'c-2', code: 'BRASS30', discount: '30% Off', type: 'Percentage', minSpend: '$150.00', isActive: true },
      { id: 'c-3', code: 'FREESHIP', discount: 'Free Delivery', type: 'Shipping', minSpend: '$30.00', isActive: true },
    ],
  },
  about_page: {
    bannerTitle: 'About Us',
    subTitle: 'About us',
    heading: 'Online Shopping Is Buying Things From Stores On The Internet.',
    description: 'There are many variations of passages of Lorem Ipsum available, but the our majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable you are going to.',
    experienceYears: '25',
    experienceText: "Year's Experience",
    image1: 'assets/images/about/about-1.jpg',
    image2: 'assets/images/about/about-2.jpg',
    thumb1: 'assets/images/about/about-3.png',
    thumb2: 'assets/images/about/about-4.png',
    featuresList: [
      'We are provide 100% best products',
      'Flexible and affordable price',
      'All products is imported',
    ],
    serviceFeatures: [
      { id: 'f-1', title: 'We are provide 100% best products' },
      { id: 'f-2', title: 'Flexible and affordable price' },
      { id: 'f-3', title: 'All products is imported' },
    ],
    authorName: 'Thomas Alison',
    authorRole: 'CEO at PESCO',
    authorImage: 'assets/images/about/author.png',
    signatureImage: 'assets/images/about/signature.png',
    teamSubTitle: 'Our Team',
    teamTitle: 'Meet Management Team',
    teamMembers: [
      { id: 'team-1', name: 'Davidthy Phillips', role: 'Senior Developer', image: 'assets/images/team/team-1.jpg' },
      { id: 'team-2', name: 'Sarah Jones', role: 'Product Manager', image: 'assets/images/team/team-2.jpg' },
      { id: 'team-3', name: 'Davis Liam', role: 'Marketing Specialist', image: 'assets/images/team/team-3.jpg' },
      { id: 'team-4', name: 'Michael Davis', role: 'Digital Marketing Specialist', image: 'assets/images/team/team-4.jpg' },
      { id: 'team-5', name: 'Sarah Jones', role: 'Product Manager', image: 'assets/images/team/team-5.jpg' },
      { id: 'team-6', name: 'Emily Garcia', role: 'Digital Marketing Specialist', image: 'assets/images/team/team-6.jpg' },
    ],
  },
  contact_page: {
    bannerTitle: 'Contact Us',
    marqueeText: 'ROYAL ARTISAN WORKSHOPS & GLOBAL GALLERIES',
    offices: [
      {
        id: 'off-1',
        title: 'Moradabad Artisan Workshop',
        address: 'Brass Craft Complex, Station Road, Moradabad, Uttar Pradesh, 244001, India',
        phone1: '+91 98765 43210',
        phone2: '+91 98765 43211',
        email: 'crafts@ratanbrass.com',
        isActive: true,
      },
      {
        id: 'off-2',
        title: 'New Delhi Design Studio',
        address: '42 Hauz Khas Heritage Enclave, South Delhi, New Delhi 110016, India',
        phone1: '+91 11 2685 4321',
        phone2: '+91 98111 22334',
        email: 'delhi@ratanbrass.com',
        isActive: true,
      },
      {
        id: 'off-3',
        title: 'International Export Desk',
        address: 'Suite 404, Port View Tower, Jebel Ali Free Zone, Dubai, UAE',
        phone1: '+971 4 881 2345',
        phone2: '+971 50 123 4567',
        email: 'exports@ratanbrass.com',
        isActive: true,
      },
    ],
    formSettings: {
      formTitle: 'Send Inquiries & Custom Orders',
      recipientEmail: 'support@ratanbrass.com',
      responseTime: 'Replies within 12 hours',
    },
  },
  faq_page: {
    bannerTitle: 'Frequently Asked Questions',
    sectionTitle: 'How Can We Assist You Today?',
    searchPlaceholder: 'Search brass care, custom orders, shipping, returns...',
    faqList: [
      {
        id: 'faq-1',
        question: 'How do I care for and clean handcrafted brass artefacts?',
        answer: 'Our brass artefacts are coated with a protective lacquer. Simply wipe gently with a soft dry or microfiber cloth. Avoid harsh chemical cleaners, tamarind, or metal polish unless the item is unlacquered raw brass.',
        category: 'Care & Maintenance',
        isActive: true,
      },
      {
        id: 'faq-2',
        question: 'How long does domestic and international delivery take?',
        answer: 'Domestic orders are delivered within 3-5 business days across India. International express air shipping takes 5-8 business days with full door-to-door tracking.',
        category: 'Shipping & Delivery',
        isActive: true,
      },
      {
        id: 'faq-3',
        question: 'Do you accept customized or bulk bespoke orders?',
        answer: 'Yes! We specialize in custom hotel decor, corporate luxury gifting, and personalized engravings. Contact us through the inquiry form or email us at crafts@ratanbrass.com.',
        category: 'Custom Orders',
        isActive: true,
      },
      {
        id: 'faq-4',
        question: 'What is your return & replacement policy for fragile metalware?',
        answer: 'If any item arrives damaged or defective in transit, notify us within 48 hours with unboxing photos for a 100% free immediate replacement or full refund.',
        category: 'Returns & Refunds',
        isActive: true,
      },
      {
        id: 'faq-5',
        question: 'Are all products solid brass or just electroplated?',
        answer: 'All our vases, urlis, and diya lamps are cast from 100% solid virgin brass. Lanterns use reinforced galvanized steel and tempered glass for maximum durability.',
        category: 'Authenticity & Purity',
        isActive: true,
      },
    ],
  },
};

// ==========================================
// 1. HERO SLIDES CONTROLLERS
// ==========================================
const getHeroSlides = async (req, res) => {
  try {
    let slides = await HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    if (!slides || slides.length === 0) {
      const count = await HeroSlide.countDocuments();
      if (count === 0) {
        slides = await HeroSlide.insertMany(defaultHeroSlides);
      } else {
        slides = await HeroSlide.find().sort({ order: 1, createdAt: 1 });
      }
    }
    return res.status(200).json({ success: true, count: slides.length, data: slides });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve hero slides', error: error.message });
  }
};

const getAllHeroSlides = async (req, res) => {
  try {
    let slides = await HeroSlide.find().sort({ order: 1, createdAt: 1 });
    if (!slides || slides.length === 0) {
      slides = await HeroSlide.insertMany(defaultHeroSlides);
    }
    return res.status(200).json({ success: true, count: slides.length, data: slides });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve all hero slides', error: error.message });
  }
};

const createHeroSlide = async (req, res) => {
  try {
    const highestOrder = await HeroSlide.findOne().sort({ order: -1 });
    const order = req.body.order !== undefined ? Number(req.body.order) : highestOrder ? highestOrder.order + 1 : 0;
    const slide = new HeroSlide({ ...req.body, order });
    const saved = await slide.save();
    return res.status(201).json({ success: true, message: 'Hero slide created', data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create slide', error: error.message });
  }
};

const updateHeroSlide = async (req, res) => {
  try {
    const updated = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Slide not found' });
    return res.status(200).json({ success: true, message: 'Hero slide updated', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update slide', error: error.message });
  }
};

const deleteHeroSlide = async (req, res) => {
  try {
    const deleted = await HeroSlide.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Slide not found' });
    return res.status(200).json({ success: true, message: 'Hero slide deleted', id: req.params.id });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete slide', error: error.message });
  }
};

const bulkSaveHeroSlides = async (req, res) => {
  try {
    const { slides } = req.body;
    if (!Array.isArray(slides) || slides.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of slides' });
    }
    await HeroSlide.deleteMany({});
    const formatted = slides.map((s, idx) => ({
      subHeading: s.subHeading || 'Luxury Metalware',
      title: s.title || 'Authentic Brass Artefacts',
      description: s.description || 'Elevate your living space.',
      price: s.price || '99.00',
      buttonText: s.buttonText || 'Shop Now',
      buttonLink: s.buttonLink || '/shops',
      image: s.image || 'assets/images/products/brass-cylinder-vase-1.jpg',
      shape: s.shape || 'assets/images/hero/hero-one-shape1.png',
      order: idx,
      isActive: s.isActive !== undefined ? s.isActive : true,
    }));
    const saved = await HeroSlide.insertMany(formatted);
    return res.status(200).json({ success: true, message: 'Hero slides published to database', count: saved.length, data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to bulk save slides', error: error.message });
  }
};

// ==========================================
// 2. CATEGORIES CONTROLLERS
// ==========================================
const getCategories = async (req, res) => {
  try {
    let categories = await Category.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    if (!categories || categories.length === 0) {
      const count = await Category.countDocuments();
      if (count === 0) {
        categories = await Category.insertMany(defaultCategories);
      } else {
        categories = await Category.find().sort({ order: 1, createdAt: 1 });
      }
    }
    return res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve categories', error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    let categories = await Category.find().sort({ order: 1, createdAt: 1 });
    if (!categories || categories.length === 0) {
      categories = await Category.insertMany(defaultCategories);
    }
    return res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve all categories', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug, description, count, image, link, status, isActive, order } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }
    const generatedSlug = (slug && slug.trim()) || name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const isAct = status ? status === 'Active' : (isActive !== undefined ? isActive : true);
    const totalCount = await Category.countDocuments();
    
    const newCategory = new Category({
      name: name.trim(),
      slug: generatedSlug,
      description: description ? description.trim() : '',
      count: count ? String(count).trim() : '0 items',
      image: image ? image.trim() : 'assets/images/products/brass-cylinder-vase-1.jpg',
      link: link ? link.trim() : '/shops',
      status: status || (isAct ? 'Active' : 'Hidden'),
      isActive: isAct,
      order: order !== undefined ? Number(order) : totalCount,
    });

    const saved = await newCategory.save();
    return res.status(201).json({ success: true, message: 'Category created successfully', data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create category', error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, count, image, link, status, isActive, order } = req.body;
    
    const existing = await Category.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (name) existing.name = name.trim();
    if (slug !== undefined) {
      existing.slug = slug.trim() || (existing.name ? existing.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : '');
    }
    if (description !== undefined) existing.description = description.trim();
    if (count !== undefined) existing.count = String(count).trim();
    if (image !== undefined) existing.image = image.trim();
    if (link !== undefined) existing.link = link.trim();
    if (status !== undefined) {
      existing.status = status;
      existing.isActive = status === 'Active';
    }
    if (isActive !== undefined) {
      existing.isActive = Boolean(isActive);
      if (!status) existing.status = isActive ? 'Active' : 'Hidden';
    }
    if (order !== undefined) existing.order = Number(order);

    const updated = await existing.save();
    return res.status(200).json({ success: true, message: 'Category updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update category', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({ success: true, message: 'Category deleted successfully', data: deleted });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message });
  }
};

const bulkSaveCategories = async (req, res) => {
  try {
    const { categories } = req.body;
    if (!Array.isArray(categories)) {
      return res.status(400).json({ success: false, message: 'Please provide categories array' });
    }
    await Category.deleteMany({});
    const formatted = categories.map((c, idx) => ({
      name: c.name || c.title || 'Category Item',
      slug: c.slug || (c.name ? c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : ''),
      description: c.description || '',
      count: c.count !== undefined ? String(c.count) : '25 items',
      image: c.image || c.img || 'assets/images/products/brass-cylinder-vase-1.jpg',
      link: c.link || '/shops',
      status: c.status || (c.isActive !== false ? 'Active' : 'Hidden'),
      order: idx,
      isActive: c.isActive !== undefined ? c.isActive : (c.status === 'Active' || !c.status),
    }));
    const saved = await Category.insertMany(formatted);
    return res.status(200).json({ success: true, message: 'Categories saved to database', count: saved.length, data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to bulk save categories', error: error.message });
  }
};

// ==========================================
// 3. HERO BANNERS CONTROLLERS
// ==========================================
const getHeroBanners = async (req, res) => {
  try {
    let banners = await HeroBanner.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    if (!banners || banners.length === 0) {
      const count = await HeroBanner.countDocuments();
      if (count === 0) {
        banners = await HeroBanner.insertMany(defaultHeroBanners);
      } else {
        banners = await HeroBanner.find().sort({ order: 1, createdAt: 1 });
      }
    }
    return res.status(200).json({ success: true, count: banners.length, data: banners });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve banners', error: error.message });
  }
};

const getAllHeroBanners = async (req, res) => {
  try {
    let banners = await HeroBanner.find().sort({ order: 1, createdAt: 1 });
    if (!banners || banners.length === 0) {
      banners = await HeroBanner.insertMany(defaultHeroBanners);
    }
    return res.status(200).json({ success: true, count: banners.length, data: banners });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve all banners', error: error.message });
  }
};

const bulkSaveHeroBanners = async (req, res) => {
  try {
    const { banners } = req.body;
    if (!Array.isArray(banners)) {
      return res.status(400).json({ success: false, message: 'Please provide banners array' });
    }
    await HeroBanner.deleteMany({});
    const formatted = banners.map((b, idx) => ({
      discountTag: b.discountTag || 'UP TO 35% OFF',
      title: b.title || 'Exclusive Collection',
      buttonText: b.buttonText || 'Shop Now',
      buttonLink: b.buttonLink || '/shops',
      image: b.image || 'assets/images/products/brass-cylinder-vase-1.jpg',
      shape1: b.shape1 || 'assets/images/banner/discount.png',
      shape2: b.shape2 || 'assets/images/banner/line.png',
      badgeBg: b.badgeBg || (idx % 2 === 0 ? 'bg-one' : 'bg-two'),
      order: idx,
      isActive: b.isActive !== undefined ? b.isActive : true,
    }));
    const saved = await HeroBanner.insertMany(formatted);
    return res.status(200).json({ success: true, message: 'Hero banners saved to database', count: saved.length, data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to bulk save banners', error: error.message });
  }
};

// ==========================================
// 4. UNIVERSAL CMS / CONTENT CONTROLLERS
// ==========================================
const getAllWebsiteContent = async (req, res) => {
  try {
    const contents = await WebsiteContent.find();
    const contentMap = { ...defaultWebsiteSections };
    contents.forEach((item) => {
      contentMap[item.key] = item.data;
    });
    return res.status(200).json({ success: true, data: contentMap });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve website content', error: error.message });
  }
};

const getWebsiteContentByKey = async (req, res) => {
  try {
    const { key } = req.params;
    let content = await WebsiteContent.findOne({ key });
    if (!content && defaultWebsiteSections[key]) {
      content = await WebsiteContent.create({ key, data: defaultWebsiteSections[key] });
    }
    return res.status(200).json({
      success: true,
      key,
      data: content ? content.data : defaultWebsiteSections[key] || null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Failed to retrieve content for ${req.params.key}`, error: error.message });
  }
};

const saveWebsiteContentByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const { data } = req.body;
    const content = await WebsiteContent.findOneAndUpdate({ key }, { key, data }, { new: true, upsert: true });
    return res.status(200).json({ success: true, message: `Saved ${key}`, data: content.data });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Failed to save ${req.params.key}`, error: error.message });
  }
};

const saveAllWebsiteContent = async (req, res) => {
  try {
    const { sections } = req.body;
    if (!sections || typeof sections !== 'object') {
      return res.status(400).json({ success: false, message: 'Please provide a valid sections object' });
    }
    const promises = Object.entries(sections).map(([key, data]) => {
      return WebsiteContent.findOneAndUpdate({ key }, { key, data }, { new: true, upsert: true });
    });
    await Promise.all(promises);
    return res.status(200).json({ success: true, message: 'All website content sections saved to database' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to save sections', error: error.message });
  }
};

// Default initial Products catalog matching luxury brass handcrafted artifacts
const defaultProducts = [
  {
    sku: 'RB-VS-101',
    name: 'Handcrafted Antique Brass Cylindrical Jali Pillar Vase',
    title: 'Handcrafted Antique Brass Cylindrical Jali Pillar Vase',
    category: 'Brass Vases & Urns',
    brand: 'Ratan Brass',
    price: 120.0,
    salePrice: 79.0,
    prevPrice: '185.00',
    discount: '34% Off',
    stock: 25,
    status: 'In Stock',
    rating: 5.0,
    reviews: 48,
    image: 'assets/images/products/brass-cylinder-vase-1.jpg',
    gallery: [
      'assets/images/products/brass-cylinder-vase-1.jpg',
      'assets/images/products/brass-flower-vase-set.jpg',
    ],
    sizes: ['18 Inch Tall', 'Large (16")', 'Medium (12")'],
    colors: ['Antique Gold', 'Polished Brass'],
    fabricType: '100% Solid Virgin Cast Brass',
    material: '100% Solid Virgin Cast Brass',
    finish: 'Antique Brushed Gold',
    craftsmanship: 'Hand-Engraved Jaali & Filigree',
    origin: 'Moradabad, Uttar Pradesh, India',
    careInstructions: 'Wipe with soft dry cotton cloth; avoid chemical cleaners',
    occasion: 'Luxury Living Room, Console Decor & Grand Entryways',
    description:
      'Masterpiece hand-carved cylindrical pillar vase crafted in pure solid brass with exquisite geometric floral jali fretwork and a slender fluted neck. Finished in antique brushed gold with clear lacquer protection.',
    artisanDetails:
      'Masterpiece hand-carved cylindrical pillar vase crafted in pure solid brass with exquisite geometric floral jali fretwork and a slender fluted neck. Finished in antique brushed gold with clear lacquer protection.',
    highlights: [
      'Handcrafted from heavy gauge solid virgin brass',
      'Antioxidant clear lacquer coat prevents tarnishing',
      'Ideal luxury gift for weddings, housewarmings, and festive occasions',
      'Authentic heirloom-grade decorative artefact',
    ],
    specifications: [
      { label: 'Weight', value: '3.2 kg' },
      { label: 'Dimensions', value: '18" H x 5.5" Dia' },
      { label: 'Packaging', value: '5-Ply Shockproof Box' },
    ],
    reviewsList: [
      {
        name: 'Ananya Deshmukh',
        email: 'ananya@example.com',
        rating: 5,
        comment: 'The craftsmanship on this piece is breathtaking! The weight and solid brass feel are top-notch. Arrived packed in solid shockproof box without a scratch.',
        date: new Date('2026-09-25'),
      },
      {
        name: 'Rajesh Varma',
        email: 'rajesh@example.com',
        rating: 5,
        comment: 'Truly royal piece. Adds instant elegance to our entrance console table. Beautiful antique gold finish.',
        date: new Date('2026-10-02'),
      },
    ],
    tags: ['Brass', 'Vase', 'Ratan Brass', 'Handicraft', 'Home Decor'],
    featured: true,
    isActive: true,
    order: 0,
  },
  {
    sku: 'RB-VS-102',
    name: 'Royal Floral Embossed Brass Flower Vases (Set of 3)',
    title: 'Royal Floral Embossed Brass Flower Vases (Set of 3)',
    category: 'Brass Vases & Urns',
    brand: 'Ratan Brass',
    price: 180.0,
    salePrice: 119.0,
    prevPrice: '249.00',
    discount: '34% Off',
    stock: 18,
    status: 'In Stock',
    rating: 5.0,
    reviews: 64,
    image: 'assets/images/products/brass-flower-vase-set.jpg',
    gallery: [
      'assets/images/products/brass-flower-vase-set.jpg',
      'assets/images/products/brass-cylinder-vase-1.jpg',
    ],
    sizes: ['Set of 3', 'Large (16")', 'Medium (12")', 'Small (9")'],
    colors: ['Polished Brass', 'Antique Gold'],
    fabricType: 'Pure Hand-Hammered Heavy Brass',
    material: 'Pure Hand-Hammered Heavy Brass',
    finish: 'High-Gloss Polished Brass',
    craftsmanship: 'Hand-Engraved Jaali & Filigree',
    origin: 'Moradabad, Uttar Pradesh, India',
    careInstructions: 'Dry Cotton Cloth Wipe',
    occasion: 'Dining Table Centerpiece, Hotel Lounges & Gifting',
    description:
      'Opulent trio of hand-engraved botanical floral brass vases in gleaming gold polish. Ideal for holding natural fresh blooms, dried pampas grass, or decorative artificial bouquets.',
    artisanDetails:
      'Opulent trio of hand-engraved botanical floral brass vases in gleaming gold polish. Ideal for holding natural fresh blooms, dried pampas grass, or decorative artificial bouquets.',
    highlights: [
      'Handcrafted from heavy gauge solid virgin brass',
      'Antioxidant clear lacquer coat prevents tarnishing',
      'Ideal luxury gift for weddings, housewarmings, and festive occasions',
      'Authentic heirloom-grade decorative artefact',
    ],
    specifications: [
      { label: 'Included Items', value: 'Set of 3 Vases (Small, Medium, Large)' },
      { label: 'Total Weight', value: '4.8 kg' },
      { label: 'Dimensions', value: '16", 12", 9" Heights' },
    ],
    reviewsList: [
      {
        name: 'Ananya Deshmukh',
        email: 'ananya@example.com',
        rating: 5,
        comment: 'The craftsmanship on this piece is breathtaking! The weight and solid brass feel are top-notch. Arrived packed in solid shockproof box without a scratch.',
        date: new Date('2026-09-28'),
      },
    ],
    tags: ['Vase Set', 'Brass Decor', 'Ratan Brass', 'Centerpiece'],
    featured: true,
    isActive: true,
    order: 1,
  },
  {
    sku: 'RB-LT-201',
    name: 'Vintage Moroccan Glass & Metal Fairy Lanterns (Set of 3 - Pearl White)',
    title: 'Vintage Moroccan Glass & Metal Fairy Lanterns (Set of 3 - Pearl White)',
    category: 'Decorative Lanterns',
    brand: 'Ratan Crafts',
    price: 95.0,
    salePrice: 59.0,
    prevPrice: '120.00',
    discount: '38% Off',
    stock: 32,
    status: 'In Stock',
    rating: 5.0,
    reviews: 52,
    image: 'assets/images/products/white-moroccan-lanterns.jpg',
    gallery: [
      'assets/images/products/white-moroccan-lanterns.jpg',
      'assets/images/products/black-moroccan-lanterns.jpg',
    ],
    sizes: ['Set of 3', 'Large (16")', 'Medium (12")', 'Small (9")'],
    colors: ['Pearl White'],
    fabricType: 'Wrought Iron, Tempered Glass & LED Fairy Lights',
    material: 'Wrought Iron, Tempered Glass & LED Fairy Lights',
    finish: 'Matte Pearl White',
    careInstructions: 'Clean glass panels with glass cleaner; indoor / covered patio use',
    occasion: 'Weddings, Festive Diwali Decor, Balcony & Garden Patio',
    description:
      'Elegant hexagonal vintage Moroccan white metal lanterns with clear glass viewing panes, floral centerpiece arrangements, and built-in warm golden fairy string lights.',
    tags: ['Lantern', 'Moroccan', 'Fairy Lights', 'White Lantern', 'Festive'],
    featured: true,
    isActive: true,
    order: 2,
  },
  {
    sku: 'RB-LT-202',
    name: 'Matte Black Vintage Moroccan Fairy Light Lanterns (Set of 3)',
    title: 'Matte Black Vintage Moroccan Fairy Light Lanterns (Set of 3)',
    category: 'Decorative Lanterns',
    brand: 'Ratan Crafts',
    price: 99.0,
    salePrice: 64.0,
    prevPrice: '125.00',
    discount: '35% Off',
    stock: 28,
    status: 'In Stock',
    rating: 5.0,
    reviews: 41,
    image: 'assets/images/products/black-moroccan-lanterns.jpg',
    gallery: [
      'assets/images/products/black-moroccan-lanterns.jpg',
      'assets/images/products/white-moroccan-lanterns.jpg',
    ],
    sizes: ['Set of 3', 'Large (16")', 'Medium (12")', 'Small (9")'],
    colors: ['Matte Black', 'Antique Gold'],
    fabricType: 'Galvanized Metal, Tempered Glass & LED Micro Lights',
    material: 'Galvanized Metal, Tempered Glass & LED Micro Lights',
    finish: 'Matte Midnight Black',
    careInstructions: 'Dust with soft dry cloth',
    occasion: 'Modern Home Decor, Nightstand Glow, Patio Dinner',
    description:
      'Contemporary matte black architectural Moroccan lanterns accented with brass carrying rings, blooming pastel roses, and sparkling fairy lights creating a magical twilight glow.',
    tags: ['Black Lantern', 'Moroccan Decor', 'Ambient Lighting', 'Set of 3'],
    featured: true,
    isActive: true,
    order: 3,
  },
  {
    sku: 'RB-UR-301',
    name: 'Traditional Royal Brass Floral Urli Bowl with Floating Diya Holders',
    title: 'Traditional Royal Brass Floral Urli Bowl with Floating Diya Holders',
    category: 'Tabletop Urli & Bowls',
    brand: 'Ratan Brass',
    price: 140.0,
    salePrice: 89.0,
    prevPrice: '160.00',
    discount: '36% Off',
    stock: 15,
    status: 'In Stock',
    rating: 5.0,
    reviews: 73,
    image: 'assets/images/products/brass-urli-bowl.jpg',
    gallery: [
      'assets/images/products/brass-urli-bowl.jpg',
      'assets/images/products/brass-cylinder-vase-1.jpg',
    ],
    sizes: ['14 Inch Dia', 'Large (16")', 'Medium (12")'],
    colors: ['Antique Gold', 'Polished Brass'],
    fabricType: 'Heavy Cast Solid Brass with Floral Border Filigree',
    material: 'Heavy Cast Solid Brass with Floral Border Filigree',
    finish: 'Traditional Antique Gold',
    careInstructions: 'Rinse with mild water, dry immediately after water display',
    occasion: 'Pooja Room, Festive Welcoming Entrance & Diwali Celebrations',
    description:
      'A timeless handcrafted brass Urli with sculptured handles. Fill with fresh water, floating rose and marigold petals, and scented floating candles to welcome prosperity and auspicious vibes.',
    tags: ['Urli', 'Brass Urli', 'Floating Candles', 'Diwali', 'Pooja'],
    featured: true,
    isActive: true,
    order: 4,
  },
  {
    sku: 'RB-DY-401',
    name: 'Grand Royal Brass Mayur Peacock Diya & Incense Oil Lamp',
    title: 'Grand Royal Brass Mayur Peacock Diya & Incense Oil Lamp',
    category: 'Pooja & Spiritual Artefacts',
    brand: 'Ratan Brass',
    price: 165.0,
    salePrice: 109.0,
    prevPrice: '210.00',
    discount: '34% Off',
    stock: 12,
    status: 'In Stock',
    rating: 5.0,
    reviews: 58,
    image: 'assets/images/products/brass-peacock-diya.jpg',
    gallery: [
      'assets/images/products/brass-peacock-diya.jpg',
      'assets/images/products/brass-urli-bowl.jpg',
    ],
    sizes: ['18 Inch Tall', 'Large (16")', 'Standard Single'],
    colors: ['Antique Gold', 'Vintage Bronze'],
    fabricType: 'High-Density Cast Brass with Micro Inlay Detailing',
    material: 'High-Density Cast Brass with Micro Inlay Detailing',
    finish: 'Rich Temple Patina Gold',
    careInstructions: 'Clean with soft cloth and brass polishing paste occasionally',
    occasion: 'Mandir, Sacred Rituals, Housewarming & Traditional Gifts',
    description:
      'Magnificent handcrafted royal Peacock (Mayur) oil Diya lamp featuring detailed plume engravings, multiple deep oil burners, and an aromatic incense burner stand.',
    tags: ['Peacock Diya', 'Brass Lamp', 'Mandir', 'Spiritual', 'Ratan Brass'],
    featured: true,
    isActive: true,
    order: 5,
  },
];

// Seed products if collection is empty
const seedProductsIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('[Product Controller] Initializing default products...');
      await Product.insertMany(defaultProducts);
    }
  } catch (e) {
    console.warn('[Product Controller] Seeding note:', e.message);
  }
};

// 1. Get active products for Storefront with filtering & sorting
const getProducts = async (req, res) => {
  try {
    await seedProductsIfEmpty();
    const { category, search, minPrice, maxPrice, sort, featured } = req.query;
    let query = { isActive: { $ne: false } };

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { title: searchRegex },
        { sku: searchRegex },
        { brand: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (featured === 'true') {
      query.featured = true;
    }

    let sortOption = { order: 1, createdAt: -1 };
    if (sort === 'Price Low To High') sortOption = { price: 1 };
    if (sort === 'Price High To Low') sortOption = { price: -1 };
    if (sort === 'Highest Rated') sortOption = { rating: -1, reviews: -1 };
    if (sort === 'Newest') sortOption = { createdAt: -1 };

    const products = await Product.find(query).sort(sortOption);
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve products', error: error.message });
  }
};

// 2. Get all products for Admin Dashboard
const getAllProducts = async (req, res) => {
  try {
    await seedProductsIfEmpty();
    const products = await Product.find().sort({ order: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve all products', error: error.message });
  }
};

// 3. Get single product details by ID or SKU
const getProductById = async (req, res) => {
  try {
    await seedProductsIfEmpty();
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ sku: id });
    }
    if (!product) {
      // Try searching by custom id (e.g. PRD-101)
      product = await Product.findOne({
        $or: [{ sku: new RegExp(`^${id}$`, 'i') }, { name: new RegExp(id, 'i') }],
      });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const productData = product.toObject ? product.toObject() : { ...product };
    if (!productData.craftsmanship) productData.craftsmanship = 'Hand-Engraved Jaali & Filigree';
    if (!productData.origin) productData.origin = 'Moradabad, Uttar Pradesh, India';
    if (!productData.artisanDetails) productData.artisanDetails = productData.description || '';
    if (!Array.isArray(productData.highlights) || productData.highlights.length === 0) {
      productData.highlights = [
        'Handcrafted from heavy gauge solid virgin brass',
        'Antioxidant clear lacquer coat prevents tarnishing',
        'Ideal luxury gift for weddings, housewarmings, and festive occasions',
        'Authentic heirloom-grade decorative artefact',
      ];
    }
    if (!Array.isArray(productData.reviewsList) || productData.reviewsList.length === 0) {
      productData.reviewsList = [
        {
          name: 'Ananya Deshmukh',
          email: 'ananya@example.com',
          rating: 5,
          comment: 'The craftsmanship on this piece is breathtaking! The weight and solid brass feel are top-notch. Arrived packed in solid shockproof box without a scratch.',
          date: new Date(),
        },
      ];
    }

    return res.status(200).json({
      success: true,
      data: productData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve product', error: error.message });
  }
};

// 4. Create new product
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.name && !productData.title) {
      return res.status(400).json({ success: false, message: 'Product name or title is required' });
    }
    if (!productData.sku) {
      const count = await Product.countDocuments();
      productData.sku = `RB-PRD-${100 + count + 1}`;
    }

    // Check SKU duplicate
    const existing = await Product.findOne({ sku: productData.sku });
    if (existing) {
      productData.sku = `${productData.sku}-${Date.now().toString().slice(-4)}`;
    }

    // Sanitize productData
    if (!productData._id) delete productData._id;
    if (!productData.id) delete productData.id;
    if (!productData.image || !productData.image.trim()) {
      productData.image = 'assets/images/products/brass-cylinder-vase-1.jpg';
    }
    if (productData.price !== undefined) {
      productData.price = Number(productData.price) || 0;
    }
    if (productData.salePrice !== undefined) {
      productData.salePrice = Number(productData.salePrice) || productData.price || 0;
    }
    if (productData.stock !== undefined) {
      productData.stock = Number(productData.stock) || 0;
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
  }
};

// 5. Update product by ID or SKU
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let updated;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    }
    if (!updated) {
      updated = await Product.findOneAndUpdate({ sku: id }, req.body, { new: true, runValidators: true });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found for update' });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

// 6. Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await Product.findByIdAndDelete(id);
    }
    if (!deleted) {
      deleted = await Product.findOneAndDelete({ sku: id });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found for deletion' });
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};

// 7. Bulk Save / Reorder Products
const bulkSaveProducts = async (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products)) {
      return res.status(400).json({ success: false, message: 'Please provide an array of products' });
    }

    const bulkOps = products.map((prod, index) => {
      const filter = prod._id ? { _id: prod._id } : { sku: prod.sku || `RB-PRD-${index + 1}` };
      return {
        updateOne: {
          filter,
          update: { $set: { ...prod, order: index } },
          upsert: true,
        },
      };
    });

    if (bulkOps.length > 0) {
      await Product.bulkWrite(bulkOps);
    }

    const allProducts = await Product.find().sort({ order: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: 'Products bulk saved successfully',
      data: allProducts,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to bulk save products', error: error.message });
  }
};

// 7b. Submit Product Review
const addProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, rating, comment } = req.body;
    if (!name || !comment) {
      return res.status(400).json({ success: false, message: 'Name and comment are required' });
    }

    let product;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ sku: id });
    }
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const newReview = {
      name: name.trim(),
      email: (email || '').trim(),
      rating: Number(rating) || 5,
      comment: comment.trim(),
      date: new Date(),
    };

    if (!Array.isArray(product.reviewsList)) {
      product.reviewsList = [];
    }
    product.reviewsList.unshift(newReview);
    product.reviews = product.reviewsList.length;
    const totalScore = product.reviewsList.reduce((sum, r) => sum + (Number(r.rating) || 5), 0);
    product.rating = Number((totalScore / product.reviewsList.length).toFixed(1));

    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Review posted successfully',
      data: product,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to submit review', error: err.message });
  }
};

// 8. Orders Management
const getOrders = async (req, res) => {
  try {
    const content = await WebsiteContent.findOne({ key: 'customer_orders' });
    const orders = content && Array.isArray(content.data) ? content.data : [];
    return res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve orders', error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    let content = await WebsiteContent.findOne({ key: 'customer_orders' });
    const existingOrders = content && Array.isArray(content.data) ? content.data : [];

    const newOrder = {
      ...orderData,
      id: orderData.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date:
        orderData.date ||
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }) +
          ', ' +
          new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: orderData.status || 'Processing',
      paymentStatus: orderData.paymentStatus || (orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid'),
      createdAt: new Date(),
    };

    const updatedOrders = [newOrder, ...existingOrders];

    if (!content) {
      content = new WebsiteContent({ key: 'customer_orders', data: updatedOrders });
    } else {
      content.data = updatedOrders;
    }
    content.markModified('data');
    await content.save();

    return res.status(201).json({ success: true, message: 'Order placed successfully!', data: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    let content = await WebsiteContent.findOne({ key: 'customer_orders' });
    if (!content) {
      content = new WebsiteContent({ key: 'customer_orders', data: [] });
    }
    const orders = Array.isArray(content.data) ? content.data : [];

    let updatedOrder = null;
    const updatedOrders = orders.map((ord) => {
      if (ord.id === id || ord._id === id || String(ord.id) === String(id)) {
        updatedOrder = {
          ...ord,
          status: status || ord.status,
          paymentStatus: paymentStatus || ord.paymentStatus,
          updatedAt: new Date(),
        };
        return updatedOrder;
      }
      return ord;
    });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    content.data = updatedOrders;
    content.markModified('data');
    await content.save();

    return res.status(200).json({ success: true, message: 'Order updated successfully', data: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update order', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let content = await WebsiteContent.findOne({ key: 'customer_orders' });
    if (!content) {
      return res.status(200).json({ success: true, message: 'Order already deleted or does not exist' });
    }
    const orders = Array.isArray(content.data) ? content.data : [];

    const updatedOrders = orders.filter((ord) => ord.id !== id && ord._id !== id && String(ord.id) !== String(id));
    content.data = updatedOrders;
    content.markModified('data');
    await content.save();

    return res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete order', error: error.message });
  }
};

const sendOrderEmailNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, customMessage, trackingNumber } = req.body;
    let content = await WebsiteContent.findOne({ key: 'customer_orders' });
    if (!content) {
      return res.status(404).json({ success: false, message: 'No orders found' });
    }
    const orders = Array.isArray(content.data) ? content.data : [];

    const order = orders.find((o) => o.id === id || o._id === id || String(o.id) === String(id));
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const currentStatus = status || order.status || 'Processing';
    const recipientEmail = order.email || 'customer@example.com';
    const customerName = order.customer || 'Valued Customer';

    const emailRecord = {
      id: `EMAIL-${Date.now()}`,
      sentTo: recipientEmail,
      recipientName: customerName,
      orderId: order.id,
      status: currentStatus,
      paymentStatus: paymentStatus || order.paymentStatus || 'Pending',
      trackingNumber: trackingNumber || `TRK-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      customMessage: customMessage || `Your order #${order.id} is now ${currentStatus}. Our Moradabad artisans and logistics team are processing your package with care.`,
      sentAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    // Update order with new status and email log
    const updatedOrders = orders.map((ord) => {
      if (ord.id === id || ord._id === id || String(ord.id) === String(id)) {
        const history = Array.isArray(ord.emailHistory) ? ord.emailHistory : [];
        return {
          ...ord,
          status: currentStatus,
          paymentStatus: paymentStatus || ord.paymentStatus,
          emailHistory: [emailRecord, ...history],
          lastEmailSentAt: emailRecord.sentAt,
          updatedAt: new Date(),
        };
      }
      return ord;
    });

    content.data = updatedOrders;
    content.markModified('data');
    await content.save();

    console.log(`[Email Dispatch] Status email successfully sent to ${recipientEmail} for Order #${id} [Status: ${currentStatus}]`);

    return res.status(200).json({
      success: true,
      message: `Order status notification email sent successfully to ${recipientEmail}!`,
      data: emailRecord,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to dispatch order email', error: error.message });
  }
};

module.exports = {
  getHeroSlides,
  getAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  bulkSaveHeroSlides,
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkSaveCategories,
  getHeroBanners,
  getAllHeroBanners,
  bulkSaveHeroBanners,
  getAllWebsiteContent,
  getWebsiteContentByKey,
  saveWebsiteContentByKey,
  saveAllWebsiteContent,
  getProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkSaveProducts,
  addProductReview,
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  sendOrderEmailNotification,
};

