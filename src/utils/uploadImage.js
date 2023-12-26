const fs = require('fs/promises');
const cloudinary = require('./cloudinary');

const uploadImage = async ({ path } = {}) => {
  if (!path) {
    return { url: undefined };
  }

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

module.exports = uploadImage;
