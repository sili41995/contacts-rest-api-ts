const getImageFilename = (url) => {
  const imagePath = url.split('/');
  const [filename] = imagePath[imagePath.length - 1].split('.');

  return filename;
};

module.exports = getImageFilename;
