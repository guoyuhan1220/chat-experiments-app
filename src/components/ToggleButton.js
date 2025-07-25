import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ activeOption, onToggleChange }) => {
  return (
    <div className="toggle-group">
      <button 
        className={`toggle-btn ${activeOption === 'option1' ? 'active' : ''}`}
        onClick={() => onToggleChange('option1')}
      >
        <img src="/icons/ai mode.svg" alt="AI Mode" width="16" height="16" />
      </button>
      <button 
        className={`toggle-btn ${activeOption === 'option2' ? 'active' : ''}`}
        onClick={() => onToggleChange('option2')}
      >
        <img src="/icons/quick resource.svg" alt="Quick Resource" width="16" height="16" />
      </button>
      <button 
        className={`toggle-btn ${activeOption === 'option3' ? 'active' : ''}`}
        onClick={() => onToggleChange('option3')}
      >
        <img src="/icons/globe.svg" alt="Globe" width="16" height="16" />
      </button>
    </div>
  );
};

export default ToggleButton;