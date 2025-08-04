import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes
import './App.css';
import Homepage from './Pages/Homepage';
import About from './Pages/About';
import Blog from './Pages/Blog';
import OurServices from './Pages/OurServices';
import Influencers from './Pages/Influencers';
import Contactus from './Pages/Contactus';
import UpSkill from './Pages/UpSkill';
import AdminLogin from './Pages/AdminLogin';
import AdminHomepage from './Pages/AdminHomepage';
import InfluencerLogin from './Components/Influencer/InfluencerLogin';
// Import other components/pages as needed

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/influencer" element={<Influencers />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/upskill" element={<UpSkill />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminhomepage" element={<AdminHomepage/>} />

        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;
