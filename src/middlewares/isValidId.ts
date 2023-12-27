import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { httpError } from '../utils';

const isValidId = (req: Request, res: Response, next: NextFunction): void => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(
      httpError({ status: 404, message: `${contactId} is not valid id` })
    );
  }

  next();
};

export default isValidId;
