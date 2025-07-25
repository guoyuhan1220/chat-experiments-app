import React, { useState } from 'react';
import ToggleButton from './components/ToggleButton';

function ToggleButtonTest() {
  const [activeOption, setActiveOption] = useState('option1');

  return (
    <div style={{ padding: '20px' }}>
      <h1>ToggleButton Component Test</h1>
      <p>Active Option: {activeOption}</p>
      <ToggleButton 
        activeOption={activeOption}
        onToggleChange={setActiveOption}
      />
    </div>
  );
}

export default ToggleButtonTest;