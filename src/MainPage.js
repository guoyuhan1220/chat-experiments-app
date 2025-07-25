import React from 'react';
import ViewSwitcher from './components/ViewSwitcher';
import ChatBox from './components/ChatBox';

function MainPage() {
  return (
    <div>
      <ViewSwitcher />
      <main style={{ padding: '20px' }}>
        <h1>Chat Experiments</h1>
        <ChatBox />
      </main>
    </div>
  );
}

export default MainPage;