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
    // '/incidents', // this needs to be private now to take data from req.user
    '/oauth2/auth', // while developing
    '/oauth2/oauth2callback', // while developing
    // '/auth/modifySensitiveData',
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
      res.json({ msg: 'Por favor, confirma tu dirección de correo electrónico' });
      return;
    }
    req.user = user;
    next();
  });
}

export default isLogged;
