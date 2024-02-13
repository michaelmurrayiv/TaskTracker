import "./App.css";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import TaskCalendar from "./components/TaskCalendar";

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="app-content">
				<div className="test">
					<Tasks task_status="open" />
					<Tasks task_status="closed" />
				</div>
					<TaskCalendar />
			</div>
		</div>
	);
}

export default App;
