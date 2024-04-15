import Router from 'express';
import * as providersController from './providers.controller.js';

const router = Router();

router.get('/all', providersController.getAll); // this line of code must be above the '/:id' route
router.get('/:_id', providersController.getById);
router.get('/category/:category', providersController.getByCategory);
// router.post('/create', providersController.create);

export default router;
