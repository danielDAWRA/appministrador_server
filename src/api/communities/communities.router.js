import Router from 'express';
import * as communitiesController from './communities.controller.js';

const router = Router();

// router.post('/', communitiesController.create);
router.get('/', communitiesController.getAll);
router.get('/address', communitiesController.getByAddress);
router.get('/:_id', communitiesController.getById);
router.get('/user/:_id', communitiesController.getByUserId);

export default router;
