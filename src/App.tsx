import React, { useState, useEffect, Fragment } from "react";
import api from "./api/todos";
import ToDo from "./component/ToDo";
import ToDoItem from "./component/ToDoItem";
import { FormattedMessage, FormattedNumber } from "react-intl";

import styles from "./styles/style.module.css";

const App = () => {
  interface Tasks{
    id: number,
    task: string,
    completed: boolean
  }

  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState<Tasks[]>([]);

 
  //retrive Tasks
  const retriveTasks = async () => {
    const response = await api.get("/tasks");
    return response.data;
  };

  const getAllTasks = async () => {
    const allTasks = await retriveTasks();
    if (allTasks) setTasks(allTasks);
  };

  useEffect(() => {
    const darkMode = window.matchMedia("(preferes-color-scheme: dark)").matches;
    setTheme(darkMode ? "dark" : "light");
    document.body.setAttribute("data-theme", theme);
  }, []);

  useEffect(() => {
    getAllTasks();
  }, []);

  let toggleMode = theme;

  const handleClick = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target= e.target as Element;
    target.classList.remove(toggleMode);
    toggleMode = toggleMode == "dark" ? "light" : "dark";
    target.classList.add(toggleMode);
    setTheme(toggleMode);
    if (toggleMode == "light") {
      document.body.setAttribute("data-theme", "light");
    } else {
      document.body.setAttribute("data-theme", "");
    }
  };

  const getId = () => {
    return tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  };

  const handleAddEvent = async (task:Tasks) => {
    console.log("enter in App");
    const request = {
      id: getId(),
      task: task,
      completed: false,
    };

    const response = await api.post("/tasks", request);
    console.log(response);
    setTasks([...tasks, response.data]);
  };

  const handleDelete = async (id:number) => {
    await api.delete(`/tasks/${id}`);
    const filteredTasks = tasks.filter((item) => item.id != id);
    setTasks(filteredTasks);
  };

  const handleItemClick = async (id:number) => {
    const task = tasks.find((item:Tasks) => item.id == id);
    if(task)
    await api.patch(`/tasks/${id}`, {completed: !task.completed });

    const refreshTask = async () => {
      const allTasks = await retriveTasks();
      if (allTasks) {
        setTasks(allTasks);
      }
    };
    refreshTask();
  };

  return (
    <div className={styles.main}>
      <header className={styles.appHeader}>
        <i
          id={styles["toggle"]}
          onClick={handleClick}
          className={`fa-solid ${
            toggleMode == "dark" ? "fa-toggle-on" : "fa-toggle-off"
          }`}
        ></i>

        <h1>
          <FormattedMessage
            id='app.header'
            defaultMessage='To-Do'
          ></FormattedMessage>
        </h1>

        <h3 className={styles.counter}>
          <FormattedMessage
            id='todo.counter'
            defaultMessage={`Total counter is ${tasks.length} currently`}
            values={{ taskCount: tasks.length }}
          />
        </h3>
      </header>

      <div className={styles.content}>
        <ToDo onClick={handleAddEvent} />
        <ul className={styles.todoList}>
          {tasks.map((item) => (
            <ToDoItem
              item={item}
              key={item.id}
              handleDelete={handleDelete}
              handleItemClick={handleItemClick}
            />
          ))}
        </ul>
      </div>
      <footer className={styles.footer}>
        <p>
          <FormattedMessage
            id='app.channel.plug'
            defaultMessage='Tutorial by Lokalise'
          />
        </p>
      </footer>
    </div>
  );
};

export default App;
