import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todo"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
    setTimeout(() => {
      setLoader(true);
    }, 1500);
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(tasks));
  }, [tasks]);

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return loader ? (
    <div className="container w-[1440px] m-auto flex items-center justify-center ">
      <div className="todo">
        <div className=" flex mt-2  items-center justify-center text-white">
          {" "}
          <h1>Todo List</h1>
        </div>
        <div className=" flex items-center justify-center gap-2 mt-3 ">
          <input
            className=" outline-none px-3 w-[350px] border-solid h-12 border-[1px] rounded-[10px] border-[#00FF00]"
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className=" py-3 hover:scale-110 px-2 rounded-[10px] bg-[#00FF00] text-[#000fff]"
            onClick={addTask}
          >
            AddTask
          </button>
        </div>
        <ul className="  ul mt-5 items-center justify-start flex text-[#000fff] flex-col h-[500px]">
          {tasks?.map((task, index) => (
            <li
              className=" mt-1 bg-[#00FF00] w-[400px] py-3 rounded-[10px] px-2 flex items-center justify-between"
              key={index}
            >
              {task}
              <button
                className=" text-white bg-[red] py-1 px-1 rounded-[5px]"
                onClick={() => removeTask(index)}
              >
                del
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <GridLoader
      color="#0000FF"
      className=" flex items-center justify-center m-auto ml-[900px] mt-[250px]"
      size={30}
    />
  );
}

export default ToDo;
