import Router from 'express';
import * as authController from './auth.controller.js';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/validate/:emailToken', authController.validate);
router.get('/modifySensitiveData/:token', authController.modifySensitiveData);

export default router;
