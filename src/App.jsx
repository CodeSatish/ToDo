import { useState, useEffect, Fragment } from "react";
import api from "./api/todos";
import ToDo1 from "./component/ToDo1";
import ToDoItem from "./component/ToDoItem";

import "./styles/style.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState([]);

  //retrive Tasks
  const retriveTasks = async () => {
    const response = await api.get("/tasks");
    return response.data;
  };

  useEffect(() => {
    const darkMode = window.matchMedia("(preferes-color-scheme: dark)").matches;
    setTheme(darkMode ? "dark" : "light");
    document.body.setAttribute("data-theme", theme);
  }, []);

  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await retriveTasks();
      if (allTasks) setTasks(allTasks);
    };
    getAllTasks();
  }, []);

  let toggleMode = theme;

  function handleClick(e) {
    e.target.classList.remove(toggleMode);
    toggleMode = toggleMode == "dark" ? "light" : "dark";
    e.target.classList.add(toggleMode);
    setTheme(toggleMode);
    if (toggleMode == "light") {
      document.body.setAttribute("data-theme", "light");
    } else {
      document.body.setAttribute("data-theme", "");
    }
  }

  const getId = () => {
    return tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  };

  const handleAddEvent = async (task) => {
    const request = {
      id: getId(),
      task: task,
      completed: false,
    };

    const response = await api.post("/tasks", request);
    console.log(response);
    setTasks([...tasks, response.data]);
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    const filteredTasks = tasks.filter((item) => item.id != id);
    setTasks(filteredTasks);
  };

  const handleItemClick = async (id) => {
    const task = tasks.find((item) => item.id == id);
    await api.patch(`/tasks/${id}`, { completed: !task.completed });

    const refreshTask = async () => {
      const allTasks = await retriveTasks();
      if (allTasks) {
        setTasks(allTasks);
      }
    };
    refreshTask();
  };

  return (
    <div className='main'>
      <header>
        <h1>To-Do</h1>
        <i
          id='toggle'
          onClick={handleClick}
          className={`fa-solid ${
            toggleMode == "dark" ? "fa-toggle-on" : "fa-toggle-off"
          }`}
        ></i>
      </header>

      <div className='content'>
        <ToDo1 onClick={handleAddEvent} />
        <ul className='todo-list'>
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
    </div>
  );
}

export default App;
