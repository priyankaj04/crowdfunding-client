import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton, Animations } from './'
import { logo, close, menu1, search, thirdweb } from './../assets'
import { navlinks } from '../constants';
import { Capitalize } from './CommonFuncs';
import { useStateContext } from '../context';
import { motion } from "framer-motion"

const Navbar = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext()


  return (
    <div style={{ height:55, alignItems: 'center', display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flex: 1, maxWidth: window.innerWidth > 650 ? 458 : 280, paddingLeft: 4, paddingTop: 2, paddingRight: 2, paddingBottom: 2, height: 35, background: '#292524', borderRadius: 20, margin: 10 }}>
        <input placeholder='Search for Campaign' style={{ display: 'flex', width: '100%', fontFamily: "'Epilogue', sans-serif", fontSize: 16, background: 'transparent', color: 'white', outline: 'none', border: '0px', borderRadius: 20, padding: 5 }} />
        <div style={{ width: 72, height: '100%', borderRadius: 20, background: '#f97316', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <img src={search} alt="search" style={{ width: 15, height: 15, objectFit: 'contain' }} />
        </div>
      </div>
      {window.innerWidth > 650 ?
        <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, height: 20, alignItems: 'center' }} >
          <CustomButton
            btnType="button"
            title={address ? 'Create a Campaign' : 'Connect'}
            handleClick={() => {
              if (address) navigate('create')
              else connect()
            }}
          />

          <Link to='/profile'>
            <div>
              <img src={thirdweb} alt="profile_logo" style={{ width: 20, height: 20, borderRadius: '50%', margin: 5, marginLeft: 20, marginRight: 10, objectFit: 'contain', padding: 8, background:'#18181b' }} />
            </div>
          </Link>
        </div> :
        <div style={{ display: 'flex', justifyContent: 'flex-end', height: 72, alignItems: 'center' }}>
          {toggleDrawer ? <img src={close} alt='cancle' style={{ width: 25, height: 25, margin: 10, cursor: 'pointer' }} onClick={() => setToggleDrawer(!toggleDrawer)} /> : <img src={menu1} alt="hamburger" style={{ width:25, height: 25, margin: 10, cursor: 'pointer' }} onClick={() => { setToggleDrawer(!toggleDrawer) }} />}
          {toggleDrawer && <div style={{ position: 'absolute', width: '100vw', height: '100vh', background: '#0c0a09', top: 60, transition: "all 700", zIndex: 10, right: 0, left: 0 }}>
            <Animations />
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} style={{ position: 'absolute', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
                  {
                navlinks.map((link, index) => (<motion.div initial={{opacity: 0, x: 0}} animate={{ opacity: 1, x: { duration: 1}}}  className='menu' style={{diplay:'flex', flex: 1, flexDirection:'column', alignItems:'center'}}>
                  <motion.div style={{display:'flex', flex: 1, textAlign:'center', margin: 30, padding: 10, alignItems:'center'}}
                      onClick={() => {
                        setIsActive(link.name);
                        setToggleDrawer(false);
                        navigate(link.link)
                    }}><motion.p initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 50 }} transition={{ duration: 0.5, delay: 1 + 0.5 * index }} style={{textAlign:'center'}}>{Capitalize(link.name)}</motion.p>
                  </motion.div>
                  <motion.hr initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100vw' }} transition={{duration: 0.5, delay: 1+0.5*index}} style={{ width: "100vw"}} />
                  </motion.div>))
                  }
            </motion.div>
          </div>}
        </div>
      }
    </div>
  )
}

export default Navbar
