import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { findContactFilter } from '../../constants';
import { httpError, ctrlWrapper, filterFieldsToUpdate } from '../../utils';
import { Contact } from '../../models/contact';

const updateById = async (
  req: IContactsRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { contactId } = req.params;
  const { set, unset } = filterFieldsToUpdate(req.body);
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: set, $unset: unset }
  ).select(findContactFilter);

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IContactsRequest>(updateById);
