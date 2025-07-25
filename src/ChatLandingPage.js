import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import SuggestedPromptGroup from './components/SuggestedPromptGroup';
import ProductTour from './components/ProductTour';
import './ChatLandingPage.css';

const ChatLandingPage = () => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const handleNextStep = () => {
    if (tourStep < 3) {
      setTourStep(tourStep + 1);
    } else {
      setIsFinishing(true);
      setTimeout(() => {
        setIsTourActive(false);
        setTourStep(0);
        setIsFinishing(false);
      }, 1500);
    }
  };

  const [isFinishing, setIsFinishing] = useState(false);

  const handlePrevStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };

  const handleCloseTour = () => {
    setIsTourActive(false);
    setTourStep(0);
  };

  return (
    <div className="chat-landing">
      <header className="chat-header">
        <button 
          className="tour-icon-btn"
          onClick={() => setIsTourActive(true)}
          title="Start Product Tour"
        >
          🎯
        </button>
      </header>
      <div className="chat-content">
        <div className="chat-panel">
        <div className="welcome-message">
          <h1>Good morning, let's chat</h1>
        </div>
        <ChatBox tourStep={isTourActive ? tourStep : -1} />
        <SuggestedPromptGroup 
          title="QUICK STARTERS"
          prompts={[
            { icon: '/icons/action.svg', text: "What's the assistant capable of?" },
            { icon: '/icons/action.svg', text: 'Upload a file to generate useful insights' },
            { icon: '/icons/action.svg', text: 'Start a new research project' }
          ]}
          onPromptClick={(text) => console.log('Clicked:', text)}
        />
        </div>
      </div>
      {isTourActive && (
        <ProductTour 
          isActive={isTourActive}
          currentStep={tourStep}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          onClose={handleCloseTour}
          isFinishing={isFinishing}
        />
      )}
    </div>
  );
};

export default ChatLandingPage;