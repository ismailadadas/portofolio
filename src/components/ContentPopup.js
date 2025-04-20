import React, { useEffect, useState, useRef } from 'react';
import { playPopupOpenSound, playPopupCloseSound } from '../utils/sound';
import MuteButton from './MuteButton';

const ContentPopup = ({ title, content, isOpen, onClose, buttonPosition, zIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [currentY, setCurrentY] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Reset position to bottom before sliding up
      setCurrentY(window.innerHeight);
      setIsVisible(true);
      // Start sliding up after a small delay
      setTimeout(() => {
        setCurrentY(0);
      }, 50);
      playPopupOpenSound();
    } else {
      setIsVisible(false);
      playPopupCloseSound();
    }
  }, [isOpen]);

  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!dragStart) return;
    
    const currentTouch = e.touches[0].clientY;
    const diff = currentTouch - dragStart;
    
    if (diff > 0) { // Only allow dragging down
      setCurrentY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (currentY > 100) { // If dragged down more than 100px, close
      onClose();
    } else {
      setCurrentY(0);
    }
    setDragStart(null);
  };

  if (!isOpen) return null;

  const popupStyle = {
    position: 'fixed',
    zIndex: 50 + (zIndex * 10),
    ...(isMobile ? {
      bottom: 0,
      left: 0,
      right: 0,
      height: '80vh',
      transform: `translateY(${currentY}px)`,
      transition: dragStart ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      willChange: 'transform',
    } : {
      top: buttonPosition.y,
      left: buttonPosition.x,
      transform: isVisible ? 'scale(1)' : 'scale(0.75)',
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-out',
      opacity: isVisible ? 1 : 0,
    })
  };

  return (
    <div
      style={popupStyle}
      className={`bg-white dark:bg-gray-800 rounded-t-xl shadow-xl overflow-hidden ${
        isMobile ? 'w-full' : 'w-96'
      }`}
    >
      {isMobile ? (
        <div 
          ref={panelRef}
          className="relative h-full flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {content}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
              <button
                onClick={() => {
                  playPopupCloseSound();
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPopup; 