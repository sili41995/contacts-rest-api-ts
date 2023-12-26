const { findContactFilter } = require('../../constants');
const { Contact } = require('../../models/contact');
const { httpError, ctrlWrapper, filterFieldsToUpdate } = require('../../utils');

const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const { set, unset } = filterFieldsToUpdate(req.body);
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: set, $unset: unset }
  ).select(findContactFilter);

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

module.exports = ctrlWrapper(updateById);
