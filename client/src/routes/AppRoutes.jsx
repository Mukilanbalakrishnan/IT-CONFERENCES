import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Venue from '../pages/Venue/Venue';
import Speaker from '../pages/Speaker/Speaker';
import Contact from '../pages/Contact/contact';
import Agenda from '../pages/Agenda/agenda';
import Navbar from '../header/Navbar';
import Footer from '../Footer/Footer';

const AppRoutes = () => {
  return (
      <BrowserRouter>
      <Navbar/>
       <Routes>
        <Route index to='/' element={<Home/>}/>
        <Route path ='/venue' element={<Venue/>}/>
        <Route path ='/speaker' element={<Speaker />}/>
        <Route path ='/contact' element={<Contact />}/>
        <Route path ='/agenda' element={<Agenda />}/>
       </Routes>
      <Footer/>
      </BrowserRouter>
  )
}

export default AppRoutes;