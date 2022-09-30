import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDo() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = use;

  function handleAdd() {
    console.log("Add click");
  }

  return (
    <div className='todoBox'>
      <h4>why</h4>
      <input
        value={task}
        type='text'
        id='task'
        placeholder='what you want to do?'
        onChange={(e) => setTask(e.target.value)}
      />
      ;
      <button id='btn' onClick={handleAdd}>
        Add
      </button>
      ;
      <ToDoItem />
    </div>
  );
}

export default ToDo;
