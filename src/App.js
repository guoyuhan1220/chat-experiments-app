import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import ChatBoxTest from './ChatBoxTest';
import ToggleButtonTest from './ToggleButtonTest';
import TextFieldTest from './TextFieldTest';
import ResourcePickerTest from './ResourcePickerTest';
import SendButtonTest from './SendButtonTest';
import ChatActionButtonGroupTest from './ChatActionButtonGroupTest';
import ChatLandingPage from './ChatLandingPage';
import FileUploadButtonTest from './FileUploadButtonTest';
import ActionButtonTest from './ActionButtonTest';
import FlowButtonTest from './FlowButtonTest';
import ViewSwitcherTest from './ViewSwitcherTest';
import ClaudeFocusCompactTest from './ClaudeFocusCompactTest';
import SuggestedPromptTest from './SuggestedPromptTest';
import ProductTourTest from './ProductTourTest';


function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ components: true });

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Router>
      <div className="app-container">
        <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isCollapsed ? (
              <div className="hamburger-menu">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : '◀'}
          </button>
          
          {!isCollapsed && (
            <>
              <div className="nav-section">
                <Link to="/" className="nav-link main">🏠 Main Application</Link>
              </div>
              
              <div className="nav-section">
                <button 
                  className="nav-header clickable" 
                  onClick={() => toggleSection('components')}
                >
                  📦 Components {expandedSections.components ? '▼' : '▶'}
                </button>
                
                {expandedSections.components && (
                  <>
                    <Link to="/chatbox-test" className="nav-link component">💬 ChatBox</Link>
                    <div className="nav-indent">
                      <Link to="/textfield-test" className="nav-link child">📝 TextField</Link>
                      <div className="nav-subheader">Toolbar:</div>
                      <div className="nav-indent">
                        <Link to="/toggle-test" className="nav-link child">🔘 ToggleButton (3 modes)</Link>
                        <Link to="/resourcepicker-test" className="nav-link child">📋 ResourcePicker</Link>
                        <Link to="/fileupload-test" className="nav-link child">📁 FileUploadButton</Link>
                        <Link to="/action-test" className="nav-link child">⚡ ActionButton</Link>
                        <Link to="/flow-test" className="nav-link child">🔄 FlowButton</Link>
                        <Link to="/sendbutton-test" className="nav-link child">📤 SendButton</Link>
                      </div>
                    </div>
                    <Link to="/viewswitcher-test" className="nav-link component">🔄 ViewSwitcher</Link>
                    <Link to="/suggested-prompt-test" className="nav-link component">💡 SuggestedPrompt</Link>
                    <Link to="/product-tour-test" className="nav-link component">🎯 ProductTour</Link>
                    <Link to="/claude-focus-compact" className="nav-link component">🖥️ Claude Focus/Compact</Link>
                    <Link to="/chat-action-group-test" className="nav-link component">🎛️ Chat Action Group Test</Link>
                    <Link to="/chat-landing" className="nav-link component">🏠 Chat Landing Page</Link>
                  </>
                )}
              </div>
            </>
          )}
        </nav>
        
        <main className={`content ${isCollapsed ? 'expanded' : ''}`}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/chatbox-test" element={<ChatBoxTest />} />
            <Route path="/chat-action-group-test" element={<ChatActionButtonGroupTest />} />
            <Route path="/chat-landing" element={<ChatLandingPage />} />
            <Route path="/toggle-test" element={<ToggleButtonTest />} />
            <Route path="/textfield-test" element={<TextFieldTest />} />
            <Route path="/resourcepicker-test" element={<ResourcePickerTest />} />
            <Route path="/sendbutton-test" element={<SendButtonTest />} />
            <Route path="/fileupload-test" element={<FileUploadButtonTest />} />
            <Route path="/action-test" element={<ActionButtonTest />} />
            <Route path="/flow-test" element={<FlowButtonTest />} />
            <Route path="/viewswitcher-test" element={<ViewSwitcherTest />} />
            <Route path="/suggested-prompt-test" element={<SuggestedPromptTest />} />
            <Route path="/product-tour-test" element={<ProductTourTest />} />
            <Route path="/claude-focus-compact" element={<ClaudeFocusCompactTest isCollapsed={isCollapsed} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
