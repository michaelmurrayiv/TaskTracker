import React from 'react';

const sampleTasks = [
  "finish website", 
  "work out",
  "apply for job"
]

function Tasks() {
  return (
    <div className="task-container">
      <ul className="task-list">
        {sampleTasks.map((task, index) => (
          <li className="tasks" key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;