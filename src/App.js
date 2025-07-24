import './App.css';
import ViewSwitcher from './components/ViewSwitcher';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className="App">
      <ViewSwitcher />
      <main className="App-main">
        <h1>Chat Experiments</h1>
        <ChatBox />
      </main>
    </div>
  );
}

export default App;
