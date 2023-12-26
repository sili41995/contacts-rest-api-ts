const express = require('express');
const {
  add,
  deleteById,
  getAll,
  getById,
  updateById,
  updateAvatarById,
} = require('../../controllers/contacts');
const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require('../../middlewares');
const {
  addSchema,
  updateSchema,
  updateStatusContactSchema,
} = require('../../models/contact');

const router = express.Router();

router.use(authenticate);

router.get('/', getAll);
router.get('/:contactId', isValidId, getById);
router.post('/', upload.single('avatar'), validateBody(addSchema), add);
router.delete('/:contactId', isValidId, deleteById);
router.put('/:contactId', isValidId, validateBody(updateSchema), updateById);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateStatusContactSchema),
  updateById
);
router.patch(
  '/:contactId/avatar',
  authenticate,
  isValidId,
  upload.single('avatar'),
  updateAvatarById
);

module.exports = router;
