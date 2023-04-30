import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CampaignDetails = () => {
  const { state } = useLocation();
  const { address, contract, donate, getDonations } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [fetch, setFetch] = useState(false);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  }

  const handleDonate = async () => {
    if (!amount) {
      toast.info("Please enter donation amount.");
      return;
    }
    setIsLoading(true);
    try {
      await donate(state.pId, amount);
      toast.success("Transaction is successfull. Thankyou for your donation, It helps alot!")
      setIsLoading(false);
      setAmount('');
      setFetch(!fetch);
    } catch (err) {
      toast.error("Some error in transaction. Please check your settings.");
      setFetch(!fetch);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (contract)
      fetchDonators();
  }, [contract, address, fetch])

  const remainingDays = daysLeft(state.deadline);
  return (
    <div style={{ margin: window.innerWidth > 650 ? 20:5, padding: window.innerWidth > 650 && 10, background: '#18181b', borderRadius: 10 }}>
      <ToastContainer position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <h3 style={{ textAlign: 'center', margin: 15, fontSize: 20 }}>{state.title}</h3>
      <div style={{ display: 'flex', flex: 1, flexDirection: window.innerWidth < 650 && 'column' }}>
        <div style={{ display: 'flex', flex: 4, justifyContent: 'center' }}>
          <img src={state.image} width={window.innerWidth > 650 ? '80%' : 300} style={{ borderRadius: 10, height: window.innerWidth > 650 ? 400: 200 }} />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: window.innerWidth > 650 ? 'column' : 'row', gap: 10 }}>
          <div style={{ margin: 15, background: '#27272a', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
            <p style={{ textAlign: 'center', margin: 15, fontSize: 16, fontWeight: 'bold', color: '#f97316' }}>{remainingDays}</p>
            <p style={{ display: 'flex', flex: 1, background: '#3f3f46', justifyContent: 'center', padding: 10, borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#a3a3a3', fontSize: 14 }}>Days Left</p>
          </div>
          <div style={{ margin: 20, background: '#27272a', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
            <p style={{ textAlign: 'center', margin: 15, fontSize: 16, fontWeight: 'bold', color: '#f97316' }}>{state.amountCollected}</p>
            <p style={{ display: 'flex', flex: 1, background: '#3f3f46', justifyContent: 'center', padding: 10, borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#a3a3a3', fontSize: 14 }}>Raised of {state.target}</p>
          </div>
          <div style={{ margin: 20, background: '#27272a', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
            <p style={{ textAlign: 'center', margin: 15, fontSize: 16, fontWeight: 'bold', color: '#f97316' }}>{donators.length}</p>
            <p style={{ display: 'flex', flex: 1, background: '#3f3f46', justifyContent: 'center', padding: 10, borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#a3a3a3', fontSize: 14 }}>Total Backers</p>
          </div>
        </div>
      </div>
      <div style={{ display: window.innerWidth > 650 && 'flex', justifyContent: window.innerWidth > 650 && 'space-between', flex: 1 }}>
        <div style={{display:'flex', flex: 1, flexDirection:'column'}}>
          <div style={{ margin: 20}}>
            <h3 style={{ fontSize: 18, color: '#f97316' }}>CREATOR</h3>
            <div style={{ display: 'flex', gap: 15, marginTop: 25 }}>
              <img src={thirdweb} width={20} style={{ borderRadius: '50%', background: '#09090b', padding: 8 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'left' }}>
                <p style={{ fontSize: window.innerWidth > 650 ? 14 : 10}}>{address}</p>
                <p style={{ color: '#a1a1aa', fontSize: window.innerWidth > 650 ? 12 : 10 }}>10 campaigns</p>
              </div>
            </div>
          </div>
          <div style={{ margin: 20 }}>
            <h3 style={{ fontSize: 18, color: '#f97316' }}>STORY</h3>
            <div style={{ display: 'flex', gap: 15, marginTop: 15, fontSize: 16 }}>
              <p style={{ lineHeight: '1.5rem' }}>{state.description}</p>
            </div>
          </div>
          <div style={{ margin: 20}}>
            <h3 style={{ fontSize: 18, color: '#f97316' }}>DONATORS</h3>
            {
              donators && donators.length > 0 ? <div style={{ display: 'flex', gap: 15, marginTop: 15, color: '#a1a1aa', flexDirection: 'column', fontSize: 14 }}>
                {
                  donators.map((item, index) => <div style={{ display: 'flex', gap: 10 }}>
                    <p>{index + 1}.</p>
                    <p>{item.donator}</p>
                  </div>)
                }
              </div> :
                <div style={{ display: 'flex', gap: 15, marginTop: 25, color: '#a1a1aa' }}>
                  No donators yet. Be the one!
                </div>
            }
          </div>
        </div>
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} style={{ margin: 20, display:'flex', flex: 1, flexDirection:'column' }}>
          <h3 style={{ fontSize: 18, color: '#f97316', marginLeft: window.innerWidth > 650 ? 30 : 0 }}>FUND</h3>
          <div style={{ display: 'flex', marginTop: 15, background: '#27272a', borderRadius: 10, flexDirection: 'column', margin: window.innerWidth > 650 && 30 }}>
            <p style={{ textAlign: 'center', fontSize: 18, margin: 30 }}>Pledge without reward</p>
            <input placeholder='ETH 0.50'
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", margin: 15, fontSize: 14, background: '#292524', color: 'white', outline: 'none', border: '1px solid #71717a', borderRadius: 10, padding: 15 }} />
            <div style={{ margin: 15, background: '#09090b', borderRadius: 10, margintop: 0 }}>
              <p style={{ margin: 15, fontSize: 18, fontWeight: 'bold' }}>Back it because you believe in it.</p>
              <p style={{ color: '#71717a', fontSize: 16, margin: 15 }}>Support the project for no reward. Just because it speaks for you.</p>
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <button onClick={() => { !isLoading && handleDonate() }} style={{ fontSize: 16, fontWeight: 'bold', background: isLoading ? '#c2410c' : '#f97316', border: 'none', borderRadius: 10, padding: 10, color: 'white', cursor: 'pointer', margin: 15 }}>Fund Campaign</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CampaignDetails
