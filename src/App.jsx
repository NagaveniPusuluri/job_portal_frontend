import { useState } from 'react'
import './App.css'
 import { BrowserRouter, Routes, Route } from 'react-router-dom'
 import Header from './pages/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Create from './pages/Create'
import Search from './pages/Search'
import Details from './pages/Details'
const url=import.meta.env.VITE_Backend_URL;

function App() {
  const [response, setResponse] = useState("");
  const handleClick= async () => {
    const res=await fetch(url);
    const data= await res.json();
    setResponse(data.message);
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Header/><Search/></>}/>
      <Route path="/main" element={<><Header/><Search/></>} />
      <Route path="/job/:id" element={<><Header/><Details/></>}/>
      <Route path="/create-job" element={<Create/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      {/* <Route path="/edit/:id" element={<Create />} /> */}
    </Routes>
    </BrowserRouter>
    
    {/* <button onClick={handleClick}>Click Me</button>
    <h2>{response}</h2> */}
    </>
  )
}

export default App
