const mongoose = require('mongoose');
const validator = require('validator');

const vtrackReadings = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
        unique:true
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
    profile_id:{
        type: String,
        required:true
    },
    deviceID: {
        type: String,
        required: true
    },
    temperature: {
        //type: String,
        type: Number,
        required: true
    },
    time:{
        type: Number,
        required:true
    },
    battery:{
        //type:String,
        type: Number
    },
    sync:{
        type:String,
        default:'yes'
    }
})


const VtrackReading = mongoose.model('VtrackReading',vtrackReadings);

module.exports = VtrackReading;