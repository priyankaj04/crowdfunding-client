import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, sun } from '../assets'
import { navlinks } from '../constants'

const Sidebar = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard')
  if (window.innerWidth > 650) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', position: 'sticky', top: 5, height: '93vh' }}>
        <Link to='/'>
          <div style={{ width: 52, height: 52, background: '#27272a', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt="fund_logo" style={{ width: '50%', height: '50%' }} />
          </div>
        </Link>
        <div style={{ display: 'flex', flex: 1, width: 76, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', background: '#18181b', borderRadius: 10, marginTop: 25, paddingTop: 5, paddingBottom: 5 }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', gap: 3, alignItems: 'top', flexDirection: 'column' }}>
            {
              navlinks.map((link) =>
                <div style={{ width: 52, height: 52, margin: 5, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', background: isActive && isActive == link.name ? "#27272a" : 'transparent' }} onClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name); navigate(link.link);
                  }
                }}>
                  <img src={link.imgUrl} alt={link.name} style={{ width: '50%', height: '50%', filter: isActive && isActive != link.name ? 'grayscale(100)' : 'grayscale(0)' }} />
                </div>
              )
            }
          </div>
          <div style={{ width: 52, height: 52, margin: 5, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', background: isActive && isActive == 'sun' ? "#27272a" : 'transparent' }} onClick={() => {
            setIsActive('sun');
          }}>
            <img src={sun} alt="light_mode" style={{ width: '50%', height: '50%' }} />
          </div>
        </div>
      </div>
    )
  } else {
    return(<div />)
  }
}

export default Sidebar
