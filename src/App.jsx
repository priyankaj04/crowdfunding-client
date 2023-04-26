import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './index.css'

const App = () => {
  return (
    <div className="App" style={{ display: 'flex' }} >
      <div >
        <Sidebar />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{display:'flex', alignItems:'top'}}>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/campaign" element={<CampaignDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App