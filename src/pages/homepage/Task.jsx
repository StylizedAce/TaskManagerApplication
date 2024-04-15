import React, { useEffect, useState, useRef } from 'react';
import ImageCompressor from 'image-compressor.js';

const Task = ({ title, description, creationDate, dueDate, handleDelete, toggleEdit }) => {
  const [done, setDone] = useState(false);
  const [showImageInput, setShowImageInput] = useState(true);
  const [imageSource, setImageSource] = useState(null);
  const username = window.sessionStorage.getItem('username');
  const fileInputRef = useRef(null); // Ref to file input element

  const handleToggle = () => {
    setDone(!done);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Compress the image before storing it
      new ImageCompressor(file, {
        quality: 0.3,
        success(result) {
          const reader = new FileReader();
          reader.onload = () => {
            const imageData = reader.result;
            localStorage.setItem(username + 'taskImage' + title, imageData);
            setImageSource(imageData); // Update image source state
            setShowImageInput(false); // Hide file input
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.error('Image compression failed:', err.message);
        },
      });
    }
  };

  useEffect(() => {
  const imageData = localStorage.getItem(username + 'taskImage' + title);
  if (imageData) {
    // Attempt to create an Image object
    const img = new Image();
    img.onload = () => {
      setImageSource(imageData);
      setShowImageInput(false); // Hide file input
    };
    img.onerror = () => {
      setImageSource(null);
      setShowImageInput(true); // Show file input
    };
    img.src = imageData;
  } else {
    setImageSource(null);
    setShowImageInput(true); // Show file input
  }
}, [title]);


  return (
    <div className={done ? "task-container-done" : "task-container"}>
      {imageSource != null && !showImageInput ? (
        <img src={imageSource} alt="Task" className="task-image" />
      ) : (
        <input ref={fileInputRef} type="file" accept='.png, .jpeg, .jpg' id="file" onChange={handleFileInputChange} />
      )}
      <div className="task-content">
        <div style={{ marginLeft: '30%' }}>
          <h2>{title}</h2>
          <p className='task-text'>{description}</p>
          <p className='task-text'>Creation Date: {creationDate}</p>
          <p className='task-text'>Due Date: {dueDate}</p>
        </div>
      </div>
      <div style={{ padding: '2%', width: '12%' }}>
        <div className='row'>
          <button style={{ alignSelf: 'flex-end', marginBottom: '5%' }} className="task-button" onClick={handleToggle}>{done ? 'Undo' : 'Mark as Done'}</button>
        </div>
        <div className='row'>
          <button style={{ alignSelf: 'flex-end', marginBottom: '5%' }} className="task-button" onClick={toggleEdit}> Edit </button>
        </div>
        <div className='row'>
          <button style={{ alignSelf: 'flex-end' }} className="task-button" onClick={handleDelete}> Delete </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
