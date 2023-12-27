import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { DecodedToken, IAuthRequest } from '../../types/types';
import { User } from '../../models/user';
import { ctrlWrapper, httpError } from '../../utils';

const { SECRET_KEY } = process.env;

const signIn = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidPassword = await bcrypt.compare(password, user?.password ?? '');

  if (!user || !isValidPassword) {
    throw httpError({ status: 401, message: 'Email or password is wrong' });
  }

  const payload: DecodedToken = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY as string, { expiresIn: '10d' });
  const result = await User.findByIdAndUpdate(user._id, { token });

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json({
    token: result.token,
    user: {
      name: result.name,
      email: result.email,
      avatar: result.avatar,
    },
  });
};

export default ctrlWrapper<IAuthRequest>(signIn);
