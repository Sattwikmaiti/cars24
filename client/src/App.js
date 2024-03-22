import React from 'react'

import Cars from './components/Cars'
import Deals from './components/Deals'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,

 
} from "react-router-dom";


const App = () => {
  let user=localStorage.getItem('token');
  return (
    <div>
       <Router>
      <Routes>
        <Route exact path="/" element={user ? <Deals />:  <Login />}/>
       
        <Route  path="/cars" element={<Cars />}/>
        
  
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/deals" element={ <Deals />}/>
        <Route path="/register"element={<Register />}/>
       
      </Routes>
    </Router>
    </div>
  )
}

export default App
