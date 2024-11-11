import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect, disconnect } from './database';
import { userRouter } from './user/user.router';
import { adminRouter } from './admin/admin.router';

const app: Application = express();
const port = process.env.PORT || 8080;

const isProduction = process.env.NODE_ENV === 'production';

const corsOptions = isProduction
  ? {
      origin: process.env.FRONTEND_URL || 'https://your-production-url.com',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }
  : {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connect().catch((err) => console.error('Database connection failed:', err));

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use((req: Request, res: Response) => {
  console.log(req.url);
  res.status(404).json({ message: 'Not Found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(res.statusCode || 500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGINT', async () => {
  console.log('Gracefully shutting down');
  await disconnect();
  process.exit(0);
});
