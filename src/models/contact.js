const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { preUpdate, handleMongooseError } = require('./hooks');
const errorMessages = require('../constants/errorMessages');
const { regEx, defaultAvatarsURL } = require('../constants');

const { phoneRegEx, emailRegEx } = regEx;

const { emailRegExErr, phoneRegExErr, phoneRequiredErr, nameRequiredErr } =
  errorMessages;

const contactSchema = new Schema(
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
      default: defaultAvatarsURL.contact,
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

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  addSchema,
  updateSchema,
  updateStatusContactSchema,
};
