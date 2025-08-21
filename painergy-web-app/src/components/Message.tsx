import React from 'react';

interface MessageProps {
  pain: number;
  caffeine: number;
  dilution: number;
  energy: number;
  painChanged: boolean;
  caffeineChanged: boolean;
  dilutionChanged: boolean;
  energyChanged: boolean;
  showDilutionWarning: boolean;
  mobile: boolean;
}

const Message: React.FC<MessageProps> = ({
  pain,
  caffeine,
  dilution,
  energy,
  painChanged,
  caffeineChanged,
  dilutionChanged,
  energyChanged,
  showDilutionWarning,
  mobile,
}) => {
  if (mobile) {
    if (pain === 100 && caffeine === 100 && energy === 100) {
      return (
  <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '48px 0 0 0', background: '#e53935', color: '#fff', padding: '12px', borderRadius: '12px', minWidth: '80px', fontSize: '1em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>ARE YOU SURE ABOUT THAT ???</span>
        </div>
      );
    } else if (pain === 100 && caffeine === 100) {
      return (
  <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '48px 0 0 0', background: '#43a047', color: '#fff', padding: '12px', borderRadius: '12px', minWidth: '80px', fontSize: '1em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>POWER OVERWHELMING !!!</span>
        </div>
      );
    } else if (showDilutionWarning) {
      return (
  <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '48px 0 0 0', background: '#333', color: '#fff', padding: '12px', borderRadius: '12px', minWidth: '80px', fontSize: '1em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000, maxWidth: '320px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <span>In this particular case, it is not recommended to lower dilution.</span>
        </div>
      );
    } else if (pain === 100) {
      return (
  <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '48px 0 0 0', background: '#d32f2f', color: '#fff', padding: '12px', borderRadius: '12px', minWidth: '80px', fontSize: '1em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>It is recommended to visit a doctor ASAP!</span>
        </div>
      );
    } else if (energy === 100) {
      return (
  <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '48px 0 0 0', background: '#43a047', color: '#fff', padding: '12px', borderRadius: '12px', minWidth: '80px', fontSize: '1em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>POWER OVERWHELMING !!!</span>
        </div>
      );
    } else if (dilution === 100) {
      return (
  <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '48px 0 0 0', background: '#ffe082', color: '#333', padding: '12px', borderRadius: '12px', minWidth: '80px', fontSize: '1em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>Beware of bloating.</span>
        </div>
      );
    } else if (pain === 50 && caffeine === 50 && dilution === 50 && energy === 50 && (painChanged || caffeineChanged || dilutionChanged || energyChanged)) {
      return (
  <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '48px 0 0 0', background: '#333', color: '#fff', padding: '12px', borderRadius: '12px', minWidth: '80px', fontSize: '1em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>🎉 Congratulations! 🎉<br /><br />You've achieved balance!</span>
        </div>
      );
    } else {
      return null;
    }
  } else {
    const fontSize = window.innerWidth < 900 ? '1.1em' : '1.3em';
    if (pain === 100 && caffeine === 100 && energy === 100) {
      return (
  <div style={{ position: 'fixed', top: 'calc(50% + 24px)', right: '40px', transform: 'translateY(-50%)', background: '#e53935', color: '#fff', padding: '24px', borderRadius: '12px', minWidth: '120px', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>ARE YOU SURE ABOUT THAT ???</span>
        </div>
      );
    } else if (pain === 100 && caffeine === 100) {
      return (
  <div style={{ position: 'fixed', top: 'calc(50% + 24px)', right: '40px', transform: 'translateY(-50%)', background: '#43a047', color: '#fff', padding: '24px', borderRadius: '12px', minWidth: '120px', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>POWER OVERWHELMING !!!</span>
        </div>
      );
    } else if (showDilutionWarning) {
      return (
  <div style={{ position: 'fixed', top: 'calc(50% + 24px)', right: '40px', transform: 'translateY(-50%)', background: '#333', color: '#fff', padding: '18px', borderRadius: '12px', minWidth: '120px', fontSize: fontSize, fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000, maxWidth: '320px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <span>In this particular case, it is not recommended to lower dilution.</span>
        </div>
      );
    } else if (pain === 100) {
      return (
  <div style={{ position: 'fixed', top: 'calc(50% + 24px)', right: '40px', transform: 'translateY(-50%)', background: '#d32f2f', color: '#fff', padding: '24px', borderRadius: '12px', minWidth: '120px', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>It is recommended to visit a doctor ASAP!</span>
        </div>
      );
    } else if (energy === 100) {
      return (
  <div style={{ position: 'fixed', top: 'calc(50% + 24px)', right: '40px', transform: 'translateY(-50%)', background: '#43a047', color: '#fff', padding: '24px', borderRadius: '12px', minWidth: '120px', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>POWER OVERWHELMING !!!</span>
        </div>
      );
    } else if (dilution === 100) {
      return (
  <div style={{ position: 'fixed', top: 'calc(50% + 24px)', right: '40px', transform: 'translateY(-50%)', background: '#ffe082', color: '#333', padding: '24px', borderRadius: '12px', minWidth: '120px', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>Beware of bloating.</span>
        </div>
      );
    } else if (pain === 50 && caffeine === 50 && dilution === 50 && energy === 50 && (painChanged || caffeineChanged || dilutionChanged || energyChanged)) {
      return (
  <div style={{ position: 'fixed', top: 'calc(50% + 24px)', right: '40px', transform: 'translateY(-50%)', background: '#333', color: '#fff', padding: '24px', borderRadius: '12px', minWidth: '120px', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <span>🎉 Congratulations! 🎉<br /><br />You've achieved balance!</span>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default Message;
