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
    <div className="bg-white w-full rounded p-4">
      <h2 className="text-2xl font-semibold mb-4">Select a User</h2>

      <div>

        <Select
          options={options}
          onChange={handleChange}
          placeholder="Choose a user..."
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              minHeight: '36px',
              height: '36px',
              fontSize: '14px',
              padding: '0 4px',
            }),
            valueContainer: (base) => ({
              ...base,
              height: '36px',
              padding: '0 6px',
            }),
            indicatorsContainer: (base) => ({
              ...base,
              height: '36px',
            }),
            dropdownIndicator: (base) => ({
              ...base,
              padding: '4px',
            }),
            clearIndicator: (base) => ({
              ...base,
              padding: '4px',
            }),
            menu: (base) => ({
              ...base,
              fontSize: '14px',
            }),
          }}
        />


        {selectedUser && (
          <div className="w-full rounded mt-4">
            <hr className='w-full border-gray-300'></hr>
            <h3 className="text-2xl font-medium mt-4">User Details</h3>
            <div className='flex items-center justify-between text-lg mt-2'>
              <p className='text-sm'><strong>Name:</strong> {selectedUser.name}</p>
              <p className='text-sm'><strong>Total Points:</strong> {selectedUser.totalPoints}</p>
              <button className='py-0.5 px-4 text-white rounded-md bg-blue-500
              font-medium text-sm hover:bg-blue-700'>Claim</button>
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default User
