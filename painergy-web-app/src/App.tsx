import React, { useEffect } from 'react';
import { useSliderLogic } from './hooks/useSliderLogic';
import { useInfoBox } from './hooks/useInfoBox';
import SliderGroup from './components/SliderGroup';
import Message from './components/Message';
import BalanceHint from './components/BalanceHint';

// Add viewport meta tag for mobile scaling

const App: React.FC = () => {
  // Restore mobile and slider dimension variables
  const mobile = window.innerWidth <= 480;
  const sliderWidth = mobile ? 48 : 80;
  const sliderHeight = mobile ? 180 : 320;

  // Use custom hook for info box logic
  const {
    openInfoBoxes,
    setOpenInfoBoxes,
    infoBoxPositions,
    setInfoBoxPositions,
    handleCloseInfoBox,
    handleToggleInfoBox,
    getCascadeIndex,
    handleOpenInfoBox,
  } = useInfoBox();
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  // Use custom hook for slider logic
  const {
    pain,
    setPain,
    caffeine,
    setCaffeine,
    dilution,
    setDilution,
    energy,
    setEnergy,
    painChanged,
    caffeineChanged,
    dilutionChanged,
    energyChanged,
    showDilutionWarning,
    handlePainChange,
    handleCaffeineChange,
    handleDilutionChange,
    handleEnergyChange,
  } = useSliderLogic();

  // ...existing code for rendering sliders and messages...
  // ...existing code for return statement...
  return (
    <div style={{
      minHeight: mobile ? '100vh' : '90vh',
      width: '100vw',
      maxWidth: mobile ? '100vw' : '480px',
      // maxHeight: mobile ? '10vw' : '48px',
      margin: '0 auto',
      // padding: mobile ? '4px' : '16px',
      // boxSizing: 'border-box',
      boxSizing: 'content-box',
      // background: '#004cffff', // THIS CAUSED THE SHADOW-LIKE BACKGROUND ISSUE
      position: 'relative',
    }}>
      {/* Logo container at the very top, centered */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: mobile ? '8px' : '8px', marginBottom: mobile ? '0px' : '32px' }}>
        <img src={require('./img/logo.png')} alt="Painergy Logo" style={{ maxWidth: mobile ? '320px' : '600px', width: mobile ? '95vw' : '200%', height: mobile ? 'auto' : 'auto' }} />
      </div>
      {/* Sliders container centered in the middle of the display */}
      <div style={{
        width: '100%',
        // flex: 1,
        height: mobile ? 'calc(90vh - 160px)' : 'calc(80vh - 160px)', // adjust 160px if needed for logo height/margin
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <SliderGroup
          pain={pain}
          caffeine={caffeine}
          dilution={dilution}
          energy={energy}
          painChanged={painChanged}
          caffeineChanged={caffeineChanged}
          dilutionChanged={dilutionChanged}
          energyChanged={energyChanged}
          showDilutionWarning={showDilutionWarning}
          mobile={mobile}
          sliderWidth={sliderWidth}
          sliderHeight={sliderHeight}
          openInfoBoxes={openInfoBoxes}
          getCascadeIndex={getCascadeIndex}
          handleToggleInfoBox={handleToggleInfoBox}
          handlePainChange={handlePainChange}
          handleCaffeineChange={handleCaffeineChange}
          handleDilutionChange={handleDilutionChange}
          handleEnergyChange={handleEnergyChange}
        />
      </div>
      {/* Messages container */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: mobile ? '-150px' : '8px',
        zIndex: 2,
      }}>
        <Message
          pain={pain}
          caffeine={caffeine}
          dilution={dilution}
          energy={energy}
          painChanged={painChanged}
          caffeineChanged={caffeineChanged}
          dilutionChanged={dilutionChanged}
          energyChanged={energyChanged}
          showDilutionWarning={showDilutionWarning}
          mobile={mobile}
        />
      </div>
      {/* Balance hint container */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: mobile ? '8px' : '1px',
        overflow: 'hidden',
        maxHeight: mobile ? '20px' : '1px',
        zIndex: 2,
      }}>
        <BalanceHint mobile={mobile} />
      </div>
    </div>
  );

}
export default App;