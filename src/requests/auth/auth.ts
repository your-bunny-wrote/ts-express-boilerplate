import BaseRequest from '../';

export default class AuthRequest extends BaseRequest {
  public async validate() {
    this.req.checkBody({
      username: {
        notEmpty: { errorMessage: 'Username cannot be empty' },
        existsUsername: { errorMessage: 'Invalid username or password' },
      },
      password: {
        notEmpty: { errorMessage: 'Password cannot be empty' },
      },
    });
    const result = await this.req.getValidationResult();
    if (result.isEmpty() === false) {
      this.errors = result.useFirstErrorOnly().array();
    }
  }
}
