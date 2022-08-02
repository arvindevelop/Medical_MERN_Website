const mongoose = require('mongoose');
const validator = require('validator')

const profileSchema = new mongoose.Schema({
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
    profileName:{
        type: String,
        //required: true,
        //unique: true
    },
    gender: {
        type: String,
        //required: true
    },
    weight: {
        type: Number,
        //required: true
    },
    age: {
        type: Number,
        //required: true
    },
    createdOn:{
        type : Date,
        //default: Date.now
    },
    photo:{
        type: String
    },
    sync:{
        type:String,
        default:'yes'
    },
    // shared: [{
    //     type: String
    // }]
})


const Profile = mongoose.model('Profile',profileSchema);

module.exports = Profile;