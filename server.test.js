const request = require('supertest');
const server = 'http://localhost:3000';

describe('Checking server/routes', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and json content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });
  });

  describe('POST', () => {
    it('responds with 200 status', () => {
      return request(server)
        .post('/login')
        .send({ username: 'test4', password: 'test4' })
        .expect(200);
    });
  });

  describe('POST', () => {
    it('responds with 401 status if user already registered', () => {
      return request(server)
        .post('/register')
        .send({ username: 'test4', password: 'test4' })
        .expect(401)
        .then((res) => {
          expect(res.body).toHaveProperty('error');
        });
    });
  });
});
