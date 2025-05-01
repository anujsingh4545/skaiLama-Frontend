import React, { useState } from 'react'
import SignupBannerSvg from '../assets/SignupBannerSvg.svg'
import companyLogo from '../assets/companyLogo.svg'
import companyHeading1 from '../assets/companyHeading1.svg'
import AuthFlow from '../components/AuthFlow/AuthFlow'
import { loginUserAuth, signupUserAuth } from '../services/authService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const SignupBanner = ()=>{
    return(
        <div className='hidden md:block col-span-2 min-h-[100dvh] max-h-[100dvh] bg-foreground relative '>
          
          <img src={SignupBannerSvg} className=' absolute top-0 left-0 object-cover w-full max-h-[100%]'/>

          <section className=' w-full h-full !py-[60px] !px-[80px] '>
            <img src={companyLogo} className=' w-[200px] h-[57px]'/>
            <img src={companyHeading1} className=' w-[450px] h-[250px] !mt-[20px] '/>
            <p className=' w-[40%]  text-[24px] font-roboto font-light !text-white '>Supercharge Your Distribution using our AI assistant!</p>
          </section>

        </div>
    )
}

const AuthPage = ({mode}) => {

  const [authData, setAuthData] = useState({email:"", password:""});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupUser = async()=>{
    try {
      setIsLoading(true);
      const result = await signupUserAuth(authData);

      if(result.success){
        dispatch(updateUser(result?.data));
        toast.success(result.message);
        navigate("/");
      }
      else{
        toast.error(result.message);
      }

    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const loginUser = async()=>{
    try {
      setIsLoading(true);
      const result = await loginUserAuth(authData);

      if(result.success){
        dispatch(updateUser(result?.data));
        toast.success(result.message);
        navigate("/");
      }
      else{
        toast.error(result.message);
      }

    } catch (error) {
      toast.error("Something went wrong!");
    }finally{
      setIsLoading(false)
    }
  }


  return (
    <div className=' flex-1 grid grid-cols-1 md:grid-cols-3 w-full '>

        {/* Signup Banner Section */}
        <SignupBanner/>

        {/* Signup/Signin Auth Flow */}
        <AuthFlow mode={mode} authData={authData} setAuthData={setAuthData}  authUser={ mode ==="signup" ? signupUser : loginUser} isLoading={isLoading}  />
    </div>
  )
}

export default AuthPage