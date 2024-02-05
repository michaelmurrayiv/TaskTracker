import React from 'react';

const sampleTasks = [
  "finish website", 
  "work out",
  "apply for job"
]

function Tasks(props) {
  return (
    <div className="task-container">
      {props.title}
      <ul className="task-list">
        {sampleTasks.map((task, index) => (
          <li className="tasks" key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;