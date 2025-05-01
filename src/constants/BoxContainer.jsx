import React from 'react'

const BoxContainer = ({ className, children}) => {
  return (
    <div className={` w-full bg-white  rounded-[8px] overflow-hidden h-[55px] border-[1.5px] border-primary/20 ${className} `} >
        {children}
    </div>
  )
}

export default BoxContainer