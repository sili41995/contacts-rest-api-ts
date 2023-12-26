const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { preUpdate, handleMongooseError } = require('./hooks');
const errorMessages = require('../constants/errorMessages');
const { regEx, defaultAvatarsURL } = require('../constants');

const { phoneRegEx, emailRegEx, dateOfBirthRegEx } = regEx;

const {
  emailRegExErr,
  phoneRegExErr,
  emailRequiredErr,
  passwordRequiredErr,
  passwordLengthErr,
  nameRequiredErr,
  dateOfBirthRegExErr,
} = errorMessages;

const userSchema = new Schema(
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
      default: defaultAvatarsURL.user,
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

const User = model('user', userSchema);

module.exports = { User, signUpSchema, signInSchema };
