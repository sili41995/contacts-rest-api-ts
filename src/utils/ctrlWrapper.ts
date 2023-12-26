import { NextFunction, Response } from 'express';

const ctrlWrapper =
  <T>(ctrl: (req: T, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: T, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default ctrlWrapper;
