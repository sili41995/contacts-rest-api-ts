import fs from 'fs/promises';
import cloudinary from './cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { IUploadImageProps } from '../types/types';

const uploadImage = async ({
  path,
}: IUploadImageProps): Promise<UploadApiResponse> => {
  const result = await cloudinary.uploader.upload(path, {
    folder: 'avatars',
    width: 200,
    height: 200,
    gravity: 'face',
    crop: 'thumb',
  });

  await fs.unlink(path);

  return result;
};

export default uploadImage;
