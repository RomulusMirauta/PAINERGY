import { useState, useEffect } from 'react';

export interface SliderLogic {
  pain: number;
  setPain: (value: number) => void;
  caffeine: number;
  setCaffeine: (value: number) => void;
  dilution: number;
  setDilution: (value: number) => void;
  energy: number;
  setEnergy: (value: number) => void;
  painChanged: boolean;
  caffeineChanged: boolean;
  dilutionChanged: boolean;
  energyChanged: boolean;
  showDilutionWarning: boolean;
  handlePainChange: (value: number) => void;
  handleCaffeineChange: (value: number) => void;
  handleDilutionChange: (value: number) => void;
  handleEnergyChange: (value: number) => void;
}

export function useSliderLogic(): SliderLogic {
  const [painChanged, setPainChanged] = useState(false);
  const [caffeineChanged, setCaffeineChanged] = useState(false);
  const [dilutionChanged, setDilutionChanged] = useState(false);
  const [energyChanged, setEnergyChanged] = useState(false);
  const [pain, setPain] = useState(50);
  const [caffeine, setCaffeine] = useState(50);
  const [dilution, setDilution] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [prevDilution, setPrevDilution] = useState(50);
  const [showDilutionWarning, setShowDilutionWarning] = useState(false);

  useEffect(() => {
    if (caffeine === 100 && dilution < prevDilution) {
      setShowDilutionWarning(true);
    } else if (painChanged || caffeineChanged || energyChanged) {
      setShowDilutionWarning(false);
    }
    let timeout = setTimeout(() => {
      setPrevDilution(dilution);
    }, 0);
    return () => clearTimeout(timeout);
  }, [dilution, caffeine, painChanged, caffeineChanged, energyChanged]);

  const handlePainChange = (value: number) => {
    if (!painChanged && value !== 50) setPainChanged(true);
    setPain(value);
    if (value === 100) {
      setCaffeine(0);
      setDilution(99);
      setEnergy(0);
    } else if (value === 0) {
      setCaffeine(50);
      setDilution(50);
      setEnergy(50);
    } else if (value > pain) {
      setCaffeine(prev => Math.max(0, prev - Math.abs(value - pain) * 0.5));
      setDilution(prev => Math.min(100, prev + Math.abs(value - pain) * 0.2));
      setEnergy(prev => Math.max(0, prev - Math.abs(value - pain) * 0.5));
    } else if (value < pain) {
      setCaffeine(prev => Math.min(100, prev + Math.abs(value - pain) * 0.5));
      setDilution(prev => Math.max(0, prev - Math.abs(value - pain) * 0.2));
      setEnergy(prev => Math.min(100, prev + Math.abs(value - pain) * 0.5));
    }
  };

  const handleCaffeineChange = (value: number) => {
    if (!caffeineChanged && value !== 50) setCaffeineChanged(true);
    setCaffeine(value);
    // OVERRIDE: if caffeine = 100, energy = 100, and pain <= 50, set dilution to 75
    if (value === 100 && energy === 100 && pain <= 50) {
      setDilution(75);
      setEnergy(100);
      return;
    }
    // ...existing rules...
    if (value === 100) {
      if (pain === 50) {
        setDilution(75);
      } else {
        setDilution(100);
      }
      setEnergy(100);
    } else if (value === 50 && pain === 50) {
      setDilution(50);
      setEnergy(50);
    } else if (pain >= 75 && value > caffeine) {
      const dilutionValue = Math.min(100, dilution + ((pain - 75) * 0.5) + ((value - caffeine) * 0.5));
      setDilution(dilutionValue);
      setEnergy(value);
    } else if (pain >= 50 && pain < 75 && value > caffeine) {
      const dilutionValue = Math.min(100, dilution + ((pain - 50) * 0.15) + ((value - caffeine) * 0.15));
      setDilution(dilutionValue);
      setEnergy(value);
    } else if (pain < 50 && value > caffeine) {
      const dilutionValue = Math.min(100, dilution + ((50 - pain) * 0.8) + ((value - caffeine) * 0.8));
      setDilution(dilutionValue);
      setEnergy(value);
    } else if (value > 50 && pain > 50) {
      const dilutionValue = Math.min(100, 50 + ((pain - 50) * 0.5) + ((value - 50) * 0.5));
      setDilution(dilutionValue);
      setEnergy(value);
    } else if (value === 0) {
      setDilution(0);
      setEnergy(0);
    } else if (value > caffeine) {
      setDilution(prev => Math.min(100, prev + Math.abs(value - caffeine) * 0.5));
      setEnergy(prev => Math.min(100, prev + Math.abs(value - caffeine) * 0.5));
    } else if (value < caffeine) {
      setDilution(prev => Math.max(0, prev - Math.abs(value - caffeine) * 0.2));
      setEnergy(prev => Math.max(0, prev - Math.abs(value - caffeine) * 0.5));
    }
  };

  const handleDilutionChange = (value: number) => {
    if (!dilutionChanged && value !== 50) setDilutionChanged(true);
    setDilution(value);
  };

  const handleEnergyChange = (value: number) => {
    if (!energyChanged && value !== 50) setEnergyChanged(true);
    setEnergy(value);
    // OVERRIDE: if pain <= 50 and energy is set to 100, set caffeine to 100 and dilution to 75
    if (value === 100 && pain <= 50) {
      setCaffeine(100);
      setDilution(75);
      return;
    }
    if (value === 100) {
      setCaffeine(100);
      setDilution(100);
    } else if (value === 0) {
      setCaffeine(0);
      setDilution(0);
    } else if (value > energy) {
      setCaffeine(prev => Math.min(100, prev + Math.abs(value - energy)));
      setDilution(prev => Math.min(100, prev + Math.abs(value - energy) * 0.5));
    } else if (value < energy) {
      // New rule: caffeine goes down by the same amount as energy, dilution goes down faster
      setCaffeine(prev => Math.max(0, prev - Math.abs(value - energy)));
      setDilution(prev => Math.max(0, prev - Math.abs(value - energy) * 1.2));
    }
  };

  return {
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
  };
}
