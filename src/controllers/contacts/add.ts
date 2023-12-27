import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { ctrlWrapper, uploadImage } from '../../utils';
import { Contact } from '../../models/contact';

const add = async (
  req: IContactsRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.file) {
    const { url: avatar } = await uploadImage(req.file);
    req.body.avatar = avatar;
  }

  const { _id: owner } = req.user as IUser;

  const result = await Contact.create({ ...req.body, owner });
  result.owner = undefined;

  res.status(201).json(result);
};

export default ctrlWrapper<IContactsRequest>(add);
