

import ClaimHistory from "../models/ClaimHistory.js";
import User from '../models/User.js';


export const claimPoints = async (req, res) => {

  const { userId } = req.body;

  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "User Not Found"
    })
  }

  user.totalPoints += randomPoints;
  await user.save();

  const newClaimHistory = new ClaimHistory({
    userId,
    pointsClaimed: randomPoints
  });

  await newClaimHistory.save();

  const updateUsers = await User.find().sort({ totalPoints: -1 });

  const leaderboard = updateUsers.map((user, index) => ({
    rank: index + 1,
    name: user.name,
    totalPoints: user.totalPoints,
  }));

  res.json({ newClaimHistory, pointsAwarded: randomPoints, leaderboard });
}

export const HistoryofClaims = async (req, res) => {
  try {
    const history = await ClaimHistory.find().sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
}

