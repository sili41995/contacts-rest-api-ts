import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser } from '../../types/types';
import { findContactFilter } from '../../constants';
import { Contact } from '../../models/contact';
import { ctrlWrapper, getFindFilter } from '../../utils';

const getAll = async (
  req: IContactsRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { skip, limit, findFilter } = getFindFilter({
    owner,
    query: req.query,
  });
  const filter = `${findContactFilter} -description -tgUsername`;
  const result = await Contact.find(findFilter, filter, {
    skip,
    limit,
  });
  const count = await Contact.find({ owner }).countDocuments();

  res.status(200).json({
    contacts: result,
    count,
  });
};

export default ctrlWrapper<IContactsRequest>(getAll);
