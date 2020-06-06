var expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('integration tests', function () {
    describe('check if we can visit index page', function () {
        it('welcome page', async function () {
            this.timeout(30000);
            const res = await supertest(app).get('/');
            // checking if 'OK' for index page
            expect(res.statusCode).to.equal(200);
            // checking if page type is text/html
            expect(res.type).to.equal('text/html');
        })
    })
    describe('check if we can visit dashboard page', function () {
        it('dashboard page', async function () {
            this.timeout(30000);
            const res = await supertest(app).get('/dashboard');
            // checking if 'OK' for dashboard page
            expect(res.statusCode).to.equal(200);
            // checking if page type is text/html
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
            // checking if 'OK' for register page
            expect(res.statusCode).to.equal(200);
            // checking if page type is text/html
            expect(res.type).to.equal('text/html');
            // checking if page contains form element
            expect(res.text).to.include("<input class=");
        })
    })
})

module.exports = app;
