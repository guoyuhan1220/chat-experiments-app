import React from 'react';
import SuggestedPromptGroup from './components/SuggestedPromptGroup';

const SuggestedPromptTest = () => {
  const samplePrompts = [
    { icon: '/icons/action.svg', text: "What's the assistant capable of?" },
    { icon: '/icons/action.svg', text: 'Upload a file to generate useful insights' },
    { icon: '/icons/action.svg', text: 'Start a new research project' }
  ];

  const handlePromptClick = (promptText) => {
    console.log('Clicked prompt:', promptText);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Suggested Prompt Test</h1>
      <SuggestedPromptGroup 
        title="QUICK STARTERS"
        prompts={samplePrompts}
        onPromptClick={handlePromptClick}
      />
    </div>
  );
};

export default SuggestedPromptTest;