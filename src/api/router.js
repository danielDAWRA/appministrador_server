import Router from 'express';

import communitiesRouter from './communities/communities.router.js';
import incidentsRouter from './incidents/incidents.router.js';
import providersRouter from './providers/providers.router.js';
import usersRouter from './users/users.router.js';

import authRouter from './auth/auth.router.js';
import oauth2router from './oauth2/oauth2.router.js';

const router = Router();

router.use('/communities', communitiesRouter);
router.use('/incidents', incidentsRouter);
router.use('/providers', providersRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

router.use('/oauth2', oauth2router);

export default router;
