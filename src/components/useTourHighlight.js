import { useEffect } from 'react';

export const useTourHighlight = (targetElement, isActive) => {
  useEffect(() => {
    if (!targetElement || !isActive) return;

    const highlight = document.querySelector('.tour-highlight');
    if (!highlight) return;

    const updateHighlight = () => {
      const rect = targetElement.getBoundingClientRect();
      highlight.style.top = `${rect.top - 4}px`;
      highlight.style.left = `${rect.left - 4}px`;
      highlight.style.width = `${rect.width + 8}px`;
      highlight.style.height = `${rect.height + 8}px`;
    };

    updateHighlight();
    
    const resizeObserver = new ResizeObserver(updateHighlight);
    resizeObserver.observe(targetElement);
    
    window.addEventListener('scroll', updateHighlight);
    window.addEventListener('resize', updateHighlight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateHighlight);
      window.removeEventListener('resize', updateHighlight);
    };
  }, [targetElement, isActive]);
};