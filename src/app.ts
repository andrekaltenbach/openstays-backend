import 'dotenv/config';
import express from 'express';
import config from './config';

import indexRoutes from './routes/index.routes';
import postRoutes from './routes/post.routes';
import reviewRoutes from './routes/review.routes';

const app = express();
config(app);

app.use('/api', indexRoutes);
app.use('/api', postRoutes);
app.use('/api', reviewRoutes);

require('./error-handling')(app);

export default app;
