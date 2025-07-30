import React, { useEffect, useState } from 'react';

const TourTooltip = ({
  step,
  totalSteps,
  title,
  content,
  position,
  targetElement,
  onNext,
  onPrevious,
  onDismiss,
  showPrevious,
  isLastStep
}) => {
  const [tooltipStyle, setTooltipStyle] = useState({});

  useEffect(() => {
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const tooltipWidth = 300;
      const tooltipHeight = 200;
      
      let top, left;
      
      switch (position) {
        case 'bottom':
          top = rect.bottom + 16;
          left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
          break;
        case 'top':
          top = rect.top - tooltipHeight - 16;
          left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
          break;
        case 'right':
          top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
          left = rect.right + 16;
          break;
        case 'left':
          top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
          left = rect.left - tooltipWidth - 16;
          break;
        default:
          top = rect.bottom + 16;
          left = rect.left;
      }

      setTooltipStyle({
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 10002
      });
    }
  }, [targetElement, position]);

  return (
    <div className="tour-tooltip" style={tooltipStyle}>
      <div className="tour-tooltip-header">
        <h3>{title}</h3>
        <button className="tour-close-btn" onClick={onDismiss}>×</button>
      </div>
      
      <div className="tour-tooltip-content">
        <p>{content}</p>
      </div>
      
      <div className="tour-tooltip-footer">
        <div className="tour-step-indicator">
          {step} / {totalSteps}
        </div>
        
        <div className="tour-actions">
          <button className="tour-btn tour-btn-secondary" onClick={onDismiss}>
            Dismiss
          </button>
          {showPrevious && (
            <button className="tour-btn tour-btn-outline" onClick={onPrevious}>
              Previous
            </button>
          )}
          <button className="tour-btn tour-btn-primary" onClick={onNext}>
            {isLastStep ? 'Close' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourTooltip;