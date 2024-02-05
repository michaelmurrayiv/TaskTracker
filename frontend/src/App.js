import './App.css';
import Navbar from './components/Navbar'
import Tasks from './components/Tasks'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-content">
        <div className="test">
          <Tasks title="tasks"/>
          <Tasks title="completed"/>
        </div>
        <div className="calendar">Calendar</div>
      </div>
    </div>
  );
}

export default App;
