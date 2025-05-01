import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const HeaderSection = ({isCreateProject, setIsCreateProject}) =>{
    return(
        <div className=' w-full flex items-center justify-between font-roboto ' >

            <p className=' text-foreground !text-[28px] md:!text-[30px] font-roboto font-semibold ' >Projects</p>
            <button onClick={()=> setIsCreateProject(!isCreateProject)}  className=' font-roboto !px-[18px] md:!px-[24px] !py-[8px] md:!py-[10px] rounded-[6px] text-[14px] md:text-[16px] font-semibold cursor-pointer flex items-center justify-center gap-[15px] bg-black hover:bg-black/80 text-white '> 
            <span className=' bg-white rounded-full !p-[4px] ' ><Plus className=' !text-black !w-[14px] md:!w-[20px] !h-[14px] md:!h-[20px] ' /></span> Create New Project</button>
        </div>
    )
}

const ProductBox = ({data})=>{
    return(
        <Link to={`/${data?.title}`} className=' col-span-1 cursor-pointer relative !h-fit rounded-[8px] border-[1.5px] !p-[10px] border-primary/20 flex items-center justify-start gap-[20px] '>

            <section className=' bg-[#F8A01D] !w-[70px] !h-[70px] rounded-[5px] text-[20px] md:text-[25px] font-bold text-white flex items-center justify-center '>{data?.user?.email[0]?.toUpperCase()}{data?.user?.email[1]?.toUpperCase()}</section>
            
            <section className=' flex flex-col min-h-[60px] items-start justify-between flex-1 gap-[10px] '>

                <div className=' w-full font-roboto flex flex-col gap-[4px] ' >
                    <h5 className=' text-foreground text-[18px] font-bold leading-[20px] ' >{data?.title}</h5>
                    <span className=' text-primary/70 text-[10px] ' >{data?.files?.length} Files</span>
                </div>
                
                <span className=' text-primary/50 font-medium text-[11px] ' >Last edited on {dayjs(data?.updatedAt).format("DD-MM-YYYY ~ hh:mm A") }</span>
            </section>

        </Link>
    )
}

const ProjectListing = ({projects})=>{
    return(
        <div className=' grid grid-cols-1 md:grid-cols-4  items-start justify-start gap-[14px] md:gap-[30px]'>

            {projects?.map((data, index)=>(
                <ProductBox key={index} data={data} />
            ))}
        </div>
    )
}

const ProjectListingScreen = ({isCreateProject, setIsCreateProject, projects}) => {
  return (
    <div className=' flex-1 w-full  flex flex-col !gap-[40px] md:w-[90%] ' >

        <HeaderSection isCreateProject={isCreateProject} setIsCreateProject={setIsCreateProject} />

        <ProjectListing projects={projects} />

    </div>
  )
}

export default ProjectListingScreen