import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    const res = await axios.get('http://localhost:5000/api/users/leaderboard');
    setLeaderboard(res.data);
  }

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white w-full rounded p-4">

      <h2 className="text-2xl font-semibold mb-2">LeaderBoard</h2>


      <div className='flex flex-col mt-4'>
        <hr className='w-full border-gray-300'></hr>
        <div className='flex items-center justify-between text-lg font-medium'>
          {/* <div className='flex items-center gap-10'> */}
            <div>Rank</div>
            <div>Name</div>
          {/* </div> */}
          <div>Total Points</div>
        </div>
        <hr className='w-full border-gray-300'></hr>

        {leaderboard.map((user) => (
          <ul key={user.name}
            className='flex items-center justify-between text-lg font-medium'>
            {/* <div className='flex items-center gap-20'> */}
              <li>{user.rank}</li>
              <li>{user.name}</li>
            {/* </div> */}
            <li className='px-10'>{user.totalPoints}</li>
          </ul>
        ))}


      </div>
    </div>
  )
}

export default Leaderboard
