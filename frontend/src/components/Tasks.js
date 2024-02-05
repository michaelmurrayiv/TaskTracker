import React from 'react';

function Tasks(props) {
  return (
    <div className="task-container">
      {props.title}
      <ul className="task-list">
        {props.data.map((task, index) => (
          <li className="tasks" key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;