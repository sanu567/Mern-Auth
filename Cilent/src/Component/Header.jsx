import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const Header = () => {
  const {userData} =useContext(AppContext);
  console.log("userData:", userData);
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src="https://tse3.mm.bing.net/th/id/OIP.ozdfKj5ZDDxIJAU1Zwrk8gHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" 
      className='w-40 h-40 rounded-full mb-6'/>

      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData?userData.name:'Developer'} 👋</h1>

      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>welcome !</h2>

      <p className='mb-8 max-w-md'>let's start with a quick product tour and we will have you up and running in on time!</p>
      <button className='border bg-gradient-to-r from-red-500 via-pink-600 to-orange-400 rounded-full px-8 py-2.5 hover:w-56 transition-all'>Get started</button>
    </div>
  )
}

export default Header
