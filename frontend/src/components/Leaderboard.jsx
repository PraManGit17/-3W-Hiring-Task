import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Leaderboard = ({ leaderboard }) => {



  return (
    <div className="bg-white w-full rounded p-4">

      <h2 className="text-2xl font-semibold mb-2">LeaderBoard</h2>


      <div className='flex flex-col mt-4'>
        <hr className='w-full border-gray-300'></hr>
        <div className='flex items-center justify-between text-lg font-medium'>

          <div>Rank</div>
          <div>Name</div>

          <div>Total Points</div>
        </div>
        <hr className='w-full border-gray-300'></hr>

        {leaderboard.map((user) => (
          <ul key={user.name}
            className='flex items-center justify-between text-lg font-medium'>

            <li>{user.rank}</li>
            <li>{user.name}</li>

            <li className='px-10'>{user.totalPoints}</li>
          </ul>
        ))}


      </div>
    </div>
  )
}

export default Leaderboard
