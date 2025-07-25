import React, { useState } from 'react';
import ToggleButton from './components/ToggleButton';
import FileUploadButton from './components/FileUploadButton';
import ActionButton from './components/ActionButton';
import FlowButton from './components/FlowButton';

function ChatActionButtonGroupTest() {
  const [activeToggle, setActiveToggle] = useState('option1');
  const [actionLog, setActionLog] = useState([]);

  const logAction = (action) => {
    setActionLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${action}`]);
  };

  const handleFileUpload = () => logAction('File Upload clicked');
  const handleAction = () => logAction('Action clicked');
  const handleFlow = () => logAction('Flow clicked');
  const handleToggleChange = (option) => {
    setActiveToggle(option);
    logAction(`Toggle changed to ${option}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat Action Button Group Test</h1>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        alignItems: 'center', 
        padding: '16px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <ToggleButton 
          activeOption={activeToggle}
          onToggleChange={handleToggleChange}
        />
        <div style={{ width: '1px', height: '24px', backgroundColor: '#dee2e6', margin: '0 5px' }}></div>
        <FileUploadButton onClick={handleFileUpload} />
        <ActionButton onClick={handleAction} />
        <FlowButton onClick={handleFlow} />
      </div>
      
      <div>
        <h3>Action Log:</h3>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '10px', 
          borderRadius: '4px', 
          maxHeight: '200px', 
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          {actionLog.length === 0 ? 'No actions yet...' : actionLog.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatActionButtonGroupTest;