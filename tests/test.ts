import * as chai from 'chai';
import app from '../src/app';

chai.should();
chai.use(require('chai-http'));

describe('Index', () => {
  describe('hello world', () => {
    it('should return hello message', async () => {
      const res = await chai.request(app).get('/api');
      res.should.have.status(200);
      res.body.should.deep.equal({ message: 'Hello world' });
    });
  });
});
