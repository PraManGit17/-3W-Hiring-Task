import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp } from 'lucide-react';
import User from '../components/User';
import Leaderboard from '../components/Leaderboard';
import AddNewUser from '../components/AddNewUser';
import ClaimHistory from '../components/ClaimHistory';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pointsClaimed, setPointsClaimed] = useState(null);
  const [claimHistory, setClaimHistory] = useState([]);



  const fetchClaimHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/claim/history');
      setClaimHistory(res.data);
    } catch (error) {
      console.error('Failed to fetch claim history', error);
    }
  };



  const handleClaim = async () => {
    if (!selectedUser?._id) return;

    try {
      const res = await axios.post('http://localhost:5000/api/claim', {
        userId: selectedUser._id,
      });

      setPointsClaimed(res.data.pointsAwarded);
      setLeaderboard(res.data.leaderboard);
      fetchUsers();
      fetchClaimHistory();
    } catch (error) {
      console.error('Claim failed:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/leaderboard');
      setLeaderboard(res.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard', error);
    }
  };

  const AddUser = async (name) => {
    try {
      await axios.post('http://localhost:5000/api/users', { name });
      fetchUsers();
      fetchLeaderboard();
    } catch (error) {
      console.error('Failed to add user', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchClaimHistory();
  }, []);

  return (
    <div className='h-screen w-full p-10 overflow-auto'>
      <div className='flex flex-col items-center justify-start space-y-10 w-full h-full'>

        <div className='w-full flex items-end justify-center'>
          <h1 className='text-7xl font-semibold flex items-center gap-1'>
            Ran<span className='text-blue-500'>k</span>errr
          </h1>
          <TrendingUp size={60} className='rotate-345' color='blue' />
        </div>

        <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600'>
          <User
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            handleClaim={handleClaim}
            PointsClaimed={pointsClaimed}
          />
        </div>

        <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600'>
          <AddNewUser AddUser={AddUser} />
        </div>

        <div className='w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600'>
          <Leaderboard leaderboard={leaderboard} />
        </div>

        <div className="w-full sm:w-[80%] md:w-[60%] flex flex-col rounded-lg shadow-md shadow-gray-600">
          <ClaimHistory claimHistory={claimHistory} users={users} />
        </div>
      </div>
    </div>
  );
};

export default Home;