import express from 'express';
// const {
//   signUp,
//   signIn,
//   signOut,
//   current,
//   updateAvatar,
// } = require('../../controllers/auth');
// const { validateBody, authenticate, upload } = require('../../middlewares');
// const { signUpSchema, signInSchema } = require('../../models/user');

const router = express.Router();

// router.post(
//   '/signup',
//   upload.single('avatar'),
//   validateBody(signUpSchema),
//   signUp
// );
// router.post('/signin', validateBody(signInSchema), signIn);
// router.post('/signout', authenticate, signOut);
// router.get('/current', authenticate, current);
// router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

export default router;
