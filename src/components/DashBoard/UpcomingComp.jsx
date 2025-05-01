import React from 'react'
import meme from "../../assets/meme.png"

const UpcomingComp = () => {
  return (
    <div className=' flex-1 flex  items-center justify-center w-full ' >
      <img src={meme} className=' w-[90%] md:!w-[50%] rounded-full ' />
    </div>
  )
}

export default UpcomingComp