const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../Errors/UnauthorizedError');

export const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация!'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new Error(err);
  }
  req.user = payload;
  next();
};
export default auth;
