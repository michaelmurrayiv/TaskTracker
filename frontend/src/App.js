import './App.css';
import Navbar from './components/Navbar'
import { Tasks, CompletedTasks } from './components/Tasks'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-content">
        <div className="test">
          <Tasks/>
          <CompletedTasks/>
        </div>
        <div className="calendar">Calendar</div>
      </div>
    </div>
  );
}

export default App;
