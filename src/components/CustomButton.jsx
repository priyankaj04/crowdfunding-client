import React from 'react'

const CustomButton = ({btnType, title, handleClick}) => {
  return (
    <button type={btnType} style={{ color: 'white', background: '#f97316', border: 0, cursor: 'pointer', fontSize: 14, padding: 10, borderRadius: 8, fontFamily: "'Epilogue', sans-serif", fontWeight: 600}} onClick={handleClick}>
      {title}
    </button>
  )
}

export default CustomButton
