import React, { useEffect, useState } from 'react'
import Sidebar from '../components/DashBoard/Sidebar'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Bell, Copy, Diamond, House, LogOut, Pencil, Plus } from 'lucide-react'
import { logoutUser } from '../services/authService'
import { useDispatch } from 'react-redux'
import { resetUser } from '../redux/slices/userSlice'
import { toast } from 'react-toastify'
import { fetchProjectDetails } from '../services/projectService'

const SIDEBAR_DATA = [
    {
        icon: Plus,
        id:"add-podcast",
        name:"Add your Podcast(s)",
    },
    {
        icon: Pencil,
        id:"create-repurpose",
        name:"Create & Repurpose",
    },
    {
        icon: Copy,
        id:"podcast-widget",
        name:"Podcast Widget",
    },
    {
        icon: Diamond,
        id:"upgrade",
        name:"Upgrade",
    },
]



const TopNavDrawer = ()=>{

    const location = window.location.pathname;
    const dispatch = useDispatch();

    const logOutUser = async()=>{
        try {
            const response = await logoutUser();
            if(response.success){
                dispatch(resetUser());
                toast.success(response.message);
            }
            else{
                toast.error(response.message);
            }
            
        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
        }
    }


    return(
        <div className=' flex flex-col-reverse md:flex-row items-start md:items-center justify-start md:justify-between w-full gap-[10px] md:gap-0 ' >

            <section className=' w-fit  text-[16px] md:text-[18px] font-roboto font-semibold  text-primary/60 flex items-center justify-center gap-[8px] ' >
            <House className=' w-[20px] ' />
            <Link to={"/"} className=' hidden md:block cursor-pointer ' >Home Page</Link>
            <span>/</span>
            <span>{location.split("/")[1]}</span>
            <span>/</span>
            <span className=' !text-foreground ' >{SIDEBAR_DATA.find((bar)=> bar.id === location.split("/")[2])?.name}</span>
            </section>

            <section className=' w-full md:w-fit flex items-center justify-end md:justify-center gap-[10px] ' >
                <button className=' cursor-pointer bg-white rounded-full w-[35px] md:w-[45px] h-[35px] md:h-[45px] border-[1.5px] border-primary/50 flex items-center justify-center text-primary ' > <Bell className=' w-[16px] md:!w-[20px] ' /> </button>
                <button onClick={logOutUser} className=' cursor-pointer bg-white rounded-full w-[35px] md:w-[45px] h-[35px] md:h-[45px] border-[1.5px] border-primary/50 flex items-center justify-center text-red-600 ' > <LogOut className=' w-[16px] md:!w-[20px] ' /> </button>
            </section>
        </div>
    )
}

const Dashboard = () => {

    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState(null);
    const [isProjectLoading, setIsProjectLoading] = useState(true);
    
    const getProjectDetails = async()=>{
        try {
            const location = window.location.pathname;
            setIsProjectLoading(true);
            const response = await fetchProjectDetails(location.split("/")[1]);

            if(response.success){
                setProjectDetails(response?.data);
            }
            else{
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Error fetching project details!");
            console.log(error);
        }finally{setIsProjectLoading(false)}
    }

    // By default navigate to add-podcast
    useEffect(()=>{
        navigate("add-podcast");
        getProjectDetails();
    },[])


  return (
    <div className=' flex-1 w-full h-full flex   items-start justify-start '>

        {/* Sidebar Section */}
        <Sidebar SIDEBAR_DATA={SIDEBAR_DATA} />

        {/* Main Section */}
        <section className=' bg-background  !pt-[40px] !pb-[20px] !px-[10px] md:!px-[60px] w-full flex-1  overflow-y-auto h-[100dvh]  flex flex-col gap-[20px] md:gap-[30px] items-start justify-start'>
            <TopNavDrawer/>
            <Outlet context={{ projectDetails, isProjectLoading, getProjectDetails }} />
        </section>

    </div>
  )
}

export default Dashboard