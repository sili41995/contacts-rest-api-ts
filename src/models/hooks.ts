import { NextFunction } from 'express';
import { Document } from 'mongoose';
import { IError } from 'types/types';

const preUpdate = function (this: any, next: NextFunction) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

const handleMongooseError = (
  error: IError,
  data: Document,
  next: NextFunction
) => {
  error.status = 400;
  next();
};

module.exports = { preUpdate, handleMongooseError };
