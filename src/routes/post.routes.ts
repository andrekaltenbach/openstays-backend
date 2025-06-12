import express from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

const router = express.Router();

type PostFilters = {
  location?: string;
  isTent?: boolean;
  isCaravan?: boolean;
  isBed?: boolean;
};

router.post('/posts', async (req: Request, res: Response, next: NextFunction) => {
  const newPost = req.body;

  try {
    const post = await prisma.post.create({ data: newPost });
    console.log('Post created successfully:', post);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    next(error);
  }
});

router.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  const location = req.query.location as string | undefined;
  const isTent =
    req.query.isTent === 'true' ? true : req.query.isTent === 'false' ? false : undefined;
  const isCaravan =
    req.query.isCaravan === 'true' ? true : req.query.isCaravan === 'false' ? false : undefined;
  const isBed = req.query.isBed === 'true' ? true : req.query.isBed === 'false' ? false : undefined;
  const filters: PostFilters = {};

  if (location) {
    filters.location = location;
  }
  if (isTent) {
    filters.isTent = isTent;
  }
  if (isCaravan) {
    filters.isCaravan = isCaravan;
  }
  if (isBed) {
    filters.isBed = isBed;
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        ...(filters.location && {
          location: {
            contains: filters.location,
            mode: 'insensitive',
          },
        }),
        ...(filters.isTent != undefined && {
          isTent: filters.isTent,
        }),
        ...(filters.isCaravan != undefined && {
          isCaravan: filters.isCaravan,
        }),
        ...(filters.isBed != undefined && {
          isBed: filters.isBed,
        }),
      },
    });
    console.log('Posts fetched successfully:', posts);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    next(error);
  }
});

router.get('/posts/:postId', async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    console.log('Post fetched successfully:', post);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.put('/posts/:postId', async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const updatedPost = req.body;

  try {
    const post = await prisma.post.update({ where: { id: postId }, data: updatedPost });
    console.log('Post updated successfully:', post);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.delete('/posts/:postId', async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.delete({ where: { id: postId } });
    console.log('Post deleted successfully:', post);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
