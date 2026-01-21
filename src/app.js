import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.route.js';
import { rolesRouter } from './routes/roles.route.js';
import { requestLoggerMiddleware } from './middlewares/request-logger.middleware.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(requestLoggerMiddleware);

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/users', userRouter);
  app.use('/roles', rolesRouter);

  return app;
};