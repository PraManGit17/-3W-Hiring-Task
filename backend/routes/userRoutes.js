

import express, { Router } from 'express';
import { getUsers, createUser, getLeaderboard } from '../controllers/userController.js'

const router = express.Router();

router.get("/", getUsers);
router.post('/', createUser);
router.get('/leaderboard', getLeaderboard);

export default router;
