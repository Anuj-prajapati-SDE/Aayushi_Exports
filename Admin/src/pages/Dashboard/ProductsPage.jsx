import React, { useState, useEffect, useMemo } from 'react';
import ImageUploadField from '../../components/ImageUploadField';
import { getCurrencySymbol } from '../../utils/currency';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Copy,
  SlidersHorizontal,
  Package,
  Check,
  X,
  AlertTriangle,
  Star,
  Grid,
  List,
  Image as ImageIcon,
  DollarSign,
  CheckCircle2,
  FolderPlus,
  Info,
  RefreshCw,
  MoreVertical,
  ExternalLink,
} from 'lucide-react';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/website`;

// Fallback initial categories
const fallbackCategories = [
  { id: 'cat-1', name: 'Brass Vases & Urns', slug: 'brass-vases', count: '28 items' },
  { id: 'cat-2', name: 'Decorative Lanterns', slug: 'decorative-lanterns', count: '34 items' },
  { id: 'cat-3', name: 'Handcrafted Brass Decor', slug: 'brass-decor', count: '42 items' },
  { id: 'cat-4', name: 'Pooja & Spiritual Artefacts', slug: 'pooja-artefacts', count: '39 items' },
  { id: 'cat-5', name: 'Tabletop Urli & Bowls', slug: 'urli-bowls', count: '22 items' },
  { id: 'cat-6', name: 'Antique Hanging Lamps', slug: 'hanging-lamps', count: '18 items' },
  { id: 'cat-7', name: 'Brass Animal Figurines', slug: 'animal-figurines', count: '25 items' },
  { id: 'cat-8', name: 'Wall Hanging Artefacts', slug: 'wall-artefacts', count: '15 items' },
];

const initialBrands = ['Ratan Brass', 'Ratan Crafts', 'Royal Moradabad', 'Heritage Metalware', 'Vedic Crafts'];

const availableSizesList = [
  'Small (9")',
  'Medium (12")',
  'Large (16")',
  'Extra Large (18")',
  'Set of 3',
  '14 Inch Dia',
  '18 Inch Tall',
  'Standard Single',
];

const availableColorsList = [
  { name: 'Antique Gold', hex: '#D4AF37' },
  { name: 'Polished Brass', hex: '#E5C158' },
  { name: 'Matte Black', hex: '#1C1917' },
  { name: 'Pearl White', hex: '#F8FAFC' },
  { name: 'Vintage Bronze', hex: '#78350F' },
  { name: 'Royal Copper', hex: '#B45309' },
  { name: 'Oxidized Silver', hex: '#94A3B8' },
];

const emptyProductTemplate = {
  name: '',
  title: '',
  sku: '',
  category: 'Brass Vases & Urns',
  brand: 'Ratan Brass',
  price: 120.0,
  salePrice: 79.0,
  prevPrice: '185.00',
  discount: '34% Off',
  stock: 25,
  status: 'In Stock',
  rating: 5.0,
  reviews: 0,
  image: 'assets/images/products/brass-cylinder-vase-1.jpg',
  gallery: [
    'assets/images/products/brass-cylinder-vase-1.jpg',
    'assets/images/products/brass-flower-vase-set.jpg',
  ],
  sizes: ['Medium (12")', 'Large (16")'],
  colors: ['Antique Gold', 'Polished Brass'],
  material: '100% Solid Virgin Cast Brass',
  fabricType: '100% Solid Virgin Cast Brass',
  finish: 'Antique Brushed Gold',
  careInstructions: 'Wipe with soft dry cotton cloth; avoid chemical cleaners',
  occasion: 'Luxury Living Room, Console Decor & Grand Entryways',
  description: '',
  tags: ['Brass', 'Handicraft', 'Ratan Brass'],
  featured: true,
  isActive: true,
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(fallbackCategories);
  const [brands] = useState(initialBrands);
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Filters & Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [activeModalTab, setActiveModalTab] = useState('general'); // 'general' | 'pricing' | 'variants' | 'media'
  const [currentProduct, setCurrentProduct] = useState(emptyProductTemplate);

  // Quick View Modal
  const [viewProduct, setViewProduct] = useState(null);

  // Category Manager Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 1. Fetch Products from MongoDB Backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/products/all`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
          localStorage.setItem('pesco_products_cache', JSON.stringify(result.data));
        }
      }
    } catch (err) {
      console.warn('[ProductsPage] Fetch error, checking local cache:', err.message);
      const cached = localStorage.getItem('pesco_products_cache');
      if (cached) {
        try {
          setProducts(JSON.parse(cached));
        } catch (e) {}
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Categories from MongoDB Backend
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories/all`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const mapped = result.data.map((c, i) => ({
            id: c._id || `cat-${i}`,
            name: c.name,
            slug: c.slug || c.name.toLowerCase().replace(/\s+/g, '-'),
            count: c.count || '20 items',
          }));
          setCategories(mapped);
        }
      }
    } catch (err) {
      console.warn('[ProductsPage] Categories fetch note:', err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    const handleSync = () => {
      fetchProducts();
      fetchCategories();
      setCurrencySymbol(getCurrencySymbol());
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('pesco_website_updated', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('pesco_website_updated', handleSync);
    };
  }, []);

  const notifyChange = () => {
    window.dispatchEvent(new Event('pesco_website_updated'));
    window.dispatchEvent(new Event('storage'));
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.status === 'In Stock').length;
    const lowStock = products.filter((p) => p.status === 'Low Stock').length;
    const outOfStock = products.filter((p) => p.status === 'Out of Stock').length;
    const totalInventoryValue = products.reduce((acc, p) => {
      const pPrice = Number(p.salePrice || p.price || 0);
      const pStock = Number(p.stock || 0);
      return acc + pPrice * pStock;
    }, 0);
    return { total, inStock, lowStock, outOfStock, totalInventoryValue };
  }, [products]);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const pName = (p.name || p.title || '').toLowerCase();
        const pId = (p._id || p.id || '').toString().toLowerCase();
        const pSku = (p.sku || '').toLowerCase();
        const pBrand = (p.brand || '').toLowerCase();
        const pCat = (p.category || '').toLowerCase();
        const sTerm = searchTerm.toLowerCase();

        const matchesSearch =
          pName.includes(sTerm) ||
          pId.includes(sTerm) ||
          pSku.includes(sTerm) ||
          pBrand.includes(sTerm) ||
          pCat.includes(sTerm);

        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

        return matchesSearch && matchesCat && matchesStatus;
      })
      .sort((a, b) => {
        const aPrice = Number(a.salePrice || a.price || 0);
        const bPrice = Number(b.salePrice || b.price || 0);
        if (sortBy === 'price-low') return aPrice - bPrice;
        if (sortBy === 'price-high') return bPrice - aPrice;
        if (sortBy === 'stock-high') return Number(b.stock || 0) - Number(a.stock || 0);
        if (sortBy === 'stock-low') return Number(a.stock || 0) - Number(b.stock || 0);
        if (sortBy === 'rating-high') return Number(b.rating || 5) - Number(a.rating || 5);
        if (sortBy === 'name-az') return (a.name || a.title || '').localeCompare(b.name || b.title || '');
        return 0; // default newest
      });
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p._id || p.id || p.sku));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Actions: Delete
  const handleDelete = async (id) => {
    const target = products.find((p) => (p._id || p.id || p.sku) === id);
    if (window.confirm(`Are you sure you want to remove "${target?.name || target?.title || 'this product'}"?`)) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${target?._id || id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setProducts((prev) => prev.filter((p) => (p._id || p.id || p.sku) !== id));
          setSelectedIds((prev) => prev.filter((item) => item !== id));
          showToast(`Product removed from catalog.`);
          notifyChange();
        } else {
          showToast(`Error deleting product.`);
        }
      } catch (err) {
        setProducts((prev) => prev.filter((p) => (p._id || p.id || p.sku) !== id));
        showToast(`Product removed locally.`);
        notifyChange();
      }
    }
  };

  // Actions: Bulk Delete
  const handleBulkDelete = async () => {
    if (window.confirm(`Remove ${selectedIds.length} selected products?`)) {
      for (const id of selectedIds) {
        try {
          await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
        } catch (e) {}
      }
      setProducts((prev) => prev.filter((p) => !selectedIds.includes(p._id || p.id || p.sku)));
      setSelectedIds([]);
      showToast(`Removed ${selectedIds.length} products successfully.`);
      notifyChange();
    }
  };

  // Actions: Duplicate
  const handleDuplicate = async (prod) => {
    try {
      const duplicated = {
        ...prod,
        _id: undefined,
        id: undefined,
        sku: `${prod.sku || 'RB-PRD'}-${Math.floor(100 + Math.random() * 900)}`,
        name: `${prod.name || prod.title} (Copy)`,
        title: `${prod.name || prod.title} (Copy)`,
      };

      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicated),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setProducts((prev) => [result.data, ...prev]);
          showToast(`Duplicated as [${result.data.sku}].`);
          notifyChange();
          return;
        }
      }
    } catch (e) {}

    const localDup = {
      ...prod,
      id: `PRD-${Date.now().toString().slice(-4)}`,
      sku: `${prod.sku || 'RB-PRD'}-COPY`,
      name: `${prod.name || prod.title} (Copy)`,
      title: `${prod.name || prod.title} (Copy)`,
    };
    setProducts((prev) => [localDup, ...prev]);
    showToast(`Duplicated item.`);
    notifyChange();
  };

  const openCreateModal = () => {
    setModalMode('create');
    setActiveModalTab('general');
    const newSku = `RB-PRD-${100 + products.length + 1}`;
    setCurrentProduct({
      ...emptyProductTemplate,
      sku: newSku,
      category: categories[0]?.name || 'Brass Vases & Urns',
    });
    setIsProductModalOpen(true);
  };

  const openEditModal = (prod) => {
    setModalMode('edit');
    setActiveModalTab('general');
    setCurrentProduct({
      ...prod,
      name: prod.name || prod.title || '',
      title: prod.title || prod.name || '',
      gallery: Array.isArray(prod.gallery) && prod.gallery.length > 0 ? prod.gallery : [prod.image],
    });
    setIsProductModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!currentProduct.name?.trim() && !currentProduct.title?.trim()) {
      alert('Please enter a product name.');
      return;
    }

    setIsSaving(true);

    let derivedStatus = currentProduct.status || 'In Stock';
    const numStock = Number(currentProduct.stock || 0);
    if (numStock <= 0) {
      derivedStatus = 'Out of Stock';
    } else if (numStock <= 5 && derivedStatus === 'In Stock') {
      derivedStatus = 'Low Stock';
    }

    const regPrice = parseFloat(currentProduct.price) || 0;
    const salePr = parseFloat(currentProduct.salePrice) || regPrice;
    let calcDiscount = currentProduct.discount;
    if (!calcDiscount && regPrice > salePr && regPrice > 0) {
      const pct = Math.round(((regPrice - salePr) / regPrice) * 100);
      calcDiscount = `${pct}% Off`;
    }

    const cleanedProduct = {
      ...currentProduct,
      name: currentProduct.name || currentProduct.title,
      title: currentProduct.title || currentProduct.name,
      price: regPrice,
      salePrice: salePr,
      prevPrice: regPrice > salePr ? `$${regPrice.toFixed(2)}` : '',
      discount: calcDiscount || '',
      stock: numStock,
      status: derivedStatus,
      material: currentProduct.material || currentProduct.fabricType || '100% Solid Virgin Cast Brass',
      fabricType: currentProduct.material || currentProduct.fabricType || '100% Solid Virgin Cast Brass',
      finish: currentProduct.finish || 'Antique Brushed Gold',
    };

    try {
      if (modalMode === 'create') {
        const res = await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cleanedProduct),
        });
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            setProducts((prev) => [result.data, ...prev]);
            showToast(`Product published successfully.`);
            setIsProductModalOpen(false);
            notifyChange();
            return;
          }
        }
      } else {
        const targetId = cleanedProduct._id || cleanedProduct.id || cleanedProduct.sku;
        const res = await fetch(`${API_BASE_URL}/products/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cleanedProduct),
        });
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            setProducts((prev) =>
              prev.map((p) =>
                (p._id && p._id === result.data._id) || (p.sku && p.sku === result.data.sku)
                  ? result.data
                  : p
              )
            );
            showToast(`Product updated successfully.`);
            setIsProductModalOpen(false);
            notifyChange();
            return;
          }
        }
      }
    } catch (err) {
      console.warn('[ProductsPage] API Save fallback to local state:', err.message);
    } finally {
      setIsSaving(false);
    }

    // Local fallback update
    if (modalMode === 'create') {
      const localItem = {
        ...cleanedProduct,
        _id: `prod-${Date.now()}`,
        id: `PRD-${Date.now().toString().slice(-4)}`,
      };
      setProducts((prev) => [localItem, ...prev]);
      showToast(`Product saved.`);
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === cleanedProduct._id || p.id === cleanedProduct.id || p.sku === cleanedProduct.sku
            ? cleanedProduct
            : p
        )
      );
      showToast(`Product updated.`);
    }
    setIsProductModalOpen(false);
    notifyChange();
  };

  // Add Category handler
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const catPayload = {
      name: newCatName.trim(),
      count: '0 items',
      image: 'assets/images/products/brass-cylinder-vase-1.jpg',
      link: '/shops',
      isActive: true,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catPayload),
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setCategories((prev) => [
            ...prev,
            {
              id: result.data._id,
              name: result.data.name,
              slug: result.data.name.toLowerCase().replace(/\s+/g, '-'),
              count: '0 items',
            },
          ]);
          showToast(`Category "${newCatName}" added.`);
          setNewCatName('');
          setIsCategoryModalOpen(false);
          notifyChange();
          return;
        }
      }
    } catch (e) {}

    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      count: '0 items',
    };
    setCategories((prev) => [...prev, newCat]);
    setNewCatName('');
    setIsCategoryModalOpen(false);
    showToast(`Category "${newCat.name}" added.`);
    notifyChange();
  };

  const toggleSizeSelection = (size) => {
    setCurrentProduct((prev) => {
      const curSizes = prev.sizes || [];
      const exists = curSizes.includes(size);
      const updated = exists ? curSizes.filter((s) => s !== size) : [...curSizes, size];
      return { ...prev, sizes: updated };
    });
  };

  const toggleColorSelection = (colorName) => {
    setCurrentProduct((prev) => {
      const curColors = prev.colors || [];
      const exists = curColors.includes(colorName);
      const updated = exists ? curColors.filter((c) => c !== colorName) : [...curColors, colorName];
      return { ...prev, colors: updated };
    });
  };

  // Gallery image updater
  const updateGalleryImage = (index, val) => {
    setCurrentProduct((prev) => {
      const gal = [...(prev.gallery || [])];
      gal[index] = val;
      return { ...prev, gallery: gal };
    });
  };

  const addGalleryImageSlot = () => {
    setCurrentProduct((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), ''],
    }));
  };

  const removeGalleryImageSlot = (index) => {
    setCurrentProduct((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid #334155',
          }}
          className="animate-fade-in"
        >
          <CheckCircle2 size={16} color="#10B981" />
          <span style={{ fontSize: '13px', fontWeight: 500 }}>{toastMessage}</span>
        </div>
      )}

      {/* Header & Main Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Products
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0 0' }}>
            Manage catalog items, pricing, inventory, and storefront product details.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              fetchProducts();
              fetchCategories();
              showToast('Catalog refreshed from database.');
            }}
            title="Reload from MongoDB"
            style={{ fontSize: '13px', padding: '7px 12px' }}
          >
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => setIsCategoryModalOpen(true)}
            style={{ fontSize: '13px', padding: '7px 12px' }}
          >
            <FolderPlus size={14} />
            <span>Add Category</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={openCreateModal}
            style={{ fontSize: '13px', padding: '7px 14px' }}
          >
            <Plus size={14} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
        }}
      >
        <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Total Products</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{stats.total}</div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={18} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>In Stock</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#16A34A', marginTop: '2px' }}>{stats.inStock}</div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Low / Out of Stock</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: stats.lowStock + stats.outOfStock > 0 ? '#D97706' : '#64748B', marginTop: '2px' }}>
              {stats.lowStock + stats.outOfStock}
            </div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={18} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Inventory Value</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
              {currencySymbol}{stats.totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={18} />
          </div>
        </div>
      </div>

      {/* Filter & Toolbar Area */}
      <div
        className="glass-card"
        style={{
          padding: '12px 16px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Left Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '220px', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search products by title, SKU, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '13px', height: '36px' }}
            />
          </div>

          {/* Category Dropdown Filter */}
          <select
            className="input-field"
            style={{ width: 'auto', minWidth: '160px', fontSize: '13px', height: '36px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Status Dropdown Filter */}
          <select
            className="input-field"
            style={{ width: 'auto', minWidth: '130px', fontSize: '13px', height: '36px' }}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* Sort Dropdown */}
          <select
            className="input-field"
            style={{ width: 'auto', minWidth: '150px', fontSize: '13px', height: '36px' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Sort: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="stock-high">Stock: Highest</option>
            <option value="name-az">Name: A to Z</option>
          </select>
        </div>

        {/* Right Controls: View Switch & Bulk Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={handleBulkDelete}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                backgroundColor: '#FEF2F2',
                color: '#DC2626',
                border: '1px solid #FECACA',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Trash2 size={13} />
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}

          <div style={{ display: 'flex', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              style={{
                padding: '6px 10px',
                background: viewMode === 'table' ? '#0F172A' : '#FFFFFF',
                color: viewMode === 'table' ? '#FFFFFF' : '#64748B',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Table View"
            >
              <List size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 10px',
                background: viewMode === 'grid' ? '#0F172A' : '#FFFFFF',
                color: viewMode === 'grid' ? '#FFFFFF' : '#64748B',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Grid Cards View"
            >
              <Grid size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Products List / Table / Grid */}
      {loading ? (
        <div className="glass-card" style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
          <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 10px', display: 'block', color: '#0F172A' }} />
          <p style={{ fontSize: '13px', fontWeight: 500 }}>Loading catalog items...</p>
        </div>
      ) : viewMode === 'table' ? (
        /* Classic Clean Table View */
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ width: '40px', padding: '12px 16px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={filteredProducts.length > 0 && selectedIds.length === filteredProducts.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Product
                  </th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Category
                  </th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Price
                  </th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Inventory
                  </th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Status
                  </th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
                      <Package size={36} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.3 }} />
                      <p style={{ fontWeight: 500, fontSize: '14px', margin: 0 }}>No products found</p>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={openCreateModal}
                        style={{ marginTop: '12px', fontSize: '12px', padding: '6px 14px' }}
                      >
                        <Plus size={14} /> Add Product
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const pKey = p._id || p.id || p.sku;
                    const isSelected = selectedIds.includes(pKey);
                    const pName = p.name || p.title || 'Handcrafted Artefact';
                    const numPrice = Number(p.price || 0);
                    const numSalePrice = Number(p.salePrice || p.price || 0);
                    const isLow = Number(p.stock || 0) > 0 && Number(p.stock || 0) <= 5;
                    const isOut = Number(p.stock || 0) <= 0 || p.status === 'Out of Stock';

                    return (
                      <tr
                        key={pKey}
                        style={{
                          borderBottom: '1px solid #F1F5F9',
                          backgroundColor: isSelected ? '#F8FAFC' : 'transparent',
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        {/* Checkbox */}
                        <td style={{ textAlign: 'center', padding: '12px 16px' }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(pKey)}
                          />
                        </td>

                        {/* Product Column: Media + Title + SKU + Brand */}
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                background: '#F8FAFC',
                                border: '1px solid #E2E8F0',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <img
                                src={p.image}
                                alt={pName}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = '/assets/images/products/brass-cylinder-vase-1.jpg';
                                }}
                              />
                            </div>
                            <div style={{ maxWidth: '320px' }}>
                              <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px', lineHeight: '1.4' }}>
                                {pName}
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                <span>{p.sku || p.id}</span>
                                <span>•</span>
                                <span>{p.brand || 'Ratan Brass'}</span>
                                {p.featured && (
                                  <>
                                    <span>•</span>
                                    <span style={{ color: '#D97706', fontWeight: 600 }}>Featured</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td style={{ padding: '12px 16px' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 500,
                              color: '#334155',
                              backgroundColor: '#F1F5F9',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              border: '1px solid #E2E8F0',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {p.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>
                              {currencySymbol}{numSalePrice.toFixed(2)}
                            </span>
                            {numPrice > numSalePrice && (
                              <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through' }}>
                                {currencySymbol}{numPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Inventory with subtle status dot */}
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: isOut ? '#DC2626' : isLow ? '#D97706' : '#0F172A' }}>
                            <span
                              style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                backgroundColor: isOut ? '#EF4444' : isLow ? '#F59E0B' : '#10B981',
                              }}
                            />
                            <span>
                              {isOut ? 'Out of stock' : `${p.stock || 0} in stock`}
                            </span>
                          </div>
                        </td>

                        {/* Status badge */}
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: '12px',
                              backgroundColor: p.isActive !== false ? '#DCFCE7' : '#F1F5F9',
                              color: p.isActive !== false ? '#15803D' : '#64748B',
                            }}
                          >
                            {p.isActive !== false ? 'Active' : 'Draft'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => setViewProduct(p)}
                              style={{
                                padding: '6px',
                                borderRadius: '4px',
                                background: 'transparent',
                                color: '#64748B',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              title="Inspect Details"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDuplicate(p)}
                              style={{
                                padding: '6px',
                                borderRadius: '4px',
                                background: 'transparent',
                                color: '#64748B',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              title="Duplicate"
                            >
                              <Copy size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditModal(p)}
                              style={{
                                padding: '6px',
                                borderRadius: '4px',
                                background: 'transparent',
                                color: '#2563EB',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              title="Edit Product"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(pKey)}
                              style={{
                                padding: '6px',
                                borderRadius: '4px',
                                background: 'transparent',
                                color: '#DC2626',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Cards View */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredProducts.map((p) => {
            const pKey = p._id || p.id || p.sku;
            const pName = p.name || p.title || 'Handcrafted Artefact';
            const numPrice = Number(p.price || 0);
            const numSalePrice = Number(p.salePrice || p.price || 0);

            return (
              <div
                key={pKey}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '180px', background: '#F8FAFC', overflow: 'hidden' }}>
                  <img
                    src={p.image}
                    alt={pName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/assets/images/products/brass-cylinder-vase-1.jpg';
                    }}
                  />
                  <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#0F172A',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    {p.sku || p.id} • {p.brand || 'Ratan Brass'}
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', margin: 0, lineHeight: '1.4' }}>
                    {pName}
                  </h4>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                      {currencySymbol}{numSalePrice.toFixed(2)}
                    </span>
                    {numPrice > numSalePrice && (
                      <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through' }}>
                        {currencySymbol}{numPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      marginTop: '8px',
                      paddingTop: '8px',
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setViewProduct(p)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '5px', fontSize: '11px', justifyContent: 'center' }}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(p)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '5px', fontSize: '11px', justifyContent: 'center', color: '#2563EB' }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(pKey)}
                      style={{
                        padding: '5px 8px',
                        background: '#FEF2F2',
                        color: '#DC2626',
                        border: '1px solid #FECACA',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT PRODUCT MODAL (Classic Clean Modal)
          ========================================================================= */}
      {isProductModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          className="animate-fade-in"
        >
          <div
            className="glass-card"
            style={{
              width: '800px',
              maxWidth: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F8FAFC',
              }}
            >
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  {modalMode === 'create' ? 'Add New Product' : `Edit Product: ${currentProduct.name || currentProduct.title}`}
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Save changes directly to MongoDB database.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                style={{ padding: '4px', borderRadius: '4px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #E2E8F0',
                padding: '0 20px',
                backgroundColor: '#FFFFFF',
                gap: '8px',
                overflowX: 'auto',
              }}
            >
              {[
                { id: 'general', label: '1. General', icon: Info },
                { id: 'pricing', label: '2. Pricing & Stock', icon: DollarSign },
                { id: 'variants', label: '3. Variants & Specs', icon: SlidersHorizontal },
                { id: 'media', label: '4. Media & Gallery', icon: ImageIcon },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeModalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModalTab(tab.id)}
                    style={{
                      padding: '10px 12px',
                      fontSize: '12px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#0F172A' : '#64748B',
                      borderBottom: isActive ? '2px solid #0F172A' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <IconComponent size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* TAB 1: General Info */}
                {activeModalTab === 'general' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        Product Name / Title <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. Handcrafted Antique Brass Cylindrical Jali Pillar Vase"
                        value={currentProduct.name || currentProduct.title || ''}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            name: e.target.value,
                            title: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          SKU
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g. RB-VS-101"
                          value={currentProduct.sku || ''}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Brand
                        </label>
                        <select
                          className="input-field"
                          value={currentProduct.brand || 'Ratan Brass'}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                        >
                          {brands.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Category <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <select
                          className="input-field"
                          value={currentProduct.category}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Placement / Occasion
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g. Luxury Living Room, Mandir Decor"
                          value={currentProduct.occasion || ''}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, occasion: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        Description
                      </label>
                      <textarea
                        className="input-field"
                        rows={3}
                        placeholder="Write detailed product description..."
                        value={currentProduct.description || ''}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: Pricing & Stock */}
                {activeModalTab === 'pricing' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Regular Original Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="185.00"
                          value={currentProduct.price}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Sale Price ($) <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="120.00"
                          value={currentProduct.salePrice}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, salePrice: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Discount Badge Label
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g. 25% Off"
                          value={currentProduct.discount || ''}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, discount: e.target.value })}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Stock Quantity (Units)
                        </label>
                        <input
                          type="number"
                          className="input-field"
                          placeholder="25"
                          value={currentProduct.stock}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Inventory Status
                        </label>
                        <select
                          className="input-field"
                          value={currentProduct.status || 'In Stock'}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}
                        >
                          <option value="In Stock">In Stock</option>
                          <option value="Low Stock">Low Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 500 }}>
                          <input
                            type="checkbox"
                            checked={currentProduct.featured !== false}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, featured: e.target.checked })}
                          />
                          <span>Feature on Homepage</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 500 }}>
                          <input
                            type="checkbox"
                            checked={currentProduct.isActive !== false}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, isActive: e.target.checked })}
                          />
                          <span>Published (Active on Storefront)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Variants & Specs */}
                {activeModalTab === 'variants' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Available Sizes / Dimensions
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {availableSizesList.map((sz) => {
                          const isSelected = (currentProduct.sizes || []).includes(sz);
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => toggleSizeSelection(sz)}
                              style={{
                                padding: '5px 10px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 500,
                                border: isSelected ? '1px solid #0F172A' : '1px solid #E2E8F0',
                                backgroundColor: isSelected ? '#0F172A' : '#FFFFFF',
                                color: isSelected ? '#FFFFFF' : '#475569',
                                cursor: 'pointer',
                              }}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                        Available Finishes
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {availableColorsList.map((col) => {
                          const isSelected = (currentProduct.colors || []).includes(col.name);
                          return (
                            <button
                              key={col.name}
                              type="button"
                              onClick={() => toggleColorSelection(col.name)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '5px 10px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 500,
                                border: isSelected ? '1px solid #0F172A' : '1px solid #E2E8F0',
                                backgroundColor: isSelected ? '#0F172A' : '#FFFFFF',
                                color: isSelected ? '#FFFFFF' : '#475569',
                                cursor: 'pointer',
                              }}
                            >
                              <span
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  backgroundColor: col.hex,
                                  border: '1px solid rgba(0,0,0,0.1)',
                                }}
                              />
                              <span>{col.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Material & Metal Purity
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g. 100% Solid Virgin Cast Brass"
                          value={currentProduct.material || currentProduct.fabricType || ''}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              material: e.target.value,
                              fabricType: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Finish Type
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g. Antique Brushed Gold"
                          value={currentProduct.finish || ''}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, finish: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        Care Instructions
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. Wipe with soft dry cotton cloth"
                        value={currentProduct.careInstructions || ''}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, careInstructions: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* TAB 4: Media & Images */}
                {activeModalTab === 'media' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
                    <ImageUploadField
                      label="Primary Product Image"
                      folder="products"
                      value={currentProduct.image}
                      onChange={(val) => {
                        const gal = currentProduct.gallery && currentProduct.gallery.length > 0 ? [...currentProduct.gallery] : [];
                        if (gal.length > 0) gal[0] = val;
                        else gal.push(val);
                        setCurrentProduct({ ...currentProduct, image: val, gallery: gal });
                      }}
                      placeholder="assets/images/products/... or upload image"
                      required
                      previewHeight={110}
                    />

                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                          Detail Page Gallery Thumbnails
                        </label>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={addGalleryImageSlot}
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                        >
                          <Plus size={12} /> Add Slot
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(currentProduct.gallery || []).map((imgUrl, gIdx) => (
                          <div
                            key={gIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              background: '#F8FAFC',
                              padding: '8px',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <ImageUploadField
                                label={`Gallery Image #${gIdx + 1}`}
                                folder="products"
                                value={imgUrl}
                                onChange={(val) => updateGalleryImage(gIdx, val)}
                                placeholder="assets/images/products/..."
                                previewHeight={80}
                              />
                            </div>
                            {currentProduct.gallery.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeGalleryImageSlot(gIdx)}
                                style={{
                                  padding: '6px',
                                  color: '#DC2626',
                                  background: '#FEF2F2',
                                  border: '1px solid #FECACA',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  marginTop: '24px',
                                }}
                                title="Remove"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  padding: '12px 20px',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{ fontSize: '12px', padding: '6px 14px' }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-primary" disabled={isSaving} style={{ fontSize: '12px', padding: '6px 16px' }}>
                  {isSaving ? <RefreshCw size={13} className="animate-spin" /> : <Check size={14} />}
                  <span>{isSaving ? 'Saving...' : modalMode === 'create' ? 'Publish Product' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          QUICK VIEW MODAL
          ========================================================================= */}
      {viewProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          className="animate-fade-in"
        >
          <div
            className="glass-card"
            style={{
              width: '680px',
              maxWidth: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F8FAFC',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155', background: '#E2E8F0', padding: '2px 8px', borderRadius: '4px' }}>
                  {viewProduct.category}
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  SKU: {viewProduct.sku || viewProduct.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewProduct(null)}
                style={{ padding: '4px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '18px' }}>
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <img
                    src={viewProduct.image}
                    alt={viewProduct.name || viewProduct.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/assets/images/products/brass-cylinder-vase-1.jpg';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    {viewProduct.name || viewProduct.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
                      {currencySymbol}{Number(viewProduct.salePrice || viewProduct.price || 0).toFixed(2)}
                    </span>
                    {Number(viewProduct.price) > Number(viewProduct.salePrice) && (
                      <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through' }}>
                        {currencySymbol}{Number(viewProduct.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                    {viewProduct.description || 'No description provided.'}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '12px', color: '#475569', marginTop: '6px' }}>
                    <div><strong>Brand:</strong> {viewProduct.brand || 'Ratan Brass'}</div>
                    <div><strong>Inventory:</strong> {viewProduct.stock} units</div>
                    <div><strong>Material:</strong> {viewProduct.material || 'Solid Brass'}</div>
                    <div><strong>Finish:</strong> {viewProduct.finish || 'Antique Gold'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'flex-end',
                backgroundColor: '#F8FAFC',
              }}
            >
              <button type="button" className="btn-secondary" onClick={() => setViewProduct(null)} style={{ fontSize: '12px', padding: '6px 14px' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD CATEGORY MODAL
          ========================================================================= */}
      {isCategoryModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          className="animate-fade-in"
        >
          <div
            className="glass-card"
            style={{
              width: '400px',
              maxWidth: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '14px 18px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F8FAFC',
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Add Product Category
              </h3>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                style={{ padding: '4px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Category Name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Brass Tabletop Bowls"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsCategoryModalOpen(false)}
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '12px', padding: '6px 14px' }}>
                  <Plus size={13} /> Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
