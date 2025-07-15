import React from 'react';

const ClaimHistory = ({ claimHistory, users }) => {
  if (!claimHistory || claimHistory.length === 0) return null;

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : 'Unknown User';
  };

  const recentClaims = [...claimHistory]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // newest first
    .slice(0, 10); // top 10 recent

  return (
    <div className="bg-white w-full rounded p-4">
      <h2 className="text-2xl font-semibold mb-2">Claim History</h2>
      <hr className='w-full border-gray-300' />

      <div className='flex flex-col w-full mt-2 gap-3'>
        {recentClaims.map((claim) => (
          <div
            key={claim._id}
            className='flex flex-col gap-1 w-full shadow shadow-gray-300 rounded-md'
          >
            <div className="bg-green-400 h-1 w-full rounded-t-md"></div>

            <div className='px-4 py-2 w-full flex items-center justify-between'>
              <div className='text-lg font-medium'>
                <span className='text-green-600 font-bold'>User:</span>{' '}
                {getUserName(claim.userId)}
              </div>

              <div className='text-lg font-medium'>
                <span className='text-green-600 font-bold'>+{claim.pointsClaimed}</span> points
              </div>
            </div>

            <div className='px-4 pb-2 text-sm text-gray-500 text-right'>
              {new Date(claim.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimHistory;
