import { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";
import NewTaskPopup from "./NewTaskPopup";
import EditTaskPopup from "./EditTaskPopup";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [existingTask, setExistingTask] = useState({});


  const initiateEdit = (task) => {
    setExistingTask(task);
    toggleEditPopup();
  };

  const toggleEditPopup = () => {
    setShowEditPopup(!showEditPopup);




  };

  const toggleCreatePopup = () => {
    setShowCreatePopup(!showCreatePopup);
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
    const creationDate = new Date().toLocaleDateString(); // Format the creation date as per your requirement
    const taskImage = e.target.taskImage.files[0];

    // TODO: Consider if this is smart. Get the latest id so we can create a new one incrumentally
    try {
      const latestTaskResponse = await axios.get(
        `/api/get_latest_task_id?username=${username}`
      );
      let latestTaskId = 1; // <--- Incase we have to start from scratch with a new acc
      console.log(latestTaskResponse.data);
      if (latestTaskResponse.data.next_task_id) {
        latestTaskId = latestTaskResponse.data.next_task_id;
      }

      // New object in the making
      const newTask = {
        task_id: latestTaskId, // <--- Incremental id
        title: taskTitle,
        description: taskDescription,
        CreationDate: creationDate,
        DueDate: taskDueDate,
      };

      const response = await axios.post("/api/add_task", {
        username,
        task: newTask,
      });

      console.log(response.data.message);

      setShowCreatePopup(false);
      window.location.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const user = window.sessionStorage.getItem("username");
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const promise = fetchTasks();
    promise
      .then((response) => {
        console.log("Data received:", response.data.tasks);
        if (Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);
        } else {
          console.error("Received data is not an array:", response.data.tasks);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleDeleteTask = async (task) => {
    const username = window.sessionStorage.getItem("username");
    window.localStorage.removeItem(username + "taskImage" + task.title);
    try {
      const response = await axios.delete(
        `/api/delete_task/${task.task_id}?username=${username}`
      );
      
      window.location.reload();
      console.log(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const oldtitle = existingTask.title;
    console.log("old title is", oldtitle);

   


    const username = window.sessionStorage.getItem("username");
    const taskTitle = e.target.taskTitle.value;
    const taskDescription = e.target.taskDescription.value;
    const taskDueDate = e.target.taskDueDate.value;
    const creationDate = new Date().toLocaleDateString(); // Format the creation date as per your requirement

    const image = localStorage.getItem(username + "taskImage" + oldtitle);
    localStorage.removeItem(username + "taskImage" + oldtitle);
    localStorage.setItem(username + "taskImage" + e.target.taskTitle.value, image);

    const updatedTask = {
      task_id: existingTask.task_id,
      title: taskTitle,
      description: taskDescription,
      CreationDate: creationDate,
      DueDate: taskDueDate,
    };
    try {
      const response = await axios.put(`/api/update_task/${existingTask.task_id}?username=${username}`, {
        task: updatedTask,
      });



      console.log("rsponse is", response.data.message);

      setShowEditPopup(false); // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="my-tasks">
      <div className="banner" style={{ height: "100px", width: "100%" }}></div>

      <div className="row" style={{ margin: "1%" }}></div>

      <div className="row">
        <div className="col-4">
          <h1>My Tasks</h1>
        </div>

        <div className="col-4">
          <button className="add" onClick={toggleCreatePopup}>
            <div className="col-12">
              <h3>New task</h3>
            </div>
          </button>
        </div>
      </div>

      <div className="row" style={{ margin: "1%" }}></div>

      {tasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          description={task.description}
          creationDate={task.CreationDate}
          dueDate={task.DueDate}
          handleDelete={() => handleDeleteTask(task)}
          toggleEdit={() => initiateEdit(task)}
        />
      ))}

      <NewTaskPopup
        showPopup={showCreatePopup}
        togglePopup={toggleCreatePopup}
        handleSubmit={handleSubmitTask}
      />

<EditTaskPopup
  showPopup={showEditPopup}
  togglePopup={toggleEditPopup} // Pass togglePopup function
  setTogglePopup={setShowEditPopup}
  existingTask={existingTask}
  handleSubmitEdit={handleSubmitEdit}
/>

    </div>
  );
}

export default MyTasks;
