import bcrypt from 'bcryptjs';
import { NextFunction, Response } from 'express';
import { IAuthRequest } from '../../types/types';
import { User } from '../../models/user';
import { ctrlWrapper, httpError } from '../../utils';
import uploadImage from '../../utils/uploadImage';

const signUp = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.file) {
    const { url: avatar } = await uploadImage(req.file);
    req.body.avatar = avatar;
  }

  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError({ status: 409, message: 'Email already use' });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: { name: result.name, email: result.email, avatar: result.avatar },
  });
};

export default ctrlWrapper<IAuthRequest>(signUp);
