import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { preUpdate, handleMongooseError } from './hooks';
import { regExp, DefaultAvatarsURL, ErrorMessages } from '../constants';
import { IContact } from '../types/types';

const { phoneRegEx, emailRegEx } = regExp;

const { emailRegExErr, phoneRegExErr, phoneRequiredErr, nameRequiredErr } =
  ErrorMessages;

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: [true, nameRequiredErr] },
    phone: {
      type: String,
      match: [phoneRegEx, phoneRegExErr],
      required: [true, phoneRequiredErr],
    },
    email: {
      type: String,
      match: [emailRegEx, emailRegExErr],
    },
    role: String,
    description: String,
    tgUsername: String,
    favorite: { type: Boolean, default: false },
    avatar: {
      type: String,
      default: DefaultAvatarsURL.contact,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre('findOneAndUpdate', preUpdate);
contactSchema.post('save', handleMongooseError);
contactSchema.post('findOneAndUpdate', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': nameRequiredErr }),
  phone: Joi.string().pattern(phoneRegEx).required().messages({
    'any.required': phoneRequiredErr,
    'string.pattern.base': phoneRegExErr,
  }),
  email: Joi.string().pattern(emailRegEx).messages({
    'string.pattern.base': emailRegExErr,
  }),
  role: Joi.string(),
  description: Joi.string(),
  tgUsername: Joi.string(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object()
  .min(1)
  .messages({ 'object.min': 'Missing fields' });
const updateStatusContactSchema = Joi.object()
  .keys({
    favorite: Joi.boolean(),
  })
  .messages({
    'object.unknown': 'An unexpected property was found in the object',
  });

const Contact = model<IContact>('contact', contactSchema);

export { Contact, addSchema, updateSchema, updateStatusContactSchema };
