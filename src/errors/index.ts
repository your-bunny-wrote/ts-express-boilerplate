export class HttpError extends Error {
  public status: number;
}

// tslint:disable-next-line:max-classes-per-file
export class HttpValidationError extends Error {
  constructor(public errors: any) { super('Validation errors'); }
}
