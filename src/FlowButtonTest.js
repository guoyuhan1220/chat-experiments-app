import React, { useState } from 'react';
import FlowButton from './components/FlowButton';

function FlowButtonTest() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    console.log('Flow button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>FlowButton Component Test</h1>
      <p>Click Count: {clickCount}</p>
      <FlowButton onClick={handleClick} />
    </div>
  );
}

export default FlowButtonTest;