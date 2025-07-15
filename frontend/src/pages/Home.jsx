import React from 'react'
import { TrendingUp } from 'lucide-react';
import User from '../components/User';

const Home = () => {
  return (
    <div className='h-screen w-full p-10 bg-gray-200'>

      <div className='flex flex-col items-center justify-start space-y-10 w-full h-full'>

        <div className='w-full flex items-end justify-center'>
          <p className='text-7xl font-semibold flex'>Ran<div className='text-blue-500'>k</div>errr</p>
          <TrendingUp size={60} className='rotate-345' color='blue'/>
        </div>

        <div className='w-[60%] flex flex-col items-start'>
          <div className='text-4xl font-medium leading-relaxed'>User</div>
          <hr className='rounded-full w-full h-1 bg-gray-800 mb-2 '></hr>

          <User />
        </div>
      </div>
    </div>
  )
}

export default Home
