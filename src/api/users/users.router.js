import Router from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/id/:id', usersController.getById);
router.get('/profile', usersController.getProfile);
router.patch('/', usersController.patch);

export default router;
