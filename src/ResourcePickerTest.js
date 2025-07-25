import React, { useState } from 'react';
import ResourcePicker from './components/ResourcePicker';

function ResourcePickerTest() {
  const [selectedResource, setSelectedResource] = useState('text');

  return (
    <div style={{ padding: '20px' }}>
      <h1>ResourcePicker Component Test</h1>
      <p>Selected Resource: {selectedResource}</p>
      <ResourcePicker 
        selectedResource={selectedResource}
        onResourceChange={setSelectedResource}
      />
    </div>
  );
}

export default ResourcePickerTest;