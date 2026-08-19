import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

interface EligibilityResultProps {
  verified: boolean | null;
  errorMsg: string | null;
}

export const EligibilityResult: React.FC<EligibilityResultProps> = ({
  verified,
  errorMsg
}) => {
  if (verified === null && !errorMsg) {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <ShieldCheck size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
        <p>No proof generated yet. Fill in your DOB and click Prove Eligibility to verify.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck size={20} color="var(--accent-cyan)" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Verification Result</h3>
      </div>

      {verified ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)' }}>
              <CheckCircle2 size={20} color="#10b981" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>✓ Eligibility Verified</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Requirement:</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>Age 18+</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Result:</span>
              <span className="badge badge-success" style={{ padding: '0.2rem 0.6rem' }}>Eligible</span>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', textAlign: 'center', fontWeight: 500 }}>
            Your exact age was not disclosed.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center', padding: '1rem 0' }}>
          <XCircle size={48} color="var(--error-red)" />
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--error-red)' }}>
            Eligibility requirement not satisfied.
          </div>
          {errorMsg && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Details: {errorMsg}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
