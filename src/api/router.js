import Router from 'express';

import communitiesRouter from './communities/communities.router.js';
import incidentsRouter from './incidents/incidents.router.js';
import usersRouter from './users/users.router.js';

import authRouter from './auth/auth.router.js';

const router = Router();

router.use('/communities', communitiesRouter);
router.use('/incidents', incidentsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
