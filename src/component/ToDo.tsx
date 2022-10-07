import React, { useState } from "react";
import styles from "../styles/style.module.css";
import { FormattedMessage, useIntl } from "react-intl";

const ToDo = (props) => {
  const [todo, setToDo] = useState("");
  const intl = useIntl();

  const handleChange = (e) => {
    setToDo(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault;
    console.log("form submitted");
    props.onClick && props.onClick(todo);
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          value={todo}
          type='text'
          id={styles["todo"]}
          placeholder={intl.formatMessage({
            id: "todo.text",
            defaultMessage: "what you want to do?",
          })}
          onChange={handleChange}
        />
        <button className={styles.btn} type='submit'>
          <FormattedMessage id='todo.btn' defaultMessage={"+ Task"} />
        </button>
      </form>
    </div>
  );
};

export default ToDo;
