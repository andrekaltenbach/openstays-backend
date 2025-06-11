import { Express, Request, Response, NextFunction } from 'express';

const errorHandling = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'This route does not exist' });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('ERROR', req.method, req.path, err);
    if (!res.headersSent) {
      res.status(500).json({
        message: 'Internal server error. Check the server console',
      });
    }
  });
};

export default errorHandling;
