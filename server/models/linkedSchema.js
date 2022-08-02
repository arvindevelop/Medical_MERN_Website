const mongoose = require('mongoose');
const validator = require('validator')

const linkedSchema = new mongoose.Schema({
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
    profile_id:{
        type:String,
        required:true,
    },
    sync:{
        type:String,
        default:'yes'
    }
})


const Linked = mongoose.model('Linked',linkedSchema);

module.exports = Linked;