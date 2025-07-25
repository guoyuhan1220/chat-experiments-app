import React from 'react';
import './SendButton.css';

const SendButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="send-btn">
      <img src="/icons/Send.svg" alt="Send" width="16" height="16" />
    </button>
  );
};

export default SendButton;