import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton, Animations } from './'
import { logo, menu, search, thirdweb } from './../assets'
import { navlinks } from '../constants';
import { Capitalize } from './CommonFuncs';
import { useStateContext } from '../context';
import anime from 'animejs';

const Navbar = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext()


  return (
    <div style={{ height: 72, alignItems: 'center', display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flex: 1, maxWidth: 458, paddingLeft: 4, paddingTop: 2, paddingRight: 2, paddingBottom: 2, height: 48, background: '#292524', borderRadius: 20 }}>
        <input placeholder='Search for Campaign' style={{ display: 'flex', width: '100%', fontFamily: "'Epilogue', sans-serif", fontSize: 16, background: 'transparent', color: 'white', outline: 'none', border: '0px', borderRadius: 20, padding: 5 }} />
        <div style={{ width: 72, height: '100%', borderRadius: 20, background: '#f97316', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <img src={search} alt="search" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        </div>
      </div>
      {window.innerWidth > 650 ?
        <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, height: 72, alignItems: 'center' }} >
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
              <img src={thirdweb} alt="profile_logo" style={{ width: 40, height: 40, borderRadius: '50%', margin: 5, marginLeft: 20, marginRight: 10, objectFit: 'contain' }} />
            </div>
          </Link>
        </div> :
        <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 0.3, height: 72, alignItems: 'center' }}>
          {toggleDrawer ? <img src={logo} alt='cancle' style={{ width: 36, height: 36, margin: 10, cursor: 'pointer' }} onClick={() => setToggleDrawer(!toggleDrawer)} /> : <img src={menu} alt="hamburger" style={{ width: 36, height: 36, margin: 10, cursor: 'pointer' }} onClick={() => { setToggleDrawer(!toggleDrawer) }} />}
          {toggleDrawer && <div style={{ position: 'absolute', width: '100vw', height: '100vh', background: '#0c0a09', top: 60, transition: "all 700", zIndex: 10, right: 0, left: 0 }}>
            <Animations />
            <div style={{ position: 'absolute', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
                  {
                navlinks.map((link) => (<div  className='menu' style={{diplay:'flex', flex: 1, flexDirection:'column', alignItems:'center'}}>
                  <div style={{display:'flex', flex: 1, textAlign:'center', margin: 30, padding: 10, alignItems:'center'}}
                      onClick={() => {
                        setIsActive(link.name);
                        setToggleDrawer(false);
                        navigate(link.link)
                    }}><p style={{textAlign:'center'}}>{Capitalize(link.name)}</p>
                  </div>
                  <hr style={{ width: "100vw"}} />
                  </div>))
                  }
              </div>
          </div>}
        </div>
      }
    </div>
  )
}

export default Navbar
