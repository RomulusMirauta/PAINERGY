import React from 'react';

interface BalanceHintProps {
  mobile: boolean;
}

const BalanceHint: React.FC<BalanceHintProps> = ({ mobile }) => (
  <div style={{
    position: 'fixed',
    right: mobile?undefined:'48px',
    bottom: mobile?'30px':'48px',
    background: 'rgba(251, 247, 235, 0.95)',
    color: '#6d4c41',
    fontFamily: 'Georgia, Times New Roman, serif',
    fontStyle: 'italic',
    fontSize: mobile ? '0.7em' : '1em',
    fontWeight: 400,
    padding: '12px 18px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
    zIndex: 1001,
    letterSpacing: '1px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '420px'
  }}>
    The key lies in finding the balance.
  </div>
);

export default BalanceHint;