import React, { useState } from 'react';
import './ResourceSelectorMenu.css';

const ResourceSelectorMenu = ({ onResourceSelect, onClose }) => {
  const [selectedResource, setSelectedResource] = useState('all');

  const resources = [
    { 
      id: 'all', 
      title: 'All resources', 
      subtitle: '2147210041',
      icon: '📋',
      isSelected: true 
    },
    { 
      id: 'dashboard1', 
      title: 'My dashboard', 
      subtitle: 'Recently viewed',
      icon: '📊' 
    },
    { 
      id: 'report1', 
      title: 'Financial report', 
      subtitle: 'Recently viewed',
      icon: '📊' 
    }
  ];

  const handleResourceClick = (resourceId) => {
    setSelectedResource(resourceId);
  };

  const handleChooseResource = () => {
    if (onResourceSelect) {
      onResourceSelect(selectedResource);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="resource-selector-menu">
      <div className="menu-header">
        <h2>Choose resource</h2>
      </div>
      
      <div className="resource-list">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className={`resource-item ${selectedResource === resource.id ? 'selected' : ''}`}
            onClick={() => handleResourceClick(resource.id)}
          >
            <div className="resource-icon">{resource.icon}</div>
            <div className="resource-content">
              <div className="resource-title">{resource.title}</div>
              <div className="resource-subtitle">{resource.subtitle}</div>
            </div>
            {selectedResource === resource.id && (
              <div className="check-icon">✓</div>
            )}
          </div>
        ))}
      </div>

      <div className="menu-footer">
        <button className="choose-resource-btn" onClick={handleChooseResource}>
          <span className="plus-icon">+</span>
          Choose resource
        </button>
      </div>
    </div>
  );
};

export default ResourceSelectorMenu;