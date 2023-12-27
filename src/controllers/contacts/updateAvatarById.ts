import { NextFunction, Response } from 'express';
import { IContactsRequest, IUser, MulterFile } from '../../types/types';
import { Contact } from '../../models/contact';
import {
  httpError,
  updateImage,
  getImageFilename,
  ctrlWrapper,
} from '../../utils';

const updateAvatarById = async (
  req: IContactsRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { contactId } = req.params;
  const { path } = req.file as MulterFile;

  const contact = await Contact.findOne({ _id: contactId, owner });

  if (!contact) {
    throw httpError({ status: 404 });
  }

  const filename = getImageFilename(contact.avatar);
  const { url: avatarURL } = await updateImage({
    path,
    filename,
  });
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { avatar: avatarURL }
  ).select('_id avatar');

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IContactsRequest>(updateAvatarById);
