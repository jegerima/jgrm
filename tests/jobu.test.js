const supertest = require('supertest');
const {app, server} = require('../app');

const api = supertest(app);

test('Responses are in json', async () => {
  await api
    .get('/jobu/getAllAds')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('Response has 4 objects', async ()=>{
  const res = await api.get('/jobu/getAllAds');
  console.log(res.body);
  expect(res.body.data.ads).toHaveLength(4);
});

test('First object is about agua', async ()=>{
  const res = await api.get('/jobu/getAllAds');
  console.log(res.body);
  expect(res.body.data.ads[0].title).toBe('Reparación de Casa');
});

afterAll(()=> {
  server.close();
})
