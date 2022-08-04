// for running this file use this command ->  npx mocha --timeout 10000 ./testing/vt-test.js

var chai = require('chai');
let {expect,assert} = require('chai');

//var jp = require('jsonpath');

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const data = {_id:"1748460934350",email:"eggy@gmail.com",profile_id:"547476484",deviceID:"5486848648",temperature:"40",time:"544747488587"};
describe('vTrack unit testing', function(){
    // it('reading add unit test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/vtrack')
    //     .post('/')
    //     .send(data)
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     // .set('Authorization', 'Bearer 60b76dc5f287b02b34d2479bd8586f506d54af7bfbaf748977e8993f1e260445')
    //     expect(res.status).to.be.equal(201);
    // });

    // it('get all reading test', async function(){
    //     let res = await chai.request('http://localhost:5000/api/v1/vtrack/12376573sdfvh/12345678')
    //     .get('/')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     // .set('Authorization', 'Bearer 60b76dc5f287b02b34d2479bd8586f506d54af7bfbaf748977e8993f1e260445')
    //     expect(res.status).to.be.equal(201);
    // });

})