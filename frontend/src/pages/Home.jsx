import React from 'react'
import { TrendingUp } from 'lucide-react';
import User from '../components/User';
import Leaderboard from '../components/Leaderboard';

const Home = () => {
  return (
    <div className='h-screen w-full p-10 bg-gray-200'>

      <div className='flex flex-col items-center justify-start space-y-10 w-full h-full'>

        <div className='w-full flex items-end justify-center'>
          <p className='text-7xl font-semibold flex'>Ran<div className='text-blue-500'>k</div>errr</p>
          <TrendingUp size={60} className='rotate-345' color='blue' />
        </div>

        <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600 '>
          <User />
        </div>

        <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600 '>
          <Leaderboard />
        </div>
      </div>
    </div>
  )
}

export default Home
