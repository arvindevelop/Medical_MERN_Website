// for running this file use this command ->  npx mocha --timeout 10000 ./testing/auth-test.js

var chai = require('chai');
let {expect,assert} = require('chai');

//var jp = require('jsonpath');

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const data = {email:"arvi@gmail.com",password:"arvi1234"};
describe('Auth unit testing', function(){
    // it('Login test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/auth')
    //     .post('/login')
    //     .send(data)
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     // .set('Authorization', 'Bearer 60b76dc5f287b02b34d2479bd8586f506d54af7bfbaf748977e8993f1e260445')
    //     expect(res.status).to.be.equal(201);
    // });

    // it('Register test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/auth')
    //     .post('/register')
    //     .send({"_id":"1298345076152anmol",
    //     "userName":"Anmol",
    //     "email":"anmol@gmail.com",
    //     "password":"anmol1234"})
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //  
    //     expect(res.status).to.be.equal(201);
    // });

    // it('Get all user test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/auth')
    //     .get('/')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //  
    //     expect(res.status).to.be.equal(200);
    // });    

    it('Get single user test', async function(){
        let res = await chai.request('http://localhost:5000/api/v1/auth/arvi@gmail.com')
        .get('/')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
     
        expect(res.status).to.be.equal(200);
    }); 
    
    // it('Delete user test', async function(){
    //         let res = await chai.request('http://localhost:5000/api/v1/auth/arvi@gmail.com')
    //         .delete('/')
    //         .set('Content-Type', 'application/json')
    //         .set('Accept', 'application/json')
    //      
    //         expect(res.status).to.be.equal(200);
    // }); 

    // it('Update user test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/auth/arvi@gmail.com')
    //     .patch('/')
    //     .send({"password":"arvi1234"})
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     expect(res.status).to.be.equal(200);
    // }); 

})