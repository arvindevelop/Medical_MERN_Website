const mongoose = require('mongoose');
const validator = require('validator')

const deviceSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
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
        //unique: true
    },
    addedOn:{
        //type:String
        type : Date,
        default: Date.now
    },
    lastUpdate:{
        //type:String
        type : Date,
        default: Date.now
    },
    sync:{
        type:String,
        default:'yes'
    }
})


const Device = mongoose.model('Device',deviceSchema);

module.exports = Device;