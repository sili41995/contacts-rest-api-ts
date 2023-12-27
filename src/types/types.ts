import { Document, Schema } from 'mongoose';
import { Request } from 'express';

export type MulterCB = (error: Error | null, result?: boolean | string) => void;

export type MulterFile = Express.Multer.File;

export interface IHttpError {
  status: number;
  message?: string;
}

export interface IUpdateData {
  [key: string]: string | boolean | number;
}

export interface IUnsetData {
  [key: string]: number;
}

export interface IFilterUpdateData {
  unset: { [key: string]: number };
  set: IUpdateData;
}

export interface IUser extends Document {
  _id: string;
  name: string;
  lastName?: string;
  password: string;
  email: string;
  phone?: string;
  location?: string;
  dateOfBirth?: string;
  token: string | null | undefined;
  avatar: string;
}

export interface INewContact extends Document {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role?: string;
  description?: string;
  tgUsername?: string;
  favorite?: boolean;
  avatar: string;
}

export interface IContact extends INewContact {
  owner: Schema.Types.ObjectId | undefined;
}

export interface IFindFilterProps {
  owner: string;
  query: {
    page?: string;
    limit?: string;
    favorite?: string;
  };
}

export interface IFilter {
  owner: string;
  favorite?: string;
}

export interface IFindFilterValues {
  skip: number;
  limit: number;
  findFilter: IFilter;
}

export interface IErrorMessageList {
  [key: number]: string;
}

export interface IUpdateImageProps {
  path: string;
  filename: string;
}

export interface IUploadImageProps {
  path: string;
}

export interface DecodedToken {
  id: string;
}

export interface IRequest extends Request {
  user?: IUser;
  file?: MulterFile;
}

export interface IAuthRequest extends IRequest {
  body: IUser;
}

export interface IContactsRequest extends IRequest {
  body: INewContact;
}
