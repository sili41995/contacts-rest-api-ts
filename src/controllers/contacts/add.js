const { Contact } = require('../../models/contact');
const { ctrlWrapper, uploadImage } = require('../../utils');

const add = async (req, res, next) => {
  const { url: avatar } = await uploadImage(req.file);
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, avatar, owner });
  result.owner = undefined;

  res.status(201).json(result);
};

module.exports = ctrlWrapper(add);
