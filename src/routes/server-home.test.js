const app = require('../configs/app');
const request = require('supertest');

describe('Home', () => {
    test('Deve retornar 200 ao acessarmos o endpoint', async () => {
        const response = await request(app).get('/api/home');
        expect(response.statusCode).toEqual(200);
    });

    test('Deve retornar a propriedade \'message\' ao acessarmos o endpoint', async () => {
        const response = await request(app).get('/api/home');
        expect(response.body).toHaveProperty('message');
    });
});
