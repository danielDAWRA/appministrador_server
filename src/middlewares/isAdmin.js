// eslint-disable-next-line consistent-return
function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send({
      message: 'You do not have permission.',
    });
  }
  next();
}

export default isAdmin;
