import express from 'express';
import {
  add,
  deleteById,
  getAll,
  getById,
  updateById,
  updateAvatarById,
} from '../../controllers/contacts';
import {
  validateBody,
  isValidId,
  authenticate,
  upload,
} from '../../middlewares';
import {
  addSchema,
  updateSchema,
  updateStatusContactSchema,
} from '../../models/contact';

const router = express.Router();

router.use(authenticate);

router.get('/', getAll);
router.get('/:contactId', isValidId, getById);
router.post('/', upload.single('avatar'), validateBody(addSchema), add);
router.delete('/:contactId', isValidId, authenticate, deleteById);
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

export default router;
