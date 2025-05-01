import React from 'react'
import PopupContainer from '../../constants/PopupContainer'
import { X } from 'lucide-react'
import youtubeIcon from "../../assets/youtubeIcon.svg"
import CustomButton from '../../constants/CustomButton'
import BoxContainer from '../../constants/BoxContainer'

const UploadPopup = ({trigger, setTrigger, fileDetails, setFileDetails, isFileuploading, onSubmit }) => {
  return (
    <PopupContainer trigger={trigger} setTrigger={setTrigger} >

        <div className='  w-full md:w-[700px] !px-[20px] md:!px-[30px] !py-[20px] flex flex-col gap-[15px] font-roboto ' >


            {/* Header and close icon */}
            <section className=' flex w-full items-center justify-between ' >
                <div className=' flex gap-[10px] items-center justify-center ' >
                    <img src={youtubeIcon} className=' w-[40px] ' />
                    <span className=' text-[22px] font-semibold text-primary/90 ' >Upload from Youtube</span>
                </div>
                <X className=' !w-[24px] cursor-pointer text-primary ' onClick={()=> setTrigger(false)} />
            </section>

            {/* Name and transcript area */}

            <section className=' w-full flex flex-col gap-[15px] text-primary/90 '>

                <div className=' w-full flex flex-col gap-[5px] items-start justify-start  '>
                    <span className='  text-[14px] text-primary/80 ' >Name</span>
                    <BoxContainer className={` border-primary/70 !h-[40px] `} >
                        <input type='text' value={fileDetails?.name} onChange={(e)=> setFileDetails((prev)=>({...prev, name:e.target.value}))} className='outline-none w-full h-full !px-[10px] ' />
                    </BoxContainer>
                </div>

                <div className=' w-full flex flex-col gap-[5px] items-start justify-start'>
                    <span className='  text-[14px] text-primary/80 ' >Transcript</span>
                    <BoxContainer className={` border-primary/70 !h-fit `} >
                        <textarea rows={4} value={fileDetails?.transcript} onChange={(e)=> setFileDetails((prev)=>({...prev, transcript:e.target.value}))} type='text' className='outline-none w-full h-full !p-[10px] ' />
                    </BoxContainer>
                </div>

            </section>


            {/* Upload section */}
            <section className=' flex w-full items-center justify-end ' >
                <CustomButton onClick={onSubmit} disabled={!fileDetails?.name || isFileuploading} text={"Upload"} className={" bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white !px-[24px] !py-[8px] !text-[14px] font-medium !rounded-[4px]  "} />
            </section>

        </div>

    </PopupContainer>
  )
}

export default UploadPopup