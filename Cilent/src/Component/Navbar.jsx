import React, { useContext } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate= useNavigate();
  const{userData,backendUrl,setUserData,setIsloggedin}=useContext(AppContext);

  const sendVerificationOtp= async ()=>{
    try {
      axios.defaults.withCredentials=true;

      const {data}= await axios.post(backendUrl+'/api/auth/send-verify-otp');
      if(data.success){
        navigate('/email-verify');
        toast.success(data.message);
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async ()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data}= await axios.post(backendUrl+'/api/auth/logout')
      data.success && setIsloggedin(false);
      data.success && setUserData(false);
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={logo} alt="" className='w-20 sm:w-32'/>
      {userData ?
       <div className='w-10 h-10 font-medium flex justify-center items-center rounded-full bg-orange-500 text-white relative group'>
        {userData.name[0].toUpperCase()}
        <div className=' w-24 absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
          <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
            {!userData.isAccountverify && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
            <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
          </ul>
        </div>
        </div> :
         <button onClick={()=>navigate('/login')} className=' flex items-center gap-2 -mt-8 border bg-gradient-to-r from-pink-700 via-red-600 to-yellow-200
       rounded-full px-6 py-2 text-black
      '>Login <FaArrowRight /></button>}
     
    </div>
  )
}

export default Navbar
