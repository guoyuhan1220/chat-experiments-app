import React from 'react';
import './ViewSwitcher.css';

const ViewSwitcher = ({ isCompact, onToggle }) => {
  return (
    <button className="view-switcher" onClick={onToggle}>
      <img 
        src={isCompact ? '/icons/Maximize.svg' : '/icons/Minimize.svg'} 
        alt={isCompact ? 'Focus' : 'Compact'}
        className="view-icon"
      />
      <span className="view-text">
        {isCompact ? 'Focus' : 'Compact'}
      </span>
    </button>
  );
};

export default ViewSwitcher;