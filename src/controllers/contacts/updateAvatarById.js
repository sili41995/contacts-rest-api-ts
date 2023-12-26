const { ErrorMessages } = require('../../constants');
const { Contact } = require('../../models/contact');
const {
  httpError,
  updateImage,
  getImageFilename,
  ctrlWrapper,
} = require('../../utils');

const updateAvatarById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const { path } = req.file;

  const contact = await Contact.findOne({ _id: contactId, owner });

  if (!contact) {
    throw httpError({ status: 404 });
  }

  const filename = getImageFilename(contact.avatar);
  const { url: avatarURL } = await updateImage({
    path,
    filename,
  });
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { avatar: avatarURL }
  ).select('_id avatar');

  res.status(200).json(result);
};

module.exports = ctrlWrapper(updateAvatarById);
