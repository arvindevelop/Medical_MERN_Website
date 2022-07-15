const mongoose = require('mongoose');
const validator = require('validator');

const vtrackReadings = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide correct email.");
            }
        }
    },
    name:{
        type: String,
        required: true
    },
    deviceName: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    },
    timeStamp:{
        type: Number,
        required:true
    },
    battery:{
        type: String
    },
    date:{
        type: String,
        required: true
    },
    sync:{
        type:String,
        default:'yes'
    }
})


const VtrackReading = mongoose.model('VtrackReading',vtrackReadings);

module.exports = VtrackReading;