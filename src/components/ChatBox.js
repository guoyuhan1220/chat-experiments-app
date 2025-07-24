import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    console.log('Send clicked:', message);
    setMessage('');
  };

  const handleClear = () => {
    setMessage('');
  };

  return (
    <div className="chat-box">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="chat-input"
      />
      <div className="chat-buttons">
        <button onClick={handleSend} className="send-btn">
          Send
        </button>
        <button onClick={handleClear} className="clear-btn">
          Clear
        </button>
      </div>
    </div>
  );
};

export default ChatBox;