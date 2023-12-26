import { v2 as cloudinary } from 'cloudinary';

const { defaultAvatarsURL } = require('../constants');

const deleteImage = async (imageURL: string): Promise<void> => {
  if (imageURL === defaultAvatarsURL.contact) {
    return;
  }

  const imagePath = imageURL.split('/');
  const [filename] = imagePath[imagePath.length - 1].split('.');
  const fileDir = imagePath[imagePath.length - 2];

  await cloudinary.api.delete_resources([`${fileDir}/${filename}`], {
    type: 'upload',
    resource_type: 'image',
  });
};

export default deleteImage;
