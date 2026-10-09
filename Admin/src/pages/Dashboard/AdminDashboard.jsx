import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Package,
  Plus,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  RefreshCw,
  Download,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardStatsApi } from '../../services/api';
import { getCurrencySymbol } from '../../utils/currency';

const initialRecentOrders = [
  {
    id: 'ORD-9842',
    customer: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    },
    product: 'Handcrafted Antique Brass Jali Pillar Vase',
    items: 2,
    date: 'Today, 14:32',
    total: '$158.00',
    payment: 'Paid',
    status: 'Delivered',
  },
  {
    id: 'ORD-9841',
    customer: {
      name: 'Alexander Wright',
      email: 'alex.wright@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    },
    product: 'Royal Brass Floral Urli Bowl & Diya',
    items: 1,
    date: 'Today, 12:15',
    total: '$89.00',
    payment: 'Paid',
    status: 'Shipped',
  },
  {
    id: 'ORD-9840',
    customer: {
      name: 'Elena Rostova',
      email: 'elena.r@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    },
    product: 'Vintage Moroccan Glass & Metal Fairy Lanterns',
    items: 3,
    date: 'Yesterday, 19:40',
    total: '$177.00',
    payment: 'Paid',
    status: 'Processing',
  },
  {
    id: 'ORD-9839',
    customer: {
      name: 'Marcus Chen',
      email: 'marcus.c@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    },
    product: 'Grand Royal Brass Mayur Peacock Diya Lamp',
    items: 1,
    date: 'Yesterday, 15:20',
    total: '$109.00',
    payment: 'Pending',
    status: 'Processing',
  },
  {
    id: 'ORD-9838',
    customer: {
      name: 'Emily Watson',
      email: 'emily.w@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120',
    },
    product: 'Royal Floral Embossed Brass Flower Vases (Set of 3)',
    items: 1,
    date: '06 Oct 2026',
    total: '$119.00',
    payment: 'Paid',
    status: 'Delivered',
  },
];

const topProducts = [
  {
    name: 'Handcrafted Antique Brass Jali Pillar Vase',
    category: 'Brass Vases & Urns',
    price: '$79.00',
    sales: '384 sold',
    revenue: '$30,336.00',
    stock: 25,
    image: 'assets/images/products/brass-cylinder-vase-1.jpg',
  },
  {
    name: 'Royal Floral Embossed Brass Flower Vases',
    category: 'Brass Vases & Urns',
    price: '$119.00',
    sales: '215 sold',
    revenue: '$25,585.00',
    stock: 18,
    image: 'assets/images/products/brass-flower-vase-set.jpg',
  },
  {
    name: 'Vintage Moroccan Fairy Lanterns (Set of 3)',
    category: 'Decorative Lanterns',
    price: '$59.00',
    sales: '412 sold',
    revenue: '$24,308.00',
    stock: 32,
    image: 'assets/images/products/white-moroccan-lanterns.jpg',
  },
  {
    name: 'Traditional Royal Brass Floral Urli Bowl',
    category: 'Tabletop Urli & Bowls',
    price: '$89.00',
    sales: '320 sold',
    revenue: '$28,480.00',
    stock: 15,
    image: 'assets/images/products/brass-urli-bowl.jpg',
  },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [stats, setStats] = useState({
    revenue: { total: 128450.0, monthlyGrowth: 18.4 },
    orders: { total: 1420, pending: 34, growth: 12.5 },
    customers: { total: 842, growth: 9.2 },
    products: { total: 156, lowStock: 8 },
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStats = async () => {
    setIsRefreshing(true);
    try {
      const data = await getDashboardStatsApi();
      if (data?.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.warn('[Stats API]:', err.message);
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  useEffect(() => {
    fetchStats();

    const handleSync = () => {
      fetchStats();
      setCurrencySymbol(getCurrencySymbol());
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('pesco_website_updated', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('pesco_website_updated', handleSync);
    };
  }, []);

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Product', 'Quantity', 'Date', 'Total', 'Payment', 'Status'];
    const rows = initialRecentOrders.map((ord) => [
      ord.id,
      ord.customer.name,
      ord.customer.email,
      `"${ord.product.replace(/"/g, '""')}"`,
      ord.items,
      ord.date,
      ord.total,
      ord.payment,
      ord.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pesco_recent_orders_${new Date().toISOString().slice(0, 10)}.csv`);
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
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '12px',
              backgroundColor: '#FEF3C7',
              color: '#B45309',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Clock size={12} /> Processing
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
              backgroundColor: '#FEE2E2',
              color: '#B91C1C',
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
              backgroundColor: '#F1F5F9',
              color: '#475569',
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
            border: '1px solid #DCFCE7',
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
          fontWeight: 600,
          padding: '2px 7px',
          borderRadius: '4px',
          backgroundColor: '#FFFBEB',
          color: '#D97706',
          border: '1px solid #FEF3C7',
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
          border: '1px solid #E2E8F0',
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
                fontWeight: 600,
                color: '#334155',
                backgroundColor: '#F1F5F9',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid #E2E8F0',
              }}
            >
              Administrator
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#0F172A',
              margin: 0,
            }}
          >
            Dashboard Overview
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0 0' }}>
            Live performance, transactions, and store operations for Pesco Handicrafts.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={fetchStats}
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
        }}
      >
        {/* Stat 1: Revenue */}
        <div className="glass-card" style={{ padding: '16px 20px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Revenue
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>
            {currencySymbol}{stats.revenue.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px' }}>
            <span style={{ color: '#15803D', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={13} /> +{stats.revenue.monthlyGrowth}%
            </span>
            <span style={{ color: '#94A3B8' }}>vs last month</span>
          </div>
        </div>

        {/* Stat 2: Total Orders */}
        <div className="glass-card" style={{ padding: '16px 20px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Orders
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#E0F2FE',
                color: '#0369A1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingCart size={18} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>
            {stats.orders.total.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px' }}>
            <span style={{ color: '#15803D', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={13} /> +{stats.orders.growth}%
            </span>
            <span style={{ color: '#94A3B8' }}>• {stats.orders.pending} pending</span>
          </div>
        </div>

        {/* Stat 3: Total Customers */}
        <div className="glass-card" style={{ padding: '16px 20px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Customers
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#F3E8FF',
                color: '#7E22CE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>
            {stats.customers.total.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px' }}>
            <span style={{ color: '#15803D', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={13} /> +{stats.customers.growth}%
            </span>
            <span style={{ color: '#94A3B8' }}>registered buyers</span>
          </div>
        </div>

        {/* Stat 4: Inventory / Low Stock */}
        <div className="glass-card" style={{ padding: '16px 20px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Inventory Alerts
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: stats.products.lowStock > 0 ? '#FEF3C7' : '#F1F5F9',
                color: stats.products.lowStock > 0 ? '#D97706' : '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>
            {stats.products.lowStock} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>low stock</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '12px' }}>
            <span style={{ color: '#64748B' }}>{stats.products.total} total products in catalog</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Recent Orders & Top Selling Products */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '16px' }}>
        {/* Left: Recent Orders Table */}
        <div
          className="glass-card"
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
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
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Recent Orders
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
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
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Order</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Customer</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Item</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Total</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Payment</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {initialRecentOrders.map((ord) => (
                  <tr
                    key={ord.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>
                      {ord.id}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                          src={ord.customer.avatar}
                          alt={ord.customer.name}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '12px' }}>
                            {ord.customer.name}
                          </div>
                          <div style={{ color: '#94A3B8', fontSize: '11px' }}>{ord.customer.email}</div>
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
                          color: '#334155',
                          fontWeight: 500,
                        }}
                      >
                        {ord.product}
                      </div>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>Qty: {ord.items}</span>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                      {ord.total}
                    </td>
                    <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                      {getPaymentBadge(ord.payment)}
                    </td>
                    <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                      {getStatusBadge(ord.status)}
                    </td>
                  </tr>
                ))}
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
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Top Performing Products
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topProducts.map((prod, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={prod.image}
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
                        color: '#0F172A',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '140px',
                      }}
                    >
                      {prod.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{prod.category}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803D' }}>{prod.revenue}</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{prod.sales}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Category Sales Distribution */}
          <div style={{ paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', margin: '0 0 10px 0' }}>
              Category Volume Share
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                  <span style={{ color: '#334155', fontWeight: 500 }}>Brass Vases & Urns</span>
                  <span style={{ color: '#0F172A', fontWeight: 700 }}>42%</span>
                </div>
                <div style={{ height: '5px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '42%', height: '100%', backgroundColor: '#0F172A', borderRadius: '3px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                  <span style={{ color: '#334155', fontWeight: 500 }}>Decorative Lanterns</span>
                  <span style={{ color: '#0F172A', fontWeight: 700 }}>28%</span>
                </div>
                <div style={{ height: '5px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '28%', height: '100%', backgroundColor: '#475569', borderRadius: '3px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                  <span style={{ color: '#334155', fontWeight: 500 }}>Tabletop Urli & Bowls</span>
                  <span style={{ color: '#0F172A', fontWeight: 700 }}>18%</span>
                </div>
                <div style={{ height: '5px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '18%', height: '100%', backgroundColor: '#94A3B8', borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
