import React, { useState, useEffect } from 'react';
import './ProductTour.css';

const ProductTour = ({ isActive, onClose, currentStep, onNext, onPrev, isFinishing }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const tourSteps = [
    {
      title: "Mode Switcher",
      content: "Choose between AI only, Quick resource, or Web search modes",
      target: "mode-switcher",
      position: "bottom"
    },
    {
      title: "File Upload",
      content: "Upload files to generate useful insights",
      target: "file-upload-btn",
      position: "bottom"
    },
    {
      title: "Run Action",
      content: "Execute actions on your content",
      target: "action-btn",
      position: "bottom"
    },
    {
      title: "Run Workflow",
      content: "Start automated workflows",
      target: "flow-btn",
      position: "bottom"
    }
  ];

  const calculateTooltipPosition = (targetId, position) => {
    const element = document.getElementById(targetId);
    if (!element) return { top: 100, left: 100 };
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    let top, left;
    
    switch (position) {
      case 'bottom':
        top = rect.bottom + scrollTop + 20;
        left = rect.left + scrollLeft + (rect.width / 2) - 150;
        break;
      case 'top':
        top = rect.top + scrollTop - 150;
        left = rect.left + scrollLeft + (rect.width / 2) - 150;
        break;
      default:
        top = rect.bottom + scrollTop + 20;
        left = rect.left + scrollLeft + (rect.width / 2) - 150;
    }
    
    return { top, left };
  };

  useEffect(() => {
    if (isActive && tourSteps[currentStep]) {
      const position = calculateTooltipPosition(
        tourSteps[currentStep].target,
        tourSteps[currentStep].position
      );
      setTooltipPosition(position);
    }
  }, [isActive, currentStep]);



  if (!isActive) return null;

  const getTourButtonPosition = () => {
    const tourBtn = document.querySelector('.tour-icon-btn');
    if (!tourBtn) return { top: 0, left: 0 };
    const rect = tourBtn.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  };

  return (
    <div 
      className={`tour-tooltip hotspot ${isFinishing ? 'finishing' : ''}`}
      style={{
        position: 'absolute',
        top: isFinishing ? getTourButtonPosition().top : tooltipPosition.top,
        left: isFinishing ? getTourButtonPosition().left : tooltipPosition.left
      }}
    >
      <div className={`tooltip-arrow ${tourSteps[currentStep].position}`} />
      <div className="tour-header">
        <h3>{tourSteps[currentStep].title}</h3>
        <button className="tour-close" onClick={onClose}>×</button>
      </div>
      <div className="tour-gif-placeholder">
        <div className="gif-placeholder">GIF</div>
      </div>
      <p>{tourSteps[currentStep].content}</p>
      <div className="tour-footer">
        <span className="tour-progress">
          {currentStep + 1} / {tourSteps.length}
        </span>
        <div className="tour-controls">
          {currentStep > 0 && (
            <button onClick={onPrev}>Previous</button>
          )}
          <button onClick={onNext}>
            {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTour;