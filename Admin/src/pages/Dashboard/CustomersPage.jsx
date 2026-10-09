import React, { useState } from 'react';
import { Search } from 'lucide-react';

const mockCustomers = [
  {
    id: 'CUST-01',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-5678',
    ordersCount: 8,
    totalSpent: '$1,420.00',
    joined: '12 Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 'CUST-02',
    name: 'Alexander Wright',
    email: 'alex.wright@example.com',
    phone: '+1 (555) 345-6789',
    ordersCount: 4,
    totalSpent: '$680.00',
    joined: '03 Feb 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 'CUST-03',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 456-7890',
    ordersCount: 12,
    totalSpent: '$2,890.00',
    joined: '18 Nov 2025',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 'CUST-04',
    name: 'Marcus Chen',
    email: 'marcus.chen@example.com',
    phone: '+1 (555) 567-8901',
    ordersCount: 2,
    totalSpent: '$134.00',
    joined: '22 Mar 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 'CUST-05',
    name: 'Emily Watson',
    email: 'emily.watson@example.com',
    phone: '+1 (555) 678-9012',
    ordersCount: 6,
    totalSpent: '$940.00',
    joined: '09 Apr 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120',
  },
];

const CustomersPage = () => {
  const [search, setSearch] = useState('');

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: "'Outfit', sans-serif" }}>
          Registered Customers
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B' }}>
          View buyer directory, order activity, and lifetime value
        </p>
      </div>

      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            className="input-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '38px', height: '40px', fontSize: '13px' }}
          />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '20px' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Member Since</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={c.avatar}
                        alt={c.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>{c.name}</div>
                        <div style={{ color: '#64748B', fontSize: '12px' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#475569', fontSize: '13px' }}>{c.phone}</td>
                  <td>
                    <span className="badge badge-info">{c.ordersCount} orders</span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#16A34A', fontSize: '15px' }}>{c.totalSpent}</td>
                  <td style={{ color: '#64748B', fontSize: '13px' }}>{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;

