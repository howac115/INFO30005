var expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('integration tests', function () {
    describe('check if we can visit index page', function () {
        it('welcome page', async function () {
            this.timeout(30000);
            const res = await supertest(app).get('/');
            expect(res.statusCode).to.equal(200);
            expect(res.type).to.equal('text/html');
        })
    })
    describe('check if we can visit dashboard page', function () {
        it('dashboard page', async function () {
            this.timeout(30000);
            const res = await supertest(app).get('/dashboard');
            expect(res.statusCode).to.equal(200);
            expect(res.type).to.equal('text/html');
        })
    })
    describe('check if we can register', function () {
        it('register page', async function () {
            let newUser = {
                first_name: "Toby",
                family_name: "Wood",
                email: "wood@email.com",
                password: "123123",
                password2: "123123"
            }
            this.timeout(30000);
            const res = await supertest(app).post('/home/register').send(newUser);
            expect(res.statusCode).to.equal(200);
            expect(res.type).to.equal('text/html');
        })
    })
})

module.exports = app;
