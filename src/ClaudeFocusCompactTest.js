import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';

const ClaudeFocusCompactTest = ({ isCollapsed = false }) => {
  const [isFocusMode, setIsFocusMode] = useState(true);

  const handleToggle = () => {
    setIsFocusMode(!isFocusMode);
  };

  const styles = {
    appContainer: {
      display: 'flex',
      height: '100vh',
      width: '100%',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#f8f9fa',
      overflow: 'hidden'
    },
    mainContent: {
      flex: 1,
      background: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      display: isFocusMode ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    chatContainer: {
      display: 'flex',
      flexDirection: 'column',
      background: '#ffffff',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      width: isFocusMode ? '100%' : '450px',
      minWidth: isFocusMode ? '100%' : '320px',
      height: '100%',
      borderLeft: isFocusMode ? 'none' : '1px solid #e5e7eb',
      boxShadow: isFocusMode ? 'none' : '-4px 0 12px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      flex: isFocusMode ? 1 : 'none',
      marginLeft: isFocusMode ? (isCollapsed ? '50px' : '250px') : '0'
    },
    chatHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 20px',
      borderBottom: '1px solid #e5e7eb',
      background: '#ffffff',
      position: 'relative'
    },
    toggleButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: 'none',
      border: 'none',
      color: '#6b7280',
      fontSize: '14px',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: '6px',
      transition: 'all 0.2s ease'
    },
    chatContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      width: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      minHeight: 0
    },
    welcomeText: {
      fontSize: '32px',
      fontWeight: '300',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '40px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.mainContent}>
        <div>
          <h2>Main Application Content</h2>
          <p>This area becomes visible when switching to compact mode</p>
        </div>
      </div>
      
      <div style={styles.chatContainer}>
        <div style={styles.chatHeader}>
          <button style={styles.toggleButton} onClick={handleToggle}>
            <img 
              src={isFocusMode ? '/icons/Maximize.svg' : '/icons/Minimize.svg'} 
              alt={isFocusMode ? 'Maximize' : 'Minimize'}
              width="16" 
              height="16"
            />
            <span>{isFocusMode ? 'Focus' : 'Compact'}</span>
          </button>
        </div>
        
        <div style={styles.chatContent}>
          <h1 style={styles.welcomeText}>Good morning! Let's chat.</h1>
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ClaudeFocusCompactTest;