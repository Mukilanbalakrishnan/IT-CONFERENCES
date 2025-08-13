import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Venue from '../pages/Venue/Venue';
import Navbar from '../header/Navbar';

const AppRoutes = () => {
  return (
       <BrowserRouter>
      <Navbar/>
       <Routes>
        <Route index to='/' element={<Home/>}/>
        <Route path ='/venue' element={<Venue/>}/>
       </Routes>
       </BrowserRouter>
  )
}

export default AppRoutes;