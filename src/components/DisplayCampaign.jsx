import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';
import { motion } from "framer-motion"

const DisplayCampaign = (props) => {

    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log(props);
        setData(props.props)
    }, [props]);

    const remainingDays = daysLeft(data.deadline);

    return (
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }} onClick={() => navigate(`/campaign/${data.title}`, {state: data})}
            style={{ background: '#18181b', width: 450, borderRadius: 20, margin: 20, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                <img src={data.image} width={350} style={{ borderRadius: 10, margin: 30 }} />
            </div>
            <div style={{ margin: 20, marginTop: 0, lineHeight: 1.5 }}>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <img src={tagType} alt="tag" />
                    <p style={{ color: '#f97316' }}>Education</p>
                </div>
                <h3 style={{ textAlign: 'center' }}>{data.title}</h3>
                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{data.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontWeight: 600, color: '#f97316', textAlign: 'center' }}>{data.amountCollected}</h3>
                        <p style={{ color: '#71717a' }}>Raised of {data.target}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontWeight: 600, color: '#f97316', textAlign: 'center' }}>{remainingDays}</h3>
                        <p style={{ color: '#71717a' }}>Days Left</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 20, gap: 10}}>
                    <img src={thirdweb} width={30} style={{ background: '#09090b', borderRadius: '50%', objectFit: 'contain' }} />
                    <p style={{ color: '#71717a', fontSize: 14 }}> by {data.owner}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default DisplayCampaign
