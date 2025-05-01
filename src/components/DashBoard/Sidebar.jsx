import React, { useEffect, useState } from 'react'
import compLogoPurple from "../../assets/compLogoPurple.svg"
import compLogo from "../../assets/compLogo.svg"
import { ChevronsLeft, Settings } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'


const Sidebar = ({SIDEBAR_DATA}) => {

    const [isOpenDrawer, setIsOpenDrawer] = useState(true);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 700) {
            setIsOpenDrawer(false);
          } else {
            setIsOpenDrawer(true);
          }
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


  return (
    <div className={`  ${isOpenDrawer ? "w-[320px] !px-[30px] " : " w-[80px] md:w-[100px] !px-[15px] md:!px-[25px] " } transition-all duration-300 relative  !py-[40px]  !bg-white shadow-xl h-[100dvh] flex flex-col items-center justify-between `}>


        {/* Top Nav section */}
        <section className={` w-full h-fit  flex flex-col gap-[40px]  ${isOpenDrawer ? "justify-start items-start " : "justify-between items-center " } `} >

            <Link to={"/"} ><img src={ isOpenDrawer? compLogoPurple : compLogo } className={`  ${isOpenDrawer  ? "w-[150px] !pl-[10px]"  : "!w-[40px]" }  `}/></Link>

            <div className='w-full flex flex-col items-start justify-start gap-[10px] '>

                {SIDEBAR_DATA.map((bar)=>(
                    <NavLink to={bar.id} className={({isActive})=>[ `flex items-center text-primary/90 ${ isOpenDrawer ? "justify-start" : "justify-center" } gap-[14px] !px-[10px] !py-[10px] rounded-[7px] cursor-pointer  w-full`,  isActive ? " bg-foreground/20 !text-foreground " : "hover:bg-primary/5"  ].join(" ") } >
                        <bar.icon className={` ${isOpenDrawer ? "!w-[18px]" : "!w-[20px]" } `} />
                        { isOpenDrawer && <span className=' font-medium  text-[16px] font-roboto ' >{bar.name}</span>}
                    </NavLink>
                ))}
            </div>

            <span className=' w-full h-[1px] bg-primary/40 ' />
        </section>


        {/* Bottom Profile and Help section */}
        <section className=' w-full flex gap-[20px]  items-start justify-start flex-col '>

            <div className={`flex items-center text-primary/90 ${ isOpenDrawer ? "justify-start" : "justify-center" } gap-[14px] !px-[10px] !py-[10px] rounded-[7px] cursor-pointer  w-full hover:bg-primary/5 `} >
                <Settings className={` ${isOpenDrawer ? "!w-[18px]" : "!w-[20px]" } `} />
                {isOpenDrawer && <span className=' font-medium  text-[16px] font-roboto ' >Help</span>}
            </div>

            <span className=' w-full h-[1px] bg-primary/40 ' />

            <div className=' w-full flex items-start justify-start  gap-[14px] font-roboto  ' >
                <section className=' h-full  bg-foreground  !px-[14px] !py-[12px] flex items-center justify-center text-[16px] font-medium text-white rounded-full ' >AS</section>
                {isOpenDrawer &&
                    <section className=' flex-1 flex items-start justify-center  h-full flex-col  ' >
                        <span className=' text-primary/90  text-[14px] font-medium ' >Alpha4545</span>
                        <span className=' text-primary/80 text-[11px] ' >anujkumarsingh6544@gmail.com</span>
                    </section>
                }
            </div>

        </section>


        {/* Scroller */}
        <button  onClick={()=> setIsOpenDrawer(!isOpenDrawer)} className=' hidden absolute top-[70%] right-[-20px] bg-foreground w-[40px] h-[40px] md:flex items-center justify-center rounded-full text-white cursor-pointer ' >
            <ChevronsLeft className={` ${isOpenDrawer ? " rotate-0 " : "rotate-180" } `} />
        </button>
    </div>
  )
}

export default Sidebar