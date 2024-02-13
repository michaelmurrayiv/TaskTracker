import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal.js";
import moment from "moment";

const token = localStorage.getItem("token");

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function Tasks(props) {
	const [tasks, setTasks] = useState([]);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		fetch(`http://localhost:9999/tasks/${props.task_status}`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setTasks(data);
				} else {
					console.error("Data is not an array", data);
				}
			})
			.catch((error) => console.error("Error fetching data", error));
	}, [props.task_status, tasks]);

	const markComplete = (taskId) => {
		fetch(`http://localhost:9999/tasks/${taskId}/mark`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then((data) => {
				setTasks((prevTasks) =>
					prevTasks.map((task) => {
						if (task._id === taskId) {
							return { ...task, completed: data.completed };
						}
						return task;
					})
				);
			})
			.catch((error) => console.error("Error updating task", error));
	};

	const addToCalendar = (taskId) => {
		fetch(`http://localhost:9999/tasks/${taskId}/date`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${token}`, 
					},
					body: JSON.stringify({
						newDueDate: moment().format("YYYY-MM-DD"),
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						setTasks((prevTasks) =>
							prevTasks.map((task) => {
								if (task._id === taskId) {
									return { ...task, dueDate: data.newDueDate };
								}
								return task;
							})
						);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
	};

	return (
		<div className="task-container">
			{props.task_status === "open" ? (
				<div className="task-header">
					Tasks
					<button className="add-task" onClick={handleOpen}>
						+
					</button>
				</div>
			) : (
				<div className="task-header">Completed</div>
			)}
			<TaskModal open={open} handleClose={handleClose}></TaskModal>
			<ul className="task-list">
				{tasks.map((task) => (
					<li className="tasks" key={task._id}>
						<div>
							<button
								className="mark-as-complete"
								onClick={() => markComplete(task._id)}
							>
								x
							</button>
						</div>
						<div>
							{task.description} - Due: {task.dueDate || "No due date"}
						</div>
						<div>
							<button
								className="add-to-calendar"
								onClick={() => addToCalendar(task._id)} >
									Mark Today
								</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Tasks;
