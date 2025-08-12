import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import VenueAccommodation from '../pages/VenueAccommodation';
// import Navbar from '../header/Navbar'
import Footer from '../footer/footer';
import KnowOurCity from '../pages/KnowOurCity';
import SpeakersPage from '../pages/SpeakersPage';
import LoginPage from '../pages/LoginPage';
import AdvisoryBoardPage from '../pages/AdvisoryBoardPage';
import OrganizingCommitteePage from '../pages/OrganizingCommitteePage';
import Researchandreview from '../pages/Researchandreview';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
      <Routes>
        
        {/* Use the 'path' prop to define the URL for the route */}
        <Route path='/' element={<Home />} />
        <Route path='/venue' element={<VenueAccommodation />} />
        <Route path='/city' element={<KnowOurCity/>} />
        <Route path='/speaker' element={<SpeakersPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/advisory' element={<AdvisoryBoardPage/>} />
        <Route path='/oraganising' element={<OrganizingCommitteePage/>} />
        <Route path='/research' element={<Researchandreview/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRoutes;