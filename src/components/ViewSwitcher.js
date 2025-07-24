import React, { useState } from 'react';
import './ViewSwitcher.css';

const ViewSwitcher = () => {
  const [activeView, setActiveView] = useState('view1');

  const handleViewChange = (view) => {
    setActiveView(view);
    console.log('Switched to:', view);
  };

  return (
    <div className="view-switcher">
      <button 
        className={`view-btn ${activeView === 'view1' ? 'active' : ''}`}
        onClick={() => handleViewChange('view1')}
      >
        View 1
      </button>
      <button 
        className={`view-btn ${activeView === 'view2' ? 'active' : ''}`}
        onClick={() => handleViewChange('view2')}
      >
        View 2
      </button>
    </div>
  );
};

export default ViewSwitcher;