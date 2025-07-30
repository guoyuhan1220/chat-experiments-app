import React, { useState } from 'react';
import ProductTour from './ProductTour';
import './ComponentSideMenu.css';

const ComponentSideMenu = ({ onComponentSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);

  const components = [
    { id: 'chat-box', name: 'Chat Box', icon: '💬' },
    { id: 'agent-picker', name: 'Agent Picker', icon: '🤖' },
    { id: 'mode-switcher', name: 'Mode Switcher', icon: '🔄' },
    { id: 'view-switcher', name: 'View Switcher', icon: '👁️' },
    { id: 'suggested-prompt', name: 'Suggested Prompt', icon: '💡' },
    { id: 'product-tour', name: 'Product Tour', icon: '🎯' }
  ];

  const handleComponentSelect = (id) => {
    if (id === 'product-tour') {
      setShowTour(true);
      setIsOpen(false);
    } else {
      onComponentSelect(id);
    }
  };

  return (
    <>
      <button 
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      <div className={`component-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h3>Components</h3>
        </div>
        
        <div className="menu-items">
          {components.map(component => (
            <button
              key={component.id}
              className="menu-item"
              onClick={() => handleComponentSelect(component.id)}
            >
              <span className="menu-icon">{component.icon}</span>
              <span className="menu-name">{component.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {isOpen && <div className="menu-overlay" onClick={() => setIsOpen(false)} />}
      
      <ProductTour 
        isActive={showTour} 
        onComplete={() => setShowTour(false)} 
      />
    </>
  );
};

export default ComponentSideMenu;