import React, { useState, useRef, useEffect} from 'react';
import ImageUploadField from '../../components/ImageUploadField';
import {
  Image,
  Sliders,
  Layers,
  Sparkles,
  Flame,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  ChevronDown,
  ChevronUp,
  LayoutTemplate,
  Globe,
  Users,
  Phone,
  HelpCircle,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Award,
  Check,
  ShoppingBag,
  ShoppingCart,
  Eye,
  Tag,
  Percent,
  Truck,
  DollarSign,
  Filter,
} from 'lucide-react';

// ==========================================
// 1. DEFAULT DATA DEFINITIONS
// ==========================================

// 1. Homepage Default Data
const defaultHeroSlides = [
  {
    id: 'hero-1',
    subHeading: 'Handcrafted Luxury Metalware',
    title: 'Authentic Ratan Brass & Royal Artefacts',
    description: 'Elevate your living space with heirloom-quality antique brass pillar vases, intricate jali cutouts, and Moradabad artisan craftsmanship.',
    price: '145.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/brass-cylinder-vase-1.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
    isActive: true,
  },
  {
    id: 'hero-2',
    subHeading: 'Ambient Illuminations',
    title: 'Vintage Moroccan Lanterns & Fairy Lamps',
    description: 'Transform celebrations, balconies, and living rooms with our exquisite metal & tempered glass fairy light lanterns in Pearl White & Matte Black.',
    price: '89.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/white-moroccan-lanterns.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
    isActive: true,
  },
  {
    id: 'hero-3',
    subHeading: 'Traditional Spiritual Elegance',
    title: 'Embossed Brass Flower Vases & Peacock Diyas',
    description: 'Hand-engraved floral embossing and solid cast brass artefacts designed to bring timeless grandeur and warmth into your home.',
    price: '195.00',
    buttonText: 'Shop Now',
    buttonLink: '/shops',
    image: 'assets/images/products/brass-flower-vase-set.jpg',
    shape: 'assets/images/hero/hero-one-shape1.png',
    isActive: true,
  },
];

const defaultHeroBanners = [
  {
    id: 'banner-1',
    discountTag: 'UP TO 50% OFF',
    title: 'Exclusive Kids & Adults Summer Outfits',
    buttonText: 'Shop Now',
    buttonLink: 'shops.html',
    image: 'assets/images/banner/banner-1.png',
    shape1: 'assets/images/banner/discount.png',
    shape2: 'assets/images/banner/line.png',
    badgeBg: 'bg-one',
    isActive: true,
  },
  {
    id: 'banner-2',
    discountTag: 'UP TO 70% OFF',
    title: 'Exclusive Kids & Adults Summer Outfits',
    buttonText: 'Shop Now',
    buttonLink: 'shops.html',
    image: 'assets/images/banner/banner-2.png',
    shape1: 'assets/images/banner/discount.png',
    shape2: 'assets/images/banner/line.png',
    badgeBg: 'bg-two',
    isActive: true,
  },
];

const defaultCategories = [
  { id: 'cat-1', name: 'Man Shirts', count: '48 items', image: 'assets/images/category/category-1.png', link: 'shops.html', isActive: true },
  { id: 'cat-2', name: 'Denim Jeans', count: '62 items', image: 'assets/images/category/category-2.png', link: 'shops.html', isActive: true },
  { id: 'cat-3', name: 'Casual Suit', count: '29 items', image: 'assets/images/category/category-3.png', link: 'shops.html', isActive: true },
  { id: 'cat-4', name: 'Summer Dress', count: '85 items', image: 'assets/images/category/category-4.png', link: 'shops.html', isActive: true },
  { id: 'cat-5', name: 'Sweaters', count: '34 items', image: 'assets/images/category/category-5.png', link: 'shops.html', isActive: true },
  { id: 'cat-6', name: 'Jackets', count: '41 items', image: 'assets/images/category/category-6.png', link: 'shops.html', isActive: true },
];

const defaultCollections = {
  bestSellers: [
    {
      id: 'col-1',
      title: 'Lightweight linen summer dress with belt',
      price: '120.00',
      prevPrice: '145.00',
      discount: '10% Off',
      rating: 5,
      image: 'assets/images/products/feature-product-1.png',
      badge: 'Best Seller',
      stock: 'In Stock (45)',
    },
    {
      id: 'col-2',
      title: 'Casual cotton sweatshirt with hood',
      price: '85.00',
      prevPrice: '100.00',
      discount: '15% Off',
      rating: 5,
      image: 'assets/images/products/feature-product-2.png',
      badge: 'Trending',
      stock: 'In Stock (30)',
    },
    {
      id: 'col-3',
      title: 'Embroidered Square Neck Sheath Gown',
      price: '290.00',
      prevPrice: '350.00',
      discount: '20% Off',
      rating: 5,
      image: 'assets/images/products/feature-product-3.png',
      badge: 'Luxury',
      stock: 'In Stock (12)',
    },
    {
      id: 'col-4',
      title: 'Slim-fit stretch denim jeans',
      price: '65.00',
      prevPrice: '80.00',
      discount: '18% Off',
      rating: 4,
      image: 'assets/images/products/feature-product-4.png',
      badge: 'Hot',
      stock: 'In Stock (64)',
    },
  ],
  newProducts: [
    {
      id: 'col-5',
      title: 'Vintage wash oversized denim jacket',
      price: '110.00',
      prevPrice: '130.00',
      discount: 'New',
      rating: 5,
      image: 'assets/images/products/feature-product-5.png',
      badge: 'New Arrival',
      stock: 'In Stock (25)',
    },
    {
      id: 'col-6',
      title: 'Floral print flared silk maxi skirt',
      price: '95.00',
      prevPrice: '115.00',
      discount: 'New',
      rating: 5,
      image: 'assets/images/products/feature-product-6.png',
      badge: 'New Arrival',
      stock: 'In Stock (18)',
    },
  ],
  saleProducts: [
    {
      id: 'col-7',
      title: 'Athletic leggings with mesh ventilation',
      price: '40.00',
      prevPrice: '75.00',
      discount: '45% Off',
      rating: 4,
      image: 'assets/images/products/feature-product-7.png',
      badge: 'Mega Sale',
      stock: 'In Stock (100+)',
    },
    {
      id: 'col-8',
      title: 'Ribbed knit wool cardigan sweater',
      price: '55.00',
      prevPrice: '90.00',
      discount: '38% Off',
      rating: 5,
      image: 'assets/images/products/feature-product-8.png',
      badge: 'Sale',
      stock: 'In Stock (15)',
    },
  ],
};

const defaultTrendingProducts = [
  {
    id: 'trend-1',
    title: 'Striped cotton t-shirt with crew neck',
    prevPrice: '35.00',
    newPrice: '18.00',
    rating: 5,
    reviews: 80,
    image: 'assets/images/products/trending-product-3.png',
    tag: 'Hot Item',
    isActive: true,
  },
  {
    id: 'trend-2',
    title: 'Cashmere v-neck sweater with ribbed cuffs',
    prevPrice: '67.00',
    newPrice: '20.00',
    rating: 5,
    reviews: 95,
    image: 'assets/images/products/trending-product-1.png',
    tag: 'Popular',
    isActive: true,
  },
  {
    id: 'trend-3',
    title: 'Classic tailored formal blazer coat',
    prevPrice: '140.00',
    newPrice: '69.00',
    rating: 5,
    reviews: 112,
    image: 'assets/images/products/trending-product-2.png',
    tag: 'Top Pick',
    isActive: true,
  },
  {
    id: 'trend-4',
    title: 'Casual breathable linen resort shirt',
    prevPrice: '55.00',
    newPrice: '26.00',
    rating: 4,
    reviews: 44,
    image: 'assets/images/products/trending-product-4.png',
    tag: 'Trending',
    isActive: true,
  },
];

// 2. ShopPage Default Data
const defaultShopData = {
  bannerTitle: 'Shop Page',
  itemsPerPage: '12',
  defaultSort: 'Featured',
  categories: [
    { id: 'sc-1', name: "Women's Clothing", count: '45', isActive: true },
    { id: 'sc-2', name: "Men's Clothing", count: '40', isActive: true },
    { id: 'sc-3', name: 'Formal Wear', count: '35', isActive: true },
    { id: 'sc-4', name: 'Footwear', count: '59', isActive: true },
    { id: 'sc-5', name: 'Accessories', count: '74', isActive: true },
    { id: 'sc-6', name: 'Maternity Wear', count: '87', isActive: true },
    { id: 'sc-7', name: 'Streetwear', count: '88', isActive: true },
  ],
  priceFilter: { min: '10', max: '500', defaultRange: '$20 - $350' },
  sidebarBanner: { title: 'Summer Sale Deals', discount: '50% OFF', link: 'shops.html' },
};

// 3. ShopDetailPage Default Data
const defaultShopDetailData = {
  bannerTitle: 'Shop Details',
  zoomEnabled: true,
  tabTitles: {
    desc: 'Product Description',
    info: 'Additional Information',
    reviews: 'Customer Reviews (80)',
    shipping: 'Shipping & Delivery Terms',
  },
  shippingPolicyText: 'Fast standard delivery within 3-5 business days. Free returns within 30 days for unworn items with original tags.',
  relatedTitle: 'Related Products You May Also Like',
  maxRelatedItems: 4,
};

// 4. CartPage Default Data
const defaultCartData = {
  bannerTitle: 'Shopping Cart',
  freeShippingThreshold: '100.00',
  flatShippingFee: '15.00',
  expressShippingFee: '25.00',
  taxRate: '8.5%',
  coupons: [
    { id: 'c-1', code: 'WELCOME15', discount: '15% Off', type: 'Percentage', minSpend: '$50.00', isActive: true },
    { id: 'c-2', code: 'SUMMER30', discount: '30% Off', type: 'Percentage', minSpend: '$120.00', isActive: true },
    { id: 'c-3', code: 'FREESHIP', discount: 'Free Delivery', type: 'Shipping', minSpend: '$30.00', isActive: true },
  ],
};

// 5. About Us Default Data
const defaultAboutData = {
  bannerTitle: 'About Us',
  heading: 'Online shopping is buying things from stores on the internet.',
  description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  experienceYears: '25',
  experienceText: "Year's Experience",
  authorName: 'Thomas Alison',
  authorRole: 'CEO at PESCO',
  serviceFeatures: [
    { id: 'f-1', title: 'Free Shipping', desc: 'You get your items delivered without any extra cost.', icon: 'shipping' },
    { id: 'f-2', title: 'Great Support 24/7', desc: 'Our customer support team is available around the clock.', icon: 'support' },
    { id: 'f-3', title: 'Return Available', desc: "Making it easy to return any items if you're not satisfied.", icon: 'return' },
    { id: 'f-4', title: 'Secure Payment', desc: 'Shop with confidence knowing that our payment is secure.', icon: 'payment' },
  ],
  teamMembers: [
    { id: 'team-1', name: 'Thomas Alison', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300' },
    { id: 'team-2', name: 'Sophia Martinez', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300' },
    { id: 'team-3', name: 'David Miller', role: 'Operations Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300' },
  ],
};

// 6. Contact Us Default Data
const defaultContactData = {
  bannerTitle: 'Contact Us',
  marqueeText: 'OUR GLOBAL OFFICE ADDRESS',
  offices: [
    {
      id: 'off-1',
      title: 'Australia Office',
      address: 'Apt. 695 763 Cartwright Villages, East Deanland, MI 69269, Australia',
      phone1: '+01 123 456 7890',
      phone2: '+01 123 456 7891',
      email: 'help@pescostore.com',
      isActive: true,
    },
    {
      id: 'off-2',
      title: 'England Office',
      address: '69093 Bahringer Square, Gradytown, KY 62192 Florida, United States',
      phone1: '+01 123 456 7890',
      phone2: '+01 123 456 7892',
      email: 'uk-support@pescostore.com',
      isActive: true,
    },
    {
      id: 'off-3',
      title: 'Canada Office',
      address: '931 Carroll Squares, North Mireya, VA 48458, Ontario Canada',
      phone1: '+01 123 456 7890',
      phone2: '+01 123 456 7893',
      email: 'canada@pescostore.com',
      isActive: true,
    },
  ],
  formSettings: {
    formTitle: 'Send Us A Message',
    recipientEmail: 'support@pescostore.com',
    responseTime: 'Replies within 24 hours',
  },
};

// 7. FAQ Default Data
const defaultFaqData = {
  bannerTitle: 'Frequently Asked Questions',
  sectionTitle: 'How can we help you?',
  searchPlaceholder: 'Search FAQs, orders, returns, payments...',
  faqList: [
    {
      id: 'faq-1',
      question: 'What is your return policy?',
      answer: 'Our return policy allows you to return unworn and unwashed items within 30 days of purchase for a full refund or exchange. Items must have original tags intact.',
      category: 'Returns & Refunds',
      isActive: true,
    },
    {
      id: 'faq-2',
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days within the continental US. Express 2-day delivery and International shipping options (7-12 business days) are available at checkout.',
      category: 'Shipping & Delivery',
      isActive: true,
    },
    {
      id: 'faq-3',
      question: 'Do you offer any discounts or coupons?',
      answer: 'Yes! First-time buyers get 15% off with code WELCOME15. We also run seasonal promotional sales and offer exclusive member discounts to subscribers.',
      category: 'Discounts & Promo',
      isActive: true,
    },
    {
      id: 'faq-4',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Cash on Delivery in supported regions.',
      category: 'Payments',
      isActive: true,
    },
    {
      id: 'faq-5',
      question: 'How can I track my shipment online?',
      answer: 'Once your order is processed and shipped, you will receive an email and SMS with a live tracking number and carrier tracking link to track real-time parcel updates.',
      category: 'Shipping & Delivery',
      isActive: true,
    },
  ],
};

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

const WebsiteManagementPage = () => {
  // Active Page Selection: 'home' | 'shop' | 'shopDetail' | 'cart' | 'about' | 'contact' | 'faq' | null
  const [activePage, setActivePage] = useState('home');

  // Sub-tab selectors for each page
  const [activeHomeTab, setActiveHomeTab] = useState('HeroBanner');
  const [activeShopTab, setActiveShopTab] = useState('ShopCategories');
  const [activeShopDetailTab, setActiveShopDetailTab] = useState('ProductTabs');
  const [activeCartTab, setActiveCartTab] = useState('CartCoupons');
  const [activeAboutTab, setActiveAboutTab] = useState('AboutStory');
  const [activeContactTab, setActiveContactTab] = useState('ContactOffices');
  const [activeFaqTab, setActiveFaqTab] = useState('FaqList');

  const [toastMessage, setToastMessage] = useState('');

  // 1. Homepage States
  const [heroSlides, setHeroSlides] = useState(() => {
    const saved = localStorage.getItem('pesco_hero_slides');
    return saved ? JSON.parse(saved) : defaultHeroSlides;
  });
  const [heroBanners, setHeroBanners] = useState(() => {
    const saved = localStorage.getItem('pesco_hero_banners');
    return saved ? JSON.parse(saved) : defaultHeroBanners;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('pesco_home_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });
  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem('pesco_home_collections');
    return saved ? JSON.parse(saved) : defaultCollections;
  });
  const [activeCollectionSubTab, setActiveCollectionSubTab] = useState('bestSellers');
  const [trendingProducts, setTrendingProducts] = useState(() => {
    const saved = localStorage.getItem('pesco_trending_products');
    return saved ? JSON.parse(saved) : defaultTrendingProducts;
  });

  // 2. Shop Page State
  const [shopData, setShopData] = useState(() => {
    const saved = localStorage.getItem('pesco_shop_page');
    return saved ? JSON.parse(saved) : defaultShopData;
  });

  // 3. ShopDetail Page State
  const [shopDetailData, setShopDetailData] = useState(() => {
    const saved = localStorage.getItem('pesco_shop_detail_page');
    return saved ? JSON.parse(saved) : defaultShopDetailData;
  });

  // 4. Cart Page State
  const [cartData, setCartData] = useState(() => {
    const saved = localStorage.getItem('pesco_cart_page');
    return saved ? JSON.parse(saved) : defaultCartData;
  });

  // 5. About Us State
  const [aboutData, setAboutData] = useState(() => {
    const saved = localStorage.getItem('pesco_about_page');
    return saved ? JSON.parse(saved) : defaultAboutData;
  });

  // 6. Contact Us State
  const [contactData, setContactData] = useState(() => {
    const saved = localStorage.getItem('pesco_contact_page');
    return saved ? JSON.parse(saved) : defaultContactData;
  });

  // 7. FAQ State
  const [faqData, setFaqData] = useState(() => {
    const saved = localStorage.getItem('pesco_faq_page');
    return saved ? JSON.parse(saved) : defaultFaqData;
  });

  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Fetch all live data from backend API on mount
  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        // 1. Fetch Hero Slides from Backend
        const slidesRes = await fetch('http://localhost:5000/api/website/hero-slides/all');
        if (slidesRes.ok) {
          const slidesData = await slidesRes.json();
          if (slidesData.success && Array.isArray(slidesData.data) && slidesData.data.length > 0) {
            setHeroSlides(slidesData.data.map((s) => ({ ...s, id: s._id || s.id })));
          }
        }

        // 2. Fetch CMS Sections from Backend
        const contentRes = await fetch('http://localhost:5000/api/website/content');
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          if (contentData.success && contentData.data) {
            const d = contentData.data;
            if (d.hero_banners) setHeroBanners(d.hero_banners);
            if (d.categories) setCategories(d.categories);
            if (d.collections) setCollections(d.collections);
            if (d.trending_products) setTrendingProducts(d.trending_products);
            if (d.shop_page) setShopData(d.shop_page);
            if (d.shop_detail_page) setShopDetailData(d.shop_detail_page);
            if (d.cart_page) setCartData(d.cart_page);
            if (d.about_page) setAboutData(d.about_page);
            if (d.contact_page) setContactData(d.contact_page);
            if (d.faq_page) setFaqData(d.faq_page);
          }
        }
      } catch (err) {
        console.warn('[WebsiteManagementPage] Loaded local cache/fallback:', err.message);
      }
    };

    fetchWebsiteData();
  }, []);

  const handleSaveAll = async () => {
    setIsSaving(true);
    // Instant cache update
    localStorage.setItem('pesco_hero_slides', JSON.stringify(heroSlides));
    localStorage.setItem('pesco_hero_banners', JSON.stringify(heroBanners));
    localStorage.setItem('pesco_home_categories', JSON.stringify(categories));
    localStorage.setItem('pesco_home_collections', JSON.stringify(collections));
    localStorage.setItem('pesco_trending_products', JSON.stringify(trendingProducts));
    localStorage.setItem('pesco_shop_page', JSON.stringify(shopData));
    localStorage.setItem('pesco_shop_detail_page', JSON.stringify(shopDetailData));
    localStorage.setItem('pesco_cart_page', JSON.stringify(cartData));
    localStorage.setItem('pesco_about_page', JSON.stringify(aboutData));
    localStorage.setItem('pesco_contact_page', JSON.stringify(contactData));
    localStorage.setItem('pesco_faq_page', JSON.stringify(faqData));
    localStorage.setItem('pesco_last_updated', Date.now().toString());

    // Dispatch broadcast event for open frontend tabs
    window.dispatchEvent(new CustomEvent('pesco_website_updated', { detail: { timestamp: Date.now() } }));

    try {
      // 1. Save Hero Slides to Backend MongoDB
      const slidesPromise = fetch('http://localhost:5000/api/website/hero-slides/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides: heroSlides }),
      });

      // 2. Save Categories to Backend MongoDB
      const categoriesPromise = fetch('http://localhost:5000/api/website/categories/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories }),
      });

      // 3. Save Hero Banners to Backend MongoDB
      const bannersPromise = fetch('http://localhost:5000/api/website/hero-banners/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banners: heroBanners }),
      });

      // 4. Save Universal CMS Sections to Backend MongoDB
      const contentPromise = fetch('http://localhost:5000/api/website/content/save-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: {
            hero_banners: heroBanners,
            categories,
            collections,
            trending_products: trendingProducts,
            shop_page: shopData,
            shop_detail_page: shopDetailData,
            cart_page: cartData,
            about_page: aboutData,
            contact_page: contactData,
            faq_page: faqData,
          },
        }),
      });

      await Promise.all([slidesPromise, categoriesPromise, bannersPromise, contentPromise]);
      showToast('All website changes published live to MongoDB database & storefront!');
    } catch (err) {
      console.error('[Save All Error]:', err);
      showToast('Saved locally in browser cache (Backend sync pending).');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all pages to initial defaults?')) {
      setHeroSlides(defaultHeroSlides);
      setHeroBanners(defaultHeroBanners);
      setCategories(defaultCategories);
      setCollections(defaultCollections);
      setTrendingProducts(defaultTrendingProducts);
      setShopData(defaultShopData);
      setShopDetailData(defaultShopDetailData);
      setCartData(defaultCartData);
      setAboutData(defaultAboutData);
      setContactData(defaultContactData);
      setFaqData(defaultFaqData);

      localStorage.clear();
      showToast('All pages reset to default values.');
    }
  };

  // Top Page Selector Configuration (7 Pages)
  const pageNavs = [
    { id: 'home', label: 'HomePage Management', icon: Home, desc: 'Banners, Sliders & Collections' },
    { id: 'shop', label: 'ShopPage Management', icon: ShoppingBag, desc: 'Filters, Categories & Pricing' },
    { id: 'shopDetail', label: 'ShopDetailPage Management', icon: Eye, desc: 'Product Gallery, Info & Upsell' },
    { id: 'cart', label: 'CartPage Management', icon: ShoppingCart, desc: 'Coupons, Shipping & Summary' },
    { id: 'about', label: 'About Us Management', icon: Users, desc: 'Story, Features & Team' },
    { id: 'contact', label: 'Contact Us Management', icon: Phone, desc: 'Global Offices & Form' },
    { id: 'faq', label: 'FAQ Management', icon: HelpCircle, desc: 'Q&As & Search Bar' },
  ];

  // Sub-tabs configurations
  const homeTabs = [
    { id: 'HeroBanner', label: 'HeroBanner', desc: 'Promo Offer Banners', icon: Image, count: heroBanners.length },
    { id: 'HeroPage', label: 'HeroPage', desc: 'Main Hero Sliders', icon: Sliders, count: heroSlides.length },
    { id: 'HomeCategory', label: 'HomeCategory', desc: 'Category Carousel', icon: Layers, count: categories.length },
    { id: 'HomeCollection', label: 'HomeCollection', desc: 'Featured Tabs & Items', icon: Sparkles, count: collections.bestSellers.length + collections.newProducts.length + collections.saleProducts.length },
    { id: 'HomeTrendingProducts', label: 'HomeTrendingProducts', desc: 'Trending Carousel', icon: Flame, count: trendingProducts.length },
  ];

  const shopTabs = [
    { id: 'ShopCategories', label: 'Sidebar Categories', desc: 'Filter categories & counts', icon: Filter, count: shopData.categories?.length || 7 },
    { id: 'ShopHeader', label: 'Header & Pagination', desc: 'Banner & Items per page', icon: LayoutTemplate, count: 'Header' },
    { id: 'ShopPricing', label: 'Price Range & Banner', desc: 'Min/Max & Clearance Offer', icon: Tag, count: 'Promo' },
  ];

  const shopDetailTabs = [
    { id: 'ProductTabs', label: 'Product Details Tabs', desc: 'Description, Specs & Policies', icon: FileText, count: 'Tabs' },
    { id: 'GallerySettings', label: 'Gallery & Zoom', desc: 'Zoom & Preview behavior', icon: Image, count: 'Gallery' },
    { id: 'RelatedUpsell', label: 'Related Items Showcase', desc: 'Cross-sell carousel config', icon: Sparkles, count: 'Upsell' },
  ];

  const cartTabs = [
    { id: 'CartCoupons', label: 'Discount Coupons', desc: 'Promo codes & percentage rules', icon: Percent, count: cartData.coupons?.length || 3 },
    { id: 'CartShipping', label: 'Shipping & Free Delivery', desc: 'Thresholds & Flat fees', icon: Truck, count: 'Delivery' },
    { id: 'CartBanner', label: 'Cart Page Banner', desc: 'Top title & Breadcrumbs', icon: Image, count: 'Header' },
  ];

  const aboutTabs = [
    { id: 'AboutStory', label: 'Story & Mission', desc: 'Headings, Experience & CEO', icon: FileText, count: 'Core' },
    { id: 'AboutFeatures', label: 'Service Highlights', desc: 'Shipping, Support & Warranty', icon: ShieldCheck, count: aboutData.serviceFeatures?.length || 4 },
    { id: 'AboutTeam', label: 'Leadership Team', desc: 'Founders & Directors', icon: Users, count: aboutData.teamMembers?.length || 3 },
  ];

  const contactTabs = [
    { id: 'ContactOffices', label: 'Global Offices', desc: 'Australia, England, Canada', icon: MapPin, count: contactData.offices?.length || 3 },
    { id: 'ContactBanner', label: 'Banner & Marquee', desc: 'Header & Marquee Ticker', icon: Image, count: 'Ticker' },
    { id: 'ContactForm', label: 'Contact Form Settings', desc: 'Recipient & Auto-reply', icon: Mail, count: 'Inbox' },
  ];

  const faqTabs = [
    { id: 'FaqList', label: 'FAQ Questions & Answers', desc: 'Manage Accordion Items', icon: HelpCircle, count: faqData.faqList?.length || 5 },
    { id: 'FaqHeader', label: 'FAQ Page Header', desc: 'Banner & Search Settings', icon: LayoutTemplate, count: 'Header' },
  ];

  // Horizontal Scroller Ref & Helpers
  const pageScrollerRef = useRef(null);

  const scrollPageNav = (direction) => {
    if (pageScrollerRef.current) {
      const scrollOffset = direction === 'left' ? -280 : 280;
      pageScrollerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '28px',
            backgroundColor: '#16A34A',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 9999,
            animation: 'fadeIn 0.25s ease forwards',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#CC0D39',
                backgroundColor: 'rgba(204, 13, 57, 0.08)',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              Universal CMS
            </span>
          </div>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.5px',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Website Management
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
            Manage and customize dynamic sections for all pages across the Pesco Store.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="btn-secondary"
            title="Reset all pages to default seed data"
          >
            <RotateCcw size={16} />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="btn-primary"
            style={{ padding: '10px 22px', opacity: isSaving ? 0.75 : 1 }}
          >
            <Save size={16} className={isSaving ? 'animate-spin' : ''} />
            <span>{isSaving ? 'Publishing...' : 'Publish Changes'}</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. MAIN PAGE BUTTONS SCROLLER (All 7 Pages) */}
      {/* ========================================== */}
      <div style={{ marginBottom: '26px' }}>
        {/* Scroller Control Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '0 2px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#475569',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
              }}
            >
              Select Page To Manage ({pageNavs.length} Pages)
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
              • Scroll horizontally to view all pages
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={() => scrollPageNav('left')}
              className="btn-secondary"
              style={{
                width: '32px',
                height: '32px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
              }}
              title="Scroll Left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollPageNav('right')}
              className="btn-secondary"
              style={{
                width: '32px',
                height: '32px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
              }}
              title="Scroll Right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Container Track */}
        <div
          ref={pageScrollerRef}
          className="horizontal-scroller"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '10px',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {pageNavs.map((page) => {
            const Icon = page.icon;
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => setActivePage(isActive ? null : page.id)}
                style={{
                  flex: '0 0 255px',
                  minWidth: '255px',
                  maxWidth: '270px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  backgroundColor: isActive ? '#CC0D39' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#0F172A',
                  border: isActive ? '1.5px solid #CC0D39' : '1.5px solid #E2E8F0',
                  boxShadow: isActive
                    ? '0 8px 24px rgba(204, 13, 57, 0.22)'
                    : '0 2px 6px rgba(15, 23, 42, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#CC0D39';
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(204, 13, 57, 0.08)',
                      color: isActive ? '#FFFFFF' : '#CC0D39',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, lineHeight: 1.2 }}>
                      {page.label}
                    </div>
                    <div style={{ fontSize: '11px', color: isActive ? 'rgba(255, 255, 255, 0.8)' : '#64748B', marginTop: '2px' }}>
                      {page.desc}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '999px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#64748B',
                    }}
                  >
                    {page.count}
                  </span>
                  {isActive ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================== */}
      {/* 4. OVERVIEW PLACEHOLDER (When No Page is Selected) */}
      {/* ========================================== */}
      {!activePage && (
        <div
          className="glass-card animate-fade-in"
          style={{
            padding: '56px 32px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            border: '1.5px dashed #CBD5E1',
            borderRadius: '20px',
            marginTop: '8px',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '18px',
              backgroundColor: 'rgba(204, 13, 57, 0.08)',
              color: '#CC0D39',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <LayoutTemplate size={32} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Website Content & Page Manager
          </h3>
          <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '620px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Select any page button above (<strong>HomePage</strong>, <strong>ShopPage</strong>, <strong>ShopDetailPage</strong>, <strong>CartPage</strong>, <strong>About Us</strong>, <strong>Contact Us</strong>, or <strong>FAQ</strong>) to configure its dynamic components and settings.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setActivePage('home')}
              style={{ padding: '9px 18px', fontSize: '13px' }}
            >
              <Home size={15} />
              <span>HomePage</span>
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setActivePage('shop')}
              style={{ padding: '9px 18px', fontSize: '13px' }}
            >
              <ShoppingBag size={15} />
              <span>ShopPage</span>
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setActivePage('cart')}
              style={{ padding: '9px 18px', fontSize: '13px' }}
            >
              <ShoppingCart size={15} />
              <span>CartPage</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. HOMEPAGE MANAGEMENT VIEW */}
      {/* ========================================== */}
      {activePage === 'home' && (
        <div className="animate-fade-in">
          {/* Sub-Tabs for HomePage */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '8px',
              marginBottom: '26px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            {homeTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeHomeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveHomeTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isActive ? '1px solid #CC0D39' : '1px solid transparent',
                    backgroundColor: isActive ? 'rgba(204, 13, 57, 0.06)' : '#FFFFFF',
                    color: isActive ? '#CC0D39' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? '#CC0D39' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: isActive ? '#CC0D39' : '#0F172A' }}>
                        {tab.label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(204, 13, 57, 0.15)' : '#F1F5F9',
                          color: isActive ? '#CC0D39' : '#64748B',
                        }}
                      >
                        {tab.count}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 5.1 HeroBanner */}
          {activeHomeTab === 'HeroBanner' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>HeroBanner Management</h2>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Manage the promotional twin offer cards under the hero slider in <code>HeroBanner.jsx</code>.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newId = `banner-${Date.now()}`;
                    setHeroBanners([
                      ...heroBanners,
                      {
                        id: newId,
                        discountTag: 'UP TO 40% OFF',
                        title: 'Brand New Summer Collection Outfits',
                        buttonText: 'Shop Now',
                        buttonLink: 'shops.html',
                        image: 'assets/images/banner/banner-1.png',
                        shape1: 'assets/images/banner/discount.png',
                        shape2: 'assets/images/banner/line.png',
                        badgeBg: 'bg-one',
                        isActive: true,
                      },
                    ]);
                    showToast('New Hero Banner card added!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add Banner Card</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
                {heroBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="glass-card"
                    style={{
                      padding: '24px',
                      border: banner.isActive ? '1.5px solid #E2E8F0' : '1.5px dashed #CBD5E1',
                      opacity: banner.isActive ? 1 : 0.65,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '4px 10px', borderRadius: '6px' }}>
                        Banner #{index + 1} ({banner.badgeBg || 'bg-one'})
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setHeroBanners(heroBanners.map((b) => b.id === banner.id ? { ...b, isActive: !b.isActive } : b));
                            showToast(`Banner #${index + 1} visibility toggled.`);
                          }}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            backgroundColor: banner.isActive ? '#F0FDF4' : '#F1F5F9',
                            color: banner.isActive ? '#16A34A' : '#64748B',
                            border: '1px solid #E2E8F0',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {banner.isActive ? 'Active' : 'Disabled'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (heroBanners.length <= 1) {
                              alert('At least 1 banner card is required.');
                              return;
                            }
                            setHeroBanners(heroBanners.filter((b) => b.id !== banner.id));
                            showToast(`Banner #${index + 1} removed.`);
                          }}
                          style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Discount Tag / Badge</label>
                        <input
                          type="text"
                          className="input-field"
                          value={banner.discountTag}
                          onChange={(e) => setHeroBanners(heroBanners.map((b) => b.id === banner.id ? { ...b, discountTag: e.target.value } : b))}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Banner Title / Heading</label>
                        <input
                          type="text"
                          className="input-field"
                          value={banner.title}
                          onChange={(e) => setHeroBanners(heroBanners.map((b) => b.id === banner.id ? { ...b, title: e.target.value } : b))}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Button Text</label>
                          <input
                            type="text"
                            className="input-field"
                            value={banner.buttonText}
                            onChange={(e) => setHeroBanners(heroBanners.map((b) => b.id === banner.id ? { ...b, buttonText: e.target.value } : b))}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Target Link</label>
                          <input
                            type="text"
                            className="input-field"
                            value={banner.buttonLink}
                            onChange={(e) => setHeroBanners(heroBanners.map((b) => b.id === banner.id ? { ...b, buttonLink: e.target.value } : b))}
                          />
                        </div>
                      </div>
                      <div>
                        <ImageUploadField
                          label="Banner Image"
                          folder="banners"
                          value={banner.image}
                          onChange={(val) => setHeroBanners(heroBanners.map((b) => b.id === banner.id ? { ...b, image: val } : b))}
                          placeholder="assets/images/banner/banner-1.png or Upload file"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5.2 HeroPage */}
          {activeHomeTab === 'HeroPage' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>HeroPage Slider Slides</h2>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Configure slides for the main interactive carousel in <code>HeroPage.jsx</code>.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newSlide = {
                      id: `hero-${Date.now()}`,
                      subHeading: 'New Seasonal Trend',
                      title: 'New Modern Arrivals in Pesco Online',
                      description: 'Explore the latest trending items with high durability, modern aesthetics, and special discounted prices.',
                      price: '115.00',
                      buttonText: 'Shop Now',
                      buttonLink: '/shops',
                      image: 'assets/images/hero/hero-one_img1.jpg',
                      shape: 'assets/images/hero/hero-one-shape1.png',
                      isActive: true,
                    };
                    setHeroSlides([...heroSlides, newSlide]);
                    showToast('New slide added to HeroPage!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add New Slide</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="glass-card"
                    style={{
                      padding: '24px',
                      border: slide.isActive ? '1.5px solid #E2E8F0' : '1.5px dashed #CBD5E1',
                      opacity: slide.isActive ? 1 : 0.65,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#CC0D39', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800 }}>
                          {index + 1}
                        </span>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                          Slide #{index + 1}: {slide.subHeading}
                        </h4>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setHeroSlides(heroSlides.map((s) => s.id === slide.id ? { ...s, isActive: !s.isActive } : s));
                            showToast(`Slide #${index + 1} status toggled.`);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: slide.isActive ? '#F0FDF4' : '#F1F5F9',
                            color: slide.isActive ? '#16A34A' : '#64748B',
                            border: '1px solid #E2E8F0',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {slide.isActive ? 'Active in Slider' : 'Hidden'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (heroSlides.length <= 1) {
                              alert('At least 1 slide is required.');
                              return;
                            }
                            setHeroSlides(heroSlides.filter((s) => s.id !== slide.id));
                            showToast(`Slide #${index + 1} deleted.`);
                          }}
                          style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Sub Heading Tag</label>
                        <input
                          type="text"
                          className="input-field"
                          value={slide.subHeading}
                          onChange={(e) => setHeroSlides(heroSlides.map((s) => s.id === slide.id ? { ...s, subHeading: e.target.value } : s))}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Discount Price ($)</label>
                        <input
                          type="text"
                          className="input-field"
                          value={slide.price}
                          onChange={(e) => setHeroSlides(heroSlides.map((s) => s.id === slide.id ? { ...s, price: e.target.value } : s))}
                        />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Main Title</label>
                        <input
                          type="text"
                          className="input-field"
                          value={slide.title}
                          onChange={(e) => setHeroSlides(heroSlides.map((s) => s.id === slide.id ? { ...s, title: e.target.value } : s))}
                        />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Slide Description</label>
                        <textarea
                          rows={2}
                          className="input-field"
                          value={slide.description}
                          onChange={(e) => setHeroSlides(heroSlides.map((s) => s.id === slide.id ? { ...s, description: e.target.value } : s))}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Button Text</label>
                        <input
                          type="text"
                          className="input-field"
                          value={slide.buttonText}
                          onChange={(e) => setHeroSlides(heroSlides.map((s) => s.id === slide.id ? { ...s, buttonText: e.target.value } : s))}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Target Route</label>
                        <input
                          type="text"
                          className="input-field"
                          value={slide.buttonLink}
                          onChange={(e) => setHeroSlides(heroSlides.map((s) => s.id === slide.id ? { ...s, buttonLink: e.target.value } : s))}
                        />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <ImageUploadField
                          label="Hero Slide Main Image"
                          folder="hero"
                          value={slide.image}
                          onChange={(val) => setHeroSlides(heroSlides.map((s) => s.id === slide.id ? { ...s, image: val } : s))}
                          placeholder="assets/images/products/brass-cylinder-vase-1.jpg or Upload file"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5.3 HomeCategory */}
          {activeHomeTab === 'HomeCategory' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>HomeCategory Carousel</h2>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Manage category carousel tiles in <code>HomeCategory.jsx</code>.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newCat = {
                      id: `cat-${Date.now()}`,
                      name: 'Accessories',
                      count: '50 items',
                      image: 'assets/images/category/category-1.png',
                      link: 'shops.html',
                      isActive: true,
                    };
                    setCategories([...categories, newCat]);
                    showToast('New Category tile added!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add Category</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {categories.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      border: cat.isActive ? '1.5px solid #E2E8F0' : '1.5px dashed #CBD5E1',
                      opacity: cat.isActive ? 1 : 0.65,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '3px 8px', borderRadius: '6px' }}>
                        Category #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (categories.length <= 1) {
                            alert('At least 1 category is required.');
                            return;
                          }
                          setCategories(categories.filter((c) => c.id !== cat.id));
                          showToast(`Category "${cat.name}" removed.`);
                        }}
                        style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '2px', display: 'block' }}>Category Name</label>
                        <input
                          type="text"
                          className="input-field"
                          value={cat.name}
                          onChange={(e) => setCategories(categories.map((c) => c.id === cat.id ? { ...c, name: e.target.value } : c))}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '2px', display: 'block' }}>Item Count Tag</label>
                        <input
                          type="text"
                          className="input-field"
                          value={cat.count}
                          onChange={(e) => setCategories(categories.map((c) => c.id === cat.id ? { ...c, count: e.target.value } : c))}
                        />
                      </div>
                      <div>
                        <ImageUploadField
                          compact
                          label="Category Thumbnail Image"
                          folder="categories"
                          value={cat.image}
                          onChange={(val) => setCategories(categories.map((c) => c.id === cat.id ? { ...c, image: val } : c))}
                          placeholder="assets/images/category/category-1.png or Upload file"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5.4 HomeCollection */}
          {activeHomeTab === 'HomeCollection' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>HomeCollection Showcase</h2>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Manage products rendered in the 3 featured collection tabs in <code>HomeCollection.jsx</code>.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newItem = {
                      id: `col-${Date.now()}`,
                      title: 'New Featured Designer Outfit',
                      price: '95.00',
                      prevPrice: '120.00',
                      discount: '15% Off',
                      rating: 5,
                      image: 'assets/images/products/feature-product-1.png',
                      badge: 'Featured',
                      stock: 'In Stock (20)',
                    };
                    setCollections({
                      ...collections,
                      [activeCollectionSubTab]: [...collections[activeCollectionSubTab], newItem],
                    });
                    showToast(`New item added to ${activeCollectionSubTab}!`);
                  }}
                >
                  <Plus size={16} />
                  <span>Add Collection Product</span>
                </button>
              </div>

              {/* Sub collection tabs switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
                {[
                  { id: 'bestSellers', label: 'Best Sellers', count: collections.bestSellers.length },
                  { id: 'newProducts', label: 'New Products', count: collections.newProducts.length },
                  { id: 'saleProducts', label: 'Sale Products', count: collections.saleProducts.length },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setActiveCollectionSubTab(st.id)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      backgroundColor: activeCollectionSubTab === st.id ? '#CC0D39' : '#F1F5F9',
                      color: activeCollectionSubTab === st.id ? '#FFFFFF' : '#475569',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>{st.label}</span>
                    <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '999px', backgroundColor: activeCollectionSubTab === st.id ? 'rgba(255, 255, 255, 0.25)' : '#E2E8F0' }}>
                      {st.count}
                    </span>
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {collections[activeCollectionSubTab].map((prod) => (
                  <div key={prod.id} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                        {prod.badge || 'Collection'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setCollections({
                            ...collections,
                            [activeCollectionSubTab]: collections[activeCollectionSubTab].filter((p) => p.id !== prod.id),
                          });
                          showToast('Product removed from collection.');
                        }}
                        style={{ padding: '4px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Product Title</label>
                        <input
                          type="text"
                          className="input-field"
                          value={prod.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCollections({
                              ...collections,
                              [activeCollectionSubTab]: collections[activeCollectionSubTab].map((p) => p.id === prod.id ? { ...p, title: val } : p),
                            });
                          }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Sale Price ($)</label>
                          <input
                            type="text"
                            className="input-field"
                            value={prod.price}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCollections({
                                ...collections,
                                [activeCollectionSubTab]: collections[activeCollectionSubTab].map((p) => p.id === prod.id ? { ...p, price: val } : p),
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Regular Price ($)</label>
                          <input
                            type="text"
                            className="input-field"
                            value={prod.prevPrice}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCollections({
                                ...collections,
                                [activeCollectionSubTab]: collections[activeCollectionSubTab].map((p) => p.id === prod.id ? { ...p, prevPrice: val } : p),
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <ImageUploadField
                          compact
                          label="Product Thumbnail Image"
                          folder="collections"
                          value={prod.image}
                          onChange={(val) => {
                            setCollections({
                              ...collections,
                              [activeCollectionSubTab]: collections[activeCollectionSubTab].map((p) => p.id === prod.id ? { ...p, image: val } : p),
                            });
                          }}
                          placeholder="assets/images/products/feature-product-1.png or Upload file"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5.5 HomeTrendingProducts */}
          {activeHomeTab === 'HomeTrendingProducts' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>HomeTrendingProducts Carousel</h2>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Configure trending product items in <code>HomeTrendingProducts.jsx</code>.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newTrend = {
                      id: `trend-${Date.now()}`,
                      title: 'Trending Urban Fashion Item',
                      prevPrice: '60.00',
                      newPrice: '28.00',
                      rating: 5,
                      reviews: 50,
                      image: 'assets/images/products/trending-product-1.png',
                      tag: 'Hot Item',
                      isActive: true,
                    };
                    setTrendingProducts([...trendingProducts, newTrend]);
                    showToast('New Trending Product added!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add Trending Product</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {trendingProducts.map((trend) => (
                  <div key={trend.id} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                        {trend.tag || 'Trending'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setTrendingProducts(trendingProducts.filter((t) => t.id !== trend.id));
                          showToast('Trending item removed.');
                        }}
                        style={{ padding: '4px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Product Title</label>
                        <input
                          type="text"
                          className="input-field"
                          value={trend.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTrendingProducts(trendingProducts.map((t) => t.id === trend.id ? { ...t, title: val } : t));
                          }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Regular ($)</label>
                          <input
                            type="text"
                            className="input-field"
                            value={trend.prevPrice}
                            onChange={(e) => {
                              const val = e.target.value;
                              setTrendingProducts(trendingProducts.map((t) => t.id === trend.id ? { ...t, prevPrice: val } : t));
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Discount ($)</label>
                          <input
                            type="text"
                            className="input-field"
                            value={trend.newPrice}
                            onChange={(e) => {
                              const val = e.target.value;
                              setTrendingProducts(trendingProducts.map((t) => t.id === trend.id ? { ...t, newPrice: val } : t));
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <ImageUploadField
                          compact
                          label="Trending Item Image"
                          folder="trending"
                          value={trend.image}
                          onChange={(val) => {
                            setTrendingProducts(trendingProducts.map((t) => t.id === trend.id ? { ...t, image: val } : t));
                          }}
                          placeholder="assets/images/products/trending-product-1.png or Upload file"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* 6. SHOP PAGE MANAGEMENT VIEW */}
      {/* ========================================== */}
      {activePage === 'shop' && (
        <div className="animate-fade-in">
          {/* Sub-Tabs for ShopPage */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
              marginBottom: '26px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            {shopTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeShopTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveShopTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isActive ? '1px solid #CC0D39' : '1px solid transparent',
                    backgroundColor: isActive ? 'rgba(204, 13, 57, 0.06)' : '#FFFFFF',
                    color: isActive ? '#CC0D39' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? '#CC0D39' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: isActive ? '#CC0D39' : '#0F172A' }}>
                        {tab.label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(204, 13, 57, 0.15)' : '#F1F5F9',
                          color: isActive ? '#CC0D39' : '#64748B',
                        }}
                      >
                        {tab.count}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 6.1 Shop Sidebar Categories */}
          {activeShopTab === 'ShopCategories' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Shop Sidebar Filter Categories</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Manage category filter checklist and item count badges on <code>ShopPage.jsx</code>.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newCat = {
                      id: `sc-${Date.now()}`,
                      name: 'Athletic Sportswear',
                      count: '30',
                      isActive: true,
                    };
                    setShopData({ ...shopData, categories: [...(shopData.categories || []), newCat] });
                    showToast('New filter category added!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add Filter Category</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                {shopData.categories?.map((cat, idx) => (
                  <div key={cat.id} className="glass-card" style={{ padding: '20px', border: cat.isActive ? '1.5px solid #E2E8F0' : '1.5px dashed #CBD5E1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                        Filter #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setShopData({
                            ...shopData,
                            categories: shopData.categories.filter((c) => c.id !== cat.id),
                          });
                          showToast('Filter category removed.');
                        }}
                        style={{ padding: '4px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Category Label</label>
                        <input
                          type="text"
                          className="input-field"
                          value={cat.name}
                          onChange={(e) => {
                            const updated = shopData.categories.map((c) => c.id === cat.id ? { ...c, name: e.target.value } : c);
                            setShopData({ ...shopData, categories: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Item Count Tag (e.g. 45)</label>
                        <input
                          type="text"
                          className="input-field"
                          value={cat.count}
                          onChange={(e) => {
                            const updated = shopData.categories.map((c) => c.id === cat.id ? { ...c, count: e.target.value } : c);
                            setShopData({ ...shopData, categories: updated });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.2 Shop Header & Pagination */}
          {activeShopTab === 'ShopHeader' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Shop Page Header & Layout Configuration
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Configure top banner title, default sorting order, and pagination size.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Shop Page Banner Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={shopData.bannerTitle}
                    onChange={(e) => setShopData({ ...shopData, bannerTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Items Per Page
                  </label>
                  <select
                    className="input-field"
                    value={shopData.itemsPerPage}
                    onChange={(e) => setShopData({ ...shopData, itemsPerPage: e.target.value })}
                  >
                    <option value="9">9 Products Per Page</option>
                    <option value="12">12 Products Per Page (Default)</option>
                    <option value="24">24 Products Per Page</option>
                    <option value="36">36 Products Per Page</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Default Sort Order
                  </label>
                  <select
                    className="input-field"
                    value={shopData.defaultSort}
                    onChange={(e) => setShopData({ ...shopData, defaultSort: e.target.value })}
                  >
                    <option value="Featured">Featured / Best Matches</option>
                    <option value="PriceLow">Price: Low to High</option>
                    <option value="PriceHigh">Price: High to Low</option>
                    <option value="Newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 6.3 Shop Price Range & Sidebar Banner */}
          {activeShopTab === 'ShopPricing' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Price Filter & Sidebar Promo Banner
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Set sidebar price range slider limits and promotional clearance banner.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={shopData.priceFilter?.min}
                    onChange={(e) => setShopData({ ...shopData, priceFilter: { ...shopData.priceFilter, min: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={shopData.priceFilter?.max}
                    onChange={(e) => setShopData({ ...shopData, priceFilter: { ...shopData.priceFilter, max: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Sidebar Banner Tag
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={shopData.sidebarBanner?.discount}
                    onChange={(e) => setShopData({ ...shopData, sidebarBanner: { ...shopData.sidebarBanner, discount: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* 7. SHOP DETAIL PAGE MANAGEMENT VIEW */}
      {/* ========================================== */}
      {activePage === 'shopDetail' && (
        <div className="animate-fade-in">
          {/* Sub-Tabs for ShopDetailPage */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
              marginBottom: '26px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            {shopDetailTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeShopDetailTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveShopDetailTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isActive ? '1px solid #CC0D39' : '1px solid transparent',
                    backgroundColor: isActive ? 'rgba(204, 13, 57, 0.06)' : '#FFFFFF',
                    color: isActive ? '#CC0D39' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? '#CC0D39' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: isActive ? '#CC0D39' : '#0F172A' }}>
                        {tab.label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(204, 13, 57, 0.15)' : '#F1F5F9',
                          color: isActive ? '#CC0D39' : '#64748B',
                        }}
                      >
                        {tab.count}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 7.1 Product Tabs Content */}
          {activeShopDetailTab === 'ProductTabs' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Product Detail Tabs & Policies
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Configure tab labels, return instructions, and shipping guarantees in <code>ShopDetailPage.jsx</code>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Tab 1 Label (Description)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={shopDetailData.tabTitles?.desc}
                    onChange={(e) => setShopDetailData({ ...shopDetailData, tabTitles: { ...shopDetailData.tabTitles, desc: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Tab 2 Label (Additional Info)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={shopDetailData.tabTitles?.info}
                    onChange={(e) => setShopDetailData({ ...shopDetailData, tabTitles: { ...shopDetailData.tabTitles, info: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Tab 3 Label (Reviews)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={shopDetailData.tabTitles?.reviews}
                    onChange={(e) => setShopDetailData({ ...shopDetailData, tabTitles: { ...shopDetailData.tabTitles, reviews: e.target.value } })}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Shipping & Returns Policy Note
                  </label>
                  <textarea
                    rows={3}
                    className="input-field"
                    value={shopDetailData.shippingPolicyText}
                    onChange={(e) => setShopDetailData({ ...shopDetailData, shippingPolicyText: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 7.2 Gallery & Zoom */}
          {activeShopDetailTab === 'GallerySettings' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Product Image Gallery & Zoom Settings
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Manage high-res popup modals, hover zoom effects, and thumbnail layouts.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Detail Page Banner Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={shopDetailData.bannerTitle}
                    onChange={(e) => setShopDetailData({ ...shopDetailData, bannerTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Interactive Hover Zoom
                  </label>
                  <select
                    className="input-field"
                    value={shopDetailData.zoomEnabled ? 'true' : 'false'}
                    onChange={(e) => setShopDetailData({ ...shopDetailData, zoomEnabled: e.target.value === 'true' })}
                  >
                    <option value="true">Enabled (Magnify on Hover)</option>
                    <option value="false">Disabled (Standard Image Slider)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 7.3 Related Products Showcase */}
          {activeShopDetailTab === 'RelatedUpsell' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Related Products & Upsell Showcase
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Configure the related products recommendation carousel at the bottom of the product page.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Related Products Section Heading
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={shopDetailData.relatedTitle}
                    onChange={(e) => setShopDetailData({ ...shopDetailData, relatedTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Max Items Displayed in Carousel
                  </label>
                  <select
                    className="input-field"
                    value={shopDetailData.maxRelatedItems}
                    onChange={(e) => setShopDetailData({ ...shopDetailData, maxRelatedItems: Number(e.target.value) })}
                  >
                    <option value="3">3 Products</option>
                    <option value="4">4 Products (Default)</option>
                    <option value="6">6 Products</option>
                    <option value="8">8 Products</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* 8. CART PAGE MANAGEMENT VIEW */}
      {/* ========================================== */}
      {activePage === 'cart' && (
        <div className="animate-fade-in">
          {/* Sub-Tabs for CartPage */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
              marginBottom: '26px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            {cartTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCartTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCartTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isActive ? '1px solid #CC0D39' : '1px solid transparent',
                    backgroundColor: isActive ? 'rgba(204, 13, 57, 0.06)' : '#FFFFFF',
                    color: isActive ? '#CC0D39' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? '#CC0D39' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: isActive ? '#CC0D39' : '#0F172A' }}>
                        {tab.label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(204, 13, 57, 0.15)' : '#F1F5F9',
                          color: isActive ? '#CC0D39' : '#64748B',
                        }}
                      >
                        {tab.count}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 8.1 Cart Coupons */}
          {activeCartTab === 'CartCoupons' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Discount Coupon Codes</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Create and manage checkout promotional vouchers and coupon codes.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newCoupon = {
                      id: `c-${Date.now()}`,
                      code: 'SPRING20',
                      discount: '20% Off',
                      type: 'Percentage',
                      minSpend: '$60.00',
                      isActive: true,
                    };
                    setCartData({ ...cartData, coupons: [...(cartData.coupons || []), newCoupon] });
                    showToast('New coupon code created!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add New Coupon</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                {cartData.coupons?.map((coup, idx) => (
                  <div key={coup.id} className="glass-card" style={{ padding: '20px', border: coup.isActive ? '1.5px solid #E2E8F0' : '1.5px dashed #CBD5E1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '3px 8px', borderRadius: '6px' }}>
                        Coupon #{idx + 1}
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = cartData.coupons.map((c) => c.id === coup.id ? { ...c, isActive: !c.isActive } : c);
                            setCartData({ ...cartData, coupons: updated });
                            showToast(`Coupon ${coup.code} status updated.`);
                          }}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: coup.isActive ? '#F0FDF4' : '#F1F5F9',
                            color: coup.isActive ? '#16A34A' : '#64748B',
                            border: '1px solid #E2E8F0',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {coup.isActive ? 'Active' : 'Disabled'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCartData({ ...cartData, coupons: cartData.coupons.filter((c) => c.id !== coup.id) });
                            showToast('Coupon removed.');
                          }}
                          style={{ padding: '4px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Coupon Promo Code</label>
                        <input
                          type="text"
                          className="input-field"
                          value={coup.code}
                          onChange={(e) => {
                            const updated = cartData.coupons.map((c) => c.id === coup.id ? { ...c, code: e.target.value } : c);
                            setCartData({ ...cartData, coupons: updated });
                          }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Discount Value</label>
                          <input
                            type="text"
                            className="input-field"
                            value={coup.discount}
                            onChange={(e) => {
                              const updated = cartData.coupons.map((c) => c.id === coup.id ? { ...c, discount: e.target.value } : c);
                              setCartData({ ...cartData, coupons: updated });
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Min Spend Req.</label>
                          <input
                            type="text"
                            className="input-field"
                            value={coup.minSpend}
                            onChange={(e) => {
                              const updated = cartData.coupons.map((c) => c.id === coup.id ? { ...c, minSpend: e.target.value } : c);
                              setCartData({ ...cartData, coupons: updated });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8.2 Cart Shipping & Free Delivery */}
          {activeCartTab === 'CartShipping' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Shipping Calculation & Free Delivery Threshold
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Set checkout rates, tax estimates, and free delivery thresholds.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Free Shipping Threshold ($)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={cartData.freeShippingThreshold}
                    onChange={(e) => setCartData({ ...cartData, freeShippingThreshold: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Flat Standard Shipping Fee ($)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={cartData.flatShippingFee}
                    onChange={(e) => setCartData({ ...cartData, flatShippingFee: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Estimated Tax Percentage (%)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={cartData.taxRate}
                    onChange={(e) => setCartData({ ...cartData, taxRate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 8.3 Cart Banner */}
          {activeCartTab === 'CartBanner' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Cart Page Banner Configuration
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Configure top banner headline on <code>CartPage.jsx</code>.
              </p>

              <div style={{ maxWidth: '480px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                  Cart Banner Title
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={cartData.bannerTitle}
                  onChange={(e) => setCartData({ ...cartData, bannerTitle: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* 9. ABOUT US MANAGEMENT VIEW */}
      {/* ========================================== */}
      {activePage === 'about' && (
        <div className="animate-fade-in">
          {/* Sub-Tabs for About Us */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
              marginBottom: '26px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            {aboutTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAboutTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveAboutTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isActive ? '1px solid #CC0D39' : '1px solid transparent',
                    backgroundColor: isActive ? 'rgba(204, 13, 57, 0.06)' : '#FFFFFF',
                    color: isActive ? '#CC0D39' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? '#CC0D39' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: isActive ? '#CC0D39' : '#0F172A' }}>
                        {tab.label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(204, 13, 57, 0.15)' : '#F1F5F9',
                          color: isActive ? '#CC0D39' : '#64748B',
                        }}
                      >
                        {tab.count}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 9.1 About Story & Mission */}
          {activeAboutTab === 'AboutStory' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Story, Mission & Experience
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Manage main heading, story description, years of experience, and CEO signature in <code>AboutPage.jsx</code>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Main Headline Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={aboutData.heading}
                    onChange={(e) => setAboutData({ ...aboutData, heading: e.target.value })}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Story / Company Description
                  </label>
                  <textarea
                    rows={3}
                    className="input-field"
                    value={aboutData.description}
                    onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Years Experience (e.g. 25)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={aboutData.experienceYears}
                    onChange={(e) => setAboutData({ ...aboutData, experienceYears: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Experience Tag Text
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={aboutData.experienceText}
                    onChange={(e) => setAboutData({ ...aboutData, experienceText: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Author / CEO Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={aboutData.authorName}
                    onChange={(e) => setAboutData({ ...aboutData, authorName: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Author Role / Position
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={aboutData.authorRole}
                    onChange={(e) => setAboutData({ ...aboutData, authorRole: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 9.2 Service Features */}
          {activeAboutTab === 'AboutFeatures' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Service Highlights</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Configure key customer assurances (Shipping, Support, Returns, Payments).</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                {aboutData.serviceFeatures?.map((feat, idx) => (
                  <div key={feat.id || idx} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                        Feature #{idx + 1}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Title</label>
                        <input
                          type="text"
                          className="input-field"
                          value={feat.title}
                          onChange={(e) => {
                            const updated = [...aboutData.serviceFeatures];
                            updated[idx].title = e.target.value;
                            setAboutData({ ...aboutData, serviceFeatures: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Description</label>
                        <textarea
                          rows={2}
                          className="input-field"
                          value={feat.desc}
                          onChange={(e) => {
                            const updated = [...aboutData.serviceFeatures];
                            updated[idx].desc = e.target.value;
                            setAboutData({ ...aboutData, serviceFeatures: updated });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9.3 About Team */}
          {activeAboutTab === 'AboutTeam' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Executive Leadership Team</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Add, update, or remove key team profiles displayed on the About Us page.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newMember = {
                      id: `team-${Date.now()}`,
                      name: 'Elena Rostova',
                      role: 'Creative Director',
                      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
                    };
                    setAboutData({
                      ...aboutData,
                      teamMembers: [...(aboutData.teamMembers || []), newMember],
                    });
                    showToast('New team member added!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add Team Member</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {aboutData.teamMembers?.map((member, idx) => (
                  <div key={member.id} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                        Member #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAboutData({
                            ...aboutData,
                            teamMembers: aboutData.teamMembers.filter((m) => m.id !== member.id),
                          });
                          showToast('Team member removed.');
                        }}
                        style={{ padding: '4px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Full Name</label>
                        <input
                          type="text"
                          className="input-field"
                          value={member.name}
                          onChange={(e) => {
                            const updated = aboutData.teamMembers.map((m) => m.id === member.id ? { ...m, name: e.target.value } : m);
                            setAboutData({ ...aboutData, teamMembers: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Role / Designation</label>
                        <input
                          type="text"
                          className="input-field"
                          value={member.role}
                          onChange={(e) => {
                            const updated = aboutData.teamMembers.map((m) => m.id === member.id ? { ...m, role: e.target.value } : m);
                            setAboutData({ ...aboutData, teamMembers: updated });
                          }}
                        />
                      </div>
                      <div>
                        <ImageUploadField
                          compact
                          label="Team Member Photo"
                          folder="team"
                          value={member.image}
                          onChange={(val) => {
                            const updated = aboutData.teamMembers.map((m) => m.id === member.id ? { ...m, image: val } : m);
                            setAboutData({ ...aboutData, teamMembers: updated });
                          }}
                          placeholder="https://... or Upload file"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* 10. CONTACT US MANAGEMENT VIEW */}
      {/* ========================================== */}
      {activePage === 'contact' && (
        <div className="animate-fade-in">
          {/* Sub-Tabs for Contact Us */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
              marginBottom: '26px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            {contactTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeContactTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveContactTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isActive ? '1px solid #CC0D39' : '1px solid transparent',
                    backgroundColor: isActive ? 'rgba(204, 13, 57, 0.06)' : '#FFFFFF',
                    color: isActive ? '#CC0D39' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? '#CC0D39' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: isActive ? '#CC0D39' : '#0F172A' }}>
                        {tab.label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(204, 13, 57, 0.15)' : '#F1F5F9',
                          color: isActive ? '#CC0D39' : '#64748B',
                        }}
                      >
                        {tab.count}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 10.1 Global Offices */}
          {activeContactTab === 'ContactOffices' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Global Branch Offices</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Configure global office locations, addresses, phone lines, and support emails.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newOff = {
                      id: `off-${Date.now()}`,
                      title: 'New Branch Office',
                      address: '123 Market Street, Downtown Business Center, New York, NY 10001',
                      phone1: '+01 123 456 7890',
                      phone2: '+01 123 456 7899',
                      email: 'ny-support@pescostore.com',
                      isActive: true,
                    };
                    setContactData({
                      ...contactData,
                      offices: [...(contactData.offices || []), newOff],
                    });
                    showToast('New branch office added!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add Branch Office</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                {contactData.offices?.map((off, idx) => (
                  <div key={off.id} className="glass-card" style={{ padding: '22px', border: off.isActive ? '1.5px solid #E2E8F0' : '1.5px dashed #CBD5E1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#CC0D39', backgroundColor: 'rgba(204, 13, 57, 0.08)', padding: '3px 8px', borderRadius: '6px' }}>
                        Office #{idx + 1}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = contactData.offices.map((o) => o.id === off.id ? { ...o, isActive: !o.isActive } : o);
                            setContactData({ ...contactData, offices: updated });
                            showToast(`Office #${idx + 1} status updated.`);
                          }}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: off.isActive ? '#F0FDF4' : '#F1F5F9',
                            color: off.isActive ? '#16A34A' : '#64748B',
                            border: '1px solid #E2E8F0',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {off.isActive ? 'Active' : 'Hidden'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (contactData.offices.length <= 1) {
                              alert('At least 1 office is required.');
                              return;
                            }
                            setContactData({ ...contactData, offices: contactData.offices.filter((o) => o.id !== off.id) });
                            showToast('Branch office removed.');
                          }}
                          style={{ padding: '4px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Office Title</label>
                        <input
                          type="text"
                          className="input-field"
                          value={off.title}
                          onChange={(e) => {
                            const updated = contactData.offices.map((o) => o.id === off.id ? { ...o, title: e.target.value } : o);
                            setContactData({ ...contactData, offices: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Physical Address</label>
                        <textarea
                          rows={2}
                          className="input-field"
                          value={off.address}
                          onChange={(e) => {
                            const updated = contactData.offices.map((o) => o.id === off.id ? { ...o, address: e.target.value } : o);
                            setContactData({ ...contactData, offices: updated });
                          }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Primary Phone</label>
                          <input
                            type="text"
                            className="input-field"
                            value={off.phone1}
                            onChange={(e) => {
                              const updated = contactData.offices.map((o) => o.id === off.id ? { ...o, phone1: e.target.value } : o);
                              setContactData({ ...contactData, offices: updated });
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Secondary Phone</label>
                          <input
                            type="text"
                            className="input-field"
                            value={off.phone2}
                            onChange={(e) => {
                              const updated = contactData.offices.map((o) => o.id === off.id ? { ...o, phone2: e.target.value } : o);
                              setContactData({ ...contactData, offices: updated });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Support Email</label>
                        <input
                          type="email"
                          className="input-field"
                          value={off.email}
                          onChange={(e) => {
                            const updated = contactData.offices.map((o) => o.id === off.id ? { ...o, email: e.target.value } : o);
                            setContactData({ ...contactData, offices: updated });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10.2 Contact Banner & Ticker */}
          {activeContactTab === 'ContactBanner' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Banner & Marquee Ticker
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Configure top page banner and animated marquee ticker in <code>ContactPages.jsx</code>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Page Banner Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={contactData.bannerTitle}
                    onChange={(e) => setContactData({ ...contactData, bannerTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Animated Marquee Text
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={contactData.marqueeText}
                    onChange={(e) => setContactData({ ...contactData, marqueeText: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 10.3 Contact Form Settings */}
          {activeContactTab === 'ContactForm' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                Contact Form & Inquiries Inbox
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Configure recipient email and response expectations for user inquiries.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Form Heading
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={contactData.formSettings?.formTitle}
                    onChange={(e) => setContactData({ ...contactData, formSettings: { ...contactData.formSettings, formTitle: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Inquiry Notification Email
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    value={contactData.formSettings?.recipientEmail}
                    onChange={(e) => setContactData({ ...contactData, formSettings: { ...contactData.formSettings, recipientEmail: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Estimated Response Turnaround
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={contactData.formSettings?.responseTime}
                    onChange={(e) => setContactData({ ...contactData, formSettings: { ...contactData.formSettings, responseTime: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* 11. FAQ MANAGEMENT VIEW */}
      {/* ========================================== */}
      {activePage === 'faq' && (
        <div className="animate-fade-in">
          {/* Sub-Tabs for FAQ */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
              marginBottom: '26px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            {faqTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFaqTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFaqTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isActive ? '1px solid #CC0D39' : '1px solid transparent',
                    backgroundColor: isActive ? 'rgba(204, 13, 57, 0.06)' : '#FFFFFF',
                    color: isActive ? '#CC0D39' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? '#CC0D39' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: isActive ? '#CC0D39' : '#0F172A' }}>
                        {tab.label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(204, 13, 57, 0.15)' : '#F1F5F9',
                          color: isActive ? '#CC0D39' : '#64748B',
                        }}
                      >
                        {tab.count}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 11.1 FAQ Q&A List */}
          {activeFaqTab === 'FaqList' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>FAQ Questions & Answers</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>Add, reorder, and update expandable accordion items rendered in <code>FaqPage.jsx</code>.</p>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const newFaq = {
                      id: `faq-${Date.now()}`,
                      question: 'How do I cancel or modify my existing order?',
                      answer: 'You can modify or cancel your order within 2 hours of placement by visiting your buyer account or contacting customer support immediately.',
                      category: 'Orders & Changes',
                      isActive: true,
                    };
                    setFaqData({
                      ...faqData,
                      faqList: [...(faqData.faqList || []), newFaq],
                    });
                    showToast('New FAQ question added!');
                  }}
                >
                  <Plus size={16} />
                  <span>Add FAQ Item</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {faqData.faqList?.map((faq, idx) => (
                  <div key={faq.id} className="glass-card" style={{ padding: '22px', border: faq.isActive ? '1.5px solid #E2E8F0' : '1.5px dashed #CBD5E1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#CC0D39', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px' }}>
                          {faq.category || 'General'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = faqData.faqList.map((f) => f.id === faq.id ? { ...f, isActive: !f.isActive } : f);
                            setFaqData({ ...faqData, faqList: updated });
                            showToast(`FAQ #${idx + 1} visibility toggled.`);
                          }}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: faq.isActive ? '#F0FDF4' : '#F1F5F9',
                            color: faq.isActive ? '#16A34A' : '#64748B',
                            border: '1px solid #E2E8F0',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {faq.isActive ? 'Active' : 'Disabled'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (faqData.faqList.length <= 1) {
                              alert('At least 1 FAQ item is required.');
                              return;
                            }
                            setFaqData({ ...faqData, faqList: faqData.faqList.filter((f) => f.id !== faq.id) });
                            showToast('FAQ item deleted.');
                          }}
                          style={{ padding: '4px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Question Title</label>
                        <input
                          type="text"
                          className="input-field"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = faqData.faqList.map((f) => f.id === faq.id ? { ...f, question: e.target.value } : f);
                            setFaqData({ ...faqData, faqList: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Category Tag</label>
                        <input
                          type="text"
                          className="input-field"
                          value={faq.category}
                          onChange={(e) => {
                            const updated = faqData.faqList.map((f) => f.id === faq.id ? { ...f, category: e.target.value } : f);
                            setFaqData({ ...faqData, faqList: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block' }}>Answer Content</label>
                        <textarea
                          rows={3}
                          className="input-field"
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = faqData.faqList.map((f) => f.id === faq.id ? { ...f, answer: e.target.value } : f);
                            setFaqData({ ...faqData, faqList: updated });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 11.2 FAQ Page Header */}
          {activeFaqTab === 'FaqHeader' && (
            <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                FAQ Page Banner & Search Bar Settings
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
                Configure search placeholder, top title, and sub-headings in <code>FaqPage.jsx</code>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Page Banner Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={faqData.bannerTitle}
                    onChange={(e) => setFaqData({ ...faqData, bannerTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Section Headline
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={faqData.sectionTitle}
                    onChange={(e) => setFaqData({ ...faqData, sectionTitle: e.target.value })}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Search Bar Placeholder
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={faqData.searchPlaceholder}
                    onChange={(e) => setFaqData({ ...faqData, searchPlaceholder: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebsiteManagementPage;
