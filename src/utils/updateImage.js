const fs = require('fs/promises');
const cloudinary = require('./cloudinary');
const { defaultAvatarsURL } = require('../constants');

const updateImage = async ({ path, filename } = {}) => {
  if (!path) {
    return { url: undefined };
  }

  const isDefaultAvatar = Object.values(defaultAvatarsURL).some((url) =>
    url.includes(filename)
  );

  const result = await cloudinary.uploader.upload(path, {
    public_id: isDefaultAvatar ? '' : filename,
    folder: 'avatars',
    width: 200,
    height: 200,
    gravity: 'face',
    crop: 'thumb',
  });

  await fs.unlink(path);

  return result;
};

module.exports = updateImage;
