import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { UNAUTHIRIZED_STATUS } from '../constants';
import { HttpError } from '../errors';
import User from '../models/user';

const jwtSecret = config.get<string>('jwtSecret');

export default async (req, res, next) => {
  const authError = new HttpError();
  authError.status = UNAUTHIRIZED_STATUS;
  if (!req.header('Authorization')) {
    authError.message = 'Authorization header can\'t be blank';
    throw authError;
  }
  let id;

  try {
    const decoded: any = jwt.verify(req.header('Authorization').replace('Bearer ', ''), jwtSecret);
    id = decoded.id;
  } catch (err) {
    authError.message = 'Token is invalid';
    throw authError;
  }

  const user = await User.query().findById(id);
  if (user === null) {
    authError.message = 'Token is invalid';
    throw authError;
  }

  req.user = user;
  return next();
};
