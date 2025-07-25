import React from 'react';
import ChatBox from './components/ChatBox';
import './components/ChatBox.css';

function ChatBoxTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ChatBox Component Test</h1>
      <ChatBox />
    </div>
  );
}

export default ChatBoxTest;