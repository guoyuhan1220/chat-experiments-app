import React, { useState } from 'react';
import OnboardingChecklistTest from './OnboardingChecklistTest';
import AgentPickerTour from './components/AgentPickerTour';
import ProductTour from './components/ProductTour';

const OnboardingWithTourTest = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showAgentPickerTour, setShowAgentPickerTour] = useState(false);
  const [showProductTour, setShowProductTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const handleStartTour = (step) => {
    setShowProductTour(true);
    setTourStep(step);
  };

  const handleNextTour = () => {
    if (tourStep < 3) {
      setTourStep(tourStep + 1);
    } else {
      setShowProductTour(false);
    }
  };

  const handlePrevTour = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', background: '#fcfcfc' }}>
      <h1>Onboarding with Tour Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowOnboarding(true)}>Show Onboarding</button>
        <button onClick={() => setShowAgentPickerTour(true)} style={{ marginLeft: '10px' }}>
          Test Agent Picker Tour
        </button>
      </div>

      {/* Mock agent picker for testing */}
      <div id="agent-picker" style={{ 
        background: '#F9F5FF', 
        padding: '12px', 
        borderRadius: '8px', 
        width: '200px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>✨ My assistant</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.6339 7.44418C2.18963 8.10864 2.6659 9 3.4652 9H8.53599C9.33439 9 9.81084 8.11045 9.3684 7.44585L6.83852 3.64561C6.44325 3.05186 5.57126 3.05099 5.1748 3.64394L2.6339 7.44418Z" fill="black" fillOpacity="0.63"/>
        </svg>
      </div>

      {showOnboarding && (
        <OnboardingChecklistTest
          onClose={() => setShowOnboarding(false)}
          onStartTour={handleStartTour}
          onShowAgentPickerTour={setShowAgentPickerTour}
        />
      )}

      <AgentPickerTour 
        isActive={showAgentPickerTour}
        onClose={() => setShowAgentPickerTour(false)}
      />

      <ProductTour
        isActive={showProductTour}
        currentStep={tourStep}
        onClose={() => setShowProductTour(false)}
        onNext={handleNextTour}
        onPrev={handlePrevTour}
      />
    </div>
  );
};

export default OnboardingWithTourTest;