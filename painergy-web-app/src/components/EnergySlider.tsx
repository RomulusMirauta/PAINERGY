import React, { useState, useRef } from 'react';
import { useEnergySlider } from '../hooks/useEnergySlider';
import SliderValueBubble from './SliderValueBubble';

interface EnergySliderProps {
    value: number;
    onChange: (value: number) => void;
    isInfoOpen: boolean;
    cascadeIndex: number;
    onInfoOpen: (open: boolean) => void;
    sliderWidth?: number;
    sliderHeight?: number;
}

const EnergySlider: React.FC<EnergySliderProps> = ({ value, onChange, isInfoOpen, cascadeIndex, onInfoOpen, sliderWidth = 80, sliderHeight = 320 }) => {
        const {
            infoPos,
            setInfoPos,
            showValue,
            setShowValue,
            handleSliderMouseDown,
            handleSliderMouseUp,
            handleSliderTouchStart,
            handleSliderTouchEnd,
            handleMouseDown,
            handleMouseMove,
            handleMouseUp,
        } = useEnergySlider(cascadeIndex, isInfoOpen);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(Number(event.target.value));
        };

        const mobile = window.innerWidth <= 480;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ position: 'relative', width: sliderWidth, height: sliderHeight, background: '#eafbe7', borderRadius: '16px', boxShadow: '0 4px 24px 0 rgba(67,185,67,0.08)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
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
                        width: mobile ? '170px' : '280px',
                        height: '18px',
                        zIndex: 2,
                        background: 'transparent',
                        appearance: 'none',
                        borderRadius: '9px',
                        WebkitAppearance: 'none',
                    }}
                    className="energy-slider"
                />
                {/* Value bubble (always show, smooth at min/max) */}
                {(() => {
                  const bubbleHeight = mobile ? 44 : 56;
                  const sliderHeightPx = sliderHeight;
                  const margin = 8;
                  // For value 0, set bubble lower (like Pain slider)
                  let position = (value / 100) * (sliderHeightPx - bubbleHeight);
                  if (value === 0) position = margin;
                  return (
                    <SliderValueBubble
                      value={value}
                      position={position}
                      bubbleHeight={bubbleHeight}
                      mobile={mobile}
                      margin={margin}
                      sliderHeightPx={sliderHeightPx}
                    />
                  );
                })()}
            </div>
            <div style={{
                textAlign: 'center',
                marginTop: '12px',
                fontWeight: 700,
                fontSize: mobile ? '1em' : '1.2em',
                letterSpacing: '2px',
                color: '#43b943',
            }}>
                ENERGY
            </div>
            <button
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    marginTop: '8px',
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={() => onInfoOpen(!isInfoOpen)}
            >
                <span style={{
                    display: 'inline-block',
                    width: mobile ? '22px' : '32px',
                    height: mobile ? '22px' : '32px',
                    borderRadius: '50%',
                    border: '2px solid #2196f3',
                    background: '#10131a',
                    color: '#2196f3',
                    fontWeight: 600,
                    fontSize: mobile ? '1em' : '1.4em',
                    textAlign: 'center',
                    lineHeight: mobile ? '22px' : '32px',
                    boxSizing: 'border-box',
                }}>i</span>
            </button>
            {isInfoOpen && (
                <div
                    style={{
                        position: 'fixed',
                        left: infoPos.x,
                        top: (window.innerWidth <= 480 ? 120 : infoPos.y), // for mobile, appear lower under logo
                        background: '#222',
                        color: '#fff',
                        padding: '20px 32px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                        zIndex: 99999, // always above logo and all other elements
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