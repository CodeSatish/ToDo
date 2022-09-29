import React from "react";

function ToDoItem({ item, handleDelete, handleItemClick }) {
  const itemId = 0;
  const itemTask = 1;
  const itemCompleted = 2;

  return (
    <div className='list-item'>
      <li
        onClick={() => handleItemClick(item.id)}
        className={item.completed == true ? " strike" : ""}
      >
        {item.task}
      </li>
      <button
        onClick={() => handleDelete(item.id)}
        className='fas fa-trash-can'
      ></button>
    </div>
  );
}

export default ToDoItem;
