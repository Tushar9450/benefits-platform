import express from 'express';
import { getAllDeals, getDealById, claimDeal } from '../controllers/dealController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllDeals); // Public
router.get('/:id', getDealById); // Public
router.post('/claim', authMiddleware, claimDeal); // Protected

export default router;