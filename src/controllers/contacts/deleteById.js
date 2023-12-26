const { findContactFilter } = require('../../constants');
const { Contact } = require('../../models/contact');
const { httpError, ctrlWrapper, deleteImage } = require('../../utils');

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({
    _id: contactId,
    owner,
  }).select(findContactFilter);

  if (!result) {
    throw httpError({ status: 404 });
  }

  await deleteImage(result.avatar);

  res.status(200).json(result);
};

module.exports = ctrlWrapper(deleteById);
