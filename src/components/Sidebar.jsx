import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, sun } from '../assets'
import { navlinks } from '../constants'
import { motion } from "framer-motion"

const Sidebar = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard')
  if (window.innerWidth > 650) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', position: 'sticky', top: 5, height: '93vh' }}>
        <Link to='/'>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} style={{ width: 40, height: 40, background: '#27272a', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt="fund_logo" style={{ width: '50%', height: '50%' }} />
          </motion.div>
        </Link>
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 0.5 }} style={{ display: 'flex', flex: 1, width: 55, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', background: '#18181b', borderRadius: 10, marginTop: 25, paddingTop: 5, paddingBottom: 5 }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', gap: 3, alignItems: 'top', flexDirection: 'column' }}>
            {
              navlinks.map((link, index) =>
                <motion.div whileHover={{ scale: 1.3, rotate: 360 }} whileTap={{ scale: 0.9 }} style={{ width: 40, height: 40, margin: 5, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', background: isActive && isActive == link.name ? "#27272a" : 'transparent' }} onClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name); navigate(link.link);
                  }
                }}>
                  <img  src={link.imgUrl} alt={link.name} style={{ width: '50%', height: '50%', filter: isActive && isActive != link.name ? 'grayscale(100)' : 'grayscale(0)' }} />
                </motion.div>
              )
            }
          </div>
          <motion.div whileHover={{ scale: 1.3, rotate: 360 }} whileTap={{ scale: 0.9 }} style={{ width: 40, height: 40, margin: 5, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', background: isActive && isActive == 'sun' ? "#27272a" : 'transparent' }} onClick={() => {
            setIsActive('sun');
          }}>
            <img src={sun} alt="light_mode" style={{ width: '50%', height: '50%' }} />
          </motion.div>
        </motion.div>
      </div>
    )
  } else {
    return(<div />)
  }
}

export default Sidebar
