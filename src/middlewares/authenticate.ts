import { NextFunction, Response } from 'express';
import { DecodedToken, IAuthRequest } from '../types/types';
import jwt, { Secret } from 'jsonwebtoken';
import { ctrlWrapper, httpError } from '../utils';
import { User } from '../models/user';

const { SECRET_KEY } = process.env;

const authenticate = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw httpError({ status: 401 });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY as Secret) as DecodedToken;
    const user = await User.findById(id).select(
      '-password -createdAt -updatedAt'
    );

    if (!user || user.token !== token) {
      throw httpError({ status: 401 });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      throw httpError({ status: 401, message: error.message });
    }
  }
};

export default ctrlWrapper(authenticate);
