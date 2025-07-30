import React, { useState, useRef, useEffect } from 'react';
import './AgentPicker.css';

const AgentPicker = ({ selectedAgent, onAgentChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  
  const agents = [
    { id: 'my-assistant', name: 'My assistant', type: 'default' }
  ];

  const customAgents = [];

  const handleSelect = (agent) => {
    onAgentChange(agent.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedAgentData = agents.find(a => a.id === selectedAgent) || agents[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`agent-picker-container ${isOpen ? 'expanded' : ''}`} ref={containerRef}>
      <div className={`agent-dropdown ${isOpen ? 'visible' : ''}`}>
        {isOpen && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by agent name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        )}
        
        <div className="agent-section">
          <div className="section-header">DEFAULT</div>
          {agents.map(agent => (
            <div
              key={agent.id}
              className={`agent-option ${agent.id === selectedAgent ? 'selected' : ''}`}
              onClick={() => handleSelect(agent)}
            >
              <div className="agent-info">
                <span className="agent-icon">✨</span>
                <span className="agent-name">{agent.name}</span>
                {agent.id === selectedAgent && <span className="checkmark">✓</span>}
              </div>
              <button className="info-button" onClick={(e) => {
                e.stopPropagation();
              }}>Info</button>
            </div>
          ))}
        </div>
        
        <div className="divider"></div>
        
        <div className="agent-section">
          <div className="section-header">CUSTOM AGENTS</div>
          {customAgents.length === 0 ? (
            <div className="no-custom-agents">
              <div className="illustration">
                <div className="illustration-icon">✨</div>
                <div className="plus-icon">+</div>
              </div>
              <p>You have not created any agent</p>
              <button className="create-agent-button" onClick={(e) => {
                e.stopPropagation();
              }}>
                Create agent <span className="external-link">↗</span>
              </button>
            </div>
          ) : (
            customAgents.map(agent => (
              <div
                key={agent.id}
                className={`agent-option ${agent.id === selectedAgent ? 'selected' : ''}`}
                onClick={() => handleSelect(agent)}
              >
                <div className="agent-info">
                  <span className="agent-name">{agent.name}</span>
                  {agent.id === selectedAgent && <span className="checkmark">✓</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div 
        id="agent-picker"
        className="agent-picker"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="agent-name">
          ✨ {selectedAgentData.name}
        </span>
        <svg className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.6339 7.44418C2.18963 8.10864 2.6659 9 3.4652 9H8.53599C9.33439 9 9.81084 8.11045 9.3684 7.44585L6.83852 3.64561C6.44325 3.05186 5.57126 3.05099 5.1748 3.64394L2.6339 7.44418Z" fill="black" fillOpacity="0.63"/>
        </svg>
      </div>
    </div>
  );
};

export default AgentPicker;