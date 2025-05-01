import React, { useEffect, useState } from 'react'
import compLogoPurple from "../assets/compLogoPurple.svg"
import { Bell, Settings } from 'lucide-react'
import DefaultProjectScreen from '../components/Projects/DefaultProjectScreen'
import CreateProjectPopup from '../components/Projects/CreateProjectPopup'
import ProjectListingScreen from '../components/Projects/ProjectListingScreen'
import { toast } from 'react-toastify'
import { createProject, fetchAllProjects } from '../services/projectService'

const Navbar = ()=>{
  return(
    <div className=' w-full md:w-[90%]  flex items-center justify-between '>

      <img src={compLogoPurple} className=' w-[120px] md:w-[180px] ' />

      <section className=' w-fit flex items-center justify-between gap-[20px] ' >
        <Settings className=' !w-[20px] md:!w-[30px] !h-[30px] !text-primary cursor-pointer ' />
        <Bell className=' !w-[20px] md:!w-[30px] !h-[30px] !text-primary cursor-pointer ' />
      </section>
      
    </div>
  )
}

const Projects = () => {

  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isProectLoading, setIsprojectLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState([]);


  const fetchProjects = async()=>{
    try {
      setIsprojectLoading(true);
      const result = await fetchAllProjects();

      if(result.success){
        setProject(result?.data);
      }
      else{
        toast.error(result?.message);
      }
      
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }finally{setIsprojectLoading(false)}
  }

  const onSubmit = async(title)=>{
    try {
      setIsLoading(true);
      const result = await createProject({title: title});

      if(result.success){
        toast.success(result?.message);
        fetchProjects();
        setIsCreateProject(false);
      }
      else{
        toast.error(result?.message);
      }  
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
    finally{setIsLoading(false)}
  }

  useEffect(()=>{
    fetchProjects();
  },[])



  return (
    <div className=' flex-1  flex flex-col !px-[20px] md:!px-0 !pt-[40px] md:!pt-[50px] items-center justify-start bg-background gap-[50px] '>

      {/* Navbar Section */}
      <Navbar/>

      {/* Project Section */}

      {isProectLoading ? 
        <div className=' w-full flex-1 h-full flex items-center justify-center ' ></div>
      : 
        (project && project?.length >0) ? 
          <ProjectListingScreen isCreateProject={isCreateProject} setIsCreateProject={setIsCreateProject} projects={project} /> 
          :
          <DefaultProjectScreen isCreateProject={isCreateProject} setIsCreateProject={setIsCreateProject} />
      }

      {/* New Project Popup */}
      {isCreateProject && <CreateProjectPopup trigger={isCreateProject} setTrigger={setIsCreateProject} onSubmit={onSubmit} isLoading={isLoading} /> }
    </div>
  )
}

export default Projects