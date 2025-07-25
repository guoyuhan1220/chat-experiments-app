import React, { useState, useEffect } from 'react';
import TourTooltip from './TourTooltip';
import { useTourHighlight } from './useTourHighlight';
import './ProductTour.css';

const ProductTour = ({ isActive, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState(null);

  const tourSteps = [
    {
      target: '[data-tour="mode-switcher"]',
      title: 'Choose a chat mode',
      content: 'Choose chat with AI only or chat about a dashboard or space or chat with web content.',
      position: 'bottom'
    },
    {
      target: '[data-tour="file-upload"]',
      title: 'Upload files',
      content: 'Upload documents, images, or other files to enhance your conversations.',
      position: 'bottom'
    },
    {
      target: '[data-tour="run-action"]',
      title: 'Run actions',
      content: 'Execute predefined actions to streamline your workflow.',
      position: 'bottom'
    },
    {
      target: '[data-tour="run-workflow"]',
      title: 'Run workflows',
      content: 'Trigger automated workflows to handle complex tasks.',
      position: 'bottom'
    }
  ];

  useEffect(() => {
    if (isActive && currentStep < tourSteps.length) {
      const targetElement = document.querySelector(tourSteps[currentStep].target);
      setHighlightedElement(targetElement);
    }
  }, [isActive, currentStep]);

  useTourHighlight(highlightedElement, isActive);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setHighlightedElement(null);
    onComplete();
  };

  if (!isActive) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      <div className="tour-overlay" />
      {highlightedElement && (
        <>
          <div className="tour-highlight" />
          <TourTooltip
            step={currentStep + 1}
            totalSteps={tourSteps.length}
            title={currentTourStep.title}
            content={currentTourStep.content}
            position={currentTourStep.position}
            targetElement={highlightedElement}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onDismiss={handleComplete}
            showPrevious={currentStep > 0}
            isLastStep={currentStep === tourSteps.length - 1}
          />
        </>
      )}
    </>
  );
};

export default ProductTour;