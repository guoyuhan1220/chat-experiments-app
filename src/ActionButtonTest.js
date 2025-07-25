import React, { useState } from 'react';
import ActionButton from './components/ActionButton';

function ActionButtonTest() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    console.log('Action button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ActionButton Component Test</h1>
      <p>Click Count: {clickCount}</p>
      <ActionButton onClick={handleClick} />
    </div>
  );
}

export default ActionButtonTest;