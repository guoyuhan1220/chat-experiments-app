import React, { useState } from 'react';
import AgentPicker from './components/AgentPicker';

function AgentPickerTest() {
  const [selectedAgent, setSelectedAgent] = useState('my-assistant');

  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#fcfcfc', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Agent Picker Component Test</h2>
      <div style={{ marginTop: '20px' }}>
        <AgentPicker 
          selectedAgent={selectedAgent}
          onAgentChange={setSelectedAgent}
        />
      </div>
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        Selected Agent: {selectedAgent}
      </div>
    </div>
  );
}

export default AgentPickerTest;