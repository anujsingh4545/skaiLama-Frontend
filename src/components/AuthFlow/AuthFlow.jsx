import React from 'react'
import compLogo from '../../assets/compLogo.svg'
import googleLogo from '../../assets/googleLogo.svg'
import BoxContainer from '../../constants/BoxContainer'
import CustomButton from '../../constants/CustomButton'
import { Link } from 'react-router-dom'
import { isEmailValid } from '../../constants/Validators'


const AuthFlow = ({mode, authData, setAuthData, authUser, isLoading}) => {

  return (
    <div className=' w-full h-full !px-[30px] md:!px-[50px] !py-[60px] flex items-center flex-col gap-[40px] justify-start '>

        {/* Logo section */}
        <section className=' flex flex-col w-full items-center justify-center gap-[20px] ' >
            <img src={compLogo} className=' w-[70px]'/>
            <h2 className=' text-foreground text-[30px] text-center leading-[35px] font-light '>Welcome to <br/> <span className=' font-bold ' >Ques.AI</span></h2>
        </section>

        {/* email / password / submit section */}
        <section className=' w-full flex flex-col'> 

            <div className=' flex flex-col w-full gap-[12px]  text-[16px]  '>
                <BoxContainer>
                    <input type='email' value={authData?.email  } onChange={(e)=> setAuthData((prev)=> ({...prev , email : e.target.value}))} className=' w-full h-full  outline-none !px-[20px] font-bold text-zinc-500 placeholder:text-zinc-400 ' placeholder='Email Address' />
                </BoxContainer>

                <BoxContainer>
                <input type='password' value={authData?.password} onChange={(e)=> setAuthData((prev)=> ({...prev, password : e.target.value}))}  className=' w-full h-full  outline-none !px-[20px] font-bold text-zinc-500 placeholder:text-zinc-400 ' placeholder='Password'/>
                </BoxContainer>
            </div>

            {mode === "signin" && 
                <div className=' flex items-center justify-between !mt-[10px]'>
                    <section className=' flex !items-center !justify-center gap-[5px] w-fit ' >
                        <input type='checkbox' className=' w-[15px] h-[15px] !mt-[2px] cursor-pointer '/>
                        <span className=' text-[16px] text-primary ' >Remember me</span>
                    </section>
                    <Link to={"#"} className=' text-[16px] text-[#085FCE] font-normal cursor-pointer '>Forgot password?</Link>
                </div>
            }

            <CustomButton className={" bg-foreground !mt-[30px] !py-[12px] text-[16px] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold "} disabled={!authData?.password || !authData?.email || !isEmailValid(authData?.email) || isLoading } text={ mode === "signup" ? "Create Account" : "Login"} onClick={authUser} />

        </section>


        <section className=' w-full flex items-center justify-center gap-[5px]'>
            <span className=' flex-1 bg-[#DBDBDB] h-[1.5px] ' ></span>
            <span className=' font-roboto  font-bold text-primary/80 '>or</span>
            <span className=' flex-1 bg-[#DBDBDB] h-[1.5px] ' ></span>
        </section>


        {/* Login with google section */}
        <section className=' flex w-full flex-col gap-[20px] items-center justify-center'>
            <BoxContainer>
                <div className=' !px-[20px] flex items-center justify-start gap-[20px] w-full h-full ' >
                    <img src={googleLogo} className=' w-[28px] ' />
                    <span className=' text-[16px] text-primary font-semibold ' >Continue with Google</span>
                </div>
            </BoxContainer>
            <p className='text-[16px] text-primary gap-[5px] '> {mode == "signup" ? "Have an account?" : "Don’t have an account?" }  <Link to={mode == "signup" ? "/signin" : "/signup" }  className=' font-semibold text-[#005AD5] cursor-pointer '>{ mode === "signup" ? "Login Here" : "Create Account"}</Link></p>
        </section>
    </div>
  )
}

export default AuthFlow