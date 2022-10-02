import React from "react";
import styles from "../styles/style.module.css";

const ToDoItem = ({ item, handleDelete, handleItemClick }) => {
  const itemId = 0;
  const itemTask = 1;
  const itemCompleted = 2;

  return (
    <div className={styles.listItem}>
      <li
        onClick={() => handleItemClick(item.id)}
        className={item.completed ? styles["strike"] : styles[""]}
      >
        {item.task}
      </li>
      <button
        onClick={() => handleDelete(item.id)}
        className='fas fa-trash-can'
      ></button>
    </div>
  );
};

export default ToDoItem;
