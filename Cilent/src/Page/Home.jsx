import React from 'react'
import Navbar from '../Component/Navbar'
import Header from '../Component/Header'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen
    bg-gradient-to-br from-blue-200 to-purple-400'>
      <Navbar/>
      <Header/>
    </div>
  )
}

export default Home
