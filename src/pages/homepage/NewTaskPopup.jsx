import React, { useRef, useState } from 'react';
import ImageCompressor from 'image-compressor.js';

const NewTaskPopup = ({ showPopup, togglePopup, handleSubmit }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskImage, setTaskImage] = useState(null);
  const [taskDueDate, setTaskDueDate] = useState('');
  const fileInputRef = useRef(null); // Ref to file input element

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'taskTitle') {
      setTaskTitle(value);
    } else if (name === 'taskDescription') {
      setTaskDescription(value);
    } else if (name === 'taskDueDate') {
      setTaskDueDate(value);
    }
  };

  const handleFileInputChange = (e) => {

    const username = window.sessionStorage.getItem('username');
    const file = e.target.files[0];

    new ImageCompressor(file, {
        quality: 0.3,
        success(result) {
          const reader = new FileReader();
          reader.onload = () => {
            const imageData = reader.result;
            localStorage.setItem(username + 'taskImage' + taskTitle, imageData);
            if (fileInputRef.current) {
              fileInputRef.current.style.display = 'none';
            }
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.error('Image compression failed:', err.message);
        },
      });


      
  };

  return (
    <div className={`new-task-popup ${showPopup ? 'show' : ''}`}>
      <div className="popup-content">
        <div className="popup-header">
          <h2>New Task</h2>
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
                onChange={handleInputChange}
              ></textarea>
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
              <button type="button" className="btn btn-secondary" onClick={togglePopup}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTaskPopup;
