import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context'
import { DisplayCampaign, PostLoader } from '../components';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();


  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampaigns()
  }, [address, contract])

  return (
    <div style={{ margin: 20, padding: 10 }}>
      { isLoading ? <PostLoader /> :
        <div>
          <h3>All Champaigns ({campaigns.length})</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>{
            campaigns && campaigns.length > 0 && campaigns.map((item) => <DisplayCampaign props={item} />)

          }
          </div>
        </div>
      }
    </div>
  )
}

export default Home