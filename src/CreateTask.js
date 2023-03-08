import React, { useEffect, useState } from "react";
import "./Crud.css";

const CreateTask = () => {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  console.log("editValue", editValue);
  console.log("editIndex", editIndex);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    console.log("savedTasks", savedTasks);
  }, []);

  const handleSaveAll = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Tasks saved successfully!", { style: { color: "#49bb64" } });

    if (hasChanges) {
      setHasChanges(false);
    }
  };

  console.log("taskName", taskName);
  
  console.log("tasks", tasks);

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = () => {
    setTasks([...tasks, taskName]);
    setTaskName("");
    setHasChanges(true);
  };

  const handleEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleEditInputChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleDelete = (index) => {
    const updatedTasksDel = [...tasks];
    console.log("updatedTasksDel", {updatedTasksDel});
    updatedTasksDel.splice(index, 1);
    setTasks(updatedTasksDel);
    setHasChanges(true);
  };

  const handleEditSave = () => {
    const updatedTasks = [...tasks];
    console.log("updatedTasks", updatedTasks);
    updatedTasks[editIndex] = editValue;
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditValue("");
    setHasChanges(true);
  };

  return (
    <>
      <div className="parent1__ct">
        <input
          type="text"
          placeholder="Create new Task"
          value={taskName}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            width: "15%",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "lightgray",
          }}
        />
        <button className="button__ct" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            gap: "1rem",
          }}
        >
          {tasks.map((task, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    style={{
                      padding: "10px",
                      width: "15%",
                      border: "none",
                      borderRadius: "10px",
                      backgroundColor: "lightgray",
                    }}
                    type="text"
                    value={editValue}
                    onChange={handleEditInputChange}
                  />
                  <button onClick={handleEditSave}>Save</button>
                </>
              ) : (
                <>
                  <button
                    style={{
                      border: "none",
                      textAlign: "center",
                      padding: "1rem",
                      borderRadius: "10px",
                      width: "10rem",
                    }}
                    onClick={() => handleEdit(index, task)}
                  >
                    {task}
                  </button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <button
          style={{
            display: "flex",
            margin: "2.3rem",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "rgb(60, 237, 98)",
          }}
          onClick={handleSaveAll}
          disabled={!hasChanges}
        >
          Save All
        </button>
      </div>
    </>
  );
};

export default CreateTask;
