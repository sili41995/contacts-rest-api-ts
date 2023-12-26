import { NextFunction, Request, Response } from 'express';
const { isValidObjectId } = require('mongoose');
const { httpError } = require('../utils');

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
