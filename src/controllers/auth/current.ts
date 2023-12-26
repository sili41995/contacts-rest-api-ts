import { NextFunction, Response } from 'express';
import { IAuthRequest } from '../../types/types';
import { ctrlWrapper } from '../../utils';

const current = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user) {
    req.user.token = undefined;
  }

  res.status(200).json(req.user);
};

export default ctrlWrapper<IAuthRequest>(current);
