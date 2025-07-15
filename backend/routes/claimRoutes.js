

import express from 'express';
import { claimPoints, HistoryofClaims } from '../controllers/claimController.js';

const router = express.Router();

router.post('/', claimPoints);
router.get('/history', HistoryofClaims);

export default router;