import React, { useEffect, useState } from 'react'
import image1 from "../../assets/dashboard1.svg"
import image2 from "../../assets/dashbaord2.svg"
import image3 from "../../assets/dashbaord3.svg"
import { UploadIcon } from 'lucide-react'
import UploadPopup from './UploadPopup'
import ViewListedVideos from './ViewListedVideos'
import EditTranscript from './EditTranscript'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addFiles, deleteFile } from '../../services/projectService'

const DASHBAORD_DATA = [
  {
    heading: "RSS Feed",
    desc : "Lorem ipsum dolor sit. Dolor lorem sit.",
    image : image1
  },
  {
    heading: "Youtube Video",
    desc : "Lorem ipsum dolor sit. Dolor lorem sit.",
    image : image2
  },
  {
    heading: "Upload Files",
    desc : "Lorem ipsum dolor sit. Dolor lorem sit.",
    image : image3
  },
]

const DashDataMapping = ()=>{
  
  return(
      <div className=' grid grid-cols-1 md:grid-cols-3 gap-[14px] md:gap-[20px]'>

        {DASHBAORD_DATA.map((data)=>(
          <div className='rounded-[6px] border-[1.5px] border-primary/10 !py-[20px] md:!py-[40px] bg-white shadow-md !px-[20px] flex items-center justify-between gap-[20px] lg:gap-[40px]'>

            <section className=' w-full flex-1 flex flex-col font-roboto items-start justify-center gap-[5px] h-fit ' >
              <span className=' text-[18px] md:text-[20px] font-semibold text-primary/95 ' > {data.heading}</span>
              <span className=' text-[12px] md:text-[14px] text-primary/80  ' >{data.desc}</span>
            </section>

            <img src={data.image} className=' w-[60px] ' />
          </div>
        ))}

      </div>
  )
}

const UploadSection = ({isUploadOpen, setIsUploadOpen})=>{
  return(
    <div className="bg-white !p-4 md:!p-8 rounded-[10px] shadow-md ">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg !px-[10px] !py-[30px] md:!p-12">
        <div className="!p-4 rounded-full bg-foreground/10 !mb-4">
          <UploadIcon className=' text-foreground ' />
        </div>
        <h3 className=" text-md md:text-lg font-medium !mb-2 text-center ">Select a file or drag and drop here</h3>
        <p className=" text-[12px] md:text-sm text-gray-500 !mb-4">(Podcast Media or Transcription Text)</p>
        <p className="text-[10px] md:text-xs text-gray-400 !mb-6">MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
        <button onClick={()=> setIsUploadOpen(!isUploadOpen)} className="!px-6 !py-2 cursor-pointer bg-white border border-foreground text-foreground rounded-full hover:bg-purple-50 transition-colors">
          Upload File
        </button>
      </div>
    </div>

  )
}

const AddPodcast = () => {

  const { projectDetails, isProjectLoading, getProjectDetails } = useOutletContext();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [fileDetails, setFileDetails] = useState({name:"", transcript: ""});
  const [isFileuploading, setIsFileUploading] = useState(false);
  const [isEditTrascript, setisEditTranscipt] = useState({active: false, id:null});


  const onFileSubmit = async()=>{
    try {
      setIsFileUploading(true);
      const result = await addFiles({name: fileDetails.name, transcript:fileDetails.transcript, projectId: projectDetails?._id});

      if(result.success){
        toast.success(result?.message);
        setFileDetails({name:"", transcript: ""});
        getProjectDetails();
        setIsUploadOpen(false);
      }
      else{
        toast.error(result?.message);
      }
      
    } catch (error) {
      toast.error("Something went wrong!"); 
    }finally{setIsFileUploading(false)}
  }

  const deleteSelFile = async(fileId)=>{
    try {

      const response = await deleteFile( projectDetails?._id, fileId);
      if(response.success){
        getProjectDetails();
        toast.success(response?.message);
      }
      else{
        toast.error(response?.message);
      }
      
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }



  return (
    isEditTrascript.active ? <EditTranscript projectDetails={projectDetails} isEditTrascript={isEditTrascript} setisEditTranscipt={setisEditTranscipt} getProjectDetails={getProjectDetails} />
    :
    <div className=' flex-1  w-full flex flex-col gap-[20px] md:gap-[30px]'>

      <h2 className=' text-[22px] md:text-[26px] font-semibold font-roboto text-primary'>Add Podcast</h2>

      {/* Dashboard listing data */}
      <DashDataMapping />

      {
        isProjectLoading ? 
        <div></div> :
        
        (projectDetails && projectDetails?.files?.length > 0) ?
          <ViewListedVideos isUploadOpen={isUploadOpen} setIsUploadOpen={setIsUploadOpen} projectDetails={projectDetails} deleteSelFile={deleteSelFile} setisEditTranscipt={setisEditTranscipt} />
          :
          <UploadSection isUploadOpen={isUploadOpen} setIsUploadOpen={setIsUploadOpen}  />
      }

      {isUploadOpen && <UploadPopup trigger={isUploadOpen} setTrigger={setIsUploadOpen} fileDetails={fileDetails} setFileDetails={setFileDetails} isFileuploading={isFileuploading} onSubmit={onFileSubmit} /> }

    </div>

  )
}

export default AddPodcast