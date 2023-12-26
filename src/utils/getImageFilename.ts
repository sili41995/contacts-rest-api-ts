const getImageFilename = (url: string): string => {
  const imagePath = url.split('/');
  const [filename] = imagePath[imagePath.length - 1].split('.');

  return filename;
};

export default getImageFilename;
