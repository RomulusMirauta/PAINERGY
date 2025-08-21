import React, { useState, useEffect } from 'react';
import PainSlider from './components/PainSlider';
import CaffeineSlider from './components/CaffeineSlider';
import DilutionSlider from './components/DilutionSlider';
import EnergySlider from './components/EnergySlider';

const App: React.FC = () => {
    // Track if sliders have been changed from default
    const [painChanged, setPainChanged] = useState(false);
    const [caffeineChanged, setCaffeineChanged] = useState(false);
    const [dilutionChanged, setDilutionChanged] = useState(false);
    const [energyChanged, setEnergyChanged] = useState(false);
    const [pain, setPain] = useState(50); // default value for 0-100
    const [caffeine, setCaffeine] = useState(50); // midpoint for 0-100
    const [dilution, setDilution] = useState(50); // midpoint for 0-100
    const [energy, setEnergy] = useState(50); // midpoint for 0-100
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
        // Rule: if pain goes up, caffeine goes down, dilution goes up, energy goes down
        //       if pain goes down, caffeine goes up, dilution no change, energy goes up
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
        // Rule: if caffeine goes up, pain no change, dilution up, energy up
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
            // Dilution goes above its current value accordingly
            const dilutionValue = Math.min(100, dilution + ((pain - 75) * 0.5) + ((value - caffeine) * 0.5));
            setDilution(dilutionValue);
            setEnergy(value);
        } else if (pain >= 50 && pain < 75 && value > caffeine) {
            // Dilution goes up more slower when pain is between 50 and 75 and caffeine goes up
            const dilutionValue = Math.min(100, dilution + ((pain - 50) * 0.15) + ((value - caffeine) * 0.15));
            setDilution(dilutionValue);
            setEnergy(value);
        } else if (pain < 50 && value > caffeine) {
            // Dilution goes up faster when pain is lower than 50 and caffeine goes up
            const dilutionValue = Math.min(100, dilution + ((50 - pain) * 0.8) + ((value - caffeine) * 0.8));
            setDilution(dilutionValue);
            setEnergy(value);
        } else if (value > 50 && pain > 50) {
            // Dilution goes up according to pain and caffeine
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
            // Caffeine goes down: dilution goes slightly down, energy goes down
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
        // Rule: if energy goes up, pain no change, caffeine up, dilution up
        if (value === 100) {
            setCaffeine(100);
            setDilution(100);
        } else if (value === 0) {
            setCaffeine(0);
            setDilution(0);
        } else if (value > energy) {
            // Energy goes up, caffeine goes up
            setCaffeine(prev => Math.min(100, prev + Math.abs(value - energy)));
            setDilution(prev => Math.min(100, prev + Math.abs(value - energy) * 0.5));
        } else if (value < energy) {
            setCaffeine(prev => Math.max(0, prev - Math.abs(value - energy) * 0.5));
            setDilution(prev => Math.max(0, prev - Math.abs(value - energy) * 0.2));
        }
    };


    // Info box state for cascading
    const [openInfoBoxes, setOpenInfoBoxes] = useState<string[]>([]);
    const handleInfoOpen = (slider: string, open: boolean) => {
        setOpenInfoBoxes(prev => {
            if (open) {
                // Toggle: if present, remove; if not, add
                return prev.includes(slider) ? prev.filter(s => s !== slider) : [...prev, slider];
            } else {
                // Remove if present
                return prev.filter(s => s !== slider);
            }
        });
    };

    const getCascadeIndex = (slider: string) => openInfoBoxes.indexOf(slider);

    return (
        <>
            {/* ...existing code... */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flex: '0 1 auto', width: '100%' }}>
                    {/* ...existing code... */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px', marginTop: '24px' }}>
                                <img src={require('./img/logo.png')} alt="Painergy Logo" style={{ maxWidth: '600px', width: '200%' }} />
                            </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', alignItems: 'flex-end', width: '100%' }}>
                        {/* ...existing code for sliders... */}
                        <div>
                            <PainSlider 
                                value={pain} 
                                onChange={handlePainChange} 
                                isInfoOpen={openInfoBoxes.includes('pain')}
                                cascadeIndex={getCascadeIndex('pain')}
                                onInfoOpen={open => handleInfoOpen('pain', open)}
                            />
                        </div>
                        <div>
                            <CaffeineSlider 
                                value={caffeine} 
                                onChange={handleCaffeineChange} 
                                isInfoOpen={openInfoBoxes.includes('caffeine')}
                                cascadeIndex={getCascadeIndex('caffeine')}
                                onInfoOpen={open => handleInfoOpen('caffeine', open)}
                            />
                        </div>
                        <div>
                            <DilutionSlider
                                value={dilution} 
                                onChange={handleDilutionChange} 
                                isInfoOpen={openInfoBoxes.includes('dilution')}
                                cascadeIndex={getCascadeIndex('dilution')}
                                onInfoOpen={open => handleInfoOpen('dilution', open)}
                            />
                        </div>
                        <div>
                            <EnergySlider
                                value={energy} 
                                onChange={handleEnergyChange}
                                isInfoOpen={openInfoBoxes.includes('energy')}
                                cascadeIndex={getCascadeIndex('energy')}
                                onInfoOpen={open => handleInfoOpen('energy', open)}
                            />
                        </div>
                    </div>
                </div>
            </div>
                        {(() => {
                            if (pain === 100 && caffeine === 100 && energy === 100) {
                                return (
                                    <div style={{ 
                                        position: 'fixed', 
                                        top: '50%', 
                                        right: '40px', 
                                        transform: 'translateY(-50%)', 
                                        background: '#e53935', 
                                        color: '#fff', 
                                        padding: '24px', 
                                        borderRadius: '12px', 
                                        minWidth: '120px', 
                                        fontSize: '1.5em', 
                                        fontWeight: 'bold', 
                                        textAlign: 'center', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                                        zIndex: 1000 }}>
                                        <span>ARE YOU SURE ABOUT THAT ???</span>
                                    </div>
                                );
                            } else if (pain === 100 && caffeine === 100) {
                                return (
                                    <div style={{ 
                                        position: 'fixed', 
                                        top: '50%', 
                                        right: '40px', 
                                        transform: 'translateY(-50%)', 
                                        background: '#43a047', 
                                        color: '#fff', 
                                        padding: '24px', 
                                        borderRadius: '12px', 
                                        minWidth: '120px', 
                                        fontSize: '1.5em', 
                                        fontWeight: 'bold', 
                                        textAlign: 'center', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                                        zIndex: 1000 }}>
                                        <span>POWER OVERWHELMING !!!</span>
                                    </div>
                                );
                            } else if (showDilutionWarning) {
                                const fontSize = window.innerWidth < 600 ? '0.9em' : window.innerWidth < 900 ? '1.1em' : '1.3em';
                                return (
                                    <div style={{ 
                                        position: 'fixed', 
                                        top: '50%', 
                                        right: '40px', 
                                        transform: 'translateY(-50%)', 
                                        background: '#333', 
                                        color: '#fff', 
                                        padding: '18px', 
                                        borderRadius: '12px', 
                                        minWidth: '120px', 
                                        fontSize: fontSize, 
                                        fontWeight: 'bold', 
                                        textAlign: 'center', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                                        zIndex: 1000,
                                        maxWidth: '320px',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word'
                                    }}>
                                        <span>In this particular case, it is not recommended to lower dilution.</span>
                                    </div>
                                );
                            } else if (pain === 100) {
                                return (
                                    <div style={{ 
                                        position: 'fixed', 
                                        top: '50%', 
                                        right: '40px', 
                                        transform: 'translateY(-50%)', 
                                        background: '#d32f2f', 
                                        color: '#fff', 
                                        padding: '24px', 
                                        borderRadius: '12px', 
                                        minWidth: '120px', 
                                        fontSize: '1.5em', 
                                        fontWeight: 'bold', 
                                        textAlign: 'center', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                                        zIndex: 1000 }}>
                                        <span>It is recommended to visit a doctor ASAP!</span>
                                    </div>
                                );
                            } else if (energy === 100) {
                                return (
                                    <div style={{ 
                                        position: 'fixed', 
                                        top: '50%', 
                                        right: '40px', 
                                        transform: 'translateY(-50%)', 
                                        background: '#43a047', 
                                        color: '#fff', 
                                        padding: '24px', 
                                        borderRadius: '12px', 
                                        minWidth: '120px', 
                                        fontSize: '1.5em', 
                                        fontWeight: 'bold', 
                                        textAlign: 'center', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                                        zIndex: 1000 }}>
                                        <span>POWER OVERWHELMING !!!</span>
                                    </div>
                                );
                            } else if (dilution === 100) {
                                return (
                                    <div style={{ 
                                        position: 'fixed', 
                                        top: '50%', 
                                        right: '40px', 
                                        transform: 'translateY(-50%)', 
                                        background: '#ffe082', 
                                        color: '#333', 
                                        padding: '24px', 
                                        borderRadius: '12px', 
                                        minWidth: '120px', 
                                        fontSize: '1.5em', 
                                        fontWeight: 'bold', 
                                        textAlign: 'center', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                                        zIndex: 1000 }}>
                                        <span>Beware of bloating.</span>
                                    </div>
                                );
                            } else if (pain === 100) {
                                return (
                                    <div style={{ 
                                        position: 'fixed', 
                                        top: '50%', 
                                        right: '40px', 
                                        transform: 'translateY(-50%)', 
                                        background: '#333', 
                                        color: '#fff', 
                                        padding: '24px', 
                                        borderRadius: '12px', 
                                        minWidth: '120px', 
                                        fontSize: '1.5em', 
                                        fontWeight: 'bold', 
                                        textAlign: 'center', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                                        zIndex: 1000 }}>
                                        <span>It is recommended to visit a doctor ASAP!</span>
                                    </div>
                                );
                            } else if (pain === 50 && caffeine === 50 && dilution === 50 && energy === 50 && (painChanged || caffeineChanged || dilutionChanged || energyChanged)) {
                                return (
                                    <div style={{ 
                                        position: 'fixed', 
                                        top: '50%', 
                                        right: '40px', 
                                        transform: 'translateY(-50%)', 
                                        background: '#333', 
                                        color: '#fff', 
                                        padding: '24px', 
                                        borderRadius: '12px', 
                                        minWidth: '120px', 
                                        fontSize: '1.5em', 
                                        fontWeight: 'bold', 
                                        textAlign: 'center', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
                                        zIndex: 1000 }}>
                                        <span>🎉 Congratulations! 🎉<br /><br />You've achieved balance!</span>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })()}
                        {/* New beautiful italic box bottom-right - always visible */}
                        <div style={{
                            position: 'fixed',
                            right: '48px',
                            bottom: '48px',
                            background: 'rgba(251, 247, 235, 0.95)',
                            color: '#6d4c41',
                            fontFamily: 'Georgia, Times New Roman, serif',
                            fontStyle: 'italic',
                            fontSize: '0.9em',
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
        </>
    );
}
export default App;