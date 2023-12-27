import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { findContactFilter } from '../../constants';
import { Contact } from '../../models/contact';
import { httpError, ctrlWrapper } from '../../utils';

const getById = async (
  req: IContactsRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { contactId } = req.params;
  const result = await Contact.findOne(
    { _id: contactId, owner },
    findContactFilter
  );

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IContactsRequest>(getById);
