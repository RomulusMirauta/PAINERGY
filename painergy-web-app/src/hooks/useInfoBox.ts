import { useState } from 'react';

export interface InfoBoxState {
  pain: boolean;
  caffeine: boolean;
  dilution: boolean;
  energy: boolean;
}
export interface InfoBoxPositions {
  pain?: { top: number; left: number };
  caffeine?: { top: number; left: number };
  dilution?: { top: number; left: number };
  energy?: { top: number; left: number };
}

export function useInfoBox() {
  const [openInfoBoxes, setOpenInfoBoxes] = useState<InfoBoxState>({
    pain: false,
    caffeine: false,
    dilution: false,
    energy: false,
  });
  const [infoBoxPositions, setInfoBoxPositions] = useState<InfoBoxPositions>({});

  // Detect mobile
  const mobile = window.innerWidth <= 480;

  const handleCloseInfoBox = (slider: keyof InfoBoxState) => {
    setOpenInfoBoxes(prev => ({ ...prev, [slider]: false }));
  };

  const handleToggleInfoBox = (slider: keyof InfoBoxState) => {
    setOpenInfoBoxes(prev => {
      if (mobile) {
        // Only one open at a time
        const newState: InfoBoxState = {
          pain: false,
          caffeine: false,
          dilution: false,
          energy: false,
        };
        newState[slider] = !prev[slider];
        return newState;
      } else {
        // Desktop: allow multiple
        return { ...prev, [slider]: !prev[slider] };
      }
    });
  };

  const getCascadeIndex = (slider: keyof InfoBoxState) => {
    return Object.keys(openInfoBoxes)
      .filter(k => openInfoBoxes[k as keyof InfoBoxState])
      .indexOf(slider);
  };

  const handleOpenInfoBox = (slider: keyof InfoBoxState) => {
    setOpenInfoBoxes(prev => {
      if (mobile) {
        // Only one open at a time
        const newState: InfoBoxState = {
          pain: false,
          caffeine: false,
          dilution: false,
          energy: false,
        };
        newState[slider] = true;
        return newState;
      } else {
        // Desktop: allow multiple
        return { ...prev, [slider]: true };
      }
    });
  };

  return {
    openInfoBoxes,
    setOpenInfoBoxes,
    infoBoxPositions,
    setInfoBoxPositions,
    handleCloseInfoBox,
    handleToggleInfoBox,
    getCascadeIndex,
    handleOpenInfoBox,
  };
}
