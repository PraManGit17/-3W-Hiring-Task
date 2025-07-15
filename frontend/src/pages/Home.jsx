// import React from 'react'
// import { TrendingUp } from 'lucide-react';
// import User from '../components/User';
// import Leaderboard from '../components/Leaderboard';
// import AddNewUser from '../components/AddNewUser';

// const Home = () => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/users');
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Failed to fetch users", err);
//     }
//   }

//   useEffect(() => {
//     fetchUsers();
//   }, []);


//   return (
//     <div className='h-screen w-full p-10 bg-gray-200'>

//       <div className='flex flex-col items-center justify-start space-y-10 w-full h-full'>

//         <div className='w-full flex items-end justify-center'>
//           <p className='text-7xl font-semibold flex'>Ran<div className='text-blue-500'>k</div>errr</p>
//           <TrendingUp size={60} className='rotate-345' color='blue' />
//         </div>

//         <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600 '>
//           <User users={users} setUsers={setUsers}/>
//         </div>

//         <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600 '>
//           <AddNewUser />
//         </div>

//         <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600 '>
//           <Leaderboard />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp } from 'lucide-react';
import User from '../components/User';
import Leaderboard from '../components/Leaderboard';
import AddNewUser from '../components/AddNewUser';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);


  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };


  const fetchLeaderboard = async () => {
    const res = await axios.get('http://localhost:5000/api/users/leaderboard');
    setLeaderboard(res.data);
  }



  const AddUser = async (name) => {
    await axios.post('http://localhost:5000/api/users', { name })
    fetchUsers();
    fetchLeaderboard();
  }

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  return (
    <div className='h-screen w-full p-10'>
      <div className='flex flex-col items-center justify-start space-y-10 w-full h-full'>

        <div className='w-full flex items-end justify-center'>
          <p className='text-7xl font-semibold flex'>Ran<div className='text-blue-500'>k</div>errr</p>
          <TrendingUp size={60} className='rotate-345' color='blue' />
        </div>

        <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600'>
          <User users={users} setUsers={setUsers} />
        </div>

        <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600'>
          <AddNewUser AddUser={AddUser} />
        </div>

        <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600'>
          <Leaderboard leaderboard={leaderboard}/>
        </div>

      </div>
    </div>
  );
};

export default Home;
