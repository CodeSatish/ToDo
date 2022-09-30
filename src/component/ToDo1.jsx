import React, { useState } from "react";
import { useEffect } from "react";

const ToDo1 = (props) => {
  const [todo, setToDo] = useState("");

  const handleChange = (e) => {
    setToDo(e.target.value);
    console.log("change", todo);
  };

  // useEffect(() => {
  //   if (props.onClick) {
  //     props.onChange(todo);
  //     console.log("use effect task:- ", todo);
  //   }
  // }, [todo]);

  const handleAdd = () => {
    props.onClick && props.onClick(todo);
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          value={todo}
          type='text'
          id='todo'
          placeholder='what you want to do?'
          onChange={handleChange}
        />
        {/* <button id='btn' onClick={handleAdd}>
        Add
      </button> */}

        <input id='btn' type='submit' value='submit' />
      </form>
    </div>
  );
};

export default ToDo1;
