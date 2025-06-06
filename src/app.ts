import 'dotenv/config';
import express from 'express';
import config from './config';

import indexRoutes from './routes/index.routes';
import postRoutes from './routes/post.routes';

const app = express();
config(app);
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// 👇 Start handling routes here
app.use('/api', indexRoutes);

app.use('/api', postRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

export default app;
