import React, { useState } from 'react';
import { Calendar, ShieldAlert, Cpu } from 'lucide-react';

interface EligibilityFormProps {
  onProve: (dob: string) => Promise<void>;
  isProving: boolean;
  disabled: boolean;
}

export const EligibilityForm: React.FC<EligibilityFormProps> = ({
  onProve,
  isProving,
  disabled
}) => {
  const [dob, setDob] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) {
      setError('Please select a valid date of birth');
      return;
    }
    setError(null);
    try {
      await onProve(dob);
    } catch (err: any) {
      setError(err.message || 'Proof generation failed');
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Calendar size={20} color="var(--accent-purple)" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Generate Eligibility Proof</h3>
      </div>

      <div
        style={{
          background: 'rgba(121, 82, 255, 0.05)',
          border: '1px solid rgba(121, 82, 255, 0.15)',
          borderRadius: '12px',
          padding: '0.85rem 1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#ffffff' }}>
          <ShieldAlert size={14} color="#b096ff" />
          <span>🔒 Private Input</span>
        </div>
        <p>
          This value is used to generate your proof and is not intended to be published as public contract state.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Select Date of Birth
          </label>
          <input
            type="date"
            className="input-field"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              setError(null);
            }}
            disabled={isProving || disabled}
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {error && (
          <div style={{ color: 'var(--error-red)', fontSize: '0.825rem', fontWeight: 500 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isProving || disabled || !dob}
          style={{ width: '100%', gap: '0.5rem', marginTop: '0.5rem' }}
        >
          {isProving ? (
            <>
              <Cpu size={16} className="spin" />
              <span>Generating private proof... Please wait.</span>
            </>
          ) : (
            <span>Prove Eligibility</span>
          )}
        </button>
      </form>
    </div>
  );
};
