import React from 'react';
import { Wallet, ShieldCheck, AlertCircle, LogOut, Cpu, CheckCircle2 } from 'lucide-react';
import { WalletInfo } from '../hooks/useMidnight';

interface WalletConnectProps {
  isConnected: boolean;
  walletName: string | null;
  address: string | null;
  network: string;
  isConnecting: boolean;
  error: string | null;
  availableWallets: WalletInfo[];
  onConnect: (walletId?: string) => void;
  onDisconnect: () => void;
  onClearError: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletName,
  address,
  network,
  isConnecting,
  error,
  availableWallets,
  onConnect,
  onDisconnect,
  onClearError,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span className="badge badge-preview">
          <ShieldCheck size={14} />
          {network.toUpperCase()}
        </span>

        {isConnected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              className="card"
              style={{
                padding: '0.4rem 0.9rem',
                fontSize: '0.875rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                background: 'rgba(16, 185, 129, 0.1)',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.1)'
              }}
            >
              <CheckCircle2 size={14} color="#10b981" />
              <span style={{ fontWeight: 600, color: '#ffffff' }}>Wallet Connected ✓</span>
              <span className="font-mono address-truncate" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                ({walletName}: {address?.substring(0, 8)}...{address?.substring(address.length - 4)})
              </span>
            </div>

            <button onClick={onDisconnect} className="btn btn-secondary" style={{ padding: '0.5rem' }} title="Disconnect Wallet">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button onClick={() => onConnect()} disabled={isConnecting} className="btn btn-primary" style={{ gap: '0.6rem' }}>
            {isConnecting ? <Cpu size={16} className="spin" /> : <Wallet size={16} />}
            {isConnecting ? 'Connecting Wallet...' : 'Connect Midnight Wallet'}
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '0.5rem 0.75rem',
            color: '#ef4444',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            maxWidth: '380px',
          }}
        >
          <AlertCircle size={14} style={{ flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{error}</span>
          <button
            onClick={onClearError}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
