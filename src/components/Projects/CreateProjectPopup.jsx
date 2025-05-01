import React, { useEffect, useRef, useState } from 'react'
import PopupContainer from '../../constants/PopupContainer'
import CustomButton from '../../constants/CustomButton'
import BoxContainer from '../../constants/BoxContainer'

const CreateProjectPopup = ({trigger, setTrigger, onSubmit, isLoading}) => {

    const [projectName, setProjectName] = useState("");
    const ref = useRef(null);

    useEffect(()=>{
        ref?.current?.focus();
    },[])

  return (
    <PopupContainer trigger={trigger} setTrigger={setTrigger} >
        <div className='!px-[20px] !py-[10px] w-full md:!w-[600px] flex flex-col gap-[20px] '>

            <h4 className=' text-[20px] font-bold text-primary font-roboto ' >Create Project</h4>

            {/* Project name section */}
            <section className=' flex flex-col gap-[10px] w-full ' >

                <span className=' text-primary/80 text-[14px] font-roboto ' >Enter Project Name:</span>
                <BoxContainer className={ ` !h-[45px] ` } >
                    <input type='text' ref={ref} value={projectName}  placeholder='Type here' className=' flex items-center justify-start w-full h-full !px-[14px] text-primary/90 text-[16px] font-medium !outline-none ' onChange={(e)=> setProjectName(e.target.value) } />
                </BoxContainer>
                { (!projectName || projectName.trim() === "") && <span className=' text-red-500 text-[12px] font-medium ' >Project Name Can't be empty</span>}

            </section>

            {/* Submit and Cancel Section */}
            <section className=' w-full flex items-center justify-end gap-[20px] font-semibold '>
                <CustomButton className={` text-red-600 !px-[15px]  !py-[5px] `} text="Cancel" onClick={()=> setTrigger(false) }  />
                <CustomButton disabled={!projectName || projectName.trim() === "" || isLoading} className={` bg-foreground !px-[15px] text-white !py-[5px] disabled:opacity-40 disabled:cursor-not-allowed `} text="Create" onClick={() =>onSubmit(projectName)}  />
            </section>

        </div>
    </PopupContainer>
  )
}

export default CreateProjectPopup