import React, { useState, useEffect } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9999/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching data", error));
  })

  return (
    <div className="task-container">
      Tasks
      <button className="add-task">+</button>
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
    fetch('http://localhost:9999/completed')
      .then(response => response.json())
      .then(data => setCompletedTasks(data))
      .catch(error => console.error("Error fetching data", error));
  })

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