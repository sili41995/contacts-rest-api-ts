import { NextFunction, Response } from 'express';
import { IRequest } from '../types/types';
import { httpError } from '../utils';
import { ErrorMessages } from '../constants';

const presentFile = (
  req: IRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.file) {
    return next(
      httpError({ status: 404, message: ErrorMessages.fileAbsentErr })
    );
  }

  next();
};

export default presentFile;
