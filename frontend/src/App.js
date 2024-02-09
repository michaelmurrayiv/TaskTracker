import "./App.css";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="app-content">
				<div className="test">
					<Tasks task_status="open" />
					<Tasks task_status="closed" />
				</div>
				<div className="calendar">Calendar</div>
			</div>
		</div>
	);
}

export default App;
