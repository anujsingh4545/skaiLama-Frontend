import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../constants/CustomButton'
import { toast } from 'react-toastify'
import { updateFile } from '../../services/projectService'

const HeaderComp = ({isEdit, setIsEdit, setisEditTranscipt, isLoading, onSubmit})=>{
    return(
        <div className=' w-full flex flex-col md:flex-row items-start gap-[20px] md:items-center justify-between font-roboto  ' >
            <h6 className='text-[22px] md:text-[26px] font-semibold font-roboto text-primary flex gap-[7px] items-center cursor-pointer ' > <ArrowLeft className='!cursor-pointer' onClick={()=> setisEditTranscipt({active:false, id:null})} /> Edit Transcript </h6>

            <section className=' flex items-center justify-between md:justify-center gap-[10px] w-full md:w-fit ' >
                <CustomButton disabled={isLoading} onClick={()=> setIsEdit(false)} className={` ${!isEdit && "hidden" } disabled:cursor-not-allowed disabled:opacity-40 flex items-center  justify-center flex-1  md:flex-none md:w-[120px] !py-[8px] text-[16px] text-red-600 border border-red-600 !rounded-[4px] `}  text={"Discard"} />
                <CustomButton onClick={()=> setIsEdit(true)} className={` ${isEdit && "hidden" } flex items-center justify-center flex-1  md:flex-none md:w-[120px] !py-[8px] text-[16px] text-white border border-black bg-black !rounded-[4px]`}  text={"Edit"} />
                <CustomButton disabled={isLoading} onClick={onSubmit} className={`${!isEdit && "hidden" } flex items-center disabled:cursor-not-allowed disabled:opacity-40 justify-center flex-1  md:flex-none md:w-[120px] !py-[8px] text-[16px] text-white border border-black bg-black !rounded-[4px]`}  text={"Save"} />
            </section>
        </div>
    )
}

const EditTranscript = ({projectDetails, isEditTrascript, setisEditTranscipt, getProjectDetails}) => {

    
    const [isEdit, setIsEdit] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{
        if(isEditTrascript?.id){
           const data = projectDetails?.files?.find((file)=> file?._id === isEditTrascript?.id);
           if(data) setTranscript(data?.transcript);
        }

    }, [projectDetails, isEditTrascript, isEdit])


    const updateSelFile = async()=>{
        try {
            setIsLoading(true);

            const result = await updateFile({transcript, projectId : projectDetails?._id , fileId:isEditTrascript?.id});
            
            if(result.success){
                toast.success(result?.message);
                setisEditTranscipt({active:false, id:null});
                getProjectDetails();
            }
            else{
                toast.error(result?.message);
            }
            
        } catch (error) {
            toast.error("Something went wrong!");
        }finally{setIsLoading(false)}
    }



  return (
    <div className=' flex-1 w-full h-full flex flex-col  gap-[20px] md:gap-[30px] ' >
        
        <HeaderComp isEdit={isEdit} setIsEdit={setIsEdit} setisEditTranscipt={setisEditTranscipt} isLoading={isLoading} onSubmit={updateSelFile} />

        <textarea disabled={!isEdit} value={transcript} onChange={(e)=> setTranscript(e.target.value)} className=' w-full bg-white rounded-[8px] shadow-md h-[calc(100dvh-260px)] md:h-[calc(100dvh-210px)] outline-none !py-[20px] !px-[20px] md:!px-[40px] text-primary/90 ' />

    </div>
  )
}

export default EditTranscript