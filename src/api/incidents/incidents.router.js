import Router from 'express';
import * as incidentsController from './incidents.controller.js';

const router = Router();

router.get('/all', incidentsController.getAll); // this line of code must be above the '/:id' route
router.get('/:_id', incidentsController.getById);
router.post('/create', incidentsController.create);
export default router;
