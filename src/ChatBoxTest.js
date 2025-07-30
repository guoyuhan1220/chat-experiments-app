import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import AgentPicker from './components/AgentPicker';
import './components/ChatBox.css';

function ChatBoxTest() {
  const [selectedAgent, setSelectedAgent] = useState('my-assistant');

  const handleAgentChange = (agentId) => {
    setSelectedAgent(agentId);
    console.log('Agent changed to:', agentId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ChatBox Component Test</h1>
      <AgentPicker 
        selectedAgent={selectedAgent}
        onAgentChange={handleAgentChange}
      />
      <ChatBox />
    </div>
  );
}

export default ChatBoxTest;