import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import Login from './pages/LoginRegister/Login'
import Register from './pages/LoginRegister/Register'
import Homepage from './pages/homepage/Homepage'
import MyTasks from './pages/homepage/MyTasks'
import GoBackButton from './GoBackButton'

function App() {
  const [count, setCount] = useState(0)


  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:5000/start')
    console.log(response.data.message)
  }


  useEffect(() => {
    fetchAPI()
  }, [])





  return (
    <>

    <GoBackButton/>
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='/homepage' element={<Homepage/>} />
        <Route path='/mytasks' element={<MyTasks/>} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
