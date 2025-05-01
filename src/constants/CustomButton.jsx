import React from 'react'

const CustomButton = ({className, text, onClick, disabled=false}) => {
  return (
    <button disabled={disabled} className= {` rounded-[8px] flex items-center justify-center cursor-pointer ${className}`} onClick={onClick} >
        {text}
    </button>
  )
}

export default CustomButton