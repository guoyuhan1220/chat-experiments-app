import React, { useState } from 'react';
import './ChatBox.css';
import ToggleButton from './ToggleButton';
import TextField from './TextField';
import ResourcePicker from './ResourcePicker';
import SendButton from './SendButton';
import FileUploadButton from './FileUploadButton';
import ActionButton from './ActionButton';
import FlowButton from './FlowButton';

const ChatBox = ({ tourStep = -1 }) => {
  const [message, setMessage] = useState('');
  const [activeToggle, setActiveToggle] = useState('option1');
  const [selectedResource, setSelectedResource] = useState('all');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    console.log('Send clicked:', message, 'Toggle:', activeToggle, 'Resource:', selectedResource);
    setMessage('');
  };

  const handleToggleChange = (option) => {
    setActiveToggle(option);
    // Reset resource selection to 'all' when switching to Quick Resource mode
    if (option === 'option2') {
      setSelectedResource('all');
    }
    console.log('Toggle changed to:', option);
  };

  const handleResourceChange = (resource) => {
    setSelectedResource(resource);
    console.log('Resource changed to:', resource);
  };

  const handleFileUpload = () => {
    console.log('File upload clicked');
  };

  const handleAction = () => {
    console.log('Action clicked');
  };

  const handleFlow = () => {
    console.log('Flow clicked');
  };

  return (
    <div className={`chat-box ${isFocused ? 'focused' : ''}`}>
      <TextField 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="chat-toolbar">
        <div className="toolbar-left">
          <div id="mode-switcher" className={tourStep === 0 ? 'tour-highlight' : ''}>
            <ToggleButton 
              activeOption={activeToggle}
              onToggleChange={handleToggleChange}
            />
          </div>
          {activeToggle === 'option2' && (
            <ResourcePicker 
              selectedResource={selectedResource}
              onResourceChange={handleResourceChange}
            />
          )}
          <div className="toolbar-divider"></div>
          <div id="file-upload-btn" className={tourStep === 1 ? 'tour-highlight' : ''}>
            <FileUploadButton onClick={handleFileUpload} />
          </div>
          <div id="action-btn" className={tourStep === 2 ? 'tour-highlight' : ''}>
            <ActionButton onClick={handleAction} />
          </div>
          <div id="flow-btn" className={tourStep === 3 ? 'tour-highlight' : ''}>
            <FlowButton onClick={handleFlow} />
          </div>
        </div>
        <SendButton onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatBox;