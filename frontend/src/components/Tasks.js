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

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch("http://localhost:9999/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  return (
    <div className="task-container">
      Tasks
      <button className="add-task" onClick={handleOpen}>+</button>
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
        {tasks.map((task, index) => (
          <li className="tasks" key={index}>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/completed")
      .then((response) => response.json())
      .then((data) => setCompletedTasks(data))
      .catch((error) => console.error("Error fetching data", error));
  });

  return (
    <div className="task-container">
      Completed
      <ul className="task-list">
        {completedTasks.map((task, index) => (
          <li className="tasks" key={index}>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Tasks, CompletedTasks };
