import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { ethers } from 'ethers';
import { checkIfImage } from '../utils'

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleSubmit = async () => {
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsloading(true);
        //console.log(form);
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        setIsloading(false);
        navigate('/')
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' })
      }
    })
  }

  return (
    <div style={{ display: 'flex', margin: 20, flexDirection: 'column', background: '#18181b', borderRadius: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <h1 style={{ background: '#27272a', padding: 30, borderRadius: 10 }}>Create Your Own Campaign &#128640; </h1>
      </div>
      <div style={{ margin: 20, display: 'flex', flexDirection: 'column', gap: 50 }}>
        <div style={{ display: window.innerWidth > 650 && 'flex', gap: 20 }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <label style={{ color: '#f97316', fontSize: 18, margin: 10 }}>Your Name*</label>
            <input placeholder='Haarvish' onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
              value={form.name}
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 20, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 20 }} />
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <label style={{ color: '#f97316', fontSize: 18, margin: 10 }}>Campaign Title*</label>
            <input placeholder='Write a title' onChange={(e) => { setForm({ ...form, title: e.target.value }) }}
              value={form.title}
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 20, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 20 }} />
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <label style={{ color: '#f97316', fontSize: 18, margin: 10 }}>Story*</label>
          <textarea rows={7} placeholder='Write your Story...' onChange={(e) => { setForm({ ...form, description: e.target.value }) }}
            value={form.description}
            style={{ lineHeight: 1.5, display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 20, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 20 }} />
        </div>
        <div style={{ display: window.innerWidth > 650 && 'flex', gap: 20 }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <label style={{ color: '#f97316', fontSize: 18, margin: 10 }}>Goal*</label>
            <input placeholder='ETH 0.50' onChange={(e) => { setForm({ ...form, target: e.target.value }) }}
              value={form.target}
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 20, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 20 }} />
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <label style={{ color: '#f97316', fontSize: 18, margin: 10 }}>End Date*</label>
            <input onChange={(e) => { setForm({ ...form, deadline: e.target.value }) }}
              value={form.deadline}
              type='date'
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 20, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 20 }} />
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <label style={{ color: '#f97316', fontSize: 18, margin: 10 }}>Campaign Image*</label>
          <input placeholder='Place Image URL for your Campaign' onChange={(e) => { setForm({ ...form, image: e.target.value }) }}
            value={form.image}
            style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 20, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 20 }} />
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => handleSubmit()} style={{ width: 150, height: 50, padding: 10, background: '#f97316', border: 'none', borderRadius: 10, fontSize: 20, fontWeight: 'bold', color: 'white', boxShadow: '1px 1px 5px #fb923c', cursor: 'pointer' }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateCampaign
