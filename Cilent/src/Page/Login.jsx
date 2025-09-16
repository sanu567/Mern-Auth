import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AppContext } from '../Context/AppContext';
import axios from'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate =useNavigate();
  const {backendUrl,setIsloggedin , getUserData}=useContext(AppContext)

  const [state,setState]=useState('Sing up');
  const [name,setName]=useState('');
   const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const onSubmitHandler= async(e)=>{
      try {
        e.preventDefault();
        axios.defaults.withCredentials=true;
        if(state==='Sing up'){
         const{data}= await axios.post(backendUrl+'/api/auth/register',{name,email,password})

         if(data.success){
          setIsloggedin(true);
           getUserData()
          navigate('/');
         }
         else{
          toast.error(data.message)
         }
        }
        else{
          const {data}= await axios.post(backendUrl+'/api/auth/login',{email,password})
          if(data.success){
            setIsloggedin(true);
             getUserData();
            navigate('/');
          }
          else{
            toast.error(data.message);
          }
        }
      } catch (error) {
         toast.error(error.message)
      }
    }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
     <img onClick={()=>navigate('/')} src={logo} alt=""
     className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
     <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96  text-indigo-300 sm:text-sm'>
      <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state==='Sing up'?'Create your Account':'Login'}</h2>
      <p className='text-center text-sm mb-6'>{state==='Sing up'?'Create your Account':'Login to your account!'}</p>

      <form onSubmit={onSubmitHandler} >
        {state==='Sing up'&&(<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
          <IoPerson />
          <input type="text" placeholder='Enter name' value={name}
           onChange={e=>setName(e.target.value)}
            className='bg-transparent outline-none' />
        </div>)}
        

         <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
          <MdEmail />
          <input type="text" placeholder='Enter E-mail'value={email} 
           onChange={e=>setEmail(e.target.value)}
            className='bg-transparent outline-none' />
        </div>

         <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
          <RiLockPasswordFill />
          <input type="password" placeholder='Enter password' value={password}  
          onChange={e=>setPassword(e.target.value)}
           className='bg-transparent outline-none' />
        </div>

          {state==='Login'&&( <p onClick={()=>navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot passsword?</p>)}
       
        <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
      </form>

      {state==='Sing up'?( <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?
        <span onClick={()=>setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
      </p>):
      (<p className='text-gray-400 text-center text-xs mt-4'>Dont't have an account?
        <span onClick={()=>setState('Sing up')} className='text-blue-400 cursor-pointer underline'>Singup</span>
      </p>)}
     </div>
    </div>
  )
}

export default Login
