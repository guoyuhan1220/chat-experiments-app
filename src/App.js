import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import ChatBoxTest from './ChatBoxTest';
import ToggleButtonTest from './ToggleButtonTest';
import TextFieldTest from './TextFieldTest';
import ResourcePickerTest from './ResourcePickerTest';
import SendButtonTest from './SendButtonTest';
import ChatActionButtonGroupTest from './ChatActionButtonGroupTest';
import FileUploadButtonTest from './FileUploadButtonTest';
import ActionButtonTest from './ActionButtonTest';
import FlowButtonTest from './FlowButtonTest';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <div className="nav-section">
            <Link to="/" className="nav-link main">🏠 Main Application</Link>
          </div>
          <div className="nav-section">
            <div className="nav-header">📦 Components</div>
            <Link to="/chatbox-test" className="nav-link component">💬 ChatBox</Link>
            <Link to="/chat-action-group-test" className="nav-link component">🎛️ Chat Action Group</Link>
            <div className="nav-subsection">
              <div className="nav-subheader">Child Components:</div>
              <Link to="/toggle-test" className="nav-link child">🔘 ToggleButton</Link>
              <Link to="/textfield-test" className="nav-link child">📝 TextField</Link>
              <Link to="/resourcepicker-test" className="nav-link child">📋 ResourcePicker</Link>
              <Link to="/sendbutton-test" className="nav-link child">📤 SendButton</Link>
              <Link to="/fileupload-test" className="nav-link child">📁 FileUploadButton</Link>
              <Link to="/action-test" className="nav-link child">⚡ ActionButton</Link>
              <Link to="/flow-test" className="nav-link child">🔄 FlowButton</Link>
            </div>
          </div>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/chatbox-test" element={<ChatBoxTest />} />
            <Route path="/chat-action-group-test" element={<ChatActionButtonGroupTest />} />
            <Route path="/toggle-test" element={<ToggleButtonTest />} />
            <Route path="/textfield-test" element={<TextFieldTest />} />
            <Route path="/resourcepicker-test" element={<ResourcePickerTest />} />
            <Route path="/sendbutton-test" element={<SendButtonTest />} />
            <Route path="/fileupload-test" element={<FileUploadButtonTest />} />
            <Route path="/action-test" element={<ActionButtonTest />} />
            <Route path="/flow-test" element={<FlowButtonTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
