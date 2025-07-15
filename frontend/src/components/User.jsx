import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import axios from 'axios';


const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);


  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users", err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const options = users.map((user) => ({
    value: user._id,
    label: user.name,
    data: user,
  }))

  const handleChange = (selectedOption) => {
    setSelectedUser(selectedOption.data);
  }

  return (
    <div className="bg-white w-full shadow-gray-200 shadow-lg rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Select a User</h2>

      <div>
        <Select options={options} onChange={handleChange} placeholder="Choose a user..." />

        {selectedUser && (
          <div className="w-full rounded mt-4">
            <h3 className="text-lg font-mediume">User Details</h3>
            <div className='flex items-center justify-between text-lg px-2'>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Total Points:</strong> {selectedUser.totalPoints}</p>
              <button className='py-0.5 px-4 text-white rounded-md bg-blue-500
              font-medium hover:bg-blue-700'>Claim</button>
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default User
