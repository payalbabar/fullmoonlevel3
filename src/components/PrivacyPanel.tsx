import React from 'react';
import { EyeOff, Eye, Shield } from 'lucide-react';

export const PrivacyPanel: React.FC = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(10, 11, 16, 0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Shield size={20} color="var(--accent-purple)" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Privacy Model</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Private Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b096ff', fontWeight: 600 }}>
            <EyeOff size={16} />
            <span>What stays private?</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-purple)' }}>✓</span> Exact age
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-purple)' }}>✓</span> Date of birth
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-purple)' }}>✓</span> Private witness/input
            </li>
          </ul>
        </div>

        {/* Public/Verifiable Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00f2fe', fontWeight: 600 }}>
            <Eye size={16} />
            <span>What can be verified?</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>✓</span> Eligibility result
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>✓</span> Contract verification
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
