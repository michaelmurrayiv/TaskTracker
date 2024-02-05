import './App.css';
import Navbar from './components/Navbar'
import Tasks from './components/Tasks'

const sampleTasks = ["finish website", "work out", "apply for job"];

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-content">
        <div className="test">
          <Tasks title="Tasks" data={sampleTasks}/>
          <Tasks title="Completed" data={sampleTasks}/>
        </div>
        <div className="calendar">Calendar</div>
      </div>
    </div>
  );
}

export default App;
