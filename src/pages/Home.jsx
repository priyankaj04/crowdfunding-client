import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context'
import {DisplayCampaign} from '../components';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data)
    setIsLoading(false)
    console.log(data);
  }

  useEffect(() => {
    if(contract) fetchCampaigns()
  }, [address, contract])
  
  return (
    <div style={{ margin: 20, padding: 10 }}>
      <h3>All Champaigns ({campaigns.length})</h3>
      <div style={{display:'flex', flexWrap:'wrap'}}>{
        campaigns && campaigns.length > 0 && campaigns.map((item) => <DisplayCampaign props={item} />)
      }
      </div>
    </div>
  )
}

export default Home