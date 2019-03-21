import * as crypto from 'crypto';
import { Model, snakeCaseMappers } from 'objection';

export default class User extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }
  static get modelPaths() {
    return [__dirname];
  }
  public static tableName = 'users';

  public static getPassword(password, secret) {
    return crypto.createHmac('sha512', secret).update(password).digest('base64');
  }

  public static findByUsername(username: string) {
    return User.query()
      .whereRaw('lower(username) = ?', [username.toLowerCase()])
      .first();
  }

  public readonly id!: number;
  public username: string;
  public password: string;

  public matchPassword(password, secret) {
    return this.password === User.getPassword(password, secret);
  }
}
