import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/app';
import User from '../src/models/user';

chai.should();
chai.use(chaiHttp);

const username = 'test';
const password = 'test';
const passwordHash = '+KTwogkWe8GSob/6oB7NsJ4GxX+WUw2S7JzOoAkNKQ5VBxMG1rZU8mrgyHIffkii1xMLiBFR8s7I1h2UGmvoig==';

describe('Auth', () => {
  describe('Authentication', () => {
    before(async () => {
      await User.query().truncate();
      return User.query().insert({ username, password: passwordHash });
    });

    it('should authenticate', async () => {
      const res = await chai.request(app).post('/api/auth').send({ username, password });
      res.should.have.status(200);
      res.should.have.nested.property('body.data.username').eq('test');
      res.should.have.nested.property('body.data.token');

      it('should allow to open private endpoints', async () => {
        const privateRes = await chai.request(app).get('/api/private')
        .set('Authorization', `Bearer ${res.body.token}`);
        privateRes.should.have.status(200);
        privateRes.body.should.deep.equal({
          status: 200,
          data: { message: 'Hello world (private)' },
        });
      });
    });

    it('should ignore username case', async () => {
      const res = await chai.request(app).post('/api/auth').send({
        username: username.toUpperCase(),
        password,
      });
      res.should.have.status(200);
      res.should.have.nested.property('body.data.username').eq('test');
      res.should.have.nested.property('body.data.token');
    });

    it('should throw validation errors', async () => {
      const res = await chai.request(app).post('/api/auth');
      res.should.have.status(400);
      res.should.have.nested.property('body.errors').keys(['username', 'password']);
    });
  });
});
