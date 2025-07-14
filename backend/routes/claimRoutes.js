

import express from 'express';
import { claimPoints } from '../controllers/claimController.js';

const router = express.Router();

router.post('/', claimPoints);

export default router;