import express from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

const router = express.Router();

router.post('/posts/:postId/reviews', async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(400).json({ error: 'Post ID is required' });
    return;
  }
  const newReview = req.body;
  try {
    const review = await prisma.review.create({ data: newReview });
    console.log('Review created successfully:', review);
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    next(error);
  }
});

router.get('/posts/:postId/reviews', async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(400).json({ error: 'Post ID is required' });
    return;
  }
  try {
    const reviews = await prisma.review.findMany({
      where: { postId: postId },
      include: { post: true },
    });
    console.log('Reviews fetched successfully:', reviews);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/posts/:postId/reviews/:reviewId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    try {
      const review = await prisma.review.findUnique({
        where: { id: reviewId },
        include: { post: true },
      });
      if (!review) {
        res.status(404).json({ error: 'Review not found' });
        return;
      }
      console.log('Review fetched successfully:', review);
      res.json(review);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/posts/:postId/reviews/:reviewId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const updatedReview = req.body;
    try {
      const review = await prisma.review.update({
        where: { id: reviewId },
        data: updatedReview,
      });
      console.log('Review updated successfully:', review);
      res.json(review);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/posts/:postId/reviews/:reviewId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    try {
      const review = await prisma.review.delete({ where: { id: reviewId } });
      console.log('Review deleted successfully:', review);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
