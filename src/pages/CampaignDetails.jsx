import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

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
    await donate(state.pId, amount);
    setFetch(!fetch);
  }

  useEffect(() => {
    if (contract)
      fetchDonators();
  }, [contract, address, fetch])

  const remainingDays = daysLeft(state.deadline);
  return (
    <div style={{ margin: 20, padding: 10, background: '#18181b', borderRadius: 10 }}>
      <h3 style={{ textAlign: 'center', margin: 20, fontSize: 26 }}>{state.title}</h3>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ display: 'flex', flex: 4, justifyContent: 'center' }}>
          <img src={state.image} width='80%' style={{ borderRadius: 10, height: 500 }} />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 30 }}>
          <div style={{ margin: 20, background: '#27272a', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
            <p style={{ textAlign: 'center', margin: 20, fontSize: 24, fontWeight: 'bold', color: '#f97316' }}>{remainingDays}</p>
            <p style={{ display: 'flex', flex: 1, background: '#3f3f46', justifyContent: 'center', padding: 15, borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#a3a3a3' }}>Days Left</p>
          </div>
          <div style={{ margin: 20, background: '#27272a', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
            <p style={{ textAlign: 'center', margin: 20, fontSize: 24, fontWeight: 'bold', color: '#f97316' }}>{state.amountCollected}</p>
            <p style={{ display: 'flex', flex: 1, background: '#3f3f46', justifyContent: 'center', padding: 15, borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#a3a3a3' }}>Raised of {state.target}</p>
          </div>
          <div style={{ margin: 20, background: '#27272a', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
            <p style={{ textAlign: 'center', margin: 20, fontSize: 24, fontWeight: 'bold', color: '#f97316' }}>{donators.length}</p>
            <p style={{ display: 'flex', flex: 1, background: '#3f3f46', justifyContent: 'center', padding: 15, borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#a3a3a3' }}>Total Backers</p>
          </div>
        </div>
      </div>
      <div style={{ display: window.innerWidth > 650 && 'flex', justifyContent: window.innerWidth > 650 && 'space-between' }}>
        <div>
          <div style={{ margin: 25, marginTop: 35 }}>
            <h3 style={{ fontSize: 20, color: '#f97316' }}>CREATOR</h3>
            <div style={{ display: 'flex', gap: 15, marginTop: 25 }}>
              <img src={thirdweb} width={30} style={{ borderRadius: '50%', background: '#09090b', padding: 10 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'left' }}>
                <p>{address}</p>
                <p style={{ color: '#a1a1aa' }}>10 campaigns</p>
              </div>
            </div>
          </div>
          <div style={{ margin: 25, marginTop: 35 }}>
            <h3 style={{ fontSize: 20, color: '#f97316' }}>STORY</h3>
            <div style={{ display: 'flex', gap: 15, marginTop: 25 }}>
              <p style={{ lineHeight: '1.5rem' }}>{state.description}</p>
            </div>
          </div>
          <div style={{ margin: 25, marginTop: 35 }}>
            <h3 style={{ fontSize: 20, color: '#f97316' }}>DONATORS</h3>
            {
              donators && donators.length > 0 ? <div style={{ display: 'flex', gap: 15, marginTop: 25, color: '#a1a1aa', flexDirection: 'column' }}>
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
        <div style={{ margin: 25, marginTop: 35 }}>
          <h3 style={{ fontSize: 20, color: '#f97316' }}>FUND</h3>
          <div style={{ display: 'flex', marginTop: 20, background: '#27272a', borderRadius: 10, flexDirection: 'column' }}>
            <p style={{ textAlign: 'center', fontSize: 24, margin: 30 }}>Pledge without reward</p>
            <input placeholder='ETH 0.50'
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", margin: 20, fontSize: 20, background: '#292524', color: 'white', outline: 'none', border: '1px solid #71717a', borderRadius: 10, padding: 20 }} />
            <div style={{ margin: 20, background: '#09090b', borderRadius: 10, margintop: 0 }}>
              <p style={{ margin: 20, fontSize: 22, fontWeight: 'bold' }}>Back it because you believe in it.</p>
              <p style={{ color: '#71717a', fontSize: 20, margin: 20 }}>Support the project for no reward. Just because it speaks for you.</p>
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <button onClick={() => handleDonate()} style={{ fontSize: 20, fontWeight: 'bold', background: '#f97316', border: 'none', width: 300, borderRadius: 10, padding: 10, color: 'white', cursor: 'pointer', margin: 20 }}>Fund Campaign</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
