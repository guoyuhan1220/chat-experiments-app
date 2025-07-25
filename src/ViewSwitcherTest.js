import React, { useState } from 'react';
import ViewSwitcher from './components/ViewSwitcher';

function ViewSwitcherTest() {
  const [isCompact, setIsCompact] = useState(false);

  const handleToggle = () => {
    setIsCompact(prev => !prev);
    console.log(`View switched to: ${!isCompact ? 'Compact' : 'Focus'}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ViewSwitcher Component Test</h1>
      <p>Current View: {isCompact ? 'Compact' : 'Focus'}</p>
      <ViewSwitcher isCompact={isCompact} onToggle={handleToggle} />
    </div>
  );
}

export default ViewSwitcherTest;