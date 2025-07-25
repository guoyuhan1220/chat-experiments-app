import React, { useState, useEffect } from 'react';
import './ProductTour.css';

const ProductTourTest = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
      target: "file-upload",
      position: "bottom"
    },
    {
      title: "Run Action",
      content: "Execute actions on your content",
      target: "action-button",
      position: "bottom"
    },
    {
      title: "Run Workflow",
      content: "Start automated workflows",
      target: "flow-button",
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
        top = rect.bottom + scrollTop + 10;
        left = rect.left + scrollLeft + (rect.width / 2) - 150;
        break;
      case 'top':
        top = rect.top + scrollTop - 120;
        left = rect.left + scrollLeft + (rect.width / 2) - 150;
        break;
      case 'right':
        top = rect.top + scrollTop + (rect.height / 2) - 60;
        left = rect.right + scrollLeft + 10;
        break;
      case 'left':
        top = rect.top + scrollTop + (rect.height / 2) - 60;
        left = rect.left + scrollLeft - 310;
        break;
      default:
        top = rect.bottom + scrollTop + 10;
        left = rect.left + scrollLeft;
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

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
      setCurrentStep(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeTour = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  return (
    <div className="product-tour-test">
      <h2>Product Tour Component</h2>
      
      <button className="start-tour-btn" onClick={startTour}>
        🎯 Start Product Tour
      </button>

      <div className="demo-elements">
        <div id="mode-switcher" className="demo-element">🔘 Mode Switcher</div>
        <div id="file-upload" className="demo-element">📁 File Upload</div>
        <div id="action-button" className="demo-element">⚡ Action Button</div>
        <div id="flow-button" className="demo-element">🔄 Flow Button</div>
      </div>

      {isActive && (
        <>
          <div className="tour-overlay" />
          <div 
            className="tour-highlight"
            style={{
              position: 'absolute',
              ...(() => {
                const element = document.getElementById(tourSteps[currentStep].target);
                if (!element) return {};
                const rect = element.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                return {
                  top: rect.top + scrollTop - 4,
                  left: rect.left + scrollLeft - 4,
                  width: rect.width + 8,
                  height: rect.height + 8
                };
              })()
            }}
          />
          <div 
            className="tour-tooltip hotspot"
            style={{
              position: 'absolute',
              top: tooltipPosition.top,
              left: tooltipPosition.left
            }}
          >
            <div className="tooltip-arrow" />
            <div className="tour-header">
              <h3>{tourSteps[currentStep].title}</h3>
              <button className="tour-close" onClick={closeTour}>×</button>
            </div>
            <p>{tourSteps[currentStep].content}</p>
            <div className="tour-footer">
              <span className="tour-progress">
                {currentStep + 1} / {tourSteps.length}
              </span>
              <div className="tour-controls">
                {currentStep > 0 && (
                  <button onClick={prevStep}>Previous</button>
                )}
                <button onClick={nextStep}>
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductTourTest;