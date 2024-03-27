import jwt from 'jsonwebtoken';
import * as userService from '../api/users/users.service.js';

function unauthorized(res) {
  res.status(401);
  res.json({ msg: 'Unauthorised' });
}

function isLogged(req, res, next) {
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/validate',
    '/auth/modifySensitiveData',
    '/products/',
    '/products/all',
    '/gameTitles/productId/',
    '/genres/',
    '/platforms',
  ];
  const isPublicRoute = publicRoutes.some((publicRoute) => req.url.startsWith(publicRoute));
  if (isPublicRoute) {
    next();
    return;
  }
  const token = req.headers.authorization;
  if (!token) {
    unauthorized(res);
    return;
  }
  const { TOKEN_SECRET_WORD } = process.env;
  jwt.verify(token, TOKEN_SECRET_WORD, async (error, payload) => {
    if (error) {
      console.error('jwt error');
      unauthorized(res);
      return;
    }
    const user = await userService.getById({ id: payload.userId });
    if (!user.validated) {
      res.status(401);
      res.json({ msg: 'Please confirm your email address' });
      return;
    }
    req.user = user;
    next();
  });
}

export default isLogged;
