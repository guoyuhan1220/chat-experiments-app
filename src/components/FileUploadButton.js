import React from 'react';
import './FileUploadButton.css';

const FileUploadButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="toolbar-btn">
      <img src="/icons/paperclip.svg" alt="File Upload" width="16" height="16" />
    </button>
  );
};

export default FileUploadButton;