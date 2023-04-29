import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './index.css'
import { FullPageLoader } from './components';

const App = () => {

  const [loading, setLoading] = useState(true);

  const setTimeOuts = () => {
    setLoading(false)
  }

  useEffect(() => {
    setTimeout(setTimeOuts, 3000);
  }, [])
  return (
    <div className="App" style={{ display: 'flex' }} >
      {
        loading ? <FullPageLoader time={12} /> :
        <div style={{display:'flex', flex: 1}}>
          <div>
            <Sidebar />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'top' }}>
              <Navbar />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateCampaign />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/campaign/:id" element={<CampaignDetails />} />
            </Routes>
          </div>
        </div>
      }
    </div>
  )
}

export default App