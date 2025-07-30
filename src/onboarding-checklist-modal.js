import React, { useState } from 'react';
import { X, Play } from 'lucide-react';

const OnboardingChecklistModal = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Watch the tutorial", completed: false, status: "retry" },
    { id: 2, title: "Try 3 chat modes", completed: false, status: "start" },
    { id: 3, title: "Create a knowledge base", completed: false, status: "start" },
    { id: 4, title: "Automate a task", completed: false, status: "start" },
    { id: 5, title: "Send a Slack message", completed: false, status: "start" }
  ]);

  const [isVisible, setIsVisible] = useState(true);

  const handleTaskAction = (taskId) => {
    if (taskId === 1) {
      // For video task, if completed, allow rewatch
      const task = tasks.find(t => t.id === taskId);
      if (task.completed) {
        // Rewatch video - keep completed status but trigger video action
        console.log('Rewatching video...');
        return;
      }
    }
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed, status: task.completed ? "start" : "completed" }
          : task
      )
    );
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Show onboarding checklist"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              How Quick chat works?
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Complete the tasks to better ...
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1.5">
            <span>Progress</span>
            <span>{completedCount}/{totalTasks} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalTasks) * 100}%` }}
            />
          </div>
        </div>

        {/* Video/Tutorial Section */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-lg h-28 flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
            <div className="relative z-10 flex items-center space-x-1">
              <div className="w-0 h-0 border-l-[12px] border-l-gray-400 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
              <div className="w-0 h-0 border-l-[10px] border-l-gray-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-0.5"></div>
              <div className="w-0 h-0 border-l-[8px] border-l-gray-600 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5"></div>
            </div>
            <button 
              className="absolute inset-0 flex items-center justify-center"
              onClick={() => {
                // Mark video task as completed when clicked
                setTasks(prevTasks => 
                  prevTasks.map(task => 
                    task.id === 1 ? { ...task, completed: true } : task
                  )
                );
              }}
              aria-label="Play tutorial video"
            >
              <div className="bg-white bg-opacity-90 rounded-full p-2.5 hover:bg-opacity-100 transition-all">
                <Play size={16} className="text-blue-600 ml-0.5" />
              </div>
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 ${
                  task.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    task.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {task.completed ? '✓' : index + 1}
                  </div>
                  <span className={`text-sm font-medium ${
                    task.completed ? 'text-green-800 line-through' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </span>
                </div>
                
                <button
                  onClick={() => handleTaskAction(task.id)}
                  className={`px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-200 ${
                    task.completed
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : task.status === 'retry'
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {task.completed && task.id === 1 ? 'Rewatch' : task.completed ? 'Done' : task.status === 'retry' ? 'Retry' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 font-medium text-xs transition-colors"
            >
              Dismiss
            </button>
            {completedCount === totalTasks && (
              <div className="flex items-center space-x-1.5 text-green-600">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
                <span className="text-xs font-medium">All completed!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingChecklistModal;