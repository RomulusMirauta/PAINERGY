import React from 'react';

interface SliderValueBubbleProps {
  value: number;
  position: number; // px from bottom
  bubbleHeight: number;
  mobile?: boolean;
  margin?: number;
  sliderHeightPx?: number;
}

const SliderValueBubble: React.FC<SliderValueBubbleProps> = ({ value, position, bubbleHeight, mobile = false, margin = 8, sliderHeightPx = 320 }) => {
  // Clamp position so bubble doesn't touch min/max
  let bubbleBottom = position;
  // Smooth transition for low values (0-5)
  if (value === 0) {
    bubbleBottom = position;
  } else if (value > 0 && value <= 5) {
    // Interpolate between initial position and clamped position for a smoother movement
    const clamped = Math.max(position, margin + bubbleHeight / 2);
    bubbleBottom = position + (clamped - position) * (value / 5);
  } else if (value >= 95 && value < 100) {
    // Smooth transition for high values (95-99)
    const maxClamped = sliderHeightPx - bubbleHeight - margin;
    bubbleBottom = position + (maxClamped - position) * ((value - 95) / 5);
  } else if (value === 100) {
    // Special case: Pain slider on mobile, clamp lower
    if (mobile && window.location.pathname.includes('PainSlider')) {
      bubbleBottom = sliderHeightPx - bubbleHeight - margin * 2;
      if (bubbleBottom < margin) bubbleBottom = margin;
    } else {
      bubbleBottom = sliderHeightPx - bubbleHeight - margin;
      if (bubbleBottom < margin) bubbleBottom = margin;
    }
  } else {
    bubbleBottom = Math.max(position, margin + bubbleHeight / 2);
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: `${bubbleBottom}px`,
        transform: 'translateX(-50%)',
        background: '#222',
        color: '#fff',
        borderRadius: '50%',
        width: mobile ? '44px' : '56px',
        height: mobile ? '44px' : '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.3em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1,
      }}
    >
      {Math.round(value)}
    </div>
  );
};

export default SliderValueBubble;
