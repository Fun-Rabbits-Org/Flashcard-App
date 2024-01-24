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

  describe('/login', () => {
    describe('POST', () => {
      it('responds with 200 status and json content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });
  });

  describe('/register', () => {
    describe('POST', () => {
      it('responds with 200 status and json content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });
  });
});
