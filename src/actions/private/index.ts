import { Request, Response } from 'express';
import { SUCCESS_STATUS } from '../../constants';
import { sendResponse } from '../../responses/utils';

export const get = async (req: Request, res: Response) => {
  return sendResponse(req, res, SUCCESS_STATUS, { message: 'Hello world (private)' });
};
