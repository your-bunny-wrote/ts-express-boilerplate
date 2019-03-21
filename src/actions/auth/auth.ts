import * as config from 'config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { BAD_REQUEST_STATUS, SUCCESS_STATUS } from '../../constants';
import User from '../../models/user';
import UserResponse from '../../responses/user';
import { sendResponse } from '../../responses/utils';

export const auth = async (req: Request, res: Response) => {
  const { username } = req.body;
  const user = await User.findByUsername(username).first();
  if (user === undefined || !user.matchPassword(req.body.password, config.get<string>('secret'))) {
    return sendResponse(req, res, BAD_REQUEST_STATUS, { errors: { username: 'Invalid username or password' } });
  }

  const userResponse = new UserResponse({ user });
  const responseData = await userResponse.toJSON();
  responseData.token = jwt.sign({ id: user.id }, config.get('jwtSecret'));

  return sendResponse(req, res, SUCCESS_STATUS, responseData);
};
