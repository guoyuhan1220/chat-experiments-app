import React, { useState } from 'react';
import './ResourcePicker.css';

const ResourcePicker = ({ selectedResource, onResourceChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const resources = [
    { value: 'all', label: 'All resources', icon: '' },
    { value: 'dashboard', label: 'Dashboard', icon: '📊' },
    { value: 'space', label: 'Space', icon: '🏢' },
    { value: 'topic', label: 'Topic', icon: '💬' },
    { value: 'document', label: 'Document', icon: '📄' },
    { value: 'analysis', label: 'Analysis', icon: '📈' }
  ];

  const selectedItem = resources.find(r => r.value === selectedResource) || resources[0];

  const handleSelect = (resource) => {
    onResourceChange(resource.value);
    setIsOpen(false);
  };

  return (
    <div className="resource-picker-container">
      <div 
        className="resource-picker"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem.icon && <span className="resource-icon">{selectedItem.icon}</span>}
        <span className="resource-label">{selectedItem.label}</span>
        <span className="dropdown-arrow">▼</span>
      </div>
      
      {isOpen && (
        <div className="resource-dropdown">
          {resources.map(resource => (
            <div
              key={resource.value}
              className={`resource-option ${resource.value === selectedResource ? 'selected' : ''}`}
              onClick={() => handleSelect(resource)}
            >
              {resource.icon && <span className="resource-icon">{resource.icon}</span>}
              <span className="resource-label">{resource.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcePicker;