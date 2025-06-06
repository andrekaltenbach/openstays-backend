import express from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

const router = express.Router();

router.post('/posts', (req: Request, res: Response, next: NextFunction) => {
  const newPost = req.body;
  prisma.post
    .create({ data: newPost })
    .then((post) => {
      console.log('Post created successfully:', post);
      res.status(201).json(post);
    })
    .catch((error) => {
      console.error('Error creating post:', error);
      next(error);
    });
});

router.get('/posts', (req: Request, res: Response, next: NextFunction) => {
  prisma.post
    .findMany()
    .then((posts) => {
      console.log('Posts fetched successfully:', posts);
      res.json(posts);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/posts/:postId', (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  prisma.post
    .findUnique({ where: { id: postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      console.log('Post fetched successfully:', post);
      res.json(post);
    })
    .catch((error) => {
      next(error);
    });
});

router.put('/posts/:postId', (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const updatedPost = req.body;
  prisma.post
    .update({ where: { id: postId }, data: updatedPost })
    .then((post) => {
      console.log('Post updated successfully:', post);
      res.json(post);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete('/posts/:postId', (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  prisma.post
    .delete({ where: { id: postId } })
    .then((post) => {
      console.log('Post deleted successfully:', post);
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
