import { MappedError, RequestValidation } from 'express-validator';

export default class Request {
  constructor(public req: RequestValidation, private privateErrors: MappedError[] = []) {}

  public addError(field, message) {
    this.privateErrors.push({ param: field, msg: message, value: null });
  }

  set errors(array) {
    this.privateErrors = array;
  }

  get errors() {
    return this.privateErrors;
  }

  public isValid() {
    return this.privateErrors.length === 0;
  }
}
