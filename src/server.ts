import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect, disconnect } from './database';
import { userRouter } from './user/user.router';
import { adminRouter } from './admin/admin.router';


const app: Application = express();
const port = 8080;

connect();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  const error = new Error('Not Found');
  res.status(404);
  next(error);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(res.statusCode || 500);
  res.json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
