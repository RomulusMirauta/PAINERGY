import React from 'react';
import PainSlider from './PainSlider';
import CaffeineSlider from './CaffeineSlider';
import DilutionSlider from './DilutionSlider';
import EnergySlider from './EnergySlider';
import { InfoBoxState } from '../hooks/useInfoBox';

interface SliderGroupProps {
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
  sliderWidth: number;
  sliderHeight: number;
  openInfoBoxes: any;
  getCascadeIndex: (slider: keyof InfoBoxState) => number;
  handleToggleInfoBox: (slider: keyof InfoBoxState) => void;
  handlePainChange: (value: number) => void;
  handleCaffeineChange: (value: number) => void;
  handleDilutionChange: (value: number) => void;
  handleEnergyChange: (value: number) => void;
}

const SliderGroup: React.FC<SliderGroupProps> = ({
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
  sliderWidth,
  sliderHeight,
  openInfoBoxes,
  getCascadeIndex,
  handleToggleInfoBox,
  handlePainChange,
  handleCaffeineChange,
  handleDilutionChange,
  handleEnergyChange,
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: mobile ? '12px' : '48px',
      alignItems: 'flex-end',
      width: mobile ? 'max-content' : '100%',
      margin: mobile ? '0 auto' : undefined,
      maxWidth: mobile ? '100vw' : undefined,
    }}>
      <div>
        <PainSlider
          value={pain}
          onChange={handlePainChange}
          isInfoOpen={openInfoBoxes.pain}
          cascadeIndex={getCascadeIndex('pain')}
          onInfoOpen={() => handleToggleInfoBox('pain')}
          sliderWidth={sliderWidth}
          sliderHeight={sliderHeight}
        />
      </div>
      <div>
        <CaffeineSlider
          value={caffeine}
          onChange={handleCaffeineChange}
          isInfoOpen={openInfoBoxes.caffeine}
          cascadeIndex={getCascadeIndex('caffeine')}
          onInfoOpen={() => handleToggleInfoBox('caffeine')}
          sliderWidth={sliderWidth}
          sliderHeight={sliderHeight}
        />
      </div>
      <div>
        <DilutionSlider
          value={dilution}
          onChange={handleDilutionChange}
          isInfoOpen={openInfoBoxes.dilution}
          cascadeIndex={getCascadeIndex('dilution')}
          onInfoOpen={() => handleToggleInfoBox('dilution')}
          sliderWidth={sliderWidth}
          sliderHeight={sliderHeight}
        />
      </div>
      <div>
        <EnergySlider
          value={energy}
          onChange={handleEnergyChange}
          isInfoOpen={openInfoBoxes.energy}
          cascadeIndex={getCascadeIndex('energy')}
          onInfoOpen={() => handleToggleInfoBox('energy')}
          sliderWidth={sliderWidth}
          sliderHeight={sliderHeight}
        />
      </div>
    </div>
  );
};

export default SliderGroup;
