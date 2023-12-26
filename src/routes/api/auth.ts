import express from 'express';
import {
  signUp,
  signIn,
  signOut,
  current,
  updateAvatar,
} from '../../controllers/auth';
import {
  validateBody,
  authenticate,
  upload,
  presentFile,
} from '../../middlewares';
import { signUpSchema, signInSchema } from '../../models/user';

const router = express.Router();

router.post(
  '/signup',
  upload.single('avatar'),
  validateBody(signUpSchema),
  signUp
);
router.post('/signin', validateBody(signInSchema), signIn);
router.post('/signout', authenticate, signOut);
router.get('/current', authenticate, current);
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  presentFile,
  updateAvatar
);

export default router;
