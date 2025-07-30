import React, { useState, useEffect } from 'react';
import './OnboardingChecklist.css';
import AgentPickerTour from './components/AgentPickerTour';

const OnboardingChecklistTest = ({ onClose, onStartTour, onShowAgentPickerTour, isTooltip = false }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('onboardingTasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: "Watch the tutorial video", completed: false, status: "start" },
      { id: 2, title: "Try Knowledge picker", completed: false, status: "start" },
      { id: 3, title: "Learn about switching between different chat agents", completed: false, status: "start" },
      { id: 4, title: "Learn what files you can upload", completed: false, status: "start" },
      { id: 5, title: "Run your first automation", completed: false, status: "start" }
    ];
  });
  const [showModal, setShowModal] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showProductTour, setShowProductTour] = useState(false);
  const [showAgentPickerTour, setShowAgentPickerTour] = useState(false);

  useEffect(() => {
    localStorage.setItem('onboardingTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAction = (taskId) => {
    // Mark task as completed when clicked
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: true }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('onboardingTasks', JSON.stringify(updatedTasks));
    
    if (taskId === 1) {
      setShowVideoModal(true);
    }
    
    if (taskId === 2) {
      setShowModal(false);
      onStartTour(0); // Show product tour at step 0 for knowledge picker
    }
    
    if (taskId === 3) {
      setShowModal(false);
      if (onShowAgentPickerTour) {
        onShowAgentPickerTour(true);
      } else {
        setShowAgentPickerTour(true);
      }
    }
  };
  
  const handleVideoClose = () => {
    setShowVideoModal(false);
  };

  const resetTasks = () => {
    const resetTasks = [
      { id: 1, title: "Watch the tutorial video", completed: false, status: "start" },
      { id: 2, title: "Try Knowledge picker", completed: false, status: "start" },
      { id: 3, title: "Learn about switching between different chat agents", completed: false, status: "start" },
      { id: 4, title: "Learn what files you can upload", completed: false, status: "start" },
      { id: 5, title: "Run your first automation", completed: false, status: "start" }
    ];
    setTasks(resetTasks);
    localStorage.setItem('onboardingTasks', JSON.stringify(resetTasks));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  if (!showModal) return null;

  if (isTooltip) {
    return (
      <div className="onboarding-tooltip">
        <div className="tooltip-arrow"></div>
        <div className="onboarding-modal">
          <div className="modal-header">
            <div className="header-content">
              <h2>Get started with Quick Chat</h2>
              <p>Complete these tasks to unlock the full potential of your AI assistant</p>
            </div>
            <button className="close-btn" onClick={() => { setShowModal(false); onClose(); }}>×</button>
          </div>

          <div className="video-section">
            <div className="video-placeholder">
              <div className="play-button" onClick={() => handleTaskAction(1)}>
                <div className="play-icon">▶</div>
              </div>
            </div>
          </div>

          <div className="tasks-section">
            {tasks.map((task, index) => (
              <div key={task.id} className={`task-row ${task.completed ? 'completed' : ''}`}>
                <div className="task-number">
                  {task.completed ? '✓' : `${index + 1}.`}
                </div>
                <div className="task-title">{task.title}</div>
                {(!task.completed || task.id === 1) && (
                  <button 
                    className={`task-btn ${task.completed ? 'completed-btn' : 'start-btn'}`}
                    onClick={() => handleTaskAction(task.id)}
                  >
                    {task.completed ? 'Rewatch' : (task.id === 1 ? 'Watch' : task.id === 2 ? 'Try' : 'Start')}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button className="dismiss-btn" onClick={resetTasks} style={{opacity: 0.5, fontSize: '12px', marginRight: '8px'}}>Reset</button>
            <button className="dismiss-btn" onClick={() => { setShowModal(false); onClose(); }}>Dismiss</button>
          </div>
        </div>

        {showVideoModal && (
          <div className="video-modal-overlay">
            <div className="video-modal">
              <div className="video-modal-header">
                <h3>Tutorial Video</h3>
                <button className="close-btn" onClick={handleVideoClose}>×</button>
              </div>
              <div className="video-content">
                <div className="video-player">
                  <div className="video-placeholder-large">
                    <div className="play-button-large">
                      <div className="play-icon-large">▶</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <AgentPickerTour 
          isActive={showAgentPickerTour}
          onClose={() => setShowAgentPickerTour(false)}
        />
      </div>
    );
  }

  return (
    <div className="onboarding-modal-overlay">
      <div className="onboarding-modal">
        <div className="modal-header">
          <div className="header-content">
            <h2>Get started with Quick Chat</h2>
            <p>Complete these tasks to unlock the full potential of your AI assistant</p>
          </div>
          <button className="close-btn" onClick={() => { setShowModal(false); onClose(); }}>×</button>
        </div>

        <div className="video-section">
          <div className="video-placeholder">
            <div className="play-button" onClick={() => handleTaskAction(1)}>
              <div className="play-icon">▶</div>
            </div>
          </div>
        </div>

        <div className="tasks-section">
          {tasks.map((task, index) => (
            <div key={task.id} className={`task-row ${task.completed ? 'completed' : ''}`}>
              <div className="task-number">
                {task.completed ? '✓' : `${index + 1}.`}
              </div>
              <div className="task-title">{task.title}</div>
              {(!task.completed || task.id === 1) && (
                <button 
                  className={`task-btn ${task.completed ? 'completed-btn' : 'start-btn'}`}
                  onClick={() => handleTaskAction(task.id)}
                >
                  {task.completed ? 'Rewatch' : (task.id === 1 ? 'Watch' : task.id === 2 ? 'Try' : 'Start')}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="dismiss-btn" onClick={resetTasks} style={{opacity: 0.5, fontSize: '12px', marginRight: '8px'}}>Reset</button>
          <button className="dismiss-btn" onClick={() => { setShowModal(false); onClose(); }}>Dismiss</button>
        </div>
      </div>

      {showVideoModal && (
        <div className="video-modal-overlay">
          <div className="video-modal">
            <div className="video-modal-header">
              <h3>Tutorial Video</h3>
              <button className="close-btn" onClick={handleVideoClose}>×</button>
            </div>
            <div className="video-content">
              <div className="video-player">
                <div className="video-placeholder-large">
                  <div className="play-button-large">
                    <div className="play-icon-large">▶</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <AgentPickerTour 
        isActive={showAgentPickerTour}
        onClose={() => setShowAgentPickerTour(false)}
      />
    </div>
  );
};

export default OnboardingChecklistTest;