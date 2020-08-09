const server = require('../server');
let request = require('supertest');

describe('http endpoints testing -supertest', () => {
  test('It should return 200 when root path is called', async (done) => {
    const app = await server.listen(process.env.RUNNING_PORT);
    request = request(app);
    console.log('>>>>>RUNNING TEST<<<<<<');
    const res = await request.get('/');
    expect(res.status).toBe(200);
    done();
  });
});
