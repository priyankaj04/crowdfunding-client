import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { ethers } from 'ethers';
import { checkIfImage } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast.info("Please wait while we are creating new campaign")
        //console.log(form);
        try {
          await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 14) })
          toast.success("Successfully created. All the best!");
          setIsloading(false);
          navigate('/')
        } catch (err) {
          toast.error("Some error in creating campaign. Please check your settings.");
          setIsloading(false);
        }
      } else {
        toast.info('Provide valid image URL')
        setForm({ ...form, image: '' })
      }
    })
  }

  return (
    <div style={{ display: 'flex', margin: 16, flexDirection: 'column', background: '#14141b', borderRadius: 10 }}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <h2 style={{ background: '#27272a', padding: 15, borderRadius: 10, textAlign:'center' }}>Create Your Own Campaign &#128640; </h2>
      </div>
      <div style={{ margin: 15, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: window.innerWidth > 650 && 'flex', gap: 10 }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <label style={{ color: '#f97316', fontSize: 14, margin: 10 }}>Your Name*</label>
            <input placeholder='Haarvish' onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
              value={form.name}
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 16, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 10 }} />
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <label style={{ color: '#f97316', fontSize: 14, margin: 10 }}>Campaign Title*</label>
            <input placeholder='Write a title' onChange={(e) => { setForm({ ...form, title: e.target.value }) }}
              value={form.title}
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 16, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 10 }} />
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <label style={{ color: '#f97316', fontSize: 14, margin: 10 }}>Story*</label>
          <textarea rows={7} placeholder='Write your Story...' onChange={(e) => { setForm({ ...form, description: e.target.value }) }}
            value={form.description}
            style={{ lineHeight: 1.5, display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 16, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 10 }} />
        </div>
        <div style={{ display: window.innerWidth > 650 && 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <label style={{ color: '#f97316', fontSize: 14, margin: 10 }}>Goal*</label>
            <input placeholder='ETH 0.50' onChange={(e) => { setForm({ ...form, target: e.target.value }) }}
              value={form.target}
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 16, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 10 }} />
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <label style={{ color: '#f97316', fontSize: 14, margin: 10 }}>End Date*</label>
            <input onChange={(e) => { setForm({ ...form, deadline: e.target.value }) }}
              value={form.deadline}
              type='date'
              style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 16, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 10 }} />
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <label style={{ color: '#f97316', fontSize: 14, margin: 10 }}>Campaign Image*</label>
          <input placeholder='Place Image URL for your Campaign' onChange={(e) => { setForm({ ...form, image: e.target.value }) }}
            value={form.image}
            style={{ display: 'flex', flex: 1, fontFamily: "'Epilogue', sans-serif", fontSize: 16, background: '#292524', color: 'white', outline: 'none', border: '0px', borderRadius: 10, padding: 10 }} />
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => { !isLoading && handleSubmit() }} style={{ width: 100, height: 40, padding: 6, background: isLoading ? "#c2410c" : '#f97316', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 'bold', color: 'white', boxShadow: '1px 1px 5px #fb923c', cursor: 'pointer' }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateCampaign
