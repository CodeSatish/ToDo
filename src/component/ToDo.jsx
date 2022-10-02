import React, { useState } from "react";
import styles from "../styles/style.module.css";

const ToDo = (props) => {
  const [todo, setToDo] = useState("");

  const handleChange = (e) => {
    setToDo(e.target.value);
    console.log("change", todo);
  };

  const handleAdd = () => {
    console.log("Submit :", todo);
    props.onClick && props.onClick(todo);
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          value={todo}
          type='text'
          id={styles["todo"]}
          placeholder='what you want to do?'
          onChange={handleChange}
        />

        <input className={styles.btn} type='submit' value='submit' />
      </form>
    </div>
  );
};

export default ToDo;
