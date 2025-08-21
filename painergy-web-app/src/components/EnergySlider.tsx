import React, { useState, useRef } from 'react';

interface EnergySliderProps {
    value: number;
    onChange: (value: number) => void;
    isInfoOpen: boolean;
    cascadeIndex: number;
    onInfoOpen: (open: boolean) => void;
}

const EnergySlider: React.FC<EnergySliderProps> = ({ value, onChange, isInfoOpen, cascadeIndex, onInfoOpen }) => {
    const [infoPos, setInfoPos] = useState({ x: 40, y: 40 + cascadeIndex * 64 });
    React.useEffect(() => {
        setInfoPos({ x: 40, y: 40 + cascadeIndex * 240 });
    }, [cascadeIndex, isInfoOpen]);
    React.useEffect(() => {
        setInfoPos(pos => ({ x: pos.x, y: 40 + cascadeIndex * 150 }));
    }, [cascadeIndex]);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const [showValue, setShowValue] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
    };

    // Show value bubble only while dragging
    const handleSliderMouseDown = () => setShowValue(true);
    const handleSliderMouseUp = () => setShowValue(false);
    const handleSliderTouchStart = () => setShowValue(true);
    const handleSliderTouchEnd = () => setShowValue(false);

    // Drag logic for info box
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        dragging.current = true;
        offset.current = {
            x: e.clientX - infoPos.x,
            y: e.clientY - infoPos.y
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMove = (e: MouseEvent) => {
        if (dragging.current) {
            setInfoPos({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y
            });
        }
    };
    const handleMouseUp = () => {
        dragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ position: 'relative', width: '80px', height: '320px', background: '#eafbe7', borderRadius: '16px', boxShadow: '0 4px 24px 0 rgba(67,185,67,0.08)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: `${(value/100)*100}%`,
                    background: '#43b943',
                    borderRadius: value >= 99 ? '16px' : '0 0 16px 16px', // fully rounded only when fill reaches/exceeds top
                    zIndex: 1,
                    transition: 'height 0.2s, border-radius 0.2s'
                }} />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleChange}
                    onMouseDown={handleSliderMouseDown}
                    onMouseUp={handleSliderMouseUp}
                    onTouchStart={handleSliderTouchStart}
                    onTouchEnd={handleSliderTouchEnd}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%) rotate(-90deg)',
                        width: '280px',
                        height: '18px',
                        zIndex: 2,
                        background: 'transparent',
                        appearance: 'none',
                        borderRadius: '9px',
                        WebkitAppearance: 'none',
                    }}
                />
                {showValue && (
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: value === 100 ? '296px' : `${(value/100)*272 + 24}px`,
                        transform: 'translateX(-50%)',
                        background: '#222',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.3em',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 3,
                    }}>{value}</div>
                )}
            </div>
            <div style={{ marginTop: '16px', fontWeight: 'bold', fontSize: '1.2em', letterSpacing: '2px', color: '#43b943ff', textTransform: 'uppercase', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                ENERGY
                <span style={{ marginTop: '4px', cursor: 'pointer', fontSize: '1.2em', color: '#fff', fontWeight: 'bold', alignSelf: 'center' }} title="Info about Energy" onClick={() => onInfoOpen(true)}>ℹ️</span>
            </div>
            {isInfoOpen && (
                <div
                    style={{
                        position: 'fixed',
                        left: infoPos.x,
                        top: infoPos.y,
                        background: '#222',
                        color: '#fff',
                        padding: '20px 32px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                        zIndex: 9999,
                        cursor: 'move',
                        minWidth: '200px'
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Energy Slider Info</span>
                        <button style={{ marginLeft: '16px', background: 'none', color: '#fff', border: 'none', fontSize: '1.2em', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); onInfoOpen(false); }}>✖</button>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                        This slider controls the energy level - desired/needed. ⚡<br />
                        Drag to adjust. You can move this info box around.
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnergySlider;