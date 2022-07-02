const mongoose = require('mongoose');
const validator = require('validator')

const deviceSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
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
    deviceName:{
        type: String,
        required: true
    },
    deviceType: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    deviceAddress: {
        type: String,
        required: true
    },
    sync:{
        type:String,
        default:'yes'
    },
    addedOn:{
        type : Date,
        default: Date.now
    },
    lastUpdate:{
        type : Date,
        default: Date.now
    }
})


const Device = mongoose.model('Device',deviceSchema);

module.exports = Device;