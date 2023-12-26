import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { IError } from 'types/types';
import authRouter from 'routes/api/auth';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
// app.use('/api/contacts', contactsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(
  (err: IError, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.status).json({ message: err.message });
  }
);

export default app;
