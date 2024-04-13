import React, { useState } from 'react';

const Task = ({ imageSrc, title, description, creationDate, dueDate }) => {
  const [done, setDone] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  const handleToggle = () => {
    setDone(!done);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        localStorage.setItem('taskImage', imageData);
        // Optionally, you can also update the imageSrc state or prop
        setImageSource(imageData);
        document.querySelector('.chooseImage').style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="task-container">
      <input className='chooseImage' type="file" id="file" onChange={handleFileInputChange} />
      {imageSource && <img src={imageSource} alt="Task" className="task-image" />}
      <div className="task-content">
        <div style={{marginLeft: "30%"}}>
          <h2>{title}</h2>
          <p className='task-text'>{description}</p>
          <p className='task-text'>Creation Date: {creationDate}</p>
          <p className='task-text'>Due Date: {dueDate}</p>
        </div>
      </div>
      <div style={{padding: "2%"}}>
       <div className='row'>
       <button style={{alignSelf: "flex-end", marginBottom: "5%"}} className="task-button" onClick={handleToggle}>{done ? 'Undo' : 'Mark as Done'}</button>
       </div>
       <div className='row'>
       <button style={{alignSelf: "flex-end", marginBottom: "5%"}} className="task-button"> Edit </button>
       </div>
       <div className='row'>
       <button style={{alignSelf: "flex-end"}} className="task-button" > Delete </button>
       </div>
       </div>
    </div>
  );
};

export default Task;
