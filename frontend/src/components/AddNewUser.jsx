import React, { useState } from 'react'
import axios from 'axios';

const AddNewUser = ( { AddUser } ) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim()) {
      AddUser(name.trim());
      setName('');
    }
    else{
      alert("Enter Details First");
    }

  };

  return (
    <div className="bg-white w-full rounded p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">Add A New User</h2>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Enter User Name:</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-1 text-sm bg-gray-200 placeholder:text-sm rounded h-8"
          />
        </div>

        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddNewUser;