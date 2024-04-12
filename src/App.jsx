import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Login from './pages/LoginRegister/Login'
import Register from './pages/LoginRegister/Register'

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

    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
