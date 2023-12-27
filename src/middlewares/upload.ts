import { Request } from 'express';
import { MulterCB, MulterFile } from '../types/types';
import multer from 'multer';
import path from 'path';
import { httpError } from '../utils';

const destination = path.resolve('temp');

const storage = multer.diskStorage({
  destination,
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const fileFilter = (
  req: Request,
  file: MulterFile,
  cb: (error: any, acceptFile?: boolean) => void
): void => {
  const extension = file.originalname.split('.').pop();
  const isValidExtension = ['jpg', 'jpeg', 'png'].includes(extension as string);

  if (!isValidExtension) {
    return cb(httpError({ status: 400, message: 'Invalid file extension' }));
  }

  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
