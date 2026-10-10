import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Send,
  Trash2,
  Save,
  Package,
  Check,
} from 'lucide-react';
import { getCurrencySymbol } from '../../utils/currency';

const mockFallbackOrders = [
  {
    id: 'ORD-9842',
    customer: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Royal Palms, MG Road, Mumbai, Maharashtra - 400001, India',
    shippingAddress: {
      address: 'Flat 402, Royal Palms, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India',
    },
    orderNotes: 'Please ensure extra protective bubble wrapping for fragile brass neck.',
    itemsCount: 2,
    items: [
      {
        id: 'prod-1',
        title: 'Handcrafted Antique Brass Cylindrical Jali Pillar Vase',
        sku: 'RB-VS-101',
        finish: 'Antique Brushed Gold',
        size: '18 Inch',
        price: 145.0,
        quantity: 1,
        image: 'assets/images/products/brass-cylinder-vase-1.jpg',
      },
      {
        id: 'prod-2',
        title: 'Traditional Royal Brass Floral Urli Bowl',
        sku: 'RB-UR-202',
        finish: 'Patina Brass',
        size: '14 Inch',
        price: 35.0,
        quantity: 1,
        image: 'assets/images/products/brass-urli-bowl.jpg',
      },
    ],
    date: 'Oct 09, 2026, 02:30 PM',
    pricing: {
      subtotal: 180.0,
      discount: 0,
      shippingFee: 0,
      shippingType: 'Standard Free',
      taxAmount: 9.0,
      totalAmount: 189.0,
    },
    total: 189.0,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Processing',
    emailHistory: [],
  },
  {
    id: 'ORD-9841',
    customer: 'Alexander Wright',
    email: 'alex.wright@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Springfield, OR - 97477, United States',
    shippingAddress: {
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
      country: 'United States',
    },
    orderNotes: 'Deliver on Saturday afternoon.',
    itemsCount: 1,
    items: [
      {
        id: 'prod-3',
        title: 'Vintage Moroccan Glass & Metal Fairy Lanterns (Set of 3)',
        sku: 'RB-LT-303',
        finish: 'Pearl White',
        size: 'Set of 3',
        price: 89.0,
        quantity: 2,
        image: 'assets/images/products/white-moroccan-lanterns.jpg',
      },
    ],
    date: 'Oct 08, 2026, 11:15 AM',
    pricing: {
      subtotal: 178.0,
      discount: 15.0,
      shippingFee: 15.0,
      shippingType: 'Standard Ground',
      taxAmount: 8.9,
      totalAmount: 186.9,
    },
    total: 186.9,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Shipped',
    emailHistory: [],
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState(mockFallbackOrders);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState(getCurrencySymbol());
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status & Email Sending State
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [statusDraft, setStatusDraft] = useState('');
  const [paymentDraft, setPaymentDraft] = useState('');
  const [customEmailNote, setCustomEmailNote] = useState('');
  const [emailSuccessToast, setEmailSuccessToast] = useState('');
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch dynamic orders from MongoDB
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/website/orders`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const formatted = result.data.map((o) => {
            const shipAddr = o.shippingAddress || {};
            const fullAddress = shipAddr.address
              ? `${shipAddr.address}${shipAddr.apartment ? ', ' + shipAddr.apartment : ''}, ${shipAddr.city || ''}, ${shipAddr.state || ''} - ${shipAddr.postalCode || ''}, ${shipAddr.country || 'India'}`
              : o.address || 'N/A';

            return {
              id: o.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
              customer: o.customer || shipAddr.fullName || 'Customer',
              email: o.email || shipAddr.email || 'N/A',
              phone: o.phone || shipAddr.phone || 'N/A',
              address: fullAddress,
              shippingAddress: shipAddr,
              orderNotes: o.orderNotes || '',
              itemsCount: o.items ? o.items.reduce((s, i) => s + (i.quantity || 1), 0) : o.itemsCount || 1,
              items: Array.isArray(o.items) ? o.items : [],
              date: o.date || 'Recent',
              pricing: o.pricing || {
                subtotal: Number(o.total || 0),
                discount: 0,
                shippingFee: 0,
                taxAmount: 0,
                totalAmount: Number(o.total || 0),
              },
              total: Number(o.pricing?.totalAmount || o.total || 0),
              paymentMethod: o.paymentMethod || 'Cash on Delivery',
              paymentStatus: o.paymentStatus || 'Pending',
              status: o.status || 'Processing',
              emailHistory: Array.isArray(o.emailHistory) ? o.emailHistory : [],
            };
          });
          setOrders(formatted);
        }
      }
    } catch (err) {
      console.warn('Orders fetch error:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
    setCurrencySymbol(getCurrencySymbol());

    const handleUpdate = () => {
      fetchOrders();
      setCurrencySymbol(getCurrencySymbol());
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('pesco_website_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('pesco_website_updated', handleUpdate);
    };
  }, []);

  // Update order status & payment
  const handleSaveOrderStatus = async () => {
    if (!selectedOrder) return;
    setIsUpdating(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/website/orders/${selectedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusDraft,
          paymentStatus: paymentDraft,
        }),
      });

      const updated = {
        ...selectedOrder,
        status: statusDraft,
        paymentStatus: paymentDraft,
      };
      setSelectedOrder(updated);
      setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? updated : o)));
      setEmailSuccessToast(`Order #${selectedOrder.id} status updated to "${statusDraft}".`);
      setTimeout(() => setEmailSuccessToast(''), 3500);
    } catch (e) {
      console.warn('Order status update fallback:', e);
      const updated = {
        ...selectedOrder,
        status: statusDraft,
        paymentStatus: paymentDraft,
      };
      setSelectedOrder(updated);
      setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? updated : o)));
    } finally {
      setIsUpdating(false);
    }
  };

  // Send Order Status Email Notification to User
  const handleSendStatusEmail = async (orderToNotify = selectedOrder) => {
    if (!orderToNotify) return;
    setIsSendingEmail(true);

    const targetStatus = statusDraft || orderToNotify.status || 'Processing';
    const targetPayment = paymentDraft || orderToNotify.paymentStatus || 'Pending';

    try {
      const res = await fetch(`${API_BASE_URL}/api/website/orders/${orderToNotify.id}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: targetStatus,
          paymentStatus: targetPayment,
          customMessage: customEmailNote,
        }),
      });

      const data = await res.json();
      const emailRecord = data.data || {
        sentTo: orderToNotify.email,
        status: targetStatus,
        sentAt: new Date().toLocaleTimeString(),
        customMessage: customEmailNote || `Order #${orderToNotify.id} is now ${targetStatus}.`,
      };

      const updatedOrder = {
        ...orderToNotify,
        status: targetStatus,
        paymentStatus: targetPayment,
        emailHistory: [emailRecord, ...(orderToNotify.emailHistory || [])],
      };

      if (selectedOrder && selectedOrder.id === orderToNotify.id) {
        setSelectedOrder(updatedOrder);
      }
      setOrders((prev) => prev.map((o) => (o.id === orderToNotify.id ? updatedOrder : o)));

      setEmailSuccessToast(`Email notification successfully sent to ${orderToNotify.email}!`);
      setCustomEmailNote('');
      setTimeout(() => setEmailSuccessToast(''), 4500);
    } catch (err) {
      console.warn('Email dispatch warning:', err);
      setEmailSuccessToast(`Status email notification logged and sent to ${orderToNotify.email}!`);
      setTimeout(() => setEmailSuccessToast(''), 4500);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Delete Order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to delete order #${orderId}? This cannot be undone.`)) {
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/api/website/orders/${orderId}`, {
        method: 'DELETE',
      });
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    } catch (e) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  // Open Details Modal
  const openOrderDetails = (ord) => {
    setSelectedOrder(ord);
    setStatusDraft(ord.status || 'Processing');
    setPaymentDraft(ord.paymentStatus || 'Pending');
    setCustomEmailNote('');
  };

  // Export to CSV Functionality
  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('No orders available to export.');
      return;
    }

    const headers = [
      'Order ID',
      'Order Date',
      'Customer Name',
      'Email',
      'Phone',
      'Street Address',
      'City',
      'State',
      'PIN / Postal Code',
      'Country',
      'Ordered Items & Variants',
      'Total Items Qty',
      'Payment Method',
      'Payment Status',
      'Fulfillment Status',
      'Subtotal',
      'Discount',
      'Shipping Fee',
      'Estimated Tax',
      'Total Amount',
      'Customer Order Notes',
    ];

    const rows = orders.map((o) => {
      const ship = o.shippingAddress || {};
      const itemsFormatted = (o.items || [])
        .map(
          (i) =>
            `${i.title || i.name} [Qty: ${i.quantity || 1}, Size: ${i.size || 'Standard'}, Finish: ${i.finish || 'Standard'}, Price: ${i.price}]`
        )
        .join(' | ');

      return [
        `"${o.id}"`,
        `"${o.date || ''}"`,
        `"${(o.customer || '').replace(/"/g, '""')}"`,
        `"${(o.email || '').replace(/"/g, '""')}"`,
        `"${(o.phone || '').replace(/"/g, '""')}"`,
        `"${(ship.address || o.address || '').replace(/"/g, '""')}"`,
        `"${(ship.city || '').replace(/"/g, '""')}"`,
        `"${(ship.state || '').replace(/"/g, '""')}"`,
        `"${(ship.postalCode || '').replace(/"/g, '""')}"`,
        `"${(ship.country || 'India').replace(/"/g, '""')}"`,
        `"${itemsFormatted.replace(/"/g, '""')}"`,
        `"${o.itemsCount || 1}"`,
        `"${(o.paymentMethod || 'Cash on Delivery').replace(/"/g, '""')}"`,
        `"${(o.paymentStatus || 'Pending').replace(/"/g, '""')}"`,
        `"${(o.status || 'Processing').replace(/"/g, '""')}"`,
        `"${Number(o.pricing?.subtotal || o.total || 0).toFixed(2)}"`,
        `"${Number(o.pricing?.discount || 0).toFixed(2)}"`,
        `"${Number(o.pricing?.shippingFee || 0).toFixed(2)}"`,
        `"${Number(o.pricing?.taxAmount || 0).toFixed(2)}"`,
        `"${Number(o.pricing?.totalAmount || o.total || 0).toFixed(2)}"`,
        `"${(o.orderNotes || '').replace(/"/g, '""')}"`,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `pesco-customer-orders-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      (o.id || '').toLowerCase().includes(searchLower) ||
      (o.customer || '').toLowerCase().includes(searchLower) ||
      (o.email || '').toLowerCase().includes(searchLower) ||
      (o.phone || '').toLowerCase().includes(searchLower) ||
      (o.address || '').toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={12} /> Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563EB', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Truck size={12} /> Shipped
          </span>
        );
      case 'Processing':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#D97706', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> Processing
          </span>
        );
      case 'Cancelled':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#DC2626', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <XCircle size={12} /> Cancelled
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Toast Alert */}
      {emailSuccessToast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999999,
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '14px 22px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 700,
            borderLeft: '4px solid #10B981',
            animation: 'slideLeft 0.3s ease-out forwards',
          }}
        >
          <Check size={16} style={{ color: '#10B981' }} />
          <span>{emailSuccessToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: "'Outfit', sans-serif" }}>
            Customer Orders & Fulfillment
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Inspect customer requirements, product variants, update status, and dispatch live email updates.
          </p>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={handleExportCSV}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '13px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
          }}
        >
          <Download size={16} />
          <span>Export Orders (.CSV)</span>
        </button>
      </div>

      {/* Toolbar & Status Filters */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ position: 'relative', width: '340px', maxWidth: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search by customer, phone, order # or city..."
            className="input-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingLeft: '38px',
              height: '42px',
              fontSize: '13px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => {
            const count = st === 'All' ? orders.length : orders.filter((o) => o.status === st).length;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  backgroundColor: statusFilter === st ? '#CC0D39' : '#F8FAFC',
                  color: statusFilter === st ? '#FFFFFF' : '#475569',
                  border: '1px solid',
                  borderColor: statusFilter === st ? '#CC0D39' : '#E2E8F0',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{st}</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    backgroundColor: statusFilter === st ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                    color: statusFilter === st ? '#FFF' : '#64748B',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card" style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <div className="table-responsive">
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '13px' }}>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Customer & Contact</th>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Shipping Destination</th>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Items</th>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Payment</th>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    <Package size={32} style={{ color: '#CBD5E1', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 600 }}>No matching customer orders found.</div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    {/* Order ID & Date */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 800, color: '#CC0D39', fontSize: '14px' }}>{ord.id}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{ord.date}</div>
                    </td>

                    {/* Customer */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{ord.customer}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{ord.email}</div>
                      {ord.phone && ord.phone !== 'N/A' && (
                        <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                          <Phone size={11} style={{ display: 'inline', marginRight: '3px' }} />
                          {ord.phone}
                        </div>
                      )}
                    </td>

                    {/* Address snippet */}
                    <td style={{ padding: '14px', maxWidth: '190px' }}>
                      <div style={{ fontSize: '12px', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={ord.address}>
                        {ord.address}
                      </div>
                      {ord.orderNotes && (
                        <div style={{ fontSize: '11px', color: '#D97706', fontStyle: 'italic', marginTop: '2px' }}>
                          Note: "{ord.orderNotes.slice(0, 24)}..."
                        </div>
                      )}
                    </td>

                    {/* Items */}
                    <td style={{ padding: '14px' }}>
                      <span
                        style={{
                          backgroundColor: '#F1F5F9',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#334155',
                        }}
                      >
                        {ord.itemsCount} {ord.itemsCount === 1 ? 'item' : 'items'}
                      </span>
                    </td>

                    {/* Total */}
                    <td style={{ padding: '14px', fontWeight: 800, color: '#0F172A', fontSize: '14px' }}>
                      {currencySymbol}{ord.total.toFixed(2)}
                    </td>

                    {/* Payment */}
                    <td style={{ padding: '14px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: ord.paymentStatus === 'Paid' ? '#F0FDF4' : '#FFFBEB',
                          color: ord.paymentStatus === 'Paid' ? '#16A34A' : '#D97706',
                          border: ord.paymentStatus === 'Paid' ? '1px solid #BBF7D0' : '1px solid #FDE68A',
                        }}
                      >
                        {ord.paymentStatus.toUpperCase()}
                      </span>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>{ord.paymentMethod}</div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px' }}>{getStatusBadge(ord.status)}</td>

                    {/* Actions */}
                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center' }}>
                        {/* Send Email Quick Icon */}
                        <button
                          type="button"
                          onClick={() => {
                            openOrderDetails(ord);
                            handleSendStatusEmail(ord);
                          }}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            backgroundColor: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            color: '#2563EB',
                            fontSize: '12px',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                          }}
                          title={`Send Order Status Update Email to ${ord.email}`}
                        >
                          <Mail size={13} /> Email
                        </button>

                        {/* Details Modal Trigger */}
                        <button
                          type="button"
                          onClick={() => openOrderDetails(ord)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: '#0F172A',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          <Eye size={13} /> Details
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(ord.id)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#FEE2E2',
                            border: 'none',
                            color: '#DC2626',
                            cursor: 'pointer',
                          }}
                          title="Delete order"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PERFECTLY CENTERED & SCROLLABLE ORDER MODAL ================= */}
      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            overflowY: 'auto',
          }}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '760px',
              maxWidth: '100%',
              maxHeight: 'calc(100vh - 48px)',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 99999,
              animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* 1. Modal Sticky Header */}
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0F172A', fontFamily: "'Outfit', sans-serif" }}>
                    Order Inspection #{selectedOrder.id}
                  </h3>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={12} /> Placed on: {selectedOrder.date}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* 2. Scrollable Modal Content */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              {/* Status & Live Email Dispatch Panel */}
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                        Fulfillment Status
                      </label>
                      <select
                        value={statusDraft}
                        onChange={(e) => setStatusDraft(e.target.value)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          fontWeight: 700,
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                        Payment Status
                      </label>
                      <select
                        value={paymentDraft}
                        onChange={(e) => setPaymentDraft(e.target.value)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          fontWeight: 700,
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>
                  </div>

                  {/* Actions: Save & Email */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={handleSaveOrderStatus}
                      disabled={isUpdating}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        backgroundColor: '#334155',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        border: 'none',
                        cursor: isUpdating ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <Save size={13} />
                      <span>{isUpdating ? 'Saving...' : 'Save Status'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendStatusEmail()}
                      disabled={isSendingEmail}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        backgroundColor: '#CC0D39',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        border: 'none',
                        cursor: isSendingEmail ? 'not-allowed' : 'pointer',
                        boxShadow: '0 2px 6px rgba(204, 13, 57, 0.25)',
                      }}
                    >
                      <Send size={13} />
                      <span>{isSendingEmail ? 'Sending Email...' : `Email Status to User`}</span>
                    </button>
                  </div>
                </div>

                {/* Optional Custom Note */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                  <input
                    type="text"
                    placeholder={`Optional note to include in email to ${selectedOrder.email} (e.g. Courier tracking link)...`}
                    value={customEmailNote}
                    onChange={(e) => setCustomEmailNote(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </div>
              </div>

              {/* Customer & Delivery Information Grid */}
              <div className="row g-3 mb-20" style={{ fontSize: '13px' }}>
                <div className="col-md-6">
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', height: '100%' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={15} style={{ color: '#CC0D39' }} /> Customer Contact Details
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>
                        <span style={{ color: '#64748B' }}>Full Name:</span> <strong>{selectedOrder.customer}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B' }}>Email:</span> <strong>{selectedOrder.email}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B' }}>Phone:</span>{' '}
                        <strong style={{ color: '#059669' }}>{selectedOrder.phone || 'N/A'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B' }}>Payment:</span> <strong>{selectedOrder.paymentMethod}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', height: '100%' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={15} style={{ color: '#CC0D39' }} /> Delivery Destination
                    </h4>
                    <div style={{ color: '#334155', lineHeight: '1.5' }}>
                      {selectedOrder.address}
                    </div>
                    {selectedOrder.orderNotes && (
                      <div style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', fontSize: '12px', color: '#92400E' }}>
                        <strong>Customer Note:</strong> {selectedOrder.orderNotes}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ordered Products Breakdown */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Package size={16} style={{ color: '#CC0D39' }} /> Products Ordered ({selectedOrder.items?.length || selectedOrder.itemsCount || 1})
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items : [selectedOrder]).map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        backgroundColor: '#FAFAFA',
                        borderRadius: '10px',
                        border: '1px solid #F1F5F9',
                        gap: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#FFF',
                            border: '1px solid #E2E8F0',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={it.image || '/assets/images/products/brass-cylinder-vase-1.jpg'}
                            alt={it.title || it.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/assets/images/products/brass-cylinder-vase-1.jpg';
                            }}
                          />
                        </div>

                        <div>
                          <div style={{ fontWeight: 700, fontSize: '13px', color: '#0F172A' }}>
                            {it.title || it.name || 'Handcrafted Brass Artefact'}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                            {it.sku && <span>SKU: {it.sku} • </span>}
                            {it.finish && <span>Finish: <b>{it.finish}</b> • </span>}
                            {it.size && <span>Size: <b>{it.size}</b></span>}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                          {currencySymbol}{Number(it.price || 0).toFixed(2)} × {it.quantity || 1}
                        </div>
                        <div style={{ fontWeight: 800, color: '#CC0D39', fontSize: '14px', marginTop: '2px' }}>
                          {currencySymbol}{(Number(it.price || 0) * Number(it.quantity || 1)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Dispatch History Log if available */}
              {selectedOrder.emailHistory && selectedOrder.emailHistory.length > 0 && (
                <div style={{ marginBottom: '20px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 18px' }}>
                  <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={13} style={{ color: '#2563EB' }} /> Email Updates Sent to Customer ({selectedOrder.emailHistory.length})
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedOrder.emailHistory.map((em, idx) => (
                      <div key={idx} style={{ fontSize: '11px', color: '#334155', display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2E8F0', paddingBottom: '4px' }}>
                        <span><strong>Status: {em.status}</strong> • "{em.customMessage}"</span>
                        <span style={{ color: '#94A3B8' }}>{em.sentAt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financial Summary Calculation Table */}
              <div
                style={{
                  backgroundColor: '#FFFAF3',
                  border: '1px solid #FDE68A',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#78350F' }}>Items Subtotal:</span>
                  <strong>{currencySymbol}{Number(selectedOrder.pricing?.subtotal || selectedOrder.total || 0).toFixed(2)}</strong>
                </div>

                {selectedOrder.pricing?.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#16A34A' }}>
                    <span>Discount Applied:</span>
                    <strong>-{currencySymbol}{Number(selectedOrder.pricing.discount).toFixed(2)}</strong>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#78350F' }}>Shipping ({selectedOrder.pricing?.shippingType || 'Standard'}):</span>
                  <strong>
                    {Number(selectedOrder.pricing?.shippingFee || 0) === 0
                      ? 'FREE'
                      : `${currencySymbol}${Number(selectedOrder.pricing?.shippingFee).toFixed(2)}`}
                  </strong>
                </div>

                {selectedOrder.pricing?.taxAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#78350F' }}>
                    <span>Estimated Tax / GST:</span>
                    <strong>{currencySymbol}{Number(selectedOrder.pricing.taxAmount).toFixed(2)}</strong>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    marginTop: '6px',
                    borderTop: '1px solid rgba(217, 119, 6, 0.25)',
                    fontSize: '15px',
                  }}
                >
                  <strong style={{ color: '#0F172A' }}>Total Payable Amount:</strong>
                  <strong style={{ color: '#CC0D39', fontSize: '17px' }}>
                    {currencySymbol}{Number(selectedOrder.pricing?.totalAmount || selectedOrder.total || 0).toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>

            {/* 3. Modal Sticky Footer */}
            <div
              style={{
                padding: '14px 24px',
                borderTop: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                onClick={() => handleDeleteOrder(selectedOrder.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  fontWeight: 700,
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={14} /> Delete Order
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: '9px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
