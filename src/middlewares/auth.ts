import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { UNAUTHIRIZED_STATUS } from '../constants';
import User from '../models/User';
import { sendResponse } from '../responses/utils';

const jwtSecret = config.get<string>('jwtSecret');

export default async (req, res, next) => {
  if (!req.header('Authorization')) {
    return sendResponse(req, res, UNAUTHIRIZED_STATUS, {
      errors: {
        token: 'Authorization header can\'t be blank',
      },
    });
  }
  let id;

  try {
    const decoded: any = jwt.verify(req.header('Authorization').replace('Bearer ', ''), jwtSecret);
    id = decoded.id;
  } catch (err) {
    return sendResponse(req, res, UNAUTHIRIZED_STATUS, {
      errors: {
        token: 'Token is invalid',
      },
    });
  }

  const user = await User.query().findById(id);
  if (user === null) {
    return sendResponse(req, res, UNAUTHIRIZED_STATUS, {
      errors: {
        token: 'Token is invalid',
      },
    });
  }

  req.user = user;
  return next();
};
