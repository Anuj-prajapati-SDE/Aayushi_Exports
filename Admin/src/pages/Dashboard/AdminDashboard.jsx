import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  RefreshCw,
  Download,
  ArrowRight,
  Package,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardStatsApi } from '../../services/api';
import { getCurrencySymbol } from '../../utils/currency';

const BACKEND_URL = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || 'http://localhost:5000';

/**
 * Resolves static, frontend, or backend uploaded image URLs
 */
const resolveImageUrl = (url) => {
  if (!url || typeof url !== 'string' || url.trim() === '') return '/assets/images/products/brass-cylinder-vase-1.jpg';
  const clean = url.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:')) {
    return clean;
  }
  if (clean.startsWith('/uploads/') || clean.startsWith('uploads/')) {
    const path = clean.startsWith('/') ? clean : `/${clean}`;
    return `${BACKEND_URL}${path}`;
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

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [categoryDist, setCategoryDist] = useState([]);
  const [storeName, setStoreName] = useState(() => {
    try {
      const cached = localStorage.getItem('pesco_store_settings');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.storeName) return parsed.storeName;
      }
    } catch (e) {}
    return import.meta.env.VITE_APP_NAME || 'Pesco Handicrafts';
  });

  const [stats, setStats] = useState({
    revenue: { total: 0, monthlyGrowth: 0 },
    orders: { total: 0, pending: 0, growth: 0 },
    customers: { total: 0, growth: 0 },
    products: { total: 0, lowStock: 0 },
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch Auth Stats (baseline metrics from backend)
      let authStats = null;
      try {
        const statsData = await getDashboardStatsApi();
        if (statsData?.stats) {
          authStats = statsData.stats;
        }
      } catch (err) {
        console.warn('[Stats API]:', err.message);
      }

      // 2. Fetch Live Orders from MongoDB
      let liveOrders = [];
      try {
        const ordersRes = await fetch(`${BACKEND_URL}/api/website/orders`);
        if (ordersRes.ok) {
          const ordResult = await ordersRes.json();
          if (ordResult.success && Array.isArray(ordResult.data)) {
            liveOrders = ordResult.data;
          }
        }
      } catch (err) {
        console.warn('[Dashboard Orders note]:', err.message);
      }

      // 3. Fetch Live Catalog Products from MongoDB
      let liveProducts = [];
      try {
        const prodRes = await fetch(`${BACKEND_URL}/api/website/products/all`);
        if (prodRes.ok) {
          const prodResult = await prodRes.json();
          if (prodResult.success && Array.isArray(prodResult.data)) {
            liveProducts = prodResult.data;
          }
        }
      } catch (err) {
        console.warn('[Dashboard Products note]:', err.message);
      }

      // Format and set Live Recent Orders (sorted newest first)
      const sortedOrders = [...liveOrders].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || 0).getTime();
        const dateB = new Date(b.createdAt || b.date || 0).getTime();
        return dateB - dateA;
      });

      const mappedOrders = sortedOrders.slice(0, 8).map((ord) => {
        const shipAddr = ord.shippingAddress || {};
        const itemsArr = Array.isArray(ord.items) ? ord.items : [];
        const mainItemName = itemsArr[0]?.title || itemsArr[0]?.name || ord.product || 'Handcrafted Artefact';
        const itemsCount = itemsArr.length > 0
          ? itemsArr.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
          : (Number(ord.items) || 1);
        const totalVal = Number(ord.pricing?.totalAmount ?? ord.total ?? 0);

        return {
          id: ord.id || (ord._id ? `ORD-${ord._id.slice(-5).toUpperCase()}` : 'ORD-1001'),
          customer: {
            name: ord.customer || shipAddr.fullName || 'Customer',
            email: ord.email || shipAddr.email || 'N/A',
            avatar: ord.customer?.avatar || ord.avatar || '',
          },
          product: mainItemName + (itemsArr.length > 1 ? ` (+${itemsArr.length - 1} more)` : ''),
          items: itemsCount,
          date: ord.date || (ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'),
          total: totalVal,
          payment: ord.paymentStatus || (ord.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid'),
          status: ord.status || 'Processing',
        };
      });
      setRecentOrders(mappedOrders);

      // Compute Live Top Performing Products strictly from real order data
      const salesMap = {};
      liveOrders.forEach((ord) => {
        const items = Array.isArray(ord.items) ? ord.items : [];
        items.forEach((item) => {
          const key = String(item.id || item.productId || item.sku || item.title || item.name || '').trim();
          if (!key) return;
          if (!salesMap[key]) {
            salesMap[key] = {
              key,
              name: item.title || item.name || 'Handcrafted Item',
              category: item.category || '',
              price: Number(item.price || item.salePrice || 0),
              quantity: 0,
              revenue: 0,
              image: item.image || '',
            };
          }
          const qty = Number(item.quantity) || 1;
          const rate = Number(item.price || item.salePrice || salesMap[key].price || 0);
          salesMap[key].quantity += qty;
          salesMap[key].revenue += rate * qty;
          if (item.image && !salesMap[key].image) salesMap[key].image = item.image;
          if (item.category && !salesMap[key].category) salesMap[key].category = item.category;
        });
      });

      const salesItems = Object.values(salesMap);
      if (salesItems.length > 0) {
        // Sort by revenue descending, then units sold descending
        salesItems.sort((a, b) => b.revenue - a.revenue || b.quantity - a.quantity);
        const mappedTop = salesItems.slice(0, 4).map((item) => {
          const matchedProd = liveProducts.find(
            (p) => String(p._id) === item.key || String(p.sku) === item.key || p.name === item.name || p.title === item.name
          );
          return {
            name: item.name,
            category: item.category || matchedProd?.category || 'Handcrafted Artefacts',
            price: item.price || matchedProd?.salePrice || matchedProd?.price || 0,
            sales: `${item.quantity} sold`,
            revenue: item.revenue,
            stock: matchedProd?.stock !== undefined ? matchedProd.stock : null,
            image: resolveImageUrl(item.image || matchedProd?.image),
          };
        });
        setTopSellingProducts(mappedTop);
      } else {
        // No orders/sales recorded yet
        setTopSellingProducts([]);
      }

      // Compute Live Category Share dynamically from active catalog products
      if (liveProducts.length > 0) {
        const catMap = {};
        liveProducts.forEach((p) => {
          const c = p.category || 'Handcrafted Artefacts';
          catMap[c] = (catMap[c] || 0) + 1;
        });
        const totalP = liveProducts.length;
        const colorPalette = ['#CC0D39', '#F7941F', '#13172B', '#059669', '#6366F1', '#D97706'];
        const dynamicDist = Object.entries(catMap)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count], i) => ({
            name,
            count,
            pct: Math.round((count / totalP) * 100),
            color: colorPalette[i % colorPalette.length],
          }))
          .slice(0, 4);

        setCategoryDist(dynamicDist);
      } else {
        setCategoryDist([]);
      }

      // Calculate Real Consolidated KPI Metrics strictly from database
      const realOrderCount = liveOrders.length;
      const realRevenueTotal = liveOrders.reduce(
        (acc, o) => acc + Number(o.pricing?.totalAmount ?? o.total ?? 0),
        0
      );
      const pendingOrdersCount = liveOrders.filter(
        (o) => o.status === 'Processing' || o.paymentStatus === 'Pending'
      ).length;
      const totalCatalogProducts = liveProducts.length;
      const lowStockProductsCount = liveProducts.filter(
        (p) => p.status === 'Low Stock' || Number(p.stock || 0) <= 10
      ).length;
      const uniqueBuyers = new Set(
        liveOrders.map((o) => o.email || o.shippingAddress?.email).filter(Boolean)
      ).size;
      const registeredCustomers = authStats?.customers?.total || 0;
      const displayCustomers = Math.max(uniqueBuyers, registeredCustomers);

      setStats({
        revenue: {
          total: realRevenueTotal,
          monthlyGrowth: authStats?.revenue?.monthlyGrowth || 0,
        },
        orders: {
          total: realOrderCount,
          pending: pendingOrdersCount,
          growth: authStats?.orders?.growth || 0,
        },
        customers: {
          total: displayCustomers,
          growth: authStats?.customers?.growth || 0,
        },
        products: {
          total: totalCatalogProducts,
          lowStock: lowStockProductsCount,
        },
      });
    } catch (err) {
      console.warn('[Dashboard Fetch Sync]:', err.message);
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const handleSync = () => {
      fetchDashboardData();
      setCurrencySymbol(getCurrencySymbol());
      try {
        const cached = localStorage.getItem('pesco_store_settings');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.storeName) setStoreName(parsed.storeName);
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('pesco_website_updated', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('pesco_website_updated', handleSync);
    };
  }, []);

  const handleExportCSV = () => {
    if (!recentOrders || recentOrders.length === 0) {
      alert('No orders available to export yet.');
      return;
    }
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Product', 'Quantity', 'Date', 'Total', 'Payment', 'Status'];
    const rows = recentOrders.map((ord) => [
      ord.id,
      ord.customer?.name || 'Customer',
      ord.customer?.email || 'N/A',
      `"${(ord.product || '').replace(/"/g, '""')}"`,
      ord.items,
      ord.date,
      typeof ord.total === 'number' ? `${currencySymbol}${ord.total.toFixed(2)}` : ord.total,
      ord.payment,
      ord.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '12px',
              backgroundColor: '#DCFCE7',
              color: '#15803D',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <CheckCircle2 size={12} /> Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '12px',
              backgroundColor: '#E0F2FE',
              color: '#0369A1',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Truck size={12} /> Shipped
          </span>
        );
      case 'Processing':
        return (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '12px',
              backgroundColor: '#FEEB9D',
              color: '#13172B',
              border: '1px solid #F7941F',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Clock size={12} color="#13172B" /> Processing
          </span>
        );
      case 'Cancelled':
        return (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '12px',
              backgroundColor: '#FFF1F3',
              color: '#CC0D39',
              border: '1px solid #FFE4E8',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <XCircle size={12} /> Cancelled
          </span>
        );
      default:
        return (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '12px',
              backgroundColor: '#FAF8F5',
              color: '#5E626F',
              border: '1px solid #EDE8E3',
            }}
          >
            {status}
          </span>
        );
    }
  };

  const getPaymentBadge = (payment) => {
    if (payment === 'Paid') {
      return (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            padding: '2px 7px',
            borderRadius: '4px',
            backgroundColor: '#F0FDF4',
            color: '#16A34A',
            border: '1px solid #BBF7D0',
          }}
        >
          PAID
        </span>
      );
    }
    return (
      <span
        style={{
          fontSize: '11px',
          fontWeight: 700,
          padding: '2px 7px',
          borderRadius: '4px',
          backgroundColor: '#FEEB9D',
          color: '#13172B',
          border: '1px solid #F7941F',
        }}
      >
        PENDING
      </span>
    );
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '20px 24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #EDE8E3',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#13172B',
                backgroundColor: '#FEEB9D',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid #E5C365',
                letterSpacing: '0.3px',
              }}
            >
              Administrator
            </span>
            <span style={{ fontSize: '12px', color: '#5E626F' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#13172B',
              margin: 0,
            }}
          >
            Dashboard Overview
          </h1>
          <p style={{ fontSize: '13px', color: '#5E626F', margin: '3px 0 0 0' }}>
            Live performance, transactions, and store operations for {storeName}.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={fetchDashboardData}
            title="Refresh Live Data"
            style={{ fontSize: '13px', padding: '7px 12px' }}
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Sync Data</span>
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/orders')}
            style={{ fontSize: '13px', padding: '7px 12px' }}
          >
            <ShoppingCart size={14} />
            <span>Orders</span>
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/products')}
            style={{ fontSize: '13px', padding: '7px 14px' }}
          >
            <Plus size={14} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="dashboard-kpi-grid">
        {/* Stat 1: Revenue */}
        <div className="glass-card" style={{ padding: '16px 20px', border: '1px solid #EDE8E3', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#5E626F', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Revenue
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#FEEB9D',
                color: '#13172B',
                border: '1px solid #E5C365',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#13172B' }}>
            {currencySymbol}{stats.revenue.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px' }}>
            {stats.revenue.monthlyGrowth > 0 ? (
              <span style={{ color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <ArrowUpRight size={13} /> +{stats.revenue.monthlyGrowth}%
              </span>
            ) : (
              <span style={{ color: '#059669', fontWeight: 600 }}>Live store revenue</span>
            )}
            <span style={{ color: '#AEB0B6' }}>• Real-time</span>
          </div>
        </div>

        {/* Stat 2: Total Orders */}
        <div className="glass-card" style={{ padding: '16px 20px', border: '1px solid #EDE8E3', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#5E626F', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Orders
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#FFF1F2',
                color: '#CC0D39',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingCart size={18} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#13172B' }}>
            {stats.orders.total.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px' }}>
            {stats.orders.growth > 0 ? (
              <span style={{ color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <ArrowUpRight size={13} /> +{stats.orders.growth}%
              </span>
            ) : (
              <span style={{ color: '#5E626F', fontWeight: 500 }}>{stats.orders.total} placed</span>
            )}
            <span style={{ color: '#AEB0B6' }}>• {stats.orders.pending} pending</span>
          </div>
        </div>

        {/* Stat 3: Total Customers */}
        <div className="glass-card" style={{ padding: '16px 20px', border: '1px solid #EDE8E3', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#5E626F', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Customers
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#F4F5F7',
                color: '#13172B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#13172B' }}>
            {stats.customers.total.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px' }}>
            {stats.customers.growth > 0 ? (
              <span style={{ color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <ArrowUpRight size={13} /> +{stats.customers.growth}%
              </span>
            ) : (
              <span style={{ color: '#5E626F', fontWeight: 500 }}>Live buyer count</span>
            )}
            <span style={{ color: '#AEB0B6' }}>registered buyers</span>
          </div>
        </div>

        {/* Stat 4: Inventory / Low Stock */}
        <div
          className="glass-card"
          style={{
            padding: '16px 20px',
            border: stats.products.lowStock > 0 ? '1px solid #FEEB9D' : '1px solid #EDE8E3',
            backgroundColor: stats.products.lowStock > 0 ? '#FFFEF7' : '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#5E626F', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Inventory Alerts
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: stats.products.lowStock > 0 ? '#FEEB9D' : '#FAF8F5',
                color: stats.products.lowStock > 0 ? '#13172B' : '#5E626F',
                border: stats.products.lowStock > 0 ? '1px solid #E5C365' : '1px solid #EDE8E3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#13172B' }}>
            {stats.products.lowStock}{' '}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#13172B',
                backgroundColor: '#FEEB9D',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid #E5C365',
                verticalAlign: 'middle',
              }}
            >
              low stock
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px' }}>
            <span style={{ color: '#5E626F' }}>{stats.products.total} total products in catalog</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Recent Orders & Top Selling Products */}
      <div className="dashboard-main-grid">
        {/* Left: Recent Orders Table */}
        <div
          className="glass-card"
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #EDE8E3',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#13172B', margin: 0 }}>
                Recent Orders
              </h3>
              <p style={{ fontSize: '12px', color: '#5E626F', margin: '2px 0 0 0' }}>
                Latest online store purchases and shipments
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '5px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={handleExportCSV}
                title="Export recent orders to CSV"
              >
                <Download size={13} /> Export CSV
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '5px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={() => navigate('/orders')}
              >
                <span>View All</span> <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #EDE8E3', color: '#5E626F' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Order</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Customer</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Item</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Total</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Payment</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '48px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            backgroundColor: '#FAF8F5',
                            border: '1px solid #EDE8E3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#AEB0B6',
                          }}
                        >
                          <ShoppingCart size={20} />
                        </div>
                        <div style={{ fontWeight: 600, color: '#13172B', fontSize: '13px' }}>
                          No orders placed yet
                        </div>
                        <p style={{ fontSize: '12px', color: '#5E626F', margin: 0, maxWidth: '320px' }}>
                          Live customer orders placed on the storefront will automatically appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((ord) => {
                    const custName = ord.customer?.name || 'Customer';
                    const custEmail = ord.customer?.email || 'N/A';
                    const custAvatar = ord.customer?.avatar || '';
                    const totalFormatted = typeof ord.total === 'number'
                      ? `${currencySymbol}${ord.total.toFixed(2)}`
                      : ord.total;

                    return (
                      <tr
                        key={ord.id}
                        style={{
                          borderBottom: '1px solid #F5F1EC',
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF8F5')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: '#13172B', whiteSpace: 'nowrap' }}>
                          {ord.id}
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {custAvatar ? (
                              <img
                                src={custAvatar}
                                alt={custName}
                                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div
                              style={{
                                display: custAvatar ? 'none' : 'flex',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#FAF8F5',
                                color: '#13172B',
                                fontWeight: 700,
                                fontSize: '11px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                border: '1px solid #EDE8E3',
                              }}
                            >
                              {custName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: '#13172B', fontSize: '12px' }}>
                                {custName}
                              </div>
                              <div style={{ color: '#AEB0B6', fontSize: '11px' }}>{custEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <div
                            style={{
                              maxWidth: '180px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontSize: '12px',
                              color: '#5E626F',
                              fontWeight: 500,
                            }}
                          >
                            {ord.product}
                          </div>
                          <span style={{ fontSize: '11px', color: '#AEB0B6' }}>Qty: {ord.items}</span>
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 700, color: '#13172B', whiteSpace: 'nowrap' }}>
                          {totalFormatted}
                        </td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                          {getPaymentBadge(ord.payment)}
                        </td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                          {getStatusBadge(ord.status)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Top Selling Products & Category Breakdown */}
        <div
          className="glass-card"
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #EDE8E3',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#13172B', margin: 0 }}>
                Top Performing Products
              </h3>
              <p style={{ fontSize: '12px', color: '#5E626F', margin: '2px 0 0 0' }}>
                Highest revenue generators
              </p>
            </div>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '4px 8px', fontSize: '11px' }}
              onClick={() => navigate('/products')}
            >
              Catalog
            </button>
          </div>

          {topSellingProducts.length === 0 ? (
            <div
              style={{
                padding: '28px 16px',
                textAlign: 'center',
                backgroundColor: '#FAF8F5',
                borderRadius: '8px',
                border: '1px dashed #EDE8E3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EDE8E3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#AEB0B6',
                }}
              >
                <Package size={18} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#13172B' }}>
                No sales recorded yet
              </div>
              <p style={{ fontSize: '11px', color: '#5E626F', margin: 0, maxWidth: '240px' }}>
                Top performing products will be ranked dynamically by revenue once customer orders are placed.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topSellingProducts.map((prod, idx) => {
                const revFormatted = typeof prod.revenue === 'number'
                  ? `${currencySymbol}${prod.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : prod.revenue;

                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: '#FAF8F5',
                      border: '1px solid #EDE8E3',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #EDE8E3',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={resolveImageUrl(prod.image)}
                          alt={prod.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = '/assets/images/products/brass-cylinder-vase-1.jpg';
                          }}
                        />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#13172B',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '140px',
                          }}
                        >
                          {prod.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#5E626F' }}>{prod.category}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>{revFormatted}</div>
                      <div style={{ fontSize: '11px', color: '#5E626F' }}>{prod.sales}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Category Sales Distribution */}
          <div style={{ paddingTop: '12px', borderTop: '1px solid #EDE8E3' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#13172B', margin: '0 0 10px 0' }}>
              Category Volume Share
            </h4>

            {categoryDist.length === 0 ? (
              <div style={{ fontSize: '12px', color: '#5E626F', textAlign: 'center', padding: '12px 0' }}>
                No category data available
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categoryDist.map((cat, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                      <span style={{ color: '#5E626F', fontWeight: 500 }}>{cat.name}</span>
                      <span style={{ color: '#13172B', fontWeight: 700 }}>{cat.pct}%</span>
                    </div>
                    <div style={{ height: '5px', backgroundColor: '#EDE8E3', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${cat.pct}%`, height: '100%', backgroundColor: cat.color || '#CC0D39', borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
