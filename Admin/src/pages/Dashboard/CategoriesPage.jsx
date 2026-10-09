import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Folder,
  Image as ImageIcon,
  Grid,
  List,
} from 'lucide-react';
import ImageUploadField from '../../components/ImageUploadField';

const API_BASE_URL = 'http://localhost:5000/api/website/categories';

/**
 * Resolves static or uploaded image URLs
 */
const resolveImageUrl = (url) => {
  if (!url || typeof url !== 'string' || url.trim() === '') return '';
  const clean = url.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:')) {
    return clean;
  }
  if (clean.startsWith('/uploads/') || clean.startsWith('uploads/')) {
    const path = clean.startsWith('/') ? clean : `/${clean}`;
    return `http://localhost:5000${path}`;
  }
  if (clean.startsWith('/assets/') || clean.startsWith('assets/')) {
    const path = clean.startsWith('/') ? clean : `/${clean}`;
    return `http://localhost:5173${path}`;
  }
  if (clean.startsWith('/')) {
    return clean;
  }
  return `/${clean}`;
};

const initialFallbackCategories = [
  {
    _id: 'cat-1',
    name: 'Brass Vases & Urns',
    count: '28 items',
    image: 'assets/images/products/brass-cylinder-vase-1.jpg',
    status: 'Active',
    isActive: true,
    description: 'Artisan handcrafted solid brass cylindrical jaali vases and urns.',
  },
  {
    _id: 'cat-2',
    name: 'Decorative Lanterns',
    count: '34 items',
    image: 'assets/images/products/white-moroccan-lanterns.jpg',
    status: 'Active',
    isActive: true,
    description: 'Vintage Moroccan glass & metal fairy lanterns.',
  },
  {
    _id: 'cat-3',
    name: 'Brass Flower Vases',
    count: '42 items',
    image: 'assets/images/products/brass-flower-vase-set.jpg',
    status: 'Active',
    isActive: true,
    description: 'Royal embossed brass flower vase sets.',
  },
  {
    _id: 'cat-4',
    name: 'Tabletop Urli & Bowls',
    count: '22 items',
    image: 'assets/images/products/brass-urli-bowl.jpg',
    status: 'Active',
    isActive: true,
    description: 'Traditional brass urli bowls for floating flower petals.',
  },
  {
    _id: 'cat-5',
    name: 'Pooja & Spiritual Artefacts',
    count: '18 items',
    image: 'assets/images/products/brass-peacock-diya.jpg',
    status: 'Active',
    isActive: true,
    description: 'Hand-carved temple oil lamps and spiritual artefacts.',
  },
  {
    _id: 'cat-6',
    name: 'Vintage Black Lanterns',
    count: '39 items',
    image: 'assets/images/products/black-moroccan-lanterns.jpg',
    status: 'Active',
    isActive: true,
    description: 'Matte midnight black Moroccan filigree lanterns.',
  },
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCount, setFormCount] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formStatus, setFormStatus] = useState('Active');

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch Categories from Backend API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/all`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
          localStorage.setItem('pesco_admin_categories', JSON.stringify(data.data));
          setLoading(false);
          return;
        }
      }
      throw new Error('Could not fetch categories');
    } catch (err) {
      console.warn('[CategoriesPage] Fallback to cached data:', err.message);
      const cached = localStorage.getItem('pesco_admin_categories');
      if (cached) {
        try {
          setCategories(JSON.parse(cached));
        } catch (e) {
          setCategories(initialFallbackCategories);
        }
      } else {
        setCategories(initialFallbackCategories);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormName('');
    setFormDescription('');
    setFormCount('0 items');
    setFormImage('assets/images/products/brass-cylinder-vase-1.jpg');
    setFormStatus('Active');
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormName(cat.name || '');
    setFormDescription(cat.description || '');
    setFormCount(cat.count || '0 items');
    setFormImage(cat.image || '');
    setFormStatus(cat.status || (cat.isActive !== false ? 'Active' : 'Hidden'));
    setIsModalOpen(true);
  };

  // Toggle Visibility
  const handleToggleStatus = async (cat) => {
    const newStatus = cat.status === 'Active' || cat.isActive ? 'Hidden' : 'Active';
    const isAct = newStatus === 'Active';

    try {
      if (cat._id && !cat._id.startsWith('cat-')) {
        await fetch(`${API_BASE_URL}/${cat._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus, isActive: isAct }),
        });
      }

      setCategories((prev) =>
        prev.map((c) =>
          c._id === cat._id ? { ...c, status: newStatus, isActive: isAct } : c
        )
      );

      showToast(`Category "${cat.name}" is now ${newStatus}`);
      window.dispatchEvent(new Event('pesco_website_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  // Delete Category
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      if (id && !id.startsWith('cat-')) {
        await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
        });
      }

      setCategories((prev) => prev.filter((c) => c._id !== id));
      showToast(`Deleted category "${name}"`);

      window.dispatchEvent(new Event('pesco_website_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      showToast('Error deleting category', 'error');
    }
  };

  // Save Category
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('Category name is required', 'error');
      return;
    }

    setIsSaving(true);
    const silentSlug = formName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    const payload = {
      name: formName.trim(),
      slug: silentSlug,
      description: formDescription.trim(),
      count: formCount.trim() || '0 items',
      image: formImage.trim() || 'assets/images/products/brass-cylinder-vase-1.jpg',
      status: formStatus,
      isActive: formStatus === 'Active',
      link: '/shops',
    };

    try {
      if (editingCategory && editingCategory._id && !editingCategory._id.startsWith('cat-')) {
        const res = await fetch(`${API_BASE_URL}/${editingCategory._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success && result.data) {
          setCategories((prev) =>
            prev.map((c) => (c._id === editingCategory._id ? result.data : c))
          );
          showToast(`Updated "${formName.trim()}"`);
        }
      } else {
        const res = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success && result.data) {
          setCategories((prev) => [result.data, ...prev]);
          showToast(`Created "${formName.trim()}"`);
        } else {
          const newLocal = {
            _id: `cat-${Date.now()}`,
            ...payload,
          };
          setCategories((prev) => [newLocal, ...prev]);
          showToast(`Created "${formName.trim()}"`);
        }
      }

      setIsModalOpen(false);
      window.dispatchEvent(new Event('pesco_website_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      showToast('Error saving category', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Filter categories
  const filteredCategories = categories.filter((cat) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = cat.name && cat.name.toLowerCase().includes(q);
    const currentStatus = cat.status || (cat.isActive !== false ? 'Active' : 'Hidden');
    const matchesStatus = statusFilter === 'All' || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 99999,
            backgroundColor: toast.type === 'error' ? '#EF4444' : '#0F172A',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          {toast.type === 'error' ? (
            <AlertCircle size={16} color="#FFFFFF" />
          ) : (
            <CheckCircle2 size={16} color="#22C55E" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#0F172A',
              fontFamily: "'Outfit', sans-serif",
              margin: 0,
            }}
          >
            Categories
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '3px', margin: 0 }}>
            Manage catalog categories and storefront navigation ({categories.length} total)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={fetchCategories}
            title="Refresh list"
            style={{ padding: '8px 12px', fontSize: '13px' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={openCreateModal}
            style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Search, Status Filter & View Mode */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 240px', maxWidth: '380px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94A3B8',
              }}
            />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '36px',
                paddingLeft: '32px',
                paddingRight: '12px',
                fontSize: '13px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              height: '36px',
              padding: '0 12px',
              fontSize: '13px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Hidden">Hidden</option>
            <option value="Archived">Archived</option>
          </select>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              style={{
                padding: '6px 10px',
                backgroundColor: viewMode === 'table' ? '#0F172A' : '#FFFFFF',
                color: viewMode === 'table' ? '#FFFFFF' : '#64748B',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Table View"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 10px',
                backgroundColor: viewMode === 'grid' ? '#0F172A' : '#FFFFFF',
                color: viewMode === 'grid' ? '#FFFFFF' : '#64748B',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
          <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 8px' }} />
          <p style={{ fontSize: '13px', margin: 0 }}>Loading categories...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
            padding: '48px 20px',
            color: '#64748B',
          }}
        >
          <Folder size={36} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '4px' }}>
            No categories found
          </h3>
          <p style={{ fontSize: '13px', margin: '0 0 16px' }}>
            {searchQuery ? `No results for "${searchQuery}"` : 'Create your first product category.'}
          </p>
          <button type="button" className="btn-primary" onClick={openCreateModal} style={{ fontSize: '13px' }}>
            <Plus size={15} />
            <span>Add Category</span>
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* Classic Clean Table View */
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600, width: '60px' }}>Image</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Category Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Count</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, width: '100px' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, width: '120px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat) => {
                  const imgUrl = resolveImageUrl(cat.image);
                  const isAct = cat.status === 'Active' || (cat.isActive !== false && cat.status !== 'Hidden');

                  return (
                    <tr
                      key={cat._id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Image Thumbnail */}
                      <td style={{ padding: '10px 16px' }}>
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '6px',
                            backgroundColor: '#F1F5F9',
                            border: '1px solid #E2E8F0',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={cat.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <ImageIcon size={18} color="#94A3B8" />
                          )}
                        </div>
                      </td>

                      {/* Name & Description */}
                      <td style={{ padding: '10px 16px' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A' }}>{cat.name}</div>
                        {cat.description && (
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#64748B',
                              maxWidth: '360px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {cat.description}
                          </div>
                        )}
                      </td>

                      {/* Item Count */}
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: 500 }}>
                        {cat.count || '0 items'}
                      </td>

                      {/* Status Badge */}
                      <td style={{ padding: '10px 16px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor: isAct ? '#DCFCE7' : '#F1F5F9',
                            color: isAct ? '#16A34A' : '#64748B',
                          }}
                        >
                          {cat.status || (isAct ? 'Active' : 'Hidden')}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(cat)}
                            style={{
                              padding: '5px',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              border: '1px solid #E2E8F0',
                              color: isAct ? '#D97706' : '#16A34A',
                              cursor: 'pointer',
                            }}
                            title={isAct ? 'Hide' : 'Show'}
                          >
                            {isAct ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(cat)}
                            style={{
                              padding: '5px',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              border: '1px solid #E2E8F0',
                              color: '#334155',
                              cursor: 'pointer',
                            }}
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(cat._id, cat.name)}
                            style={{
                              padding: '5px',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              border: '1px solid #E2E8F0',
                              color: '#DC2626',
                              cursor: 'pointer',
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Classic Clean Grid View */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredCategories.map((cat) => {
            const imgUrl = resolveImageUrl(cat.image);
            const isAct = cat.status === 'Active' || (cat.isActive !== false && cat.status !== 'Hidden');

            return (
              <div
                key={cat._id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      overflow: 'hidden',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={cat.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <ImageIcon size={20} color="#94A3B8" />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: '#0F172A',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {cat.name}
                    </div>
                  </div>
                </div>

                {cat.description && (
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#64748B',
                      margin: 0,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {cat.description}
                  </p>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '10px',
                    borderTop: '1px solid #F1F5F9',
                  }}
                >
                  <span
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: isAct ? '#DCFCE7' : '#F1F5F9',
                      color: isAct ? '#16A34A' : '#64748B',
                    }}
                  >
                    {cat.count || '0 items'}
                  </span>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(cat)}
                      style={{
                        padding: '5px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        color: isAct ? '#D97706' : '#16A34A',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      {isAct ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(cat)}
                      style={{
                        padding: '5px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        color: '#334155',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat._id, cat.name)}
                      style={{
                        padding: '5px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        color: '#DC2626',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Classic Simple Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '16px',
          }}
        >
          <div
            style={{
              width: '480px',
              maxWidth: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
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
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Category Name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Brass Vases & Urns"
                  className="input-field"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  style={{ height: '36px', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Item Count Display
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 28 items"
                    className="input-field"
                    value={formCount}
                    onChange={(e) => setFormCount(e.target.value)}
                    style={{ height: '36px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Status
                  </label>
                  <select
                    className="input-field"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    style={{ height: '36px', fontSize: '13px' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Hidden">Hidden</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <ImageUploadField
                  label="Category Image"
                  value={formImage}
                  onChange={(url) => setFormImage(url)}
                  folder="categories"
                  placeholder="Select image file or paste asset path"
                  helpText="Supports PNG, JPG, WEBP"
                  previewHeight={56}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description for category..."
                  className="input-field"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  style={{ fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '8px',
                  paddingTop: '14px',
                  borderTop: '1px solid #E2E8F0',
                }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  style={{ padding: '8px 14px', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSaving}
                  style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                  <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
