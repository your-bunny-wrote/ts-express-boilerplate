import { BAD_REQUEST_STATUS } from '../constants';
import { sendResponse } from '../responses/utils';

export default (RequestClass) => async (req, res, next) => {
  const request = new RequestClass(req);
  await request.validate();
  if (request.isValid() === false) {
    const errors = {};
    request.errors.forEach((el) => { errors[el.param] = el.msg; });
    return sendResponse(req, res, BAD_REQUEST_STATUS, { errors });
  }

  return next();
};
