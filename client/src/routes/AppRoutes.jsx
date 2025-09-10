import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Venue from '../pages/Venue/Venue';
import Speaker from '../pages/Speaker/Speaker';
import Contact from '../pages/Contact/contact';
import Agenda from '../pages/Agenda/agenda';
import Navbar from '../header/Navbar';
import Footer from '../Footer/Footer';
import AdvisoryBoard from '../pages/AdvisoryBoard/AdvisoryBoardPage';
import OrganizingCom from '../pages/OrganizingCommittee/OrganizingCommitteePage';
import ResearchCom from '../pages/Researchandreview/Researchandreview';
import RegistrationForm from '../pages/Register/RegisterForm';
import SubmissionStatusTracker from '../pages/statustracker/SubmissionStatusTracker';
import ConferenceTracksPage from '../pages/ConferenceTrack/ConferenceTracksPage';
import Journal from '../pages/Journal/journal'
import FeeStructure from '../pages/FeeStructure/FeeStructure';

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
        <Route path ='/committees/advisory-board' element={<AdvisoryBoard />}/>
        <Route path ='/committees/organizing-committee' element={<OrganizingCom />}/>
        <Route path ='/committees/research-and-review-committee' element={<ResearchCom />}/>
        <Route path='/register' element={<RegistrationForm/>}/>
        <Route path='/status-tracker' element={<SubmissionStatusTracker/>}/>
        <Route path='/conferencetrack' element={<ConferenceTracksPage/>}/>
        <Route path='/journal' element={<Journal/>}/>
        <Route path='/feestructure' element={<FeeStructure/>}/>
        
       </Routes>


      <Footer/>
      </BrowserRouter>
  )
}

export default AppRoutes;