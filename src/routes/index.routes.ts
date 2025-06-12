import express from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'All good in here' });
});

router.get('/health', async (req: Request, res: Response) => {
  try {
    // Check DB connection using a raw query
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

export default router;
