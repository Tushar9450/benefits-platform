import { Request, Response } from 'express';
import { Deal } from '../models/Deal';
import { Claim } from '../models/Claim';
import { User } from '../models/User';

// 1. Fetch all deals (Public + Locked)
export const getAllDeals = async (_req: Request, res: Response): Promise<any> => {
  try {
    const deals = await Deal.find().select('-promoCode'); 
    return res.json(deals);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching deals' });
  }
};

// 2. Fetch single deal details
export const getDealById = async (req: Request, res: Response): Promise<any> => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    return res.json(deal);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching deal' });
  }
};

// 3. Claim a deal (The Core Logic)
export const claimDeal = async (req: any, res: Response): Promise<any> => {
  try {
    const { dealId } = req.body;
    const userId = req.user.id; 

    const deal = await Deal.findById(dealId);
    const user = await User.findById(userId);

    if (!deal || !user) return res.status(404).json({ message: 'Data not found' });

    if (deal.accessLevel === 'locked' && !user.isVerified) {
      return res.status(403).json({ 
        message: 'This is a premium deal. Please verify your startup to gain access.' 
      });
    }

    const existingClaim = await Claim.findOne({ user: userId, deal: dealId });
    if (existingClaim) return res.status(400).json({ message: 'Deal already claimed' });

    const newClaim = new Claim({ user: userId, deal: dealId, status: 'pending' });
    await newClaim.save();

    return res.status(201).json({ message: 'Claim submitted successfully', claim: newClaim });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing claim' });
  }
};