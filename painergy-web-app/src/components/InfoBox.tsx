import React from 'react';

interface InfoBoxProps {
  isOpen: boolean;
  position?: { top: number; left: number };
  children: React.ReactNode;
  onClose: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ isOpen, position, children, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        background: '#fffbe6',
        color: '#333',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        zIndex: 2000,
        minWidth: '18px',
        maxWidth: '320px',
      }}
    >
      <button onClick={onClose} style={{ float: 'right', background: 'none', border: 'none', fontWeight: 'bold', fontSize: '1.2em', cursor: 'pointer' }}>×</button>
      <div>{children}</div>
    </div>
  );
};

export default InfoBox;
