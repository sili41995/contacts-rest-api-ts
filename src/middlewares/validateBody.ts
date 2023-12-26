import { NextFunction, Response, Request } from 'express';
import { ObjectSchema } from 'joi';
import { httpError } from '../utils';

const validateBody =
  <T>(schema: ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw httpError({ status: 400, message: error.message });
    }

    next();
  };

export default validateBody;
