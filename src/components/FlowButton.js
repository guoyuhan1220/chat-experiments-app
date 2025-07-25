import React from 'react';
import './FlowButton.css';

const FlowButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="toolbar-btn">
      <img src="/icons/flow.svg" alt="Flow" width="16" height="16" />
    </button>
  );
};

export default FlowButton;