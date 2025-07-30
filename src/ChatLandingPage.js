import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import AgentPicker from './components/AgentPicker';
import SuggestedPromptGroup from './components/SuggestedPromptGroup';
import ProductTour from './components/ProductTour';
import OnboardingChecklistTest from './OnboardingChecklistTest';
import AgentPickerTour from './components/AgentPickerTour';
import './ChatLandingPage.css';

const ChatLandingPage = () => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [showOnboardingTooltip, setShowOnboardingTooltip] = useState(false);
  const [tourFromOnboarding, setTourFromOnboarding] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('my-assistant');
  const [showAgentPickerTour, setShowAgentPickerTour] = useState(false);

  const handleAgentChange = (agentId) => {
    setSelectedAgent(agentId);
    console.log('Agent changed to:', agentId);
  };

  const handleNextStep = () => {
    if (tourStep < 3) {
      setTourStep(tourStep + 1);
    } else {
      setIsFinishing(true);
      setTimeout(() => {
        setIsTourActive(false);
        setTourStep(0);
        setIsFinishing(false);
        setTourFromOnboarding(false);
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
    setTourFromOnboarding(false);
  };

  return (
    <div className="chat-landing">
      <header className="chat-header">
        <button 
          className="tour-icon-btn"
          onClick={() => {
            setIsTourActive(true);
            setTourFromOnboarding(false);
          }}
          title="Start Product Tour"
        >
          🎯
        </button>
        <div className="onboarding-button-container">
          <button 
            className="onboarding-icon-btn"
            onClick={() => setShowOnboardingTooltip(!showOnboardingTooltip)}
            title="View Onboarding Tasks"
          >
            <img src="/icons/Onboarding checklist.svg" alt="Onboarding" />
          </button>
          {showOnboardingTooltip && (
            <OnboardingChecklistTest 
              isTooltip={true}
              onClose={() => setShowOnboardingTooltip(false)}
              onStartTour={(step) => {
                setShowOnboardingTooltip(false);
                setIsTourActive(true);
                setTourStep(typeof step === 'number' ? step : 0);
                setTourFromOnboarding(true);
              }}
              onShowAgentPickerTour={(show) => {
                setShowOnboardingTooltip(false);
                setShowAgentPickerTour(show);
              }}
            />
          )}
        </div>
      </header>
      <div className="chat-content">
        <div className="chat-panel">
        <div className="welcome-message">
          <h1>Good morning, let's chat</h1>
        </div>
        <AgentPicker 
          selectedAgent={selectedAgent}
          onAgentChange={handleAgentChange}
        />
        <ChatBox tourStep={isTourActive ? tourStep : -1} />
        <div style={{ marginTop: '24px' }}>
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
      </div>
      {isTourActive && (
        <ProductTour 
          isActive={isTourActive}
          currentStep={tourStep}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          onClose={handleCloseTour}
          isFinishing={isFinishing}
          hideFooter={tourFromOnboarding}
        />
      )}
      
      <AgentPickerTour 
        isActive={showAgentPickerTour}
        onClose={() => setShowAgentPickerTour(false)}
      />

    </div>
  );
};

export default ChatLandingPage;