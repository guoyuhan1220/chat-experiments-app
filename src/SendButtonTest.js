import React, { useState } from 'react';
import SendButton from './components/SendButton';

function SendButtonTest() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    console.log('Send button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SendButton Component Test</h1>
      <p>Click Count: {clickCount}</p>
      <SendButton onClick={handleClick} />
    </div>
  );
}

export default SendButtonTest;