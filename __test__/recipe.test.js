const server = require('../server');
let request = require('supertest');
const { createModels, destroyModels, destroy } = require('../model');
request = request(server);

describe('testing base route', () => {
  test('It should return 200 when root path is called', async (done) => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
    done();
  });
});

describe('create recipes', () => {
  beforeAll(() => {
    return createModels();
  });

  afterAll(() => {
    return destroyModels();
  });

  it('Should generate an Auth token', async (done) => {
    let { res, status } = await request
      .post('/auth/token')
      .send({ user: 'JOBGET' })
      .set('Accept', 'application/json');
    let token = JSON.parse(res.text);
    console.log(token);

    expect(status).toBe(200);
    done();
  });
  it('Should Not generate an Auth token', async (done) => {
    let { res, status } = await request
      .post('/auth/token')
      .send({ user: 'Random Name' })
      .set('Accept', 'application/json');
    let { token } = JSON.parse(res.text);
    console.log(token);

    expect(status).toBe(401);
    done();
  });

  it('Should Create Recipes', async (done) => {
    let { res, status } = await request
      .post('/auth/token')
      .send({ user: 'JOBGET' })
      .set('Accept', 'application/json');

    let { token } = JSON.parse(res.text);

    let createRes = await request
      .post('/recipes')
      .set('authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({
        name: 'Test',
        preptime: '30',
        difficulty: '3',
        vegeterian: 'true',
      });

    expect(createRes.status).toBe(200);
    done();
  });
});
