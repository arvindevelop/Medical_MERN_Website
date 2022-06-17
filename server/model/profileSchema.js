const mongoose = require('mongoose');
const validator = require('validator')

const profileSchema = new mongoose.Schema({
    id:{
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
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    createdOn:{
        type : Date,
        default: Date.now
    },
    shared: [{
        type: String
    }]
})


const Profile = mongoose.model('Profile',profileSchema);

module.exports = Profile;