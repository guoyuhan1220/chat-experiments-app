class ClaudeFocusCompactToggle {
  constructor() {
    this.isFocusMode = this.getStoredPreference();
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.createElements();
    this.attachEventListeners();
    this.applyInitialState();
    this.handleResponsive();
  }

  createElements() {
    // Main container
    this.appContainer = this.createElement('div', 'app-container');
    
    // Main content (visible in compact mode)
    this.mainContent = this.createElement('div', 'main-content');
    this.mainContent.innerHTML = `
      <div class="main-content-placeholder">
        <h2>Main Application Content</h2>
        <p>This area becomes visible when switching to compact mode</p>
      </div>
    `;

    // Chat container
    this.chatContainer = this.createElement('div', 'chat-container');
    
    // Chat header with toggle
    this.chatHeader = this.createElement('div', 'chat-header');
    this.toggleButton = this.createElement('button', 'toggle-button');
    this.toggleButton.innerHTML = `
      <svg class="toggle-icon" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
      </svg>
      <span class="toggle-text">Focus</span>
    `;

    this.infoButton = this.createElement('button', 'info-button');
    this.infoButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
    `;

    this.chatHeader.appendChild(this.toggleButton);
    this.chatHeader.appendChild(this.infoButton);

    // Chat content
    this.chatContent = this.createChatContent();

    // Assemble components
    this.chatContainer.appendChild(this.chatHeader);
    this.chatContainer.appendChild(this.chatContent);
    this.appContainer.appendChild(this.mainContent);
    this.appContainer.appendChild(this.chatContainer);

    // Add styles
    this.addStyles();

    // Append to body
    document.body.appendChild(this.appContainer);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
  }

  createChatContent() {
    const content = this.createElement('div', 'chat-content');
    content.innerHTML = `
      <div class="chat-welcome">
        <h1 class="welcome-text">Good morning! Let's chat.</h1>
      </div>

      <div class="input-section">
        <div class="assistant-selector">
          <span>My assistant</span>
          <svg class="dropdown-arrow" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 8.825c-.2 0-.4-.1-.5-.2L1.275 4.4c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0L6 6.875 9.625 3.3c.3-.3.8-.3 1.1 0s.3.8 0 1.1L6.5 8.625c-.1.1-.3.2-.5.2z"/>
          </svg>
        </div>

        <div class="input-container">
          <textarea class="chat-input" placeholder="Ask a question" rows="1"></textarea>
          <div class="input-toolbar">
            <div class="toolbar-left">
              ${this.createToolbarButtons()}
            </div>
            <button class="send-button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15.854.146a.5.5 0 0 1 .11.54L13.026 8.26 15.964 15.784a.5.5 0 0 1-.11.54.5.5 0 0 1-.54.11L0 8.26a.5.5 0 0 1 0-.999L15.314.146a.5.5 0 0 1 .54.11z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="quick-starters">
        <div class="quick-starters-header">
          <h3 class="quick-starters-title">Quick Starters</h3>
          <a href="#" class="view-more">View more</a>
        </div>
        <div class="starters-list">
          ${this.createQuickStarters()}
        </div>
      </div>
    `;
    return content;
  }

  createToolbarButtons() {
    const buttons = ['settings', 'chat', 'download', 'menu', 'user', 'users'];
    return buttons.map(type => `
      <button class="toolbar-button" data-action="${type}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="2"/>
        </svg>
      </button>
    `).join('');
  }

  createQuickStarters() {
    const starters = [
      { icon: 'eye', text: "What's the assistant capable of?" },
      { icon: 'upload', text: "Upload a file to generate useful insights" },
      { icon: 'code', text: "Start a new research project" }
    ];

    return starters.map(starter => `
      <div class="starter-item">
        <svg class="starter-icon" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="10" r="3"/>
        </svg>
        <span class="starter-text">${starter.text}</span>
      </div>
    `).join('');
  }

  attachEventListeners() {
    this.toggleButton.addEventListener('click', (e) => this.handleToggle(e));
    
    // Handle keyboard accessibility
    this.toggleButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleToggle(e);
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());

    // Handle reduced motion preference
    this.handleReducedMotion();
  }

  handleToggle(e) {
    e.preventDefault();
    
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.isFocusMode = !this.isFocusMode;
    
    this.updateToggleButton();
    this.updateViewMode();
    this.storePreference();
    
    // Reset animation lock after transition
    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }

  updateToggleButton() {
    const toggleText = this.toggleButton.querySelector('.toggle-text');
    const toggleIcon = this.toggleButton.querySelector('.toggle-icon path');
    
    if (this.isFocusMode) {
      toggleText.textContent = 'Focus';
      toggleIcon.setAttribute('d', 'M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z');
    } else {
      toggleText.textContent = 'Compact';
      toggleIcon.setAttribute('d', 'M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z');
    }

    // Update ARIA label for accessibility
    this.toggleButton.setAttribute('aria-label', 
      `Switch to ${this.isFocusMode ? 'compact' : 'focus'} mode`
    );
  }

  updateViewMode() {
    if (this.isFocusMode) {
      this.chatContainer.className = 'chat-container focus-mode';
      this.mainContent.classList.remove('visible');
    } else {
      this.chatContainer.className = 'chat-container compact-mode';
      this.mainContent.classList.add('visible');
    }

    // Announce change to screen readers
    this.announceChange();
  }

  applyInitialState() {
    this.updateToggleButton();
    this.updateViewMode();
  }

  handleResize() {
    // Handle responsive breakpoints
    if (window.innerWidth <= 768 && !this.isFocusMode) {
      this.chatContainer.style.width = '100%';
    }
  }

  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      this.appContainer.style.setProperty('--transition-duration', '0s');
    }
  }

  announceChange() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${this.isFocusMode ? 'focus' : 'compact'} mode`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  getStoredPreference() {
    try {
      return localStorage.getItem('claude-view-mode') !== 'compact';
    } catch (e) {
      return true; // Default to focus mode
    }
  }

  storePreference() {
    try {
      localStorage.setItem('claude-view-mode', this.isFocusMode ? 'focus' : 'compact');
    } catch (e) {
      // Handle localStorage not available
    }
  }

  addStyles() {
    const styles = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #f8f9fa;
        height: 100vh;
        overflow: hidden;
      }

      .app-container {
        display: flex;
        height: 100vh;
        position: relative;
      }

      .main-content {
        flex: 1;
        background: #ffffff;
        border-right: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-duration, 0.4s) cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 0;
        visibility: hidden;
      }

      .main-content.visible {
        opacity: 1;
        visibility: visible;
      }

      .main-content-placeholder {
        text-align: center;
        color: #6b7280;
      }

      .chat-container {
        display: flex;
        flex-direction: column;
        background: #ffffff;
        transition: all var(--transition-duration, 0.4s) cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
      }

      .chat-container.focus-mode {
        width: 100vw;
        height: 100vh;
      }

      .chat-container.compact-mode {
        width: 50%;
        min-width: 400px;
        max-width: 600px;
        height: 100vh;
        border-left: 1px solid #e5e7eb;
        box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
      }

      .chat-header {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #e5e7eb;
        background: #ffffff;
        position: relative;
      }

      .toggle-button {
        display: flex;
        align-items: center;
        gap: 6px;
        background: none;
        border: none;
        color: #6b7280;
        font-size: 14px;
        cursor: pointer;
        padding: 6px 8px;
        border-radius: 6px;
        transition: all 0.2s ease;
      }

      .toggle-button:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .toggle-icon {
        width: 16px;
        height: 16px;
      }

      .info-button {
        position: absolute;
        right: 20px;
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
      }

      .info-button:hover {
        background: #f3f4f6;
      }

      .chat-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
      }

      .chat-welcome {
        text-align: center;
        margin-bottom: 40px;
      }

      .welcome-text {
        font-size: 24px;
        font-weight: 300;
        background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px;
      }

      .input-section {
        width: 100%;
        max-width: 700px;
      }

      .assistant-selector {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        font-size: 14px;
        color: #374151;
      }

      .dropdown-arrow {
        width: 12px;
        height: 12px;
        color: #6b7280;
      }

      .input-container {
        position: relative;
        background: #ffffff;
        border: 1px solid #d1d5db;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .chat-input {
        width: 100%;
        border: none;
        padding: 16px 20px;
        font-size: 16px;
        resize: none;
        outline: none;
        min-height: 60px;
        background: transparent;
      }

      .input-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px;
        border-top: 1px solid #e5e7eb;
        background: #f9fafb;
      }

      .toolbar-left {
        display: flex;
        gap: 8px;
      }

      .toolbar-button {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .toolbar-button:hover {
        background: #e5e7eb;
      }

      .send-button {
        background: #8b5cf6;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
      }

      .send-button:hover {
        background: #7c3aed;
      }

      .quick-starters {
        margin-top: 32px;
        width: 100%;
      }

      .quick-starters-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .quick-starters-title {
        font-size: 14px;
        font-weight: 500;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .view-more {
        color: #8b5cf6;
        text-decoration: none;
        font-size: 14px;
      }

      .starters-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .starter-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .starter-item:hover {
        border-color: #d1d5db;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .starter-icon {
        width: 20px;
        height: 20px;
        color: #8b5cf6;
      }

      .starter-text {
        color: #374151;
        font-size: 14px;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @media (max-width: 768px) {
        .chat-container.compact-mode {
          width: 100% !important;
          min-width: 100%;
        }
        
        .main-content {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          --transition-duration: 0s !important;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  // Public API methods
  toggleMode() {
    this.handleToggle({ preventDefault: () => {} });
  }

  getCurrentMode() {
    return this.isFocusMode ? 'focus' : 'compact';
  }

  setMode(mode) {
    if ((mode === 'focus' && !this.isFocusMode) || 
        (mode === 'compact' && this.isFocusMode)) {
      this.toggleMode();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.claudeToggle = new ClaudeFocusCompactToggle();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClaudeFocusCompactToggle;
}