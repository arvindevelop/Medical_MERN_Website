// for running this file use this command ->  npx mocha --timeout 10000 ./testing/device-test.js

var chai = require('chai');
let {expect,assert} = require('chai');

//var jp = require('jsonpath');

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const data = {_id:"arvi1748460934350",email:"arvi@gmail.com",deviceName:"Vtrack",deviceType:"machine",deviceId:"fgwefgwfg676"};
describe('device unit testing', function(){
    // it('device add unit test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/device')
    //     .post('/')
    //     .send(data)
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     // .set('Authorization', 'Bearer 60b76dc5f287b02b34d2479bd8586f506d54af7bfbaf748977e8993f1e260445')
    //     expect(res.status).to.be.equal(201);
    // });

    // it('get single device test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/device/577jm7473')
    //     .get('/')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     // .set('Authorization', 'Bearer 60b76dc5f287b02b34d2479bd8586f506d54af7bfbaf748977e8993f1e260445')
    //     expect(res.status).to.be.equal(200);
    // });

    // it('Get all device test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/device')
    //     .get('/')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     // .set('Authorization', 'Bearer 60b76dc5f287b02b34d2479bd8586f506d54af7bfbaf748977e8993f1e260445')
    //     expect(res.status).to.be.equal(200);
    // });    
    
    // it('Delete device test', async function(){
    //         let res = await chai.request('http://localhost:5000/api/v1/device/577jm7473')
    //         .delete('/')
    //         .set('Content-Type', 'application/json')
    //         .set('Accept', 'application/json')
    //         // .set('Authorization', 'Bearer 60b76dc5f287b02b34d2479bd8586f506d54af7bfbaf748977e8993f1e260445')
    //         expect(res.status).to.be.equal(200);
    // }); 

    // it('Update device test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/device/577jm7473')
    //     .patch('/')
    //     .send({"":""})
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     // .set('Authorization', 'Bearer 60b76dc5f287b02b34d2479bd8586f506d54af7bfbaf748977e8993f1e260445')
    //     expect(res.status).to.be.equal(200);
    // }); 

})