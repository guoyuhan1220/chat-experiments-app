import React from 'react';
import SuggestedPrompt from './SuggestedPrompt';
import './SuggestedPromptGroup.css';

const SuggestedPromptGroup = ({ title, prompts, onPromptClick }) => {
  return (
    <div className="suggested-prompt-group">
      {title && <h3 className="prompt-group-title">{title}</h3>}
      <div className="prompt-chips">
        {prompts.map((prompt, index) => (
          <SuggestedPrompt
            key={index}
            icon={prompt.icon}
            text={prompt.text}
            onClick={() => onPromptClick(prompt.text)}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedPromptGroup;