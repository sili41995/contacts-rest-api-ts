import { IUser } from '../types/types';

const preUpdate = function (this: any, next: () => void): void {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

const handleMongooseError = (
  error: any,
  data: IUser,
  next: () => void
): void => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export { handleMongooseError, preUpdate };
