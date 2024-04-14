/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import ImageCompressor from "image-compressor.js";

const EditTaskPopup = ({
  showPopup,
  togglePopup,
  setTogglePopup,
  handleSubmitEdit,
  existingTask,
  username,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const fileInputRef = useRef(null); // Ref to file input element

  // Set initial values if an existing task is provided
  useEffect(() => {
    if (existingTask) {
      const image = localStorage.getItem(
        username + "taskImage" + existingTask.title
      );

      setTaskTitle(existingTask.title || "");
      setTaskDescription(existingTask.description || "");
      setTaskDueDate(existingTask.DueDate || "");
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

  function removeImage() {
    const username = window.sessionStorage.getItem("username");

    localStorage.removeItem(username + "taskImage" + taskTitle);

    console.log("username: ", username);
    console.log("taskTitle: ", taskTitle);

    if (fileInputRef.current) {
      fileInputRef.current.style.display = "block";
    }

  }

  const handleFileInputChange = (event) => {
  
    const username = window.sessionStorage.getItem("username");
    const file = event.target.files[0];

    new ImageCompressor(file, {
      quality: 0.3,
      success(result) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result;
          localStorage.setItem(username + "taskImage" + taskTitle, imageData);
          if (fileInputRef.current) {
            fileInputRef.current.style.display = "none";
          }
        };
        reader.readAsDataURL(result);
      },
      error(err) {
        console.error("Image compression failed:", err.message);
      },
    });
  };

  return (
    <div className={`edit-task-popup ${showPopup ? "show" : ""}`}>
      <div className="popup-content">
        <div className="popup-header">
          <h2>{existingTask ? "Edit Task" : "New Task"}</h2>
          <button className="close" onClick={togglePopup}>
            &times;
          </button>
        </div>
        <div className="popup-body">
          <form onSubmit={handleSubmitEdit}>
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

            <div
              className="button-group"
              style={{ display: "flex", gap: "0.5em" }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => togglePopup()} // Call togglePopup function
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={removeImage}>
                Remove Image
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
