import React from 'react';
import './ActionButton.css';

const ActionButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="toolbar-btn">
      <img src="/icons/action.svg" alt="Action" width="16" height="16" />
    </button>
  );
};

export default ActionButton;