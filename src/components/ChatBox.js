import React, { useState } from 'react';
import './ChatBox.css';
import ToggleButton from './ToggleButton';
import TextField from './TextField';
import ResourcePicker from './ResourcePicker';
import SendButton from './SendButton';
import FileUploadButton from './FileUploadButton';
import ActionButton from './ActionButton';
import FlowButton from './FlowButton';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [activeToggle, setActiveToggle] = useState('option1');
  const [selectedResource, setSelectedResource] = useState('text');

  const handleSend = () => {
    console.log('Send clicked:', message, 'Toggle:', activeToggle, 'Resource:', selectedResource);
    setMessage('');
  };

  const handleToggleChange = (option) => {
    setActiveToggle(option);
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
    <div className="chat-box">
      <TextField 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <div className="chat-toolbar">
        <div className="toolbar-left">
          <ToggleButton 
            activeOption={activeToggle}
            onToggleChange={handleToggleChange}
          />
          <div className="toolbar-divider"></div>
          <FileUploadButton onClick={handleFileUpload} />
          <ActionButton onClick={handleAction} />
          <FlowButton onClick={handleFlow} />
          <ResourcePicker 
            selectedResource={selectedResource}
            onResourceChange={handleResourceChange}
          />
        </div>
        <SendButton onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatBox;