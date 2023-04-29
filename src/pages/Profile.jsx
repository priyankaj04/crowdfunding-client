import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context'
import { DisplayCampaign } from '../components';
import { nodata } from '../assets';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaign } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaign();
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampaigns()
  }, [address, contract])

  return (
    <div style={{ margin: 20, padding: 10 }}>
      <h3>All Champaigns ({campaigns.length})</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{
        campaigns && campaigns.length > 0 && campaigns.map((item) => <DisplayCampaign props={item} />)
      }
      </div>
      {
        !campaigns || campaigns.length == 0 && <div style={{display:'flex', flex: 1, alignItems:'center', justifyContent:'center', flexDirection:'column', height: '80vh'}}>
          <img src={nodata} width={200} />
          <p style={{ color: '#71717a', textAlign:'center', margin: 25}}>No campaigns are created.</p>
        </div>
      }
    </div>
  )
}

export default Profile