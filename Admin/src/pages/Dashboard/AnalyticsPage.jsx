import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>Sales & Traffic Analytics</h1>
        <p style={{ fontSize: '13px', color: '#64748B' }}>Deep-dive business intelligence, conversion rates, and revenue trends</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Conversion Rate</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981', marginTop: '6px' }}>3.84%</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>+0.6% vs last week</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Avg. Order Value</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#2563EB', marginTop: '6px' }}>$90.45</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>+$4.20 per transaction</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Cart Abandonment</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#D97706', marginTop: '6px' }}>24.1%</div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>-3.2% improvement</div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Returning Customers</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#7C3AED', marginTop: '6px' }}>42.8%</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>High brand loyalty</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '20px' }}>
          Monthly Revenue Trajectory (2026)
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '220px', padding: '10px 0' }}>
          {[
            { month: 'Jan', val: 45, rev: '$45K' },
            { month: 'Feb', val: 58, rev: '$58K' },
            { month: 'Mar', val: 72, rev: '$72K' },
            { month: 'Apr', val: 65, rev: '$65K' },
            { month: 'May', val: 89, rev: '$89K' },
            { month: 'Jun', val: 95, rev: '$95K' },
            { month: 'Jul', val: 110, rev: '$110K' },
            { month: 'Aug', val: 104, rev: '$104K' },
            { month: 'Sep', val: 120, rev: '$120K' },
            { month: 'Oct', val: 128, rev: '$128K' },
          ].map((bar, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '11px', color: '#64748B', marginBottom: '6px', fontWeight: 600 }}>{bar.rev}</span>
              <div
                style={{
                  width: '100%',
                  maxWidth: '36px',
                  height: `${(bar.val / 130) * 100}%`,
                  background: idx === 9 ? 'linear-gradient(180deg, #CC0D39 0%, #E11D48 100%)' : '#E2E8F0',
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.4s ease',
                }}
              />
              <span style={{ fontSize: '12px', color: '#475569', marginTop: '8px', fontWeight: 500 }}>{bar.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
