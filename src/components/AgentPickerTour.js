import React, { useState, useEffect } from 'react';
import './ProductTour.css';

const AgentPickerTour = ({ isActive, onClose }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const calculateTooltipPosition = () => {
    const element = document.getElementById('agent-picker');
    if (!element) return { top: 100, left: 100 };
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    const top = rect.bottom + scrollTop + 20;
    const left = rect.left + scrollLeft + (rect.width / 2) - 150;
    
    return { top, left };
  };

  useEffect(() => {
    if (isActive) {
      const position = calculateTooltipPosition();
      setTooltipPosition(position);
      
      // Add highlight class to agent picker container
      const element = document.getElementById('agent-picker');
      if (element && element.parentElement) {
        element.parentElement.classList.add('tour-highlight');
      }
    }
    
    return () => {
      // Remove highlight class when component unmounts or becomes inactive
      const element = document.getElementById('agent-picker');
      if (element && element.parentElement) {
        element.parentElement.classList.remove('tour-highlight');
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div 
      className="tour-tooltip hotspot"
      style={{
        position: 'absolute',
        top: tooltipPosition.top,
        left: tooltipPosition.left
      }}
    >
      <div className="tooltip-arrow bottom" />
      <div className="tour-header">
        <h3>Agent Picker</h3>
        <button className="tour-close" onClick={onClose}>×</button>
      </div>
      <div className="tour-gif-placeholder">
        <div className="gif-placeholder">GIF</div>
      </div>
      <p>Build custom agents with different response styles and knowledge. Switch between agents to chat with specialized assistants.</p>
      <div className="tour-footer">
        <div className="tour-controls">
          <button onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  );
};

export default AgentPickerTour;