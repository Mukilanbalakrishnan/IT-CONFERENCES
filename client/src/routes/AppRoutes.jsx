import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
       <BrowserRouter>
       <Routes>
        <Route index to='/' element={<Home/>}/>
       </Routes>
       </BrowserRouter>
  )
}

export default AppRoutes  