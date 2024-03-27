import Router from 'express';

import communities from './communities/communities.router.js';
import incidents from './incidents/incidents.router.js';

import genresRouter from './genres/genres.router.js';
import gameTitlesRouter from './gameTitles/gameTitles.router.js';
import platformsRouter from './platforms/platforms.router.js';
import productsRouter from './products/products.router.js';
import usersRouter from './users/users.router.js';
import ordersRouter from './orders/orders.router.js';

import authRouter from './auth/auth.router.js';

const router = Router();

router.use('/genres', genresRouter);
router.use('/gameTitles', gameTitlesRouter);
router.use('/orders', ordersRouter);
router.use('/platforms', platformsRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
