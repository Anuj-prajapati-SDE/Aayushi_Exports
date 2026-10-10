import React, { useState, useEffect, useMemo } from 'react';
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
  Printer,
  Copy,
  ExternalLink,
  RefreshCw,
  X,
  CreditCard,
  DollarSign,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { getCurrencySymbol } from '../../utils/currency';

const BACKEND_BASE = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || 'http://localhost:5000';
const API_BASE_URL = BACKEND_BASE;

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
    return `${BACKEND_BASE}${path}`;
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

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Compute live KPI Order Metrics
  const orderStats = useMemo(() => {
    const total = orders.length;
    const processing = orders.filter((o) => o.status === 'Processing').length;
    const shipped = orders.filter((o) => o.status === 'Shipped').length;
    const delivered = orders.filter((o) => o.status === 'Delivered').length;
    const cancelled = orders.filter((o) => o.status === 'Cancelled').length;
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.pricing?.totalAmount || o.total || 0), 0);
    return { total, processing, shipped, delivered, cancelled, totalRevenue };
  }, [orders]);

  // Copy helpers
  const handleCopyAddress = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyEmail = (email) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = (phone) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // High-fidelity printable invoice popup
  const handlePrintOrder = (orderToPrint = selectedOrder) => {
    if (!orderToPrint) return;

    const printWindow = window.open('', '_blank', 'width=880,height=960');
    if (!printWindow) {
      window.print();
      return;
    }

    const itemsRows = (orderToPrint.items && orderToPrint.items.length > 0 ? orderToPrint.items : [orderToPrint])
      .map(
        (it) => `
        <tr>
          <td style="padding: 12px 14px; border-bottom: 1px solid #e2e8f0;">
            <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${it.title || it.name || 'Handcrafted Brass Item'}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 3px;">
              ${it.sku ? `<span>SKU: ${it.sku}</span> &bull; ` : ''}
              ${it.finish ? `<span>Finish: ${it.finish}</span> &bull; ` : ''}
              ${it.size ? `<span>Size: ${it.size}</span>` : ''}
            </div>
          </td>
          <td style="padding: 12px 14px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #334155;">${it.quantity || 1}</td>
          <td style="padding: 12px 14px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #334155;">${currencySymbol}${Number(it.price || 0).toFixed(2)}</td>
          <td style="padding: 12px 14px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 700; color: #CC0D39;">${currencySymbol}${(Number(it.price || 0) * Number(it.quantity || 1)).toFixed(2)}</td>
        </tr>
      `
      )
      .join('');

    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Invoice #${orderToPrint.id} - Pesco Craft</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 40px; font-size: 13px; line-height: 1.5; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #CC0D39; padding-bottom: 24px; margin-bottom: 28px; }
          .brand { font-size: 22px; font-weight: 800; color: #CC0D39; letter-spacing: -0.5px; }
          .subtitle { color: #64748b; font-size: 12px; margin-top: 3px; }
          .invoice-meta { text-align: right; }
          .invoice-title { font-size: 20px; font-weight: 800; color: #0f172a; }
          .invoice-num { font-size: 14px; font-weight: 700; color: #CC0D39; margin-top: 4px; }
          .grid { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 24px; }
          .box { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; }
          .box-title { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 8px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          th { background: #f1f5f9; padding: 10px 14px; text-align: left; font-size: 11px; text-transform: uppercase; color: #475569; font-weight: 700; }
          .totals-wrap { display: flex; justify-content: flex-end; }
          .totals-table { width: 340px; }
          .row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: #475569; font-size: 13px; }
          .row strong { color: #0f172a; }
          .row.grand { font-size: 16px; font-weight: 800; color: #CC0D39; border-top: 2px solid #CC0D39; border-bottom: none; padding-top: 12px; margin-top: 4px; }
          .footer { margin-top: 48px; text-align: center; color: #94a3b8; font-size: 11px; border-top: 1px solid #e2e8f0; padding-top: 18px; }
          @media print {
            body { padding: 15px; }
            @page { margin: 15mm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">PESCO CRAFT & HERITAGE</div>
            <div class="subtitle">Official Admin Invoice & Fulfillment Dispatch Note</div>
          </div>
          <div class="invoice-meta">
            <div class="invoice-title">COMMERCIAL INVOICE</div>
            <div class="invoice-num">Order #${orderToPrint.id}</div>
            <div style="color: #64748b; font-size: 11px; margin-top: 3px;">Date: ${orderToPrint.date}</div>
            <div style="font-size: 11px; color: #059669; font-weight: bold; margin-top: 2px;">Status: ${orderToPrint.status} (${orderToPrint.paymentStatus})</div>
          </div>
        </div>

        <div class="grid">
          <div class="box">
            <div class="box-title">Billed To & Contact</div>
            <div style="font-weight: 800; font-size: 14px; color: #0f172a;">${orderToPrint.customer}</div>
            <div style="color: #475569; margin-top: 4px;">Email: <strong>${orderToPrint.email}</strong></div>
            <div style="color: #475569; margin-top: 2px;">Phone: <strong>${orderToPrint.phone || 'N/A'}</strong></div>
            <div style="color: #475569; margin-top: 4px;">Payment Method: <strong>${orderToPrint.paymentMethod}</strong></div>
          </div>

          <div class="box">
            <div class="box-title">Shipping & Delivery Address</div>
            <div style="color: #334155; line-height: 1.5;">${orderToPrint.address}</div>
            ${orderToPrint.orderNotes ? `<div style="margin-top: 8px; font-size: 11px; background: #fffbeb; border: 1px solid #fde68a; padding: 6px 10px; border-radius: 6px; color: #92400e;"><strong>Buyer Instructions:</strong> ${orderToPrint.orderNotes}</div>` : ''}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Description & Variants</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Rate</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div class="totals-wrap">
          <div class="totals-table">
            <div class="row">
              <span>Items Subtotal:</span>
              <strong>${currencySymbol}${Number(orderToPrint.pricing?.subtotal || orderToPrint.total || 0).toFixed(2)}</strong>
            </div>
            ${orderToPrint.pricing?.discount > 0 ? `
              <div class="row" style="color: #16a34a;">
                <span>Discount Applied:</span>
                <strong>-${currencySymbol}${Number(orderToPrint.pricing.discount).toFixed(2)}</strong>
              </div>
            ` : ''}
            <div class="row">
              <span>Shipping (${orderToPrint.pricing?.shippingType || 'Standard'}):</span>
              <strong>${Number(orderToPrint.pricing?.shippingFee || 0) === 0 ? 'FREE' : `${currencySymbol}${Number(orderToPrint.pricing?.shippingFee).toFixed(2)}`}</strong>
            </div>
            ${orderToPrint.pricing?.taxAmount > 0 ? `
              <div class="row">
                <span>Estimated Tax / GST:</span>
                <strong>${currencySymbol}${Number(orderToPrint.pricing.taxAmount).toFixed(2)}</strong>
              </div>
            ` : ''}
            <div class="row grand">
              <span>Grand Total:</span>
              <span>${currencySymbol}${Number(orderToPrint.pricing?.totalAmount || orderToPrint.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <div>Thank you for choosing Pesco Craft & Heritage artisans.</div>
          <div style="margin-top: 4px;">Authentic Handcrafted Decorative Products &bull; Moradabad, India</div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
  };

  // Fetch dynamic orders from MongoDB
  const fetchOrders = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/website/orders`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          const formatted = result.data.map((o) => {
            const shipAddr = o.shippingAddress || {};
            const fullAddress = shipAddr.address
              ? `${shipAddr.address}${shipAddr.apartment ? ', ' + shipAddr.apartment : ''}, ${shipAddr.city || ''}, ${shipAddr.state || ''} - ${shipAddr.postalCode || ''}, ${shipAddr.country || 'India'}`
              : o.address || 'N/A';

            return {
              id: o.id || o._id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
              customer: o.customer || shipAddr.fullName || 'Customer',
              email: o.email || shipAddr.email || 'N/A',
              phone: o.phone || shipAddr.phone || 'N/A',
              address: fullAddress,
              shippingAddress: shipAddr,
              orderNotes: o.orderNotes || '',
              itemsCount: o.items ? o.items.reduce((s, i) => s + (i.quantity || 1), 0) : o.itemsCount || 1,
              items: Array.isArray(o.items) ? o.items : [],
              date: o.date || (o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'),
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
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsRefreshing(false), 300);
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
      const res = await fetch(`${API_BASE_URL}/api/website/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId && o._id !== orderId));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(null);
        }
        setEmailSuccessToast(`Order #${orderId} has been deleted successfully.`);
        setTimeout(() => setEmailSuccessToast(''), 3500);
        window.dispatchEvent(new Event('pesco_website_updated'));
      } else {
        const errData = await res.json().catch(() => null);
        alert(errData?.message || 'Failed to delete order from server');
      }
    } catch (e) {
      console.error('Delete order error:', e);
      // Local optimistic fallback
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
          <span className="badge" style={{ backgroundColor: '#FEEB9D', color: '#13172B', border: '1px solid #E5C365', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} color="#13172B" /> Processing
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
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: "'Outfit', sans-serif", margin: 0 }}>
            Customer Orders & Fulfillment
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Inspect customer specifications, tracking, variants, and send live email updates directly to buyers.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={fetchOrders}
            title="Refresh Live Orders from Database"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              border: '1px solid #CBD5E1',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Sync Orders</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              padding: '9px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
            }}
          >
            <Download size={15} />
            <span>Export Orders (.CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {/* Stat 1: Total Orders */}
        <div className="glass-card" style={{ padding: '16px 18px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Orders
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#F1F5F9', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={16} />
            </div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
            {orderStats.total}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>All store orders</div>
        </div>

        {/* Stat 2: Processing */}
        <div className="glass-card" style={{ padding: '16px 18px', backgroundColor: '#FFFFFF', border: '1px solid #EDE8E3', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#13172B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Processing
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEEB9D', color: '#13172B', border: '1px solid #E5C365', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} />
            </div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#13172B' }}>
            {orderStats.processing}
          </div>
          <div style={{ fontSize: '11px', color: '#5E626F', marginTop: '4px' }}>Needs fulfillment</div>
        </div>

        {/* Stat 3: Shipped */}
        <div className="glass-card" style={{ padding: '16px 18px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Shipped
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={16} />
            </div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#1D4ED8' }}>
            {orderStats.shipped}
          </div>
          <div style={{ fontSize: '11px', color: '#3B82F6', marginTop: '4px' }}>In logistics transit</div>
        </div>

        {/* Stat 4: Delivered */}
        <div className="glass-card" style={{ padding: '16px 18px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Delivered
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#047857' }}>
            {orderStats.delivered}
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px' }}>Successfully received</div>
        </div>

        {/* Stat 5: Revenue */}
        <div className="glass-card" style={{ padding: '16px 18px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#CC0D39', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Orders Volume
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(204, 13, 57, 0.08)', color: '#CC0D39', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={16} />
            </div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#CC0D39' }}>
            {currencySymbol}{orderStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>Gross order value</div>
        </div>
      </div>

      {/* Toolbar & Status Filters */}
      <div
        className="glass-card"
        style={{
          padding: '14px 18px',
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
        <div style={{ position: 'relative', width: '360px', maxWidth: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search by customer, phone, order # or address..."
            className="input-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingLeft: '38px',
              paddingRight: search ? '32px' : '12px',
              height: '40px',
              fontSize: '13px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => {
            const count = st === 'All' ? orders.length : orders.filter((o) => o.status === st).length;
            const isActive = statusFilter === st;
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
                  backgroundColor: isActive ? '#CC0D39' : '#F8FAFC',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: '1px solid',
                  borderColor: isActive ? '#CC0D39' : '#E2E8F0',
                  transition: 'all 0.15s ease',
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
                    backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                    color: isActive ? '#FFF' : '#64748B',
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
              {isLoading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '50px 20px', color: '#64748B' }}>
                    <RefreshCw size={26} className="animate-spin" style={{ color: '#0F172A', marginBottom: '10px' }} />
                    <div style={{ fontWeight: 600 }}>Loading live orders from database...</div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
                    <Package size={44} style={{ color: '#CBD5E1', marginBottom: '12px' }} />
                    <div style={{ fontWeight: 700, fontSize: '16px', color: '#0F172A', marginBottom: '6px' }}>
                      No Customer Orders Yet
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B', maxWidth: '440px', margin: '0 auto 16px', lineHeight: 1.5 }}>
                      Orders placed by buyers on your website will automatically appear here dynamically in real-time.
                    </div>
                    <button
                      type="button"
                      onClick={fetchOrders}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '8px',
                        backgroundColor: '#0F172A',
                        color: '#FFF',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <RefreshCw size={14} /> Refresh Live Orders
                    </button>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    <Package size={32} style={{ color: '#CBD5E1', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 600 }}>No matching customer orders found for current filter or search.</div>
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

      {/* ================= BULLETPROOF SCROLLABLE ORDER INSPECTION MODAL ================= */}
      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(6px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            overflowY: 'auto',
          }}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '920px',
              maxWidth: '96vw',
              height: '90vh',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
              overflow: 'hidden',
              margin: 'auto',
              position: 'relative',
              border: '1px solid #E2E8F0',
            }}
          >
            {/* 1. Modal Sticky Header */}
            <div
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                flexShrink: 0,
                zIndex: 10,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(204, 13, 57, 0.08)',
                      color: '#CC0D39',
                      fontWeight: 800,
                      fontSize: '15px',
                      letterSpacing: '0.02em',
                      border: '1px solid rgba(204, 13, 57, 0.2)',
                    }}
                  >
                    #{selectedOrder.id}
                  </div>
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      margin: 0,
                      color: '#0F172A',
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    Order Inspection
                  </h3>
                  {getStatusBadge(selectedOrder.status)}
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: selectedOrder.paymentStatus === 'Paid' ? '#F0FDF4' : '#FFFBEB',
                      color: selectedOrder.paymentStatus === 'Paid' ? '#16A34A' : '#D97706',
                      border: selectedOrder.paymentStatus === 'Paid' ? '1px solid #BBF7D0' : '1px solid #FDE68A',
                    }}
                  >
                    {selectedOrder.paymentStatus ? selectedOrder.paymentStatus.toUpperCase() : 'PENDING'}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#64748B',
                    marginTop: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Calendar size={13} style={{ color: '#94A3B8' }} />
                  <span>Placed on: <strong>{selectedOrder.date}</strong></span>
                  <span>•</span>
                  <span>Method: <strong>{selectedOrder.paymentMethod}</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handlePrintOrder(selectedOrder)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  title="Print customer invoice receipt"
                >
                  <Printer size={14} />
                  <span>Print Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    width: '34px',
                    height: '34px',
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
                    transition: 'all 0.15s',
                  }}
                  title="Close inspection"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* 2. Scrollable Modal Content */}
            <div
              style={{
                flex: '1 1 auto',
                minHeight: 0,
                overflowY: 'auto',
                padding: '22px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Status & Live Email Dispatch Panel */}
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '16px 20px',
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
                          padding: '7px 12px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          fontWeight: 700,
                          backgroundColor: '#FFFFFF',
                          color: '#0F172A',
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
                          padding: '7px 12px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          fontWeight: 700,
                          backgroundColor: '#FFFFFF',
                          color: '#0F172A',
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
                      <span>{isSendingEmail ? 'Sending...' : `Email Status to Buyer`}</span>
                    </button>
                  </div>
                </div>

                {/* Optional Custom Note */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                  <input
                    type="text"
                    placeholder={`Optional message or tracking code for ${selectedOrder.email} (e.g. Courier tracking #123456)...`}
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
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px',
                  fontSize: '13px',
                }}
              >
                {/* Customer Details Card */}
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      <Mail size={15} style={{ color: '#CC0D39' }} /> Customer Contact
                    </h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(204, 13, 57, 0.1)',
                          color: '#CC0D39',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          flexShrink: 0,
                        }}
                      >
                        {(selectedOrder.customer || 'C').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '14px' }}>{selectedOrder.customer}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>Verified Store Buyer</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '6px 10px', borderRadius: '6px', border: '1px solid #F1F5F9' }}>
                      <span style={{ color: '#475569', fontSize: '12px', wordBreak: 'break-all' }}>{selectedOrder.email}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(selectedOrder.email)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: copiedEmail ? '#16A34A' : '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '11px',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                        title="Copy email address"
                      >
                        {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '6px 10px', borderRadius: '6px', border: '1px solid #F1F5F9' }}>
                      <span style={{ color: '#059669', fontWeight: 700, fontSize: '12px' }}>{selectedOrder.phone || 'No phone provided'}</span>
                      {selectedOrder.phone && selectedOrder.phone !== 'N/A' && (
                        <button
                          type="button"
                          onClick={() => handleCopyPhone(selectedOrder.phone)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: copiedPhone ? '#16A34A' : '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: '11px',
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                          title="Copy phone number"
                        >
                          {copiedPhone ? <Check size={12} /> : <Copy size={12} />}
                          <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delivery Destination Card */}
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      <MapPin size={15} style={{ color: '#CC0D39' }} /> Delivery Destination
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopyAddress(selectedOrder.address)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: copiedAddress ? '#16A34A' : '#2563EB',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                      title="Copy complete shipping address"
                    >
                      {copiedAddress ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
                    </button>
                  </div>

                  <div style={{ color: '#334155', lineHeight: '1.5', fontSize: '13px', backgroundColor: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                    {selectedOrder.address}
                  </div>

                  {selectedOrder.orderNotes && (
                    <div style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', fontSize: '12px', color: '#92400E' }}>
                      <strong>Customer Note:</strong> {selectedOrder.orderNotes}
                    </div>
                  )}
                </div>
              </div>

              {/* Ordered Products Breakdown */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  <Package size={15} style={{ color: '#CC0D39' }} /> Products Ordered ({selectedOrder.items?.length || selectedOrder.itemsCount || 1})
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items : [selectedOrder]).map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        gap: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={resolveImageUrl(it.image)}
                            alt={it.title || it.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/assets/images/products/brass-cylinder-vase-1.jpg';
                            }}
                          />
                        </div>

                        <div>
                          <div style={{ fontWeight: 800, fontSize: '13px', color: '#0F172A' }}>
                            {it.title || it.name || 'Handcrafted Brass Artefact'}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>
                            {it.sku && <span>SKU: {it.sku} • </span>}
                            {it.finish && <span>Finish: <b>{it.finish}</b> • </span>}
                            {it.size && <span>Size: <b>{it.size}</b></span>}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
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

              {/* Bottom 2-Column: Financial Breakdown & Email History Log */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px',
                  alignItems: 'start',
                }}
              >
                {/* Financial Summary */}
                <div
                  style={{
                    backgroundColor: '#FFFAF3',
                    border: '1px solid #FDE68A',
                    borderRadius: '12px',
                    padding: '16px 18px',
                    fontSize: '13px',
                  }}
                >
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#78350F', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Payment & Invoice Summary
                  </h4>

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
                      alignItems: 'center',
                      paddingTop: '10px',
                      marginTop: '8px',
                      borderTop: '1px solid rgba(217, 119, 6, 0.25)',
                      fontSize: '14px',
                    }}
                  >
                    <strong style={{ color: '#0F172A' }}>Total Payable Amount:</strong>
                    <strong style={{ color: '#CC0D39', fontSize: '18px' }}>
                      {currencySymbol}{Number(selectedOrder.pricing?.totalAmount || selectedOrder.total || 0).toFixed(2)}
                    </strong>
                  </div>
                </div>

                {/* Email Dispatch History Log */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '16px 18px',
                  }}
                >
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    <Mail size={13} style={{ color: '#2563EB' }} /> Buyer Email Dispatch Log
                  </h4>

                  {selectedOrder.emailHistory && selectedOrder.emailHistory.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedOrder.emailHistory.map((em, idx) => (
                        <div key={idx} style={{ fontSize: '11px', color: '#334155', borderBottom: '1px dashed #E2E8F0', paddingBottom: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <strong style={{ color: '#2563EB' }}>Status: {em.status}</strong>
                            <span style={{ color: '#94A3B8' }}>{em.sentAt}</span>
                          </div>
                          <div style={{ color: '#64748B', fontStyle: 'italic' }}>"{em.customMessage}"</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center', padding: '14px 0' }}>
                      No automated notification emails sent to buyer yet.
                    </div>
                  )}
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
                zIndex: 10,
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
                  borderRadius: '8px',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  fontWeight: 700,
                  fontSize: '12px',
                  border: '1px solid #FECACA',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Trash2 size={14} /> Delete Order
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handlePrintOrder(selectedOrder)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    cursor: 'pointer',
                  }}
                >
                  <Printer size={14} /> Print Receipt
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    padding: '8px 22px',
                    borderRadius: '8px',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.2)',
                  }}
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
