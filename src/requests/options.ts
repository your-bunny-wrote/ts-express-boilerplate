import User from '../models/user';

export default {
  customValidators: {
    existsUsername: async (value) => {
      const { cnt }: any = await User.findByUsername(value).count('username as cnt');
      if (cnt === 0) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
  },
  customSanitizers: {
    toArray: (value) => value.split(',').filter((val) => val !== ''),
  },
};
