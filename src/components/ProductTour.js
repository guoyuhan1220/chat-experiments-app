import React, { useState, useEffect } from 'react';
import './ProductTour.css';

const ProductTour = ({ isActive, onClose, currentStep, onNext, onPrev, hideFooter = false }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const tourSteps = [
    {
      title: "Knowledge picker",
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
    },
    {
      title: "Agent Picker",
      content: "Build custom agents with different response styles and knowledge. Switch between agents to chat with specialized assistants.",
      target: "agent-picker",
      position: "bottom"
    }
  ];
  
  const agentPickerStep = {
    title: "Agent Picker",
    content: "Build custom agents with different response styles and knowledge. Switch between agents to chat with specialized assistants.",
    target: "agent-picker",
    position: "bottom"
  };

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
    if (isActive) {
      let step;
      if (currentStep === 'agent-picker') {
        step = agentPickerStep;
      } else if (tourSteps[currentStep]) {
        step = tourSteps[currentStep];
      }
      
      if (step) {
        const position = calculateTooltipPosition(step.target, step.position);
        setTooltipPosition(position);
      }
    }
  }, [isActive, currentStep]);



  if (!isActive) return null;

  const currentStepData = currentStep === 'agent-picker' ? agentPickerStep : tourSteps[currentStep];
  if (!currentStepData) return null;

  return (
    <div 
      className="tour-tooltip hotspot"
      style={{
        position: 'absolute',
        top: tooltipPosition.top,
        left: tooltipPosition.left
      }}
    >
      <div className={`tooltip-arrow ${currentStepData.position}`} />
      <div className="tour-header">
        <h3>{currentStepData.title}</h3>
        <button className="tour-close" onClick={onClose}>×</button>
      </div>
      <div className="tour-gif-placeholder">
        <div className="gif-placeholder">GIF</div>
      </div>
      <p>{currentStepData.content}</p>
      {!hideFooter && currentStep !== 'agent-picker' && (
        <div className="tour-footer">
          <span className="tour-progress">
            {currentStep + 1} / {tourSteps.length}
          </span>
          <div className="tour-controls">
            {currentStep > 0 && (
              <button onClick={onPrev}>Previous</button>
            )}
            <button onClick={onNext}>
              {currentStep === tourSteps.length - 1 ? 'Close' : 'Next'}
            </button>
          </div>
        </div>
      )}
      {currentStep === 'agent-picker' && (
        <div className="tour-footer">
          <div className="tour-controls">
            <button onClick={onClose}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTour;