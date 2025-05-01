import React from 'react'

const PopupContainer = ({trigger, setTrigger, children}) => {
  return (
    <div className=' fixed top-0 left-0 w-full z-100  h-[100dvh] flex items-center justify-center  '>
        <section className=' fixed top-0 left-0 w-full h-full  bg-primary/50 z-20 cursor-pointer ' onClick={()=> setTrigger(!trigger)} />

        <section className=' z-30  rounded-[10px] bg-white w-[90%] md:w-fit '>
            {children}
        </section>
    </div>
  )
}

export default PopupContainer