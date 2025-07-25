import React from 'react';
import './ResourcePicker.css';

const ResourcePicker = ({ selectedResource, onResourceChange }) => {
  const resources = ['Text', 'Image', 'File'];

  return (
    <select 
      value={selectedResource} 
      onChange={(e) => onResourceChange(e.target.value)}
      className="resource-picker"
    >
      {resources.map(resource => (
        <option key={resource} value={resource.toLowerCase()}>
          {resource}
        </option>
      ))}
    </select>
  );
};

export default ResourcePicker;