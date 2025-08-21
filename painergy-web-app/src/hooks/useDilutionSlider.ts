import { useState, useRef, useEffect } from 'react';

export function useDilutionSlider(cascadeIndex: number, isInfoOpen: boolean) {
  const [infoPos, setInfoPos] = useState({ x: 40, y: 40 + cascadeIndex * 64 });
  useEffect(() => {
    setInfoPos({ x: 40, y: 40 + cascadeIndex * 240 });
  }, [cascadeIndex, isInfoOpen]);
  useEffect(() => {
    setInfoPos(pos => ({ x: pos.x, y: 40 + cascadeIndex * 150 }));
  }, [cascadeIndex]);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const [showValue, setShowValue] = useState(false);

  const handleSliderMouseDown = () => setShowValue(true);
  const handleSliderMouseUp = () => setShowValue(false);
  const handleSliderTouchStart = () => setShowValue(true);
  const handleSliderTouchEnd = () => setShowValue(false);

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

  return {
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
  };
}
