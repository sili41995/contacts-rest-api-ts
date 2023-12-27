import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { findContactFilter } from '../../constants';
import { Contact } from '../../models/contact';
import { httpError, ctrlWrapper, deleteImage } from '../../utils';

const deleteById = async (
  req: IContactsRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({
    _id: contactId,
    owner,
  }).select(findContactFilter);

  if (!result) {
    throw httpError({ status: 404 });
  }

  await deleteImage(result.avatar);

  res.status(200).json(result);
};

export default ctrlWrapper<IContactsRequest>(deleteById);
