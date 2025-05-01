import dayjs from 'dayjs'
import React from 'react'

const VideoDetails = ({file, index, deleteSelFile, setisEditTranscipt})=>{
    return(
        <div className='w-full !px-[20px] !py-[10px] font-medium  text-[14px] md:text-[15px] text-primary/80 grid grid-cols-[1fr_4fr_2fr_3fr] items-center gap-[10px] ' >
                <span>{index+1}</span>
                <span className=' text-center truncate overflow-hidden ' >{file?.name}</span>
                <span className=' text-center ' >{dayjs(file?.createdAt).format("DD MMM YY")} | {dayjs(file?.createdAt).format("HH:mm")}</span>
                <section className='  flex items-center justify-end  ' >
                    <button onClick={()=> setisEditTranscipt({active:true, id:file?._id})} className=' !px-[14px] rounded-l-[8px] !py-[6px] border-[1.5px] border-primary/30 text-primary/80 hover:bg-primary/4 cursor-pointer'>View</button>
                    <button onClick={()=> deleteSelFile(file?._id)} className='!px-[14px] rounded-r-[8px] !py-[6px] border-[1.5px] border-primary/30 text-red-600 hover:bg-red-600/4 cursor-pointer '>Delete</button>
                </section>
        </div>
    )
}

const ViewListedVideos = ({isUploadOpen, setIsUploadOpen, projectDetails, deleteSelFile, setisEditTranscipt}) => {
  return (
    <div className=' w-full flex-1 h-full !px-[10px] md:!px-[80px] !py-[20px] md:!py-[30px] flex flex-col gap-[20px] font-roboto bg-white rounded-[10px] shadow-md  ' >

        <section className=' flex items-center justify-between w-full'>
            <h5 className=' text-[18px] md:text-[20px] font-medium text-primary  ' >Your Files</h5>
            <button onClick={()=> setIsUploadOpen(!isUploadOpen)} className="!px-6 !py-2 cursor-pointer bg-white border border-foreground text-foreground rounded-full hover:bg-purple-50 transition-colors text-[14px] md:text-[16px] ">Upload File</button>
        </section>

        <div className=' w-full max-w-[100dvw] overflow-x-auto ' >
            <section className=' w-full flex flex-col gap-[14px] min-w-[700px] overflow-x-auto ' > 

                <div className=' bg-primary/10 rounded-[5px] w-full !px-[21px] !py-[10px] font-medium text-[14px] text-primary/80 grid grid-cols-[1fr_4fr_2fr_3fr] gap-[10px] '>
                    <span>No.</span>
                    <span className=' text-center ' >Name</span>
                    <span className=' text-center ' >Upload Date & Time</span>
                    <span className=' text-right ' >Action</span>
                </div>


                <div className=' flex flex-col w-full gap-[5px] max-h-[calc(100dvh-570px)] overflow-y-auto '>

                    {projectDetails?.files?.map((file,i)=>(
                         <React.Fragment key={i}>
                             <VideoDetails  file={file} index={i} deleteSelFile={deleteSelFile} setisEditTranscipt={setisEditTranscipt} />
                             {i !== projectDetails?.files?.length - 1 && <span className=' w-full !h-[1px]  border-t border-primary/10  ' />}
                         </React.Fragment> 
                    )) }
                </div>

            </section>
        </div>

    </div>
  )
}

export default ViewListedVideos