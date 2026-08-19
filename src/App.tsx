import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { EligibilityForm } from './components/EligibilityForm';
import { EligibilityResult } from './components/EligibilityResult';
import { PrivacyPanel } from './components/PrivacyPanel';
import { EligibilityContract } from './contract';

export function App() {
  const midnight = useMidnight();
  const [contract] = useState(() => new EligibilityContract());
  const [isProving, setIsProving] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleProve = async (dobString: string) => {
    setIsProving(true);
    setErrorMsg(null);
    setVerified(null);

    try {
      // 1. Parse date of birth
      const dobDate = new Date(dobString);
      if (isNaN(dobDate.getTime())) {
        throw new Error('Invalid date input format');
      }

      const dobYear = dobDate.getFullYear();
      const dobMonth = dobDate.getMonth() + 1; // 1-indexed
      const dobDay = dobDate.getDate();

      // 2. Get current time
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      const currentDay = today.getDate();

      // 3. Local ZK validation simulation
      const userPk = midnight.address || '0x0000000000000000000000000000000000000000000000000000000000000000';
      contract.prove_eligibility(
        currentYear,
        currentMonth,
        currentDay,
        dobYear,
        dobMonth,
        dobDay,
        userPk
      );

      // 4. Live network wallet interaction if connected
      if (midnight.isConnected && midnight.api) {
        const walletApi = midnight.api;
        if (typeof walletApi.balanceTransaction === 'function') {
          const tx = await walletApi.balanceTransaction({
            circuit: 'prove_eligibility',
            current_year: currentYear.toString(),
            current_month: currentMonth.toString(),
            current_day: currentDay.toString()
          });
          if (typeof walletApi.submitTx === 'function') {
            await walletApi.submitTx(tx);
          }
        }
      }

      setVerified(true);
    } catch (err: any) {
      console.error(err);
      setVerified(false);
      setErrorMsg(err.message || 'Verification failed');
    } finally {
      setIsProving(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header-nav">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={24} color="#ffffff" />
          </div>
          <div>
            <h1 className="brand-title">MidnightPass</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>ZK AGE / ELIGIBILITY GATE</p>
          </div>
        </div>

        <WalletConnect
          isConnected={midnight.isConnected}
          walletName={midnight.walletName}
          address={midnight.address}
          network={midnight.network}
          isConnecting={midnight.isConnecting}
          error={midnight.error}
          availableWallets={midnight.availableWallets}
          onConnect={midnight.connectWallet}
          onDisconnect={midnight.disconnectWallet}
          onClearError={midnight.clearError}
        />
      </header>

      {/* Main Panel */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Banner */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, rgba(121, 82, 255, 0.2) 0%, rgba(0, 242, 254, 0.1) 100%)',
            border: '1px solid rgba(121, 82, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
            Prove you're eligible without revealing your exact age.
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            This application uses Midnight's private-smart-contract engine to verify that a user's self-entered age is at least 18 without ever submitting the date of birth to the ledger or revealing it publicly.
          </p>
        </div>

        {/* Input/Result Split */}
        <div className="grid-2">
          <EligibilityForm
            onProve={handleProve}
            isProving={isProving}
            disabled={false}
          />
          <EligibilityResult
            verified={verified}
            errorMsg={errorMsg}
          />
        </div>

        {/* Privacy Info */}
        <PrivacyPanel />
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <p>Built for Midnight privacy dApp challenge • Connected via DApp Connector SDK</p>
        <p style={{ marginTop: '0.4rem', fontSize: '0.75rem', opacity: 0.7 }}>
          Disclaimer: A self-entered age is a proof of computation only. In a production dApp, DOB inputs would be cryptographically signed by a trusted identity issuer.
        </p>
      </footer>
    </div>
  );
}

export default App;
