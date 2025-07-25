import React from 'react';
import './SuggestedPrompt.css';

const SuggestedPrompt = ({ icon, text, onClick }) => {
  return (
    <button className="suggested-prompt" onClick={onClick}>
      <div className="suggested-prompt-icon">
        <img src={icon} alt="" width="16" height="16" />
      </div>
      <span>{text}</span>
    </button>
  );
};

export default SuggestedPrompt;