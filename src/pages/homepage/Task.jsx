import React, { useEffect, useState, useRef } from 'react';
import ImageCompressor from 'image-compressor.js';

const Task = ({ imageSrc, title, description, creationDate, dueDate, handleDelete, toggleEdit }) => {
  const [done, setDone] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [imageSet, setImageSet] = useState(false);
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
            setImageSet(true);
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
    }
  };
  

  useEffect(() => {
    const imageData = localStorage.getItem(username + 'taskImage' + title);
    if (imageData && fileInputRef.current) { // Add check for fileInputRef.current
      setImageSource(imageData);
      fileInputRef.current.style.display = 'none'; // Hide file input element
    }
  }, [imageSet]);
  

  return (
    <div className="task-container">
      <input ref={fileInputRef} className={`chooseImage${title}`} type="file" id="file" onChange={handleFileInputChange} />
      {imageSource && <img src={imageSource} alt="Task" className="task-image" />}
      <div className="task-content">
        <div style={{ marginLeft: "30%" }}>
          <h2>{title}</h2>
          <p className='task-text'>{description}</p>
          <p className='task-text'>Creation Date: {creationDate}</p>
          <p className='task-text'>Due Date: {dueDate}</p>
        </div>
      </div>
      <div style={{ padding: "2%", width: "12%"}}>
        <div className='row'>
          <button style={{ alignSelf: "flex-end", marginBottom: "5%" }} className="task-button" onClick={handleToggle}>{done ? 'Undo' : 'Mark as Done'}</button>
        </div>
        <div className='row'>
          <button style={{ alignSelf: "flex-end", marginBottom: "5%" }} className="task-button" onClick={toggleEdit}> Edit </button>
        </div>
        <div className='row'>
          <button style={{ alignSelf: "flex-end" }} className="task-button" onClick={handleDelete}> Delete </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
