import React, { useState } from 'react';
import TextField from './components/TextField';

function TextFieldTest() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h1>TextField Component Test</h1>
      <p>Current Value: "{value}"</p>
      <TextField 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something here..."
      />
    </div>
  );
}

export default TextFieldTest;