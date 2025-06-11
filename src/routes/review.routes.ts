import express from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

const router = express.Router();

router.post('/posts/:postId/reviews', (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  if (postId) {
    const newReview = req.body;
    prisma.review
      .create({ data: newReview })
      .then((review) => {
        console.log('Review created successfully:', review);
        res.status(201).json(review);
      })
      .catch((error) => {
        console.error('Error creating review:', error);
        next(error);
      });
  } else {
    res.status(400).json({ error: 'Post ID is required' });
  }
});

router.get('/posts/:postId/reviews', (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  if (postId) {
    prisma.review
      .findMany({ where: { postId: postId }, include: { post: true } })
      .then((reviews) => {
        console.log('Reviews fetched successfully:', reviews);
        res.json(reviews);
      })
      .catch((error) => {
        next(error);
      });
  } else {
    res.status(400).json({ error: 'Post ID is required' });
  }
});

router.get(
  '/posts/:postId/reviews/:reviewId',
  (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    prisma.review
      .findUnique({
        where: { id: reviewId },
        include: { post: true },
      })
      .then((review) => {
        if (!review) {
          return res.status(404).json({ error: 'Review not found' });
        }
        console.log('Review fetched successfully:', review);
        res.json(review);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.put(
  '/posts/:postId/reviews/:reviewId',
  (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const updatedReview = req.body;
    prisma.review
      .update({
        where: { id: reviewId },
        data: updatedReview,
      })
      .then((review) => {
        console.log('Review updated successfully:', review);
        res.json(review);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.delete(
  '/posts/:postId/reviews/:reviewId',
  (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    prisma.review
      .delete({ where: { id: reviewId } })
      .then((review) => {
        console.log('Review deleted successfully:', review);
        res.status(204).send();
      })
      .catch((error) => {
        next(error);
      });
  }
);

export default router;
