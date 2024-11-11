import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect, disconnect } from './database';
import { userRouter } from './user/user.router';
import { adminRouter } from './admin/admin.router';
import { testRouter } from './test/test.router';

const app: Application = express();
const port = process.env.PORT || 8080;

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigin = process.env.FRONTEND_URL || 'https://onboarding-frontend-one.vercel.app';

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (isProduction) {
      if (origin && origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.options('*', cors(corsOptions));

connect().catch((err) => console.error('Database connection failed:', err));

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/', testRouter);

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