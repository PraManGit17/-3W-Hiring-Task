

import User from '../models/User.js';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.status(201).json(user);
};

export const getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });

  const leaderboard = users.map((user, index) => ({
    rank: index + 1,
    name: user.name,
    totalPoints: user.totalPoints,
  }));

  res.json(leaderboard);
};
