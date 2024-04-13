import { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";
import NewTaskPopup from "./NewTaskPopup";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const fetchTasks = async () => {
    const username = window.sessionStorage.getItem("username");
    try {
      return await axios.get(`/api/get_tasks?username=${username}`);

    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleSubmitTask = async (e) => {
    e.preventDefault();

    const username = window.sessionStorage.getItem("username");
    const taskTitle = e.target.taskTitle.value;
    const taskDescription = e.target.taskDescription.value;
    const taskDueDate = e.target.taskDueDate.value;
    const creationDate = new Date().toISOString();
    const taskImage = e.target.taskImage.files[0];

    axios
      .post("/api/add_task", {
        username,
        taskTitle,
        taskDescription,
        taskDueDate,
        creationDate,
        taskImage,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  useEffect(() => {
    const user = window.sessionStorage.getItem("username");
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const promise = fetchTasks();
    promise.then(response => {
      console.log("Data received:", response.data.tasks);
      if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else {
        console.error("Received data is not an array:", response.data.tasks);
      }
    }).catch(error => {
      console.error("Error fetching tasks:", error);
    });
}, []);


  return (
    <div className="my-tasks">
      <div className="banner" style={{ height: "100px", width: "100%" }}></div>

      <div className="row" style={{ margin: "1%" }}></div>

      <div className="row">
        <div className="col-4">
          <h1>My Tasks</h1>
        </div>

        <div className="col-4">
          <button className="add" onClick={togglePopup}>
            <div className="col-12">
              <h3>New task</h3>
            </div>
          </button>
        </div>
      </div>

      <div className="row" style={{ margin: "1%" }}></div>

      {/* Map over tasks array and render Task components */}
      {tasks.map((task, index) => (
        <Task
          key={index} // Assuming _id is an object with a $oid property
          title={task.title}
          description={task.description}
          creationDate={task.CreationDate}
          // Add other props as needed
        />
      ))}

      <NewTaskPopup
        showPopup={showPopup}
        togglePopup={togglePopup}
        handleSubmit={handleSubmitTask}
      />
    </div>
  );
}

export default MyTasks;
