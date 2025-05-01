import React from 'react'

import newProjectBanner from "../../assets/newProjectBanner.svg"
import { Plus } from 'lucide-react'

const DefaultProjectScreen = ({isCreateProject, setIsCreateProject}) => {
  return (
    <div className=' flex-1  flex items-center justify-start flex-col w-full gap-[40px] '>
        
        <h3 className=' text-foreground font-bold text-[30px] md:text-[40px] font-roboto ' >Create a New Project</h3>
        
        <div className=' flex items-center justify-between flex-col w-full  gap-[14px] ' >

          <img src={newProjectBanner} className=' w-[70%]  md:w-[350px]' />

          <p className=' text-center text-[16px] text-primary/80  w-full md:w-[55%] font-roboto '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
        </div>

        <button onClick={()=> setIsCreateProject(!isCreateProject)}  className=' font-roboto !px-[24px] !py-[10px] rounded-[6px] text-[16px] font-semibold cursor-pointer flex items-center justify-center gap-[15px] bg-black hover:bg-black/80 text-white '> 
          <span className=' bg-white rounded-full !p-[4px] ' ><Plus className=' !text-black !w-[20px] !h-[20px] ' /></span> Create New Project</button>

      </div>
  )
}

export default DefaultProjectScreen