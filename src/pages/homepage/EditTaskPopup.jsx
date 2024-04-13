/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const EditTaskPopup = ({
  showPopup,
  togglePopup,
  handleSubmit,
  existingTask,
  username,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskImage, setTaskImage] = useState(null);
  const [taskDueDate, setTaskDueDate] = useState("");

  // Set initial values if an existing task is provided
  useEffect(() => {
    if (existingTask) {
      const image = localStorage.getItem(
        username + "taskImage" + existingTask.title
      );
      if (image) {
        setTaskImage(image);
      }
      setTaskTitle(existingTask.title || "");
      setTaskDescription(existingTask.description || "");
      setTaskDueDate(existingTask.dueDate || "");
    }
  }, [existingTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskTitle") {
      setTaskTitle(value);
    } else if (name === "taskDescription") {
      setTaskDescription(value);
    } else if (name === "taskDueDate") {
      setTaskDueDate(value);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTaskImage(file);
    }
  };

  return (
    <div className={`new-task-popup ${showPopup ? "show" : ""}`}>
      <div className="popup-content">
        <div className="popup-header">
          <h2>{existingTask ? "Edit Task" : "New Task"}</h2>
          <button className="close" onClick={togglePopup}>
            &times;
          </button>
        </div>
        <div className="popup-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskTitle">Title:</label>
              <input
                type="text"
                className="form-control"
                id="taskTitle"
                name="taskTitle"
                value={taskTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Description:</label>
              <textarea
                className="form-control"
                id="taskDescription"
                name="taskDescription"
                rows="3"
                value={taskDescription}
                onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="taskDueDate">Due Date:</label>
              <input
                type="date"
                className="form-control"
                id="taskDueDate"
                name="taskDueDate"
                value={taskDueDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskImage">Image:</label>
              <input
                type="file"
                className="form-control"
                id="taskImage"
                name="taskImage"
                onChange={handleFileInputChange}
              />
            </div>
            <div className="button-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={togglePopup}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {existingTask ? "Save Changes" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPopup;
