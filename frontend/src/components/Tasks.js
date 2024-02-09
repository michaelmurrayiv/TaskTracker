import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
		fetch(`http://localhost:9999/tasks/${props.task_status}`)
			.then((response) => response.json())
			.then((data) => {
				if (Array.isArray(data)) {
					console.log(data);
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
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="new task"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Create Task
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Create task form here
					</Typography>
				</Box>
			</Modal>
			<ul className="task-list">
				{tasks.map((task) => (
					<li className="tasks" key={task._id}>
						<button
							className="mark-as-complete"
							onClick={() => markComplete(task._id)}
						>
							x
						</button>
						{task.description} - Due: {task.dueDate || "No due date"}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Tasks;
