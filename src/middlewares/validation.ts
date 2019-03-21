import { HttpValidationError } from '../errors';

export default (RequestClass) => async (req, res, next) => {
  const request = new RequestClass(req);
  await request.validate();
  if (request.isValid() === false) {
    const errors = {};
    request.errors.forEach((el) => { errors[el.param] = el.msg; });
    throw new HttpValidationError(errors);
  }

  return next();
};
