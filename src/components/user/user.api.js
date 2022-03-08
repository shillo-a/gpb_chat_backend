import { Router } from 'express';
import { patchUserShowMessagesFromController, signinController } from './user.controller.js';

const router = Router();

// 1. SIGN IN - EVERYONE
router.post('/signin', signinController)

// 2. UPDATE USER SHOW MESSAGES FROM FIELD - OWNER
router.patch('/user/show-messages-from', patchUserShowMessagesFromController)

export default router;