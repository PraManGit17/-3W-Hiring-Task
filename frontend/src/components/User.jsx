import { PartyPopperIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import gsap from 'gsap';

const User = ({ users, selectedUser, setSelectedUser, handleClaim, PointsClaimed }) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [claimedUserName, setClaimedUserName] = useState('');

  const toastRef = useRef(null);
  const barRef = useRef(null);

  const handleChange = (selectedOption) => {
    setSelectedUser(selectedOption.data);
  };

  const Claim = async () => {
    if (!selectedUser) return;

    setLoading(true);
    setClaimedUserName(selectedUser.name);
    await handleClaim();
    setLoading(false);
    setShowToast(true);

    // Animate toast and bar
    gsap.fromTo(
      toastRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      barRef.current,
      { scaleX: 1, transformOrigin: 'left' },
      { scaleX: 0, duration: 2.5, ease: 'power2.inOut' }
    );

    setTimeout(() => {
      gsap.to(toastRef.current, { opacity: 0, y: -20, duration: 0.5 });
      setTimeout(() => setShowToast(false), 500);
    }, 3000);
  };

  const options = users.map((user) => ({
    value: user._id,
    label: user.name,
    data: user,
  }));

  return (
    <div className="bg-white w-full rounded p-4 relative">
      <h2 className="text-2xl font-semibold mb-4">Select a User</h2>

      <Select
        options={options}
        onChange={handleChange}
        placeholder="Choose a user..."
        styles={{
          control: (baseStyles) => ({
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
          <hr className="w-full border-gray-300" />
          <h3 className="text-2xl font-medium mt-4">User Details</h3>
          <div className="flex items-center justify-between text-lg mt-2 flex-col sm:flex-row gap-2 sm:gap-0">
            <p className="text-sm">
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p className="text-sm">
              <strong>Total Points:</strong> {selectedUser.totalPoints + PointsClaimed}
            </p>
            <button
              disabled={loading}
              onClick={Claim}
              className={`py-0.5 px-4 text-white rounded-md font-medium text-sm ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Claiming...' : 'Claim'}
            </button>
          </div>
        </div>
      )}

      {showToast && (
        <div
          ref={toastRef}
          className="fixed top-72 left-4 sm:left-10 z-50 shadow-gray-200 shadow-lg rounded flex flex-col items-center w-[90vw] max-w-xs"
        >
          <div ref={barRef} className="bg-green-400 h-1 w-full scale-x-100"></div>
          <div className="bg-white px-4 py-2 text-sm font-medium flex items-center gap-3">
            <PartyPopperIcon />
            <span>
              {claimedUserName} earned {PointsClaimed} points!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
