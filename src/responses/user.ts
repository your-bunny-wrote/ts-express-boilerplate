import User from '../models/user';

interface IUserResponse {
  id: number;
  username: string;
  token: string | undefined;
}

const prepareResponse = async ({ user }): Promise<IUserResponse> => ({
  id: user.id,
  username: user.username,
  token: undefined,
});

class UserResponse {
  private user: User;
  private responseObject: IUserResponse;

  constructor({ user }: { user: User }) {
    this.user = user;
  }

  public async toJSON() {
    if (this.responseObject === undefined) {
      this.responseObject = await prepareResponse({
        user: this.user,
      });
    }
    return this.responseObject;
  }
}

export default UserResponse;
