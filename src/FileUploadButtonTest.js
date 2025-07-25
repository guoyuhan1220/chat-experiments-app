import React, { useState } from 'react';
import FileUploadButton from './components/FileUploadButton';

function FileUploadButtonTest() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    console.log('File upload button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>FileUploadButton Component Test</h1>
      <p>Click Count: {clickCount}</p>
      <FileUploadButton onClick={handleClick} />
    </div>
  );
}

export default FileUploadButtonTest;