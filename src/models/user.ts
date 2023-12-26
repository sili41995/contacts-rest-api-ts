import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { IUser } from '../types/types';
import { ErrorMessages, regExp, DefaultAvatarsURL } from '../constants';
import { preUpdate, handleMongooseError } from './hooks';

const { phoneRegEx, emailRegEx, dateOfBirthRegEx } = regExp;

const {
  emailRegExErr,
  phoneRegExErr,
  emailRequiredErr,
  passwordRequiredErr,
  passwordLengthErr,
  nameRequiredErr,
  dateOfBirthRegExErr,
} = ErrorMessages;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, nameRequiredErr],
    },
    lastName: String,
    password: {
      type: String,
      required: [true, passwordRequiredErr],
    },
    email: {
      type: String,
      match: [emailRegEx, emailRegExErr],
      required: [true, emailRequiredErr],
      unique: true,
    },
    phone: {
      type: String,
      match: [phoneRegEx, phoneRegExErr],
    },
    location: String,
    dateOfBirth: {
      type: String,
      match: [dateOfBirthRegEx, dateOfBirthRegExErr],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: DefaultAvatarsURL.user,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', preUpdate);
userSchema.post('save', handleMongooseError);
userSchema.post('findOneAndUpdate', handleMongooseError);

const passwordSettings = Joi.string().min(6).required().messages({
  'any.required': passwordRequiredErr,
  'string.min': passwordLengthErr,
});
const emailSettings = Joi.string().pattern(emailRegEx).required().messages({
  'any.required': emailRequiredErr,
  'string.pattern.base': emailRegExErr,
});

const signUpSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': nameRequiredErr }),
  lastName: Joi.string(),
  password: passwordSettings,
  email: emailSettings,
  phone: Joi.string().pattern(phoneRegEx).messages({
    'string.pattern.base': phoneRegExErr,
  }),
  location: Joi.string(),
  dateOfBirth: Joi.string().pattern(dateOfBirthRegEx).messages({
    'string.pattern.base': dateOfBirthRegExErr,
  }),
});

const signInSchema = Joi.object({
  password: passwordSettings,
  email: emailSettings,
});

const User = model<IUser>('user', userSchema);

export { User, signUpSchema, signInSchema };
