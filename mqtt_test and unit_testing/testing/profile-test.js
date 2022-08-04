// for running this file use this command ->  npx mocha --timeout 10000 profile-test.js

var chai = require('chai');
let {expect} = require('chai');

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const data = {_id:"minty45688868",email:"minty@gmail.com",profileName:"minty",age:"21",gender:"male",weight:"70"};
describe('profile unit testing', function(){
    // it('profile create unit test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/profile')
    //     .post('/')
    //     .send(data)
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     expect(res.status).to.be.equal(201);
    // });

    // it('get single profile test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/profile/greeny1748460934038')
    //     .get('/')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     expect(res.status).to.be.equal(200);
    // });

    // it('Get all profile test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/profile')
    //     .get('/')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     expect(res.status).to.be.equal(200);
    // });    
    
    // it('Delete user test', async function(){
    //         let res = await chai.request('http://localhost:5000/api/v1/profile/greeny1748460934038')
    //         .delete('/')
    //         .set('Content-Type', 'application/json')
    //         .set('Accept', 'application/json')
    //         expect(res.status).to.be.equal(201);
    // }); 

    it('Update user test', async function(){
        let res = await chai.request('http://localhost:5000/api/v1/profile/eggy1748460934038')
        .patch('/')
        .send({'profileName':'Eggy'})
        .send({"password":"arvi1234"})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(res.status).to.be.equal(200);
    }); 

})