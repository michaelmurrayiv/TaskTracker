import React, { useState, useEffect } from 'react';

function Tasks(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9999/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching data", error));
  })

  return (
    <div className="task-container">
      {props.title}
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li className="tasks" key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;