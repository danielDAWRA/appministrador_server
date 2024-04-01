import Router from 'express';
import * as oauth2Controller from './oauth2.controller.js';

const router = Router();

router.get('/auth', oauth2Controller.getAuth);
router.get('/oauth2callback', oauth2Controller.getCallback);

export default router;
